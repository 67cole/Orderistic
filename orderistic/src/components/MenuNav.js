// React import
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../firebase";
// import route navigation function
import { Link, useNavigate } from "react-router-dom";

function MenuNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (
    <div className="sticky-top">
      <Navbar bg="light" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/menu">
            Orderistic
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu">
              Home
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/previous">
                  Previous Orders
                </Nav.Link>
                <Nav.Link>Request Assistance</Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
              </>
            ) : (
              <>
                {" "}
                <Nav.Link>Request Assistance</Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default MenuNav;
