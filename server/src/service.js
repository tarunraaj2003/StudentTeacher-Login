var userModel=require("./schema");


module.exports.createUserDBService=async (userDetails)=>{
    return new Promise(async function myFn(resolve,reject){
        var userModelData=new userModel();

        userModelData.name=userDetails.name;
        

        var check=await userModel.findOne({email:userDetails.email});
        if(!check)
        {
        userModelData.email=userDetails.email;
        }
        userModelData.password=userDetails.password;
        userModelData.role=userDetails.role;
        

        userModelData.save().then(res=>{
            if(res){resolve(true)}
        })
        .catch(err=>{if(err){reject(false)}});
    });
}

module.exports.loginUserDBService=(userDetails)=>{   
    return new Promise(function myFn(resolve,reject){
        userModel.findOne({email:userDetails.email}).then(res=>{
            if(res!=null)
            {
                
                if(res.password==userDetails.password)
                {
                    const token = res.generateAuthToken();
                    resolve({data:token,msg:"user validated successfully"})
                }
                else{
                    reject({msg:"Invalid Email or password"})
                }
            }
            else{
                reject({msg:"Invalid Email or password"})
            }
        }) 
})
}