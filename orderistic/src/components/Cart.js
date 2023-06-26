import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Cart () {

  return (
    <>
      <h2 className="text-center mb-4">Cart</h2>
      <div className="text-center">Your cart is empty!</div>
    </>
  );
}
export default Cart;