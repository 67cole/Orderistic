import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function StaffNav({ showForm }) {
  const [error, setError] = React.useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/staff-login");
    } catch (errorName) {
      setError("Failed to log out");
      console.log(errorName);
    }
  }
  return (
    <Navbar bg="light" data-bs-theme="dark" className="sticky-top nav-bar">
      <Container>
        <Navbar.Brand as={Link} to="/staff-dashboard">
          Orderistic
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/staff-dashboard">
            Home
          </Nav.Link>
        </Nav>
        <Button className="btn" variant="light" onClick={showForm} style={{ backgroundColor: "white", border: "0", boxShadow: "none" }}>Add Item</Button>
        <Button variant="light" onClick={handleLogout} style={{ backgroundColor: "white", border: "0", boxShadow: "none" }}>
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
}

export default StaffNav;
