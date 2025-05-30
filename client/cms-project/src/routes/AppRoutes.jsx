import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import Signin from "../pages/Signin";
import Signup from "../pages/SignUp";


export default function AppRoutes() {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign-in" element={<Signin />} />
        <Route path="/Sign-up" element={<Signup />} />
    </Routes>
  )
}