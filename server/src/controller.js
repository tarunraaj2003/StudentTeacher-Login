var userService=require("./service");
var userModel=require("./schema");
const jwt=require("jsonwebtoken");

var createUserControllerFn=async(req,res)=>{
    try{
        console.log(req.body);
        var status=await userService.createUserDBService(req.body);
        console.log(status);
        

        if(status==true){
            res.send({"status":true,"message":"user created successfully"});
        } else{
            res.send({"status":false,"message":"Error creating user"});
       }
    }
    catch(err){
        console.log(err);
        res.send({"status":false,"message":"Error creating user"});
    }
}


var loginUserControllerFn=async(req,res)=>{
    var result=null;
    try{
        result=await userService.loginUserDBService(req.body);
        if(result){
            res.send({"data":result.data,"message":result.msg});
        } else{
            res.send({"message":result.msg});
        }
    } catch(error){
        console.log(error);
        res.send({"message":error.msg});
    }
}

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token =authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);


    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.sendStatus(403);
        }
        req.user=user;
        next();
    })
}

module.exports={createUserControllerFn,loginUserControllerFn,authenticateToken};