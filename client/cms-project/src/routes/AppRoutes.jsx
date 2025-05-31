import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoute from './PrivateRoute';
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import About from "../pages/About";
import Mainpage from "../pages/Mainpage";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import NotFound from "../pages/Notfound";
import BasicLayouts from "../layouts/BasicLayouts";


export default function AppRoutes() {
  return (
    <Routes>
     		<Route path="/" element={<BasicLayouts />}>
				<Route index element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/Signin" element={<Signin />} />
				<Route path="/Signup" element={<Signup />} />
			</Route>
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
