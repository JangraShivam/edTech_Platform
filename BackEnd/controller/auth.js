const User = require('../models/user');
const OTP = require('../models/OTP');
const otpgenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const mailSender = require('../utils/mailSender');
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
        if(!firstName || !lastName || !email || !passowrd || !confirmPassword){
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

        // entry created in db
        const profileDetails = await Profile.create({gender:null,dateOfBirth : null, about : null, contactNo: null});
        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            passowrd: hashedpassword, 
            accountType,
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



//change password
exports.changePassword = async(req , res) => { 
    try{
        // get old password, new password , confirm new password
        const {email, oldPassword, newPassword, confirmNewPassword} = req.body;
        
        //validation
        if(!oldPassword || !newPassword || !email || !confirmNewPassword){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email});
        if(!await bcrypt.compare(oldPassword, user.passowrd)){
            return res.status(403).json({
                success:false,
                message:"Password is Incorrect"
            })
        }

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            })
        }

        //update password
        let hashedpassword = await bcrypt.hash(newPassword,10)
        const updatedPasswordUser = await User.findOneAndUpdate({email:email}, {passowrd : hashedpassword});

        //send mail - password updated
        const mailResponse = mailSender(updatedPasswordUser.email,"passwordUpdated","")
        //return response
        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })

    }
    catch( error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "Error occured while changing passowrd"
        })
    }
}