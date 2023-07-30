import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AddItem, AddItems, ViewMenu, RemoveItem, UpdateItem, returnFoodData, returnSpecificFood } from "../api/MenuApi";
import { returnOrderData, viewOrder, addOrder, removeOrder, completeItem, returnOrderTime } from "../api/OrderApi";
import { addTable, removeTable, viewTables, addToCart, removeFromCart, viewCart, sendOrder, returnOrdersForTable } from "../api/TableApi";
import { addReview, removeReview, returnDishReview, returnUserReview, updateReview } from "../api/ReviewApi";

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

  async function checkOrderTime() {
    returnOrderTime("ZyRCAauYy21E9Sefc8Op");
  }

  async function handleAddReview() {
    addReview({food_id: "D75SzzFfA8Jso9t29DBV",
    rating: 3,
    review: "Delicious",
    user_id: "kNvMvc7OZXWJzdp6ox2jkCve5Nf1",
    date: Date.now()
    });
  }

  async function handleGetReview() {
    const reviewList = await returnDishReview("D75SzzFfA8Jso9t29DBV");
    console.log(reviewList)
  }

  async function handleUserReview() {
    const reviewList = await returnUserReview("kNvMvc7OZXWJzdp6ox2jkCve5Nf1");
    console.log(reviewList)
  }

  async function handleRemoveReview() {
    removeReview("B8nRKqyVurwXep5uLdXi");
  }

  async function handleEditReview() {
    const newData = {food_id: "D75SzzFfA8Jso9t29DBV",
    rating: 1,
    review: "terrible",
    user_id: "kNvMvc7OZXWJzdp6ox2jkCve5Nf1",
    date: Date.now()
    };
    updateReview("nAGdwyTfRk2dtX9kaOVX", newData)
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
          <Button className="btn btn-primary w-100 mt-3" onClick={checkOrderTime}>
            Order Time Check
          </Button>      
          <Button className="btn btn-primary w-100 mt-3" onClick={handleAddReview}>
            Add Review
          </Button>   
          <Button className="btn btn-primary w-100 mt-3" onClick={handleGetReview}>
            Get Review
          </Button>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleUserReview}>
            Get User Review
          </Button> 
          <Button className="btn btn-primary w-100 mt-3" onClick={handleRemoveReview}>
            Remove Review
          </Button> 
          <Button className="btn btn-primary w-100 mt-3" onClick={handleEditReview}>
            Edit Review
          </Button> 
        </Card.Body>
      </Card>
    </>
  );
}
