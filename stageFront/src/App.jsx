import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import ForgetPass from "./forgetPass";
import Home from "./home";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <Login/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/forgetPassword" element={ <ForgetPass/>}/>
      <Route path="/home" element={ <Home/>}/>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
