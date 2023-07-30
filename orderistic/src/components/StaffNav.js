import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function StaffNav() {
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
    }
  }
  return (
<<<<<<< HEAD
    <Navbar variant="dark" style={{boxShadow: "1px 0px 5px 1px rgba(0, 0, 0, 0.05)", backgroundColor: "black"}} className="sticky-top nav-bar">
=======
    <Navbar
      data-bs-theme="light"
      style={{
        boxShadow: "1px 0px 5px 1px rgba(0, 0, 0, 0.05)",
        backgroundColor: "black",
      }}
      className="sticky-top nav-bar"
    >
>>>>>>> main
      <Container>
        <Navbar.Brand
          as={Link}
          to="/staff-menu"
          style={{ color: "white", fontSize: "24px", fontWeight: "500" }}
        >
          Orderistic
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/staff-menu" style={{ color: "White" }}>
            Menu
          </Nav.Link>
          <Nav.Link as={Link} to="/staff-orders" style={{ color: "White" }}>
            Waitery
          </Nav.Link>
          <Nav.Link as={Link} to="/kitchen-orders" style={{ color: "White" }}>
            Kitchen
          </Nav.Link>
        </Nav>
        <Button
          variant="dark"
          onClick={handleLogout}
          style={{ backgroundColor: "black", border: "0", boxShadow: "none" }}
        >
          Log out
        </Button>
      </Container>
    </Navbar>
  );
}

export default StaffNav;
