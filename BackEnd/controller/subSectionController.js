const Section = require('../models/section');
const SubSection = require('../models/subSection');
const { uploadImage } = require('../utils/imageUploader');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.createSubSection = async(req , res ) => {
    try {
        // data fetch and validation
        const {title, timeDuration, description, sectionId} = req.body;
        const file = req.files.videoFile;

        if(!title || !timeDuration || !description || !file){
            return res.status(400).json({
                success:false,
                message : "All fields are required"
            })
        }

        //upload on cloudinary
        const uploadVideo = await uploadImage(file,process.env.FOLDER_PATH);

        //create a sub section
        const newSubSection = await SubSection.create({
            title,
            description,
            timeDuration,
            videoUrl : uploadVideo.secure_url
        });

        //update section with subsection
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {$push : {subSections : newSubSection._id}}, {new : true}).populate(["subSections"]);

        return res.status(200).json({
            success:true,
            message:"Sub section added successfully",
            updatedSection,
        })

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to add sub Section"
        })
    }
}


exports.updateSubSection = async(req , res ) => {
    try {
        // data fetching and validation
        const {subSectioId , title, description, timeDuration} = req.body;
        const file = req.files.videoFile;

        if(!title || !timeDuration || !description || !file){
            return res.status(400).json({
                success:false,
                message : "All fields are required"
            })
        }

        //upload on cloudinary
        const uploadVideo = await uploadImage(file,process.env.FOLDER_PATH);

        //update sub section
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectioId,{
            title,
            description,
            timeDuration,
            videoUrl : uploadVideo.secure_url
        });

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updatedSubSection
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update sub Section"
        })
    }
}

exports.deleteSection = async(req , res ) => {
    try {
        // data fetching and validation
        const {sectionId,subSectioId} = req.body;

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Section Id is not present"
            })
        }

        //update section
        await SubSection.findByIdAndDelete(subSectioId);

        //delete from course schema too


        return res.status(200).json({
            success:true,
            message:"sub Section deleted successfully"
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete sub Section"
        })
    }
}

