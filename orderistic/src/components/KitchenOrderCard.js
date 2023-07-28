import React from "react";
import { returnFoodData } from "../api/MenuApi";
import { Button } from "react-bootstrap";
import "./KitchenOrderCard.css";
import { completeItem, prepareItem } from "../api/OrderApi";

export default function KitchenOrderCard({ order, menu, waiter = false }) {
  // food_ordered
  async function handlePrepared(itemId) {
    await prepareItem(order[1], itemId);
  }
  async function handleDelivered(itemId) {
    await completeItem(order[1], itemId);
  }
  let date = new Date(order[0].time_ordered * 1000);
  console.log(order);

  return (
    <div className="console-container">
      {waiter && order[0].food_prepared.length !== 0 && (
        <b className="title-text">
          Order for Table {order[0].table_number} at {date.toLocaleString()}
        </b>
      )}

      {!waiter && (
        <b className="title-text">
          Order for Table {order[0].table_number} at {date.toLocaleString()}
        </b>
      )}

      {!waiter &&
        order[0].food_ordered.map((item) => (
          <div className="button-container">
            <p>
              {menu[item.id].name} | Quantity: {item.quantity}
            </p>
            <p
              className="prepared-button"
              onClick={() => handlePrepared(item.id)}
            >
              Mark as Prepared
            </p>
          </div>
        ))}
      {waiter &&
        order[0].food_prepared &&
        order[0].food_prepared.map((item) => (
          <div className="button-container">
            <p>
              {menu[item.id].name} | Quantity: {item.quantity}
            </p>
            <p
              className="prepared-button"
              onClick={() => handleDelivered(item.id)}
            >
              Mark as Delivered
            </p>
          </div>
        ))}
    </div>
  );
}
