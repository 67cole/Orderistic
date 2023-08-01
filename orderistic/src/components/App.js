import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Menu from "./Menu";
import StaffLogin from "./StaffLogin";
import StaffDashboard from "./StaffDashboard";
import TestApi from "./TestApi";
import Orders from "./Orders";
import Cart from "./Cart";

import StaffMenu from "./StaffMenu";
import StaffSignup from "./StaffSignup";
import OrderComplete from "./OrderComplete";
import StaffTables from "./StaffTables";
import StaffOrders from "./StaffOrders";
import KitchenOrders from "./KitchenOrders";
function App() {
  document.body.style.backgroundColor = "#edeff3";

  return (
    <Router>
      <div className="main-container">
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <PrivateRoute>
                  <Menu />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/staff-dashboard"
              exact
              element={
                <PrivateRoute>
                  <StaffDashboard />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/test-api"
              exact
              element={
                <PrivateRoute>
                  <TestApi />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/update-profile"
              exact
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
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
            <Route
              path="/staff-tables"
              exact
              element={
                <PrivateRoute>
                  <StaffTables />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/staff-orders"
              exact
              element={
                <PrivateRoute>
                  <StaffOrders />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/kitchen-orders"
              exact
              element={
                <PrivateRoute>
                  <KitchenOrders />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/menu" element={<Menu />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/staff-signup" element={<StaffSignup />} />
            <Route path="/order-complete" element={<OrderComplete />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
