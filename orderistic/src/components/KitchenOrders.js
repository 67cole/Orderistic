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

export default function KitchenOrders() {
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
  //unsubscribe();

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

  return (
    <>
      <StaffNav />
      <Container fluid style={{ display: "flex", justifyContent: "center" }}>
        <div className="big-container">
          <div className="orders-container">
            <h3>Kitchen Console</h3>
            {menu &&
              orders.map((order, index) => (
                <KitchenOrderCard order={order} menu={menu} />
              ))}
          </div>
        </div>
      </Container>
    </>
  );
}
