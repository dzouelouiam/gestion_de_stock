import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import ForgetPass from "./forgetPass";
import Home from "./home";
import Entree from "./entree";
import Profile from "./profile";
import { UserAuth } from "./middlewares/userAuth";
import SortiePage from "./sortiePage";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <Login/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/forgetPassword" element={ <ForgetPass/>}/>
      
      <Route path="/" element={<UserAuth />} >
        <Route index element={<Home />} />
        <Route path="/entree" element={ <Entree/>}/>
        <Route path="/profile" element={ <Profile/>}/>
        <Route path="/sortie" element={ <SortiePage/>}/>
        
        

      </Route>

    </Routes>
     
    </BrowserRouter>
  )
}

export default App
