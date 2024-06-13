import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from
"@mui/material";
import jwt_decode from "jwt-decode";
//import LockIcon from "@mui/icons-material/Lock"
import * as Yup from "yup";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {Formik,Form,Field,ErrorMessage} from "formik";

import Message from "./Message";
const initialValues = {
email: "", password: ""
}
const validationSchema = Yup.object({
email: Yup.string()
.required("Required!")
.matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,"Invalid email format")
,
password: Yup.string()
.required("Required!")
})
const Login = () => {
const navigate = useNavigate();

async function onSubmit(values) {
try {
await axios
.post("http://localhost:7000/user/login", {
email: values.email,
password: values.password
})
.then(
(res) => {
console.log(res);
const data = res.data;
if (data.data) {
    alert("Login Successfully");
    localStorage.setItem("token", data.data);
    var decoded=jwt_decode(data.data);
    if(decoded.role==="staff")
    {
        navigate("/home")
    }
    else if(decoded.role==="student")
    {
        navigate("/view")
    }
} else {
    alert("Invalid Email/Password")
}
},
(fail) => {
console.error(fail);
}
);
} catch (err) {
alert(err);
}
}

const paperStyle = { padding: 20, height: "70vh", width: 260, margin:
"65px auto",justifyContent:"center" }
const avatarStyle = { backgroundColor: "green" }
const btnstyle = { margin: "8px 0" }
return (
<Grid>
<Paper elevation={10} style={paperStyle}>
<Grid align="center">
<Avatar style={avatarStyle}>

</Avatar>
<h2>Sign in</h2>
</Grid>
<Formik
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={onSubmit}
>
<Form>
<Field
as={TextField}
label="Email"
name="email"
placeholder="Enter email"
helperText={<ErrorMessage name="email" component={Message}/>}
fullWidth></Field>
<br></br><br></br>
<Field
as={TextField}
label="Password"
name="password"
placeholder="Enter password"
type="password"
helperText={<ErrorMessage name="password" component={Message}
/>}
fullWidth></Field>
<br></br><br></br>
<Button type="submit" variant="contained" color="primary"
fullWidth
style={btnstyle}>Sign in
</Button>
</Form>
</Formik>

</Paper>
</Grid>
)
}
export default Login;