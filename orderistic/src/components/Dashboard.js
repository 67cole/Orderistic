import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SearchBar from "./SearchBar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [searchString, setSearchString] = useState("");

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
  const search = (string) => {
    setSearchString(string);
  }

  return (
    <>
    <IconButton
		size="large"
		edge="start"
		color="inherit"
		aria-label="menu"
		sx={{ mr: 2 }}
		>
		<MenuIcon />
    </IconButton>
    <SearchBar onSearch={search} style={{ flex:"display" }} />
	<Card style={{ flex:"display", marginLeft:"300px", marginRight:"300px"}}>
		<Card.Body>
			<h2 className="text-center mb-4">Dashboard</h2>
			{error && <Alert variant="danger">{error}</Alert>}
			<strong>Email:</strong> {currentUser.email}
			<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
			View Menu
			</Link>
			<Link to="/update-profile" className="btn btn-danger w-100 mt-3">
			Update Profile
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
