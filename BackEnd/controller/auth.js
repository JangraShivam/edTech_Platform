const User = require('../models/user');
const OTP = require('../models/OTP');
const otpgenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require('dotenv').config();

//sendOtp
exports.sendOTP = async(req , res) => {
    try{
        // fetch user email
        const email = req.body.email;

        // check if user already exists
        const checkUserExist = await User.findOne({email});

        // if user exist , return a response
        if(checkUserExist){
            return res.status(400).json({
                success:false,
                message : "user already registered"
            })
        }

        // generate otp
        let otp = otpgenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("Otp generated", otp);

        // check if otp is unique or not
        let result = await OTP.findOne({value : otp});

        while(result){
            otp = otpgenerator.generate(6 , {
                upperCaseAlphabets:false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({value : otp});
        }   

        const otpPayload = {email,value : otp};
        
        // create an entry in db for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody)

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
        })
         
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};


//signup

exports.signUp = async(req, res) => {
    try{
        // data fetch from request
        const {firstName,lastName,email,passowrd,confirmPassword , accountType, contactNo, otp} = req.body;

        // data validate
        if(!firstName || !lastName || !email || !passowrd || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        // confirm passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password and confirmPassword does not match'
            })
        }
        // check user already exists or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user is already registered"
            })
        }

        //find most recent otp for user
        const recentOtp = await OTP.find({email}).sort({created_at:-1}).limit(1);
        console.log(recentOtp);

        //validate otp
        if(recentOtp.length === 0){
            // otp does not exist
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp !== recentOtp.value){
            // invalid otp
            return res.status(400).json({
                success:false,
                message:"invalid OTP"
            })
        }

        // password hash
        const hashedpassword = await bcrypt.hash(passowrd,10);

        //create the user
        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        // entry created in db
        const profileDetails = await Profile.create({gender:null,dateOfBirth : null, about : null, contactNo: null});
        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            contactNo,
            passowrd: hashedpassword, 
            accountType,
            approved: approved,
            additionalDetails : profileDetails._id, 
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return res
        return res.status(200).json({
            success:true,
            message:"user is registered successfully",
            user,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User can not be registered. Please try again"
        })
    }
}


//login
exports.login = async(req, res) => {
    try{
        // get data from user body
        const {email ,password} = req.body;

        //validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        //user exists or not
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }

        // match password in database  generate jwt token
        if(await bcrypt.compare(password,existingUser.passowrd)){
            const payload = {
                email : existingUser.email,
                id : existingUser._id,
                accountType: existingUser.accountType
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET, {
                expiresIn:'2h'
            });

            existingUser.token = token;
            existingUser.passowrd = undefined;

             // create cookie and send response
            const options = {
                expiresIn : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                existingUser,
                message:"User logged in"
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect"
            })
        }

       

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure, Please try again"
        })
    }
}



// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};