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
import StaffLogin from "./StaffLogin";
import StaffDashboard from "./StaffDashboard";
import TestApi from "./TestApi";
import Nav from "./Nav";
import PreviousOrder from "./PreviousOrder";

function App() {
  document.body.style.backgroundColor = "#edeff3";

  return (
    <Router>
      <><header>
        <nav>
          <Nav />
        </nav>
      </header></>
      <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
      >
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/previous" element={<PreviousOrder />} />
        </Routes>
      </AuthProvider>
      </div>
      </Container>
      </Router>
  );
}

export default App;
