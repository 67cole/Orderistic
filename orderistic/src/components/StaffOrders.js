import React, { useEffect, useState } from "react";
import StaffNav from "./StaffNav";
import { Button, Container, Row } from "react-bootstrap";
import { returnOrderData } from "../api/OrderApi";
import "./StaffOrders.css";
import TableCard from "./TableCard";
import { addTable, removeTable, viewTables } from "../api/TableApi";
import TableSkeleton from "./TableSkeleton";
import timeout from "../api/Timeout";

export default function StaffOrders() {
  async function handleButton() {
    const res = await returnOrderData();
  }
  const [isLoading, setIsLoading] = useState(true);
  const [tableAmount, setTableAmount] = useState(0);

  useEffect(() => {
    viewTables().then((data) => {
      setTableAmount(data.length);
      setIsLoading(false);
    });
  });

  async function handleAddTable() {
    await addTable();
    setTableAmount(tableAmount + 1);
  }

  async function handleRemoveTable() {
    await removeTable();
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
              {isLoading && <TableSkeleton cards={tableAmount} />}
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
