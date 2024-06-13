import jwt_decode from "jwt-decode";
import {Navigate,Outlet} from "react-router-dom";

function ProtectCreate(){
  const token=localStorage.getItem("token");
  if(token){
var decoded=jwt_decode(token);
console.log(decoded.role)
  }
return token?(decoded.role==="staff"?<Outlet/>:<Navigate to="view"/>):
<Navigate to="/" replace/>
}

export default ProtectCreate;
//https://www.johnkral.com/
/*

https://www.site123.com/website-examples?msclkid=79c692bf1a4216e6d173f6919e418a1c&utm_source=bing&utm_medium=cpc&utm_campaign=India%20%23lan%3Aen%23&utm_term=design%20a%20website&utm_content=global-website-builder&utm_source=bing&utm_medium=cpc&utm_campaign=398045798&utm_adgroupID=1232552742196759&keywordID=kwd-77034763473149:loc-1674&network=o&adID=77034717716848&msclkid=79c692bf1a4216e6d173f6919e418a1c&utm_term=design%20a%20website&utm_content=global-website-builder
*/