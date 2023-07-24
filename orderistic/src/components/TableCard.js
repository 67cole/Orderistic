import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { removeHelp } from "../api/TableApi";
import "./TableCard.css";

export default function TableCard({ cards }) {
  const q = query(collection(db, "tables"), where("help", "==", true));

  const [help, setHelp] = useState([]);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tables = [];
    querySnapshot.forEach((doc) => {
      tables.push(doc.data().number);
    });
    setHelp(tables);
    console.log("Current tables that need help", tables.join(" "));
  });

  //   LEAVE UNSUBSCRIBE ON TO SAVE FIREBASE USAGE
  // COMMENT IT OUT WHEN DEMONSTRATING!!!!
  unsubscribe();

  async function handleHelp(num) {
    await removeHelp(num);
  }

  function activeBulb(num) {
    return "active" ? help.includes(num) : "";
  }

  return Array(cards)
    .fill()
    .map((item, i) => (
      <Col key={i} style={{ display: "flex" }}>
        <div className={`table-card ${activeBulb(i + 1)}`} key={i}>
          <h3>Table {i + 1}</h3>
          {help.includes(i + 1) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-lightbulb"
              viewBox="0 0 16 16"
              onClick={() => handleHelp(i + 1)}
              color="yellow"
              cursor="pointer"
            >
              <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
            </svg>
          )}
        </div>
      </Col>
    ));
}
