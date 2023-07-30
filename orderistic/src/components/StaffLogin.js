import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";
import { validStaff } from "../api/AuthApi";
import logo from "../assets/logo.png";

export default function StaffLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if ((await validStaff(emailRef.current.value)) === false) {
      return setError("Not a valid staff member");
    }
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/staff-menu");
    } catch (error2) {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="main-container">
        <img className="logo" src={logo} alt="Logo" />
        <Card
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "600px",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Staff Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label className="mt-1">Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/staff-signup">Staff Sign Up</Link>
        </div>
        <div className="w-100 text-center mt-2">
          <Link to="/login">Customer Login</Link>
        </div>
      </div>
    </>
  );
}
