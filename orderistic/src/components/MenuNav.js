// React import
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../firebase";
// import route navigation function
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import { Snackbar } from "@mui/material";

function MenuNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const { logout, tableNumber, chooseTable } = useAuth();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  function handleTable() {
    chooseTable(0);
  }

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
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={`Assistance requested for table ${tableNumber}`}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
      />
      <Navbar
        style={{
          boxShadow: "1px 0px 5px 1px rgba(0, 0, 0, 0.05)",
          backgroundColor: "black",
        }}
        className="sticky-top nav-bar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/menu" style={{ color: "white", fontSize: "24px", fontWeight: "500" }}>
            Orderistic
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu">
              Home
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/previous">
                Previous Orders
              </Nav.Link>
            )}
            <Nav.Link onClick={() => setOpen(true)}>
              Request Assistance
            </Nav.Link>
            <Nav.Link onClick={handleTable} to="/menu">
              Table Number: {tableNumber}
            </Nav.Link>
          </Nav>
          <Button
            variant="dark"
            onClick={handleLogout}
            style={{ backgroundColor: "black", border: "0", boxShadow: "none" }}
          >
            Log Out
          </Button>
        </Container>
      </Navbar>
    </>
  );
}
export default MenuNav;
