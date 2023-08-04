import React, { useEffect, useState } from "react";
import StaffNav from "../menu/StaffNav";
import { Container } from "react-bootstrap";
import "./StaffOrders.css";
import KitchenOrderCard from "./KitchenOrderCard";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { returnFoodData } from "../../api/MenuApi";
import OrderSkeleton from "./OrderSkeleton";

export default function KitchenOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = React.useState();

  useEffect(() => {
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
    returnFoodData().then((menuData) => {
      setMenu(menuData);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <StaffNav />
      <Container fluid style={{ display: "flex", justifyContent: "center" }}>
        <div className="big-container">
          <div className="orders-container" style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "30px" }}>Kitchen Console</h3>
            {isLoading && <OrderSkeleton cards={5} />}
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
