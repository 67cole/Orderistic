import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import React from "react";
import { addToCart, removeFromCart } from "../../api/TableApi";
import { CartContext } from "../menu/Menu.js";
import { useAuth } from "../../contexts/AuthContext";
// Displays each individual cart item in the cart
function CartItem({ info, index }) {
  const { tableNumber } = useAuth();
  const { cart, setCart } = React.useContext(CartContext);
  const [price, setPrice] = React.useState(
    cart[index].price * cart[index].quantity
  );
  const [quantity, setQuantity] = React.useState(cart[index].quantity);

  const imgStyle = {
    width: "200px",
    objectFit: "cover",
    height: "100%",
  };
  const cardStyle = {
    flexDirection: "row",
    height: "210px",
    width: "100%",
    borderTop: "0px",
    borderRight: "0px",
    borderLeft: "0px",
    borderRadius: "0px",
  };
  const quantityStyle = {
    margin: "auto",
    paddingLeft: "10px",
    paddingRight: "10px",
    userSelect: "none",
  };
  const quantityButton = {
    backgroundColor: "white",
    border: "0",
    boxShadow: "none",
  };
  // Subtracts the quantity of an item and updates the price and cart
  function subtractQuantity() {
    setPrice(info.price * (quantity - 1));
    setQuantity(quantity - 1);
    let tempItem = { ...cart[index] };
    tempItem.quantity = 1;
    removeFromCart(tableNumber, tempItem);

    let tempCart = [...cart];
    tempCart[index].quantity -= 1;
    setCart(tempCart);
  }
  // Adds the quantity of an item and updates the price and cart
  function addQuantity() {
    setPrice(info.price * (quantity + 1));
    setQuantity(quantity + 1);
    let tempItem = { ...cart[index] };
    tempItem.quantity = 1;
    addToCart(tableNumber, tempItem);

    let tempCart = [...cart];
    tempCart[index].quantity += 1;
    setCart(tempCart);
  }
  // Removes an item from the cart
  function removeItem() {
    removeFromCart(tableNumber, cart[index]);
    let tempCart = [...cart];
    tempCart.splice(index, 1);
    setCart(tempCart);
  }
  return (
    <>
      <Card style={cardStyle}>
        {info.image ? (
          <Card.Img variant="top" src={info.image} style={imgStyle} />
        ) : (
          <></>
        )}
        <Card.Body style={{ position: "relative", width: "500px" }}>
          <Card.Title style={{ display: "inline-block", marginRight: "300px" }}>
            {info.name}
          </Card.Title>
          <Card.Title style={{ float: "right" }}>
            ${parseFloat(price).toFixed(2)}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px", marginBottom: "0" }}>
            {info.description}
          </Card.Text>
          <div
            style={{ fontSize: "12px", color: "grey", marginBottom: "16px" }}
          >
            {cart[index].customisations.map((element, index) => {
              if (index === 0) {
                return (
                  <span key={index} style={{ fontSize: "12px" }}>
                    {element.option}
                  </span>
                );
              } else {
                return (
                  <span key={index} style={{ fontSize: "12px" }}>
                    , {element.option}
                  </span>
                );
              }
            })}
          </div>
          <Card.Text style={{ fontSize: "14px", marginBottom: "5px" }}>
            Quantity:
          </Card.Text>
          <ButtonGroup
            aria-label="Choose quantity of food"
            style={{ border: "2px solid black", borderRadius: "5px" }}
          >
            {quantity === 1 ? (
              <Button
                variant="light"
                onClick={subtractQuantity}
                style={quantityButton}
                disabled
              >
                -
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={subtractQuantity}
                style={quantityButton}
              >
                -
              </Button>
            )}
            <div style={quantityStyle}>{quantity}</div>
            <Button
              variant="light"
              onClick={addQuantity}
              style={quantityButton}
            >
              +
            </Button>
          </ButtonGroup>
          <Button
            variant="outline-danger"
            onClick={removeItem}
            style={{ position: "absolute", bottom: "15px", right: "15px" }}
          >
            Remove
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CartItem;
