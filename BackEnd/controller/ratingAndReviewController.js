const RatingAndReview = require('../models/ratingAndReview');
const Course = require('../models/course');
const { default: mongoose } = require('mongoose');

exports.createRatingAndReview = async(req , res) => {
    try{
       //get data
       const userId = req.user.id;
       const { rating , review, courseId} = req.body;

       //validate data
       if(!userId || !rating || !review || !courseId){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
       }

       //check if user is enrolled or not
       const courseDetails = await Course.findOne({_id:courseId , studentEnrolled :{$elemMatch: {$eq: userId}}});

       if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled"
            })
       }

       // have user already reviewed
       const alreadyReviewed = await RatingAndReview.findOne({user : userId, course : courseId});

       if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"Course is already reviewed"
        })
       }

       // create rating
       const ratingAndReview = await RatingAndReview.create({
        rating,
        review,
        user:userId,
        course:courseId
       })

        // update course with this rating
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId}, {$push : {ratingAndReviews : ratingAndReview._id}}, {new : true});
        console.log(updatedCourseDetails);  
       //return response
        return res.status(200).json({
            success:true,
            message:"Rating and review created Successfully",
            ratingAndReview
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.getAverageRating = async(req,res) => {
    try {
        //get courseId
        const {courseId} = req.body;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : courseId,
                }
            },
            {
                $group : {
                    _id:null,
                    averageRating : {$avg : "$rating"},
                }
            }
        ])
        //return ratng
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating : result[0]
            })
        }

        // no rating reviews exist
        return res.status(200).json({
            success:true,
            message : "Avg rating is 0,no ratings have be given",
            averageRating : 0
        })
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get all ratings and reviews
exports.getAllRating = async(req, res) => {
    try{
        const allRatings = await RatingAndReview.find({}).sort({rating : "desc"}).populate({ path : "user", select : "firstName lastName email"}).populate({path : "course" , select : "courseName"}).exec()
        
        return res.status(200).json({
            success:true,
            message : "All ratings fetched Successfully",
            data : allRatings
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}