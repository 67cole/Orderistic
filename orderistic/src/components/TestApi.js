import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AddItem, AddItems, ViewMenu, RemoveItem, UpdateItem, returnFoodData } from "../api/MenuApi";
import { returnOrderData, viewOrder, addOrder, removeOrder } from "../api/OrderApi"

export default function TestApi() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  async function handleMenu() {
    ViewMenu();
  }

  async function handleFoodData() {
    returnFoodData();
  }

  async function handleAdd() {
    AddItem({name: "Ramen",
    category: "Main",
    price: 14,
    description: "Silky beef broth",
    rating: 5});
  }

  async function handleRemove() {
    // Needs to be replaced with however you are going to retrieve the id
    RemoveItem("WTAqMRJBQyK2tDXJoFqf");
  }

  async function handleUpdate() {
    // Needs to be replaced with however you are going to retrieve the id
    // and information of updated item
    UpdateItem("WTAqMRJBQyK2tDXJoFqf", {name: "Ramen",
    category: "Main",
    price: 14,
    description: "Silky beef broth with Colin Juice",
    rating: 5});
  }

  // Order test functions
  async function handleOrder() {
    viewOrder();
  }

  async function handleOrderData() {
    returnOrderData();
  }

  return (
    <>
      <Card style={{ width: "75vw", maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Firebase Tests</h2>
          <strong>Email:</strong> {currentUser.email}
          <Button className="btn btn-primary w-100 mt-3" onClick={handleMenu}>
            View Menu
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleFoodData}>
            View Food Data
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleAdd}>
            Add Item
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleRemove}>
            Remove Item
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleUpdate}>
            Update Item
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleOrder}>
            View Order
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleOrderData}>
            View Order Data
          </Button>
          <Link to="/staff-dashboard" className="btn btn-danger w-100 mt-3">
            Go Back
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
