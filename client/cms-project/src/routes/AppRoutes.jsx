import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import Signin from "../pages/Signin";
import Signup from "../pages/SignUp";
import About from "../pages/About";
import Mainpage from "../pages/Mainpage";


export default function AppRoutes() {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign-in" element={<Signin />} />
        <Route path="/Sign-up" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/Main" element={<Mainpage />} />
    </Routes>
  )
}