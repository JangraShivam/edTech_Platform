const Course = require('../models/course');
const User = require('../models/profile');
const Profile = require('../models/profile');

//how can we schedule a requst or chrone job
exports.updateProfile = async(req , res) => {
    try {
        //data fetch and validation
        const {gender, dateOfBirth="", about="", contactNo } = req.body;
        const profileImg = req.files.profileImg;
        const userId = req.user.id;
        
        const userDetails = await User.findById(userId);

        const updatedProfile = await Profile.findByIdAndUpdate({_id : userDetails.additionalDetails}, {
            gender,
            contactNo,
            about,
            dateOfBirth
        });

        return res.status(200).json({
            success:true,
            message:"Profile updated Successfully",
            updatedProfile
        })

    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in updating profile"
        })
    }
}

//delete account
exports.deleteAccount = async(req, res) => {
    try {
        //get id
        const userId = req.user.id;
        
        //validation 
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }

        // unenroll students from courses
        //delete user profile
        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});
        //delete user
        await User.findByIdAndDelete({_id : userId});

        return res.status(200).json({
            success:true,
            message:"User deleted Successfully"
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to delete user"
        })
    }
}


exports.getAllUserDetails = async(req,res) =>{
    try {
        const userId = req.user.Id;

        const userDetails = await User.findById(userId).populate("additionalDetails");

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Details fetched Successfully"
        })

    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to fetch user Details"
        })
    }
}