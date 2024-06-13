const marks=require("./markSchema");
const user=require("./schema");
const jwt=require("jsonwebtoken")


const setMark=async(req,res)=>{
    if(!req.body.science || !req.body.maths || !req.body.email){
        res.status(400);
        throw new Error("Please add the marks");
    }

    const existEmail=await user.findOne({email:req.body.email})
    const studentEmail=await marks.findOne({semail:req.body.email})
    if(existEmail){
        if(existEmail.role=="student"){
            if(!studentEmail){
    const mark=await marks.create({
        semail:req.body.email,
        science:req.body.science,
        maths:req.body.maths
    })
    return res.json("Added")
}else{
    return res.json("Marks already added")
}
}else{
    res.json("Not a student");
}
}
else{
    res.status(400).json("not exist");
}
}

const getMark=async(req,res)=>{
    const mark=await marks.findOne({semail:req.user.email});
    res.status(200).json(mark);
}


module.exports={setMark,getMark}