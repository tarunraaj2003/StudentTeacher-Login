import React from "react";
import { Grid, Paper, Avatar, Typography, TextField, Button } from
"@mui/material";
import * as Yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
import Message from "./Message";
import axios from 'axios';
import {Link} from "react-router-dom"

const initialValues={
name:"",email:"",password:"",role:"student"
}
const validationSchema= Yup.object({
name:Yup.string()
.required("Required!")
.matches(/^[aA-zZ\s]+$/,"Only alphabets are allowed"),
email:Yup.string()
.required("Required!")
.matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,"Invalid email format"),
password:Yup.string()
.required("Required!")
.matches(/^\d+$/,"Only digits are allowed")
})
async function onSubmit(values){
try{
await axios.post("http://localhost:7000/user/create",{
name:values.name,
email:values.email,
password:values.password,
role:values.role
}).then((res)=>{
console.log(res.data)
const status=res.data.status;
if(status===true)
{
alert("Student Added Successfully");
}
else{
alert("Email already exists")
}
});
} catch(err){
alert(err.message)
}
}
const Signup = () => {
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
<h2 style={headerStyle}>Add Student</h2>
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
name="name"
label="Name"
placeholder="Enter name"
helperText={<ErrorMessage name="name"
component={Message}/>}
/>
<br></br><br></br>
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
type="password"
label="Password"
name="password"
placeholder="Enter password"
helperText={<ErrorMessage name="password"
component={Message}/>}
/>
<br></br><br></br>
<Field
as={TextField}
fullWidth
label="Role"
name="role"
defaultValue="student"
InputProps={{
    readOnly:true,
}}
variant="filled"
helperText={<ErrorMessage name="role"
component={Message}/>}
/>

<Button
type="submit"
variant="contained"
color="primary"
fullWidth
style={btnstyle}>Sign Up
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
export default Signup;