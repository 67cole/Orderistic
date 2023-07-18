import React, { useState } from "react";
import StaffNav from "./StaffNav";
import { Button, Container, Row } from "react-bootstrap";
import { returnOrderData } from "../api/OrderApi";
import "./StaffOrders.css";
import TableCard from "./TableCard";

export default function StaffOrders() {
  async function handleButton() {
    const res = await returnOrderData();
    console.log(res);
  }

  const [tableAmount, setTableAmount] = useState(10);

  function handleAddTable() {
    setTableAmount(tableAmount + 1);
  }

  function handleRemoveTable() {
    setTableAmount(tableAmount - 1);
  }

  return (
    <>
      <StaffNav />
      <Container fluid style={{ display: "flex", justifyContent: "center" }}>
        <div className="big-container">
          <div className="orders-container">Orders</div>
          <div
            style={{
              alignItems: "center",
              flexDirection: "column",
              display: "flex",
            }}
            className="table-container"
          >
            <Row
              className="g-4"
              style={{ margin: "0px 20px 40px 20px", paddingBottom: "40px" }}
            >
              <TableCard cards={tableAmount} />
            </Row>
            <div className="buttons-container">
              <Button variant="dark" onClick={handleAddTable}>
                Add Table
              </Button>
              <Button variant="dark" onClick={handleRemoveTable}>
                Remove Table
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
