const Section = require('../models/section');
const Course = require('../models/course');

exports.createSection = async(req , res ) => { 
    try {
        // data fetch and validation
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message : "All fields required"
            })
        }

        //create section
        const newSection = await Section.create({sectionName});

        //update course with section objectid
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {$push : {courseContent : newSection._id}}, {new : true});

        return res.status(200).json({
            success:true,
            message:"section added successfully",
            updatedCourse,
        })

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to add Section"
        })
    }
}


exports.updateSection = async(req , res ) => {
    try {
        // data fetching and validation
        const {sectionId , sectionName} = req.body;

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Section Id is not present"
            })
        }

        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new : true});

        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update Section"
        })
    }
}

exports.deleteSection = async(req , res ) => {
    try {
        // data fetching and validation
        const {sectionId,courseId} = req.body;

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Section Id is not present"
            })
        }

        //update section
        await Section.findByIdAndDelete(sectionId);

        //delete from course too
        const course = await Course.findByIdAndUpdate({_id:courseId}, {$pull : {courseContent : sectionId}})

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update Section"
        })
    }
}

