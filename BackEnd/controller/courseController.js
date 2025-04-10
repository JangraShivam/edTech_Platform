const Course = require('../models/course');
const Tag = require('../models/tag');
const User = require('../models/user');
const uploadImage = require('../utils/imageUploader');
require('dotenv').config();

//create course 
exports.createCourses = async(req , res) => {
    try{
        //fetch data and file
        const {courseName,courseDescription,instructor,whatYouWillLearn,price,tag} = req.body;
        const thumbNail = req.files.thumbNailImage;

        // validate
        if(!courseName || !courseDescription || !instructor || !whatYouWillLearn || !price || !tag){
            return res.status(400).json({
                success : true,
                message:'All fields are required'
            })
        }
        
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor ", instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor Details not found"
            })
        }

        //tags validation
        const tagDetails = await Tag.findById(tag);

        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Tag Details not found"
            })
        }

        //upload image to Cloudinary
        const thumbNailImage = await uploadImage(thumbNail,process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails.id,
            whatYouWillLearn,
            price,
            tag : tagDetails._id,
            thumbNail : thumbNailImage.secure_url,
        })

        // add this course in user(instructor) details
        await User.findByIdAndUpdate({_id : instructorDetails._id}, {$push : {courses : newCourse._id}}, {new: true});

        //update the tag schema
        await Tag.findByIdAndUpdate({_id : tagDetails._id}, {$push : {courses : newCourse._id}}, {new: true});

        //return a response
        return res.staus(200).json({
            success:true,
            message:'Course created successfully'
        })
    }
    catch(error){
        console.log(error);
        return res.staus(200).json({
            success:false,
            message:'Failed to create course',
            error:error.message
        })
    }
}

//get all courses
exports.getAllCourses = async(req , res) => {
    try{
        //fetch all courses
        const allCourses = await Course.find({},{courseName:true,price:true,thumbNail:true,instructor:true,courseDescription:true}).populate("instructor");

        //return a response
        return res.staus(200).json({
            success:true,
            message:'all courses fetched successfully',
            allCourses
        })
    }
    catch(error){
        console.log(error);
        return res.staus(200).json({
            success:false,
            message:'Failed to all courses',
            error:error.message
        })
    }
}