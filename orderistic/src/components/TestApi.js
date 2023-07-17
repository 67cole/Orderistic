import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AddItem, AddItems, ViewMenu, RemoveItem, UpdateItem, returnFoodData, returnSpecificFood } from "../api/MenuApi";
import { returnOrderData, viewOrder, addOrder, removeOrder, completeItem } from "../api/OrderApi";
import { addTable, removeTable, viewTables, addToCart, removeFromCart, viewCart, sendOrder, returnOrdersForTable } from "../api/TableApi";

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

  async function handleSpecificFood() {
    returnSpecificFood("D75SzzFfA8Jso9t29DBV");
  }

  async function handleAdd() {
    AddItem({name: "Ramen",
    category: "Main",
    price: 14,
    description: "Silky beef broth",
    rating: 5,
    time: []});
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
    rating: 5,
    time: []});
  }

  // Order test functions
  async function handleOrder() {
    viewOrder();
  }

  async function handleOrderData() {
    returnOrderData();
  }

  async function handleAddTable() {
    addTable();
  }

  async function handleRemoveTable() {
    removeTable();
  }

  async function handleViewTables() {
    viewTables();
  }

  async function handleAddToCart() {
    addToCart(1, "AqB8ijUpU1bvR7Dl3n5x");
  }

  async function handleRemoveFromCart() {
    removeFromCart(1, "WTAqMRJBQyK2tDXJoFqf");
  }

  async function handleViewCart() {
    viewCart(1);
  }

  async function handleSendOrder() {
    sendOrder(1);
  }

  async function handleCompleteItem() {
    // parameters are orderID, itemID
    completeItem("twYk1Wtom47wszEwhYJb","AqB8ijUpU1bvR7Dl3n5x");
  }

  async function checkTableOrders() {
    returnOrdersForTable(5);
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
          <Button className="btn btn-primary w-100 mt-3" onClick={handleSpecificFood}>
            Return Specific Food
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
          <Button className="btn btn-primary w-100 mt-3" onClick={handleAddTable}>
            Add Table
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleRemoveTable}>
            Remove Table
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleViewTables}>
            View Tables
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleRemoveFromCart}>
            Remove from Cart
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleViewCart}>
            View Cart
          </Button>
          <Link to="/staff-dashboard" className="btn btn-danger w-100 mt-3">
            Go Back
          </Link>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleSendOrder}>
            Send Order
          </Button>          
          <Button className="btn btn-primary w-100 mt-3" onClick={handleCompleteItem}>
            Complete Item
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={checkTableOrders}>
            Table Order
          </Button>     
        </Card.Body>
      </Card>
    </>
  );
}
