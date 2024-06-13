const express=require("express");
const app=express();
const mongoose=require("mongoose");
var routes=require("./route/routes");
const cors=require("cors");
const jwt=require("jsonwebtoken")
//const loginModel=require("./src/student/studentModel");
require("dotenv").config();
app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:3000"
    }
));


mongoose.connect("mongodb://localhost:27017/login").then(res=>{console.log("Connected to Mongodb")});

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

app.get('/posts',authenticateToken,(req,res)=>{
    console.log(req.user.firstname);
    console.log(req.user.lastname);
    console.log(req.user.email);
    console.log(req.user.address);
    console.log(req.user.mobile);
    res.json({"firstname":req.user.firstname,"lastname":req.user.lastname,
    "email":req.user.email,"address":req.user.address,"mobile":req.user.mobile});
})

app.put('/update/:id',(req, res) => {
    let data = {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      address:req.body.address,
      mobile:req.body.mobile
    };
    console.log(req.params.id);
    // console.log(req.user._id);
    // if(req.params.id!=req.user._id){
    //     return res.json("User not authorized");
    // }
    loginModel.updateOne({_id: req.params.id}, data ).then(
      () => {
        res.status(201).json({
          message: 'Data updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  

app.get("/users",async(req,res)=>{
  try{
    const allUser=await loginModel.find({});
    res.send({status:"ok",data:allUser})
  }catch(error){
    console.log(error)
  }
})

app.post("/deleteUser",async(req,res)=>{
  const userid=req.body.userid;
  try{
    loginModel.deleteOne({_id:userid}).then(
      ()=>{res.send({status:"ok",data:"Deleted"})
    })
  }
  catch(error){
    console.log(error)
  }
})


app.listen(7000,function check(err)
{
    if(err)
    console.log("error")
    else
    console.log("started")
})


app.use(routes);

module.exports={authenticateToken}

/*
import React from "react";
import { Grid, Paper, Avatar, Typography, TextField, Button } from
"@mui/material";
import * as Yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
import Message from "./Message";
import axios from 'axios';
import {Link} from "react-router-dom"

const initialValues={
email:"",science:"",maths:""
}

const validationSchema= Yup.object({
email:Yup.string()
.required("Required!")
.matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,"Invalid email format"),
science:Yup.string()
.required("Required!"),
maths:Yup.string()
.required("Required!")
})

async function onSubmit(values){
    try{
    await axios.post("http://localhost:7000/marks/create",{
    email:values.email,
    science:values.science,
    maths:values.maths
    }).then((res)=>{
    console.log(res.data)
    const status=res.data.status;
    if(status===true)
    {
    alert("Registered Successfully");
    }
    else{
    alert("Email already exists")
    }
    });
    } catch(err){
    alert(err.message)
    }
    }

const AddMark = () => {
const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto"
}
const headerStyle = { margin: 0 }
const avatarStyle = { backgroundColor: "green" }
const btnstyle = { margin: "8px 0" }
return (
<Grid>
<Paper elevation={20} style={paperStyle}>
<Grid align="center">
<Avatar style={avatarStyle}>
</Avatar>
<h2 style={headerStyle}>Sign Up</h2>
<Typography variant="caption">Please fill this form to
create an account!</Typography>
<br></br><br></br>
</Grid>
<Formik
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={onSubmit}>
<Form>
<Field
as={TextField}
fullWidth
name="email"
label="Email"
placeholder="Enter email"
helperText={<ErrorMessage name="email"
component={Message}/>}
/>
<br></br><br></br>
<Field
as={TextField}
fullWidth
label="Science"
name="science"
placeholder="Enter science mark"
helperText={<ErrorMessage name="science"
component={Message}/>}
/>
<br></br><br></br>
<Field
as={TextField}
fullWidth
name="maths"
label="Maths"
placeholder="Enter maths mark"
helperText={<ErrorMessage name="maths"
component={Message}/>}
/>
<br></br><br></br>


<Button
type="submit"
variant="contained"
color="primary"
fullWidth
style={btnstyle}>Add mark
</Button>
</Form>
</Formik>
<Typography style={{fontSize:"15px"}}>
<Link to="/home" style={{textDecoration:"none"}}>
Back
</Link>
</Typography>
</Paper>
</Grid>
)
}
export default AddMark;
*/