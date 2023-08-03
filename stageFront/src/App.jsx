import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <Login/>}/>
      <Route path="/register" element={ <Register/>}/>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
