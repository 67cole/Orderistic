import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MenuNav from "./MenuNav";
import { returnOrdersForTable } from "../api/TableApi";

function PreviousOrder() {
  const { tableNumber } = useAuth();

  console.log(tableNumber);
  returnOrdersForTable(tableNumber).then((data) => console.log(data));

  return (
    <>
      <MenuNav />
      Previous Orders
    </>
  );
}
export default PreviousOrder;
