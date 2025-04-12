const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user')
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


// resetPasswordToken
exports.resetPasswordToken = async(req , res) => {
    try{
        //get email
        const {email} = req.body;
        // check user for this email
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }
        //generate token
        const token = crypto.randomUUID();

        //update user by adding expiration time
        const updateDetails = await User.findOneAndUpdate({email:email},{ token : token, resetPasswordExpires : Date.now() + 5*60*1000 }, {new : true})
        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send email containing the url
        await mailSender(email, "Password Reset Link", `Password Reset : ${url}`);

        //return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully please check your inbox"
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occured while sending reset password email"
        })
    }
}

// reset password
exports.resetPassword = async(req, res) => {
    try{
        // data fetch
        const {token,password, confirmPassword} = req.body;
        // valdation
        if(!token || !password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message :"Passwords do not match"
            })
        }

        //get user details
        const userDetails = await User.findOne({token});
        //if no entry
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token invalid"
            })
        }

        // check token expiry time
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired"
            })
        }
        //hash the password
        let hashedpassword = await bcrypt.hash(password,10);

        // update the password
        const updatedDetails = await User.findOneAndUpdate({token:token},{passowrd:hashedpassword}, {new:true});

        // return respone
        return res.status(200).json({
            success:true,
            message:"password reset successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            successs:false,
            messsage:"Error occured while resetting the password"
        })
    }
}