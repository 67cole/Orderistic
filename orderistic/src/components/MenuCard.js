import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { addToCart } from "../api/TableApi";
import { useAuth } from "../contexts/AuthContext";
import timeout from "../api/Timeout";
import FoodInfo from "./FoodInfo";

function MenuCard({ element, cart, changeCart }) {
  const { tableNumber } = useAuth();

  const [isLoading, setLoading] = useState(false);

  const [quantity, setQuantity] = React.useState(1);
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

  const loadingStyle = {
    position: "absolute",
    bottom: "15px",
    right: "15px",
  };

  function addQuantity() {
    setQuantity(quantity + 1);
  }
  function subtractQuantity() {
    setQuantity(quantity - 1);
  }
  async function addToOrder() {
    setLoading(true);
    await timeout(500);
    let cartItem = {
      id: element.id,
      quantity: quantity,
      price: element.price,
      order_time: Math.floor(Date.now() / 1000),
      finish_time: 0,
    };
    addToCart(tableNumber, cartItem);
    let tempCart = [...cart];
    let found = false;
    for (let item of tempCart) {
      if (item.id === cartItem.id) {
        found = true;
        item.quantity += cartItem.quantity;
      }
    }
    if (found === false) {
      tempCart.push(cartItem);
    }
    setLoading(false);
    changeCart(tempCart);
  }

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
          <ButtonGroup
            aria-label="Choose quantity of food"
            style={{
              border: "2px solid black",
              borderRadius: "5px",
            }}
          >
            {quantity === 1 ? (
              <Button
                variant="light"
                onClick={subtractQuantity}
                style={{ backgroundColor: "white", boxShadow: "none" }}
                disabled
              >
                -
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={subtractQuantity}
                style={{ backgroundColor: "white", boxShadow: "none" }}
              >
                -
              </Button>
            )}
            <div
              style={{
                margin: "auto",
                paddingLeft: "10px",
                paddingRight: "10px",
                userSelect: "none",
              }}
            >
              {quantity}
            </div>
            <Button
              variant="light"
              onClick={addQuantity}
              style={{ backgroundColor: "white", boxShadow: "none" }}
            >
              +
            </Button>
          </ButtonGroup>
          {isLoading ? (
            <div class="spinner-border" role="status" style={loadingStyle}>
              <span class="sr-only"></span>
            </div>
          ) : (
            <Button
              variant="dark"
              style={{
                position: "absolute",
                bottom: "15px",
                right: "15px",
                boxShadow: "none",
              }}
              onClick={addToOrder}
            >
              Add to order
            </Button>
          )}
        </Card.Body>
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FoodInfo show={show} closeForm={closeFoodInfo} element={element} />
      </div>
    </>
  );
}

export default MenuCard;
