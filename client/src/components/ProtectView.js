import jwt_decode from "jwt-decode";
import {Navigate,Outlet} from "react-router-dom";

function ProtectView(){
    const token=localStorage.getItem("token");
    if(token){
  var decoded=jwt_decode(token);
  console.log(decoded.role)
    }
  return token?(decoded.role==="student"?<Outlet/>:<Navigate to="home"/>):
  <Navigate to="/" replace/>
}

export default ProtectView;