import React from "react";
import { Grid, Paper, Avatar, Typography, TextField, Button } from
"@mui/material";
import * as Yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
import Message from "./Message";
import axios from 'axios';
import {Link} from "react-router-dom"

const initialValues={
email:"",science:null,maths:null
}

const validationSchema= Yup.object({
email:Yup.string()
.required("Required!")
.matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,"Invalid email format"),
science:Yup.string()
.max(100,"invalid mark")
.required("Required!")
,
maths:Yup.string()
.max(100,"invalid mark")
.required("Required!")
})

async function onSubmit(values){
    try{
    await axios.post("http://localhost:7000/marks/create",{
    email:values.email,
    science:values.science,
    maths:values.maths
    }).then((res)=>{
    console.log(res.data);
    if(res.data==="Added")
    {
    alert("Marks Added Successfully");
    }
    else if(res.data==="Marks already added"){
    alert("Marks already added!")
    }
    else{
        alert("Invalid Email!")
        }
    });
    } catch(err){
    alert("Invalid Email!")
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

<h2 style={headerStyle}>Add Marks</h2>
<br></br>
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