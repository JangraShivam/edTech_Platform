const { uploadImage } = require("../utils/imageUploader");
const User = require('../models/user');
const Profile = require('../models/profile');

//how can we schedule a requst or chrone job
exports.updateProfile = async(req , res) => {
    try {
        //data fetch and validation
        const {gender, dateOfBirth="", about="", contactNo } = req.body;
        const userId = req.user.id;
        
        const userDetails = await User.findById(userId);
        console.log(gender,dateOfBirth,about,contactNo);
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

//get all user details
exports.getAllUserDetails = async(req,res) =>{
    try {
        const userId = req.user.id;
        console.log(userId);
        const userDetails = await User.findById({_id:userId}).populate("additionalDetails").exec();

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Details fetched Successfully",
            data: userDetails,
        })

    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to fetch user Details"
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id

      console.log("Start uploading")
      const image = await uploadImage(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )

      console.log(updatedProfile)
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};