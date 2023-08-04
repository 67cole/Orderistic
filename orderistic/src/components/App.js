import React from "react";
import Signup from "./authentication/Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import Menu from "./menu/Menu";
import StaffLogin from "./authentication/StaffLogin";
import TestApi from "./TestApi";
import Orders from "./orders/Orders";
import Cart from "./cart/Cart";

import StaffMenu from "./menu/StaffMenu";
import StaffSignup from "./authentication/StaffSignup";
import StaffOrders from "./workflow-console/StaffOrders";
import KitchenOrders from "./workflow-console/KitchenOrders";
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
              path="/test-api"
              exact
              element={
                <PrivateRoute>
                  <TestApi />
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
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
