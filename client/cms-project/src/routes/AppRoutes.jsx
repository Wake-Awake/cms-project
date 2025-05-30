import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Signin from "../pages/Signin";


export default function AppRoutes() {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign-up" element={<SignUp/>}/>
        <Route path="/Sign-in" element={<Signin />} />
    </Routes>
  )
}