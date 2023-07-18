import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import timeout from "../api/Timeout";
import FoodInfo from "./FoodInfo";

function MenuCard({ element }) {
  // Style for the menu cards
  const imgStyle = {
    width: "210px",
    objectFit: "cover",
    height: "100%",
  };
  const cardStyle = {
    flexDirection: "row",
    height: "210px",
    width: "583px",
    maxHeight: "500px",
  };

  // For showing the food information modal
  const [show, setShow] = React.useState(false);

  const closeFoodInfo = () => setShow(false);
  const openFoodInfo = () => setShow(true);

  return (
    <>
      <Card onClick={openFoodInfo} style={cardStyle}>
        {element.image ? (
          <Card.Img
            variant="top"
            src={element.image}
            style={imgStyle}
            className="img-fluid"
          />
        ) : (
          <></>
        )}
        <Card.Body style={{ position: "relative" }}>
          <Card.Title style={{}}>{element.name}</Card.Title>
          <Card.Text style={{ fontSize: "14px" }}>
            {element.description}
          </Card.Text>
          <Card.Text
            style={{ position: "absolute", bottom: "10px", fontSize: "16px" }}
          >
            ${parseFloat(element.price).toFixed(2)}
          </Card.Text>
        </Card.Body>
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FoodInfo show={show} closeForm={closeFoodInfo} element={element} />
      </div>
    </>
  );
}

export default MenuCard;
