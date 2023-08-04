import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  AddItem,
  RemoveItem,
  UpdateItem,
  returnFoodData,
  returnSpecificFood,
} from "../api/MenuApi";
import {
  returnOrderData,
  completeItem,
  returnOrderTime,
} from "../api/OrderApi";
import {
  addTable,
  removeTable,
  viewTables,
  addToCart,
  removeFromCart,
  viewCart,
  sendOrder,
  returnOrdersForTable,
} from "../api/TableApi";
import {
  addReview,
  removeReview,
  returnDishReview,
  returnUserReview,
  updateReview,
} from "../api/ReviewApi";

// Testing backend functions through our frontend.
// Page consists of buttons that call our api, with results obtained in console

export default function TestApi() {
  const { currentUser } = useAuth();

  async function handleFoodData() {
    const res = await returnFoodData();
    console.log(res);
  }

  async function handleSpecificFood() {
    const res = await returnSpecificFood("D75SzzFfA8Jso9t29DBV");
    console.log(res);
  }

  async function handleAdd() {
    const res = await AddItem({
      name: "Ramen",
      category: "Main",
      price: 14,
      description: "Silky beef broth",
      rating: 5,
      time: [],
    });

    console.log(res);
  }

  async function handleRemove() {
    // Needs to be replaced with however you are going to retrieve the id
    const res = await RemoveItem("WTAqMRJBQyK2tDXJoFqf");
    console.log(res);
  }

  async function handleUpdate() {
    // Needs to be replaced with however you are going to retrieve the id
    // and information of updated item
    const res = await UpdateItem("WTAqMRJBQyK2tDXJoFqf", {
      name: "Ramen",
      category: "Main",
      price: 14,
      description: "Silky beef broth with Colin Juice",
      rating: 5,
      time: [],
    });
    console.log(res);
  }

  async function handleOrderData() {
    const res = await returnOrderData();
    console.log(res);
  }

  async function handleAddTable() {
    const res = await addTable();
    console.log(res);
  }

  async function handleRemoveTable() {
    const res = await removeTable();
    console.log(res);
  }

  async function handleViewTables() {
    const res = await viewTables();
    console.log(res);
  }

  async function handleAddToCart() {
    const res = await addToCart(1, "AqB8ijUpU1bvR7Dl3n5x");
    console.log(res);
  }

  async function handleRemoveFromCart() {
    const res = await removeFromCart(1, "WTAqMRJBQyK2tDXJoFqf");
    console.log(res);
  }

  async function handleViewCart() {
    const res = await viewCart(1);
    console.log(res);
  }

  async function handleSendOrder() {
    const res = await sendOrder(1);
    console.log(res);
  }

  async function handleCompleteItem() {
    // parameters are orderID, itemID
    const res = await completeItem(
      "twYk1Wtom47wszEwhYJb",
      "AqB8ijUpU1bvR7Dl3n5x"
    );
    console.log(res);
  }

  async function checkTableOrders() {
    const res = await returnOrdersForTable(5);
    console.log(res);
  }

  async function checkOrderTime() {
    const res = await returnOrderTime("ZyRCAauYy21E9Sefc8Op");
    console.log(res);
  }

  async function handleAddReview() {
    const res = await addReview({
      food_id: "D75SzzFfA8Jso9t29DBV",
      rating: 3,
      review: "Delicious",
      user_id: "kNvMvc7OZXWJzdp6ox2jkCve5Nf1",
      date: Date.now(),
    });
    console.log(res);
  }

  async function handleGetReview() {
    const reviewList = await returnDishReview("D75SzzFfA8Jso9t29DBV");
    console.log(reviewList);
  }

  async function handleUserReview() {
    const reviewList = await returnUserReview("kNvMvc7OZXWJzdp6ox2jkCve5Nf1");
    console.log(reviewList);
  }

  async function handleRemoveReview() {
    removeReview("B8nRKqyVurwXep5uLdXi");
  }

  async function handleEditReview() {
    const newData = {
      food_id: "D75SzzFfA8Jso9t29DBV",
      rating: 1,
      review: "terrible",
      user_id: "kNvMvc7OZXWJzdp6ox2jkCve5Nf1",
      date: Date.now(),
    };
    updateReview("nAGdwyTfRk2dtX9kaOVX", newData);
  }

  return (
    <>
      <Card style={{ width: "75vw", maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Firebase Tests</h2>
          <strong>Email:</strong> {currentUser.email}
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleFoodData}
          >
            View Food Data
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleSpecificFood}
          >
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
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleOrderData}
          >
            View Order Data
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleAddTable}
          >
            Add Table
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleRemoveTable}
          >
            Remove Table
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleViewTables}
          >
            View Tables
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleViewCart}
          >
            View Cart
          </Button>
          <Link to="/staff-menu" className="btn btn-danger w-100 mt-3">
            Go Back
          </Link>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleSendOrder}
          >
            Send Order
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleCompleteItem}
          >
            Complete Item
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={checkTableOrders}
          >
            Table Order
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={checkOrderTime}
          >
            Order Time Check
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleAddReview}
          >
            Add Review
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleGetReview}
          >
            Get Review
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleUserReview}
          >
            Get User Review
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleRemoveReview}
          >
            Remove Review
          </Button>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={handleEditReview}
          >
            Edit Review
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
