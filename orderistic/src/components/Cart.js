import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { ListGroup } from "react-bootstrap";
import CartItem from "./CartItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";
import { sendOrder } from "../api/TableApi";
import timeout from "../api/Timeout";
import { useNavigate } from "react-router-dom";

function Cart({ show, closeCart, cart, changeCart, menu }) {
  const [total, setTotal] = React.useState(0);
  const changeTotal = (newTotal) => setTotal(newTotal);
  const { tableNumber } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cart !== undefined) {
      let sum = 0;
      for (let item of cart) {
        sum += parseFloat(item.price * item.quantity);
      }
      setTotal(sum);
    }
  }, [cart]);
  const checkoutButtonStyle = {
    backgroundColor: "black",
    paddingLeft: "250px",
    paddingRight: "250px",
    position: "fixed",
    bottom: "20px",
    fontWeight: "600",
    borderRadius: "6px",
  };
  const loadingStyle = {
    position: "fixed",
    bottom: "20px",
  };

  async function handleCheckout() {
    setLoading(true);
    await timeout(500);
    sendOrder(tableNumber);
    changeCart();
    setLoading(false);
    navigate("/order-complete");
  }

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={closeCart}>
        <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
          <CloseButton
            style={{ float: "left", marginLeft: "0" }}
            onClick={closeCart}
          />
          <Modal.Title style={{ margin: "auto" }}>Cart</Modal.Title>
          <div
            style={{
              width: "16px",
              height: "16px",
              padding: "8px 8px 8px 8px",
              margin: "8px 8px 8px 0px",
            }}
          ></div>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {cart === undefined || cart.length === 0 ? (
            "Your cart is empty!"
          ) : (
            <ListGroup>
              {cart.map((element, index) => (
                <CartItem
                  key={index}
                  info={menu[element.id]}
                  cart={cart}
                  changeCart={changeCart}
                  index={index}
                  total={total}
                  changeTotal={changeTotal}
                />
              ))}
              <Card
                style={{
                  border: "0",
                  paddingTop: "10px",
                  paddingBottom: "100px",
                }}
              >
                <Card.Body style={{ borderBottom: "1px solid #ededed" }}>
                  <Card.Title>
                    Total
                    <Card.Title style={{ float: "right", fontSize: "30px" }}>
                      ${parseFloat(total).toFixed(2)}
                    </Card.Title>
                  </Card.Title>
                </Card.Body>
              </Card>
            </ListGroup>
          )}

          {!loading ? (
            <Button
              variant="secondary"
              size="lg"
              style={checkoutButtonStyle}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          ) : (
            <div class="spinner-border" role="status" style={loadingStyle}>
              <span class="sr-only"></span>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Cart;
