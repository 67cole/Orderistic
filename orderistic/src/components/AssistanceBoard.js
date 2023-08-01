import React, { useState } from "react";
import { returnFoodData } from "../api/MenuApi";
import { Button } from "react-bootstrap";
import "./KitchenOrderCard.css";
import { completeItem, prepareItem } from "../api/OrderApi";
import { Col } from "react-bootstrap";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { removeBill, removeHelp, viewTables } from "../api/TableApi";
import "./TableCard.css";

export default function AssistanceBoard() {
  const [help, setHelp] = useState([]);
  const [bill, setBill] = useState([]);
  React.useEffect(() => {
    const q = query(collection(db, "tables"), where("help", "==", true));
    const assistanceUnsubscribe = onSnapshot(q, (querySnapshot) => {
      const tables = [];
      querySnapshot.forEach((doc) => {
        tables.push(doc.data().number);
      });
      setHelp(tables);
    });
    return () => {assistanceUnsubscribe()};
  }, [])

  React.useEffect(() => {
    const q2 = query(collection(db, "tables"), where("bill", "==", true));
    const billUnsubscribe = onSnapshot(q2, (querySnapshot) => {
      const tableBills = [];
      querySnapshot.forEach((doc) => {
        tableBills.push(doc.data().number);
      });
      setBill(tableBills);
    });
    return () => {billUnsubscribe();}
  })

  async function handleHelp(num) {
    await removeHelp(num);
  }
  async function handleBill(num) {
    await removeBill(num);
  }

  return (
    <div className="console-container">
      {help.map((item) => (
        <div className="button-container">
          <p>Table {item} needs assistance</p>
          <p className="prepared-button" onClick={() => handleHelp(item)}>
            Resolved
          </p>
        </div>
      ))}
      {bill.map((item) => (
        <div className="button-container">
          <p>Table {item} has requested for the bill</p>
          <p className="prepared-button" onClick={() => handleBill(item)}>
            Resolved
          </p>
        </div>
      ))}
    </div>
  );
}
