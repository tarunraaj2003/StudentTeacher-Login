const mongoose=require("mongoose");

const markSchema=mongoose.Schema({
    semail:{
        type:String,
        required:true,
        ref:"users",
    },
    science:{
        type:Number,
        required:true
    },
    maths:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("marks",markSchema);