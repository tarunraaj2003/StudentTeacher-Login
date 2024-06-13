var mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
var Schema=mongoose.Schema;
require("dotenv").config();
var userSchema=new Schema({
    name:{
        type:String,
        required:[true," Name is required"]
    },
    
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:Number,
        required:[true,"Password is required"]
    },
    role:{
        type:String,
        required:[true," Role is required"]
    }
    
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,name:this.name
    ,email:this.email,role:this.role
    },process.env.ACCESS_TOKEN,{expiresIn:"2d"})
    return token
 };

 

module.exports=mongoose.model("users",userSchema)