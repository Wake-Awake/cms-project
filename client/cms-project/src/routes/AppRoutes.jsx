import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoute from './PrivateRoute';
import Signin from "../pages/Signin";
import Signup from "../pages/SignUp";
import About from "../pages/About";
import Mainpage from "../pages/Mainpage";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import NotFound from "../pages/Notfound";


export default function AppRoutes() {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign-in" element={<Signin />} />
        <Route path="/Sign-up" element={<Signup />} />
        <Route path="/About" element={<About />} />
     			<Route
				path="/Mainpage"
				element={
          <PrivateRoute>
						<Mainpage />
					</PrivateRoute>
				}
			/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}