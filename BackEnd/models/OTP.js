const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

exports.OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required:true,
        trim : true,
    },
    value : {
        type : String,
        required : true,
    },
    created_at:{
        type : Date,
        default : Date.now(),
        expires : 5*60,
    }
})


// function that sends email
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = mailSender(email,"Verification Email from StudyNotion", emailTemplate(otp));
        console.log("Email sent successfully", mailResponse);
    }
    catch(error){
        console.log("Error occured while sending verification Email");
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})

module.exports = mongoose.model("OTP",OTPSchema);