import { useEffect , useState} from 'react';
import axios from "axios"
import { Button,Card } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Mark = () => {
    useEffect(()=>{
        showMark()
     },[])

  const navigate=useNavigate();
  const [mark,setMark] = useState({})

  const logout=()=>{
    localStorage.removeItem("token")
    navigate("/")
  }
  
  const store = localStorage.getItem("token")
  const btnstyle = { margin: "8px 0" }

  const auth = {
    method: "GET",
    headers: { 'Authorization':`Bearer ${store}`}
  }  

  const showMark = async() => {
    await axios.get("http://localhost:7000/marks/read", auth)
  .then(
    res => {
      console.log(res)
      setMark(res.data)
    }
  )
  .catch(
    (e)=>{
      console.log(e)
    }
    
  )
  }


  return (
    <div style={{paddingLeft:"540px",paddingTop:"0px"}}>
    <h2 style={{paddingLeft:"60px"}}>Marks</h2>
        <Card variant="outlined" sx={{width:185,textAlign:"center",backgroundColor:"lightblue"}}>
       
       Science&nbsp;:&nbsp;{mark.science}
       <br></br>
       <br></br>
       &nbsp;Maths&nbsp;:&nbsp;{mark.maths}
       </Card>
       
       <br></br>
       &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;
<Button type="submit" variant="contained" color="primary"
onClick={logout}
style={btnstyle}>Logout
</Button>

      
    </div>
  )
}

export default Mark;