const mongoose = require('mongoose');

exports.courseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    completedVideos : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : "SubSection"
        }
    ]
})

module.exports = mongoose.model("CourseProgress",courseProgressSchema);