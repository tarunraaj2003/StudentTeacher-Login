import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react"
import Home from "./components/Home";
import Login from "./components/Login";
import Create from "./components/Create";
import ProtectCreate from "./components/ProtectCreate";
import AddMark from "./components/AddMark";
import ProtectView from "./components/ProtectView";
import Mark from "./components/ViewMark";

function App() {
  return (
    <div>
      <>
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectCreate/>}>
          <Route path="/home" element={<Home/> }/>
        </Route>
  
        <Route path="/" element={ <Login/> }/>

        <Route element={<ProtectCreate/>}>
          <Route path="/reg" element={<Create/>}/>
        </Route>
        
        <Route element={<ProtectCreate/>}>
        <Route path="/mark" element={<AddMark/>}/>
      </Route>

      <Route element={<ProtectView/>}>
        <Route path="/view" element={<Mark/>}/>
      </Route>

      </Routes>

      </BrowserRouter>
      </>
    </div>
  );
}

export default App;
