import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StaffNav from "./StaffNav";

export default function StaffDashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (errorName) {
      setError("Failed to log out");
      console.log(errorName);
    }
  }

  return (
    <>
      <StaffNav />
      <Card style={{ flex:"display", marginLeft:"300px", marginRight:"300px"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Staff Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/staff-menu" className="btn btn-primary w-100 mt-3">
            Update Menu
          </Link>
          <Link to="/update-profile" className="btn btn-success w-100 mt-3">
            View Tables
          </Link>
          <Link to="/test-api" className="btn btn-danger w-100 mt-3">
            Test Firebase
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
