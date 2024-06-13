import { Button } from
"@mui/material";
import { useNavigate } from "react-router-dom";
//import {useNavigate} from "react"

function Home(){
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem("token")
        navigate("/")
      }
    
      const markClick=()=>{
        navigate("/mark")
      }

    const click=()=>{
        navigate("/reg")
    }
   // const navigate=useNavigate();
    const btnstyle = { margin: "8px 0" ,width:"200px"}
    const logstyle = { margin: "8px 0" ,width:"100px"}
    return (
        <div style={{
          textAlign:"center"
        }}>
            <Button type="submit" variant="contained" color="primary"
style={btnstyle}
onClick={click}
>Add Student
</Button>
<br></br>

<Button type="submit" variant="contained" color="primary"
onClick={markClick}
style={btnstyle}>Add Marks
</Button>
<br></br>

<br></br>
<Button type="submit" variant="contained" color="secondary"
onClick={logout}
size="small"
style={logstyle}>Logout
</Button>

        </div>
    )
}

export default Home;