import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MenuNav from "./MenuNav";

function PreviousOrder() {

  return (
    <>
      <MenuNav />
      Previous Orders
    </>
  );
}
export default PreviousOrder;