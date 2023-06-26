import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Menu from "./Menu";
import StaffLogin from "./StaffLogin";
import StaffDashboard from "./StaffDashboard";
import TestApi from "./TestApi";
import Nav from "./Nav";
import PreviousOrder from "./PreviousOrder";
import Cart from "./Cart";

import StaffMenu from "./StaffMenu";
function App() {
  document.body.style.backgroundColor = "#edeff3";
  
  return (
    <Router>
      <><header>
        <nav>
					<Nav />
        </nav>
      </header></>
			<div className="main-container">
				<AuthProvider>
					<Routes>
					<Route
						path="/"
						exact
						element={<PrivateRoute>
						<Dashboard />
						</PrivateRoute>}
					></Route>
					<Route
						path="/staff-dashboard"
						exact
						element={<PrivateRoute>
						<StaffDashboard />
						</PrivateRoute>}
					></Route>
					<Route
						path="/test-api"
						exact
						element={<PrivateRoute>
						<TestApi />
						</PrivateRoute>}
					></Route>
					<Route
						path="/update-profile"
						exact
						element={<PrivateRoute>
						<UpdateProfile />
						</PrivateRoute>}
					></Route>
					<Route
						path="/staff-menu"
						exact
						element={
						<PrivateRoute>
							<StaffMenu />
						</PrivateRoute>
						}
						></Route>
					<Route path="/menu" element={<Menu />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/staff-login" element={<StaffLogin />} />
					<Route path="/previous" element={<PreviousOrder />} />
					<Route path="/cart" element={<Cart />} />
					</Routes>
				</AuthProvider>
      </div>
		</Router>
  );
}

export default App;
