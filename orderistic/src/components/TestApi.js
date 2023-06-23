import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AddItem, AddItems, ViewItems } from "../api/MenuApi";

export default function TestApi() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  async function handleView() {
    ViewItems();
  }

  async function handleAdd() {
    AddItem("jonathan@gmail.com");
  }

  return (
    <>
      <Card style={{ width: "75vw", maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Firebase Tests</h2>
          <strong>Email:</strong> {currentUser.email}
          <Button className="btn btn-primary w-100 mt-3" onClick={handleView}>
            View Item
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleAdd}>
            Add Item
          </Button>
          <Link to="/staff-dashboard" className="btn btn-danger w-100 mt-3">
            Go Back
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
