import React, { useEffect, useState } from "react";
import StaffNav from "./StaffNav";
import { Button, Container, Row } from "react-bootstrap";
import { orderedFoodByTime, returnOrderData } from "../api/OrderApi";
import "./StaffOrders.css";
import TableCard from "./TableCard";
import { addTable, removeTable, viewTables } from "../api/TableApi";
import TableSkeleton from "./TableSkeleton";
import timeout from "../api/Timeout";
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

export default function StaffOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableAmount, setTableAmount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = React.useState();

  const docRef = collection(db, "orders");
  const q = query(docRef, orderBy("time_ordered", "desc"), limit(10));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const qOrders = [];
    querySnapshot.forEach((doc) => {
      qOrders.push([doc.data(), doc.id]);
    });
    setOrders(qOrders);
  });

  //   LEAVE UNSUBSCRIBE ON TO SAVE FIREBASE USAGE
  // COMMENT IT OUT WHEN DEMONSTRATING!!!!
  // unsubscribe();

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
          <div className="orders-container">
            <h3>Waitery Console</h3>
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
            }}
            className="table-container"
          >
            {/* <Row
              className="g-4"
              style={{ margin: "0px 20px 40px 20px", paddingBottom: "40px" }}
            >
              {isLoading && <TableSkeleton cards={tableAmount} />}
              <TableCard cards={tableAmount} />
            </Row> */}
            <h3>Admin Console</h3>
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
            <div className="orders-container">
              <h3>Assistance Tracker</h3>
              <AssistanceBoard />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
