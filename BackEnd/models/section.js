const mongoose = require('mongoose');

exports.sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSections : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubSection"
        }
    ]
})

module.exports = mongoose.model("Section",sectionSchema);