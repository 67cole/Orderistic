import React, { useEffect, useState } from "react";
import StaffNav from "./StaffNav";
import { Button, Container } from "react-bootstrap";
import "./StaffOrders.css";
import { addTable, removeTable, viewTables } from "../api/TableApi";
import KitchenOrderCard from "./KitchenOrderCard";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { returnFoodData } from "../api/MenuApi";
import AssistanceBoard from "./AssistanceBoard";
import OrderSkeleton from "./OrderSkeleton";

export default function StaffOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableAmount, setTableAmount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = React.useState();

  React.useEffect(() => {
    const docRef = collection(db, "orders");
    const q = query(docRef, orderBy("time_ordered", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const qOrders = [];
      querySnapshot.forEach((doc) => {
        qOrders.push([doc.data(), doc.id]);
      });
      setOrders(qOrders);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    viewTables().then((data) => {
      setTableAmount(data.length);
      setIsLoading(false);
    });
    returnFoodData().then((menuData) => {
      setMenu(menuData);
    });
  }, []);

  async function handleAddTable() {
    await addTable();
    setTableAmount(tableAmount + 1);
  }

  async function handleRemoveTable() {
    await removeTable();
    setTableAmount(tableAmount - 1);
  }

  const date = new Date();

  return (
    <>
      <StaffNav />
      <Container fluid style={{ display: "flex", justifyContent: "center" }}>
        <div className="big-container">
          <div className="orders-container" style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "30px" }}>Waitery Console</h3>
            {isLoading && <OrderSkeleton cards={5} />}
            {menu &&
              orders.map((order, index) => (
                <KitchenOrderCard order={order} menu={menu} waiter={true} />
              ))}
          </div>
          <div
            style={{
              alignItems: "center",
              flexDirection: "column",
              display: "flex",
              marginTop: "30px",
            }}
            className="table-container"
          >
            <h3 style={{ marginBottom: "30px" }}>Admin Console</h3>
            <div className="stats-container">
              <b>{date.toJSON().slice(0, 10)}</b>
              <p> Total Sales: $69</p>
              <p>Number of Tables: {tableAmount}</p>
            </div>
            <div className="buttons-container">
              <Button variant="dark" onClick={handleAddTable}>
                Add Table
              </Button>
              <Button variant="dark" onClick={handleRemoveTable}>
                Remove Table
              </Button>
            </div>
            <div className="orders-container" style={{ marginTop: "30px" }}>
              <h3>Assistance Tracker</h3>
              <AssistanceBoard />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
