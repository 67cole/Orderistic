import React from "react";
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { ListGroup } from "react-bootstrap";
import CartItem from './CartItem';
import Card from 'react-bootstrap/Card';
import { viewCart } from "../api/TableApi";
import { returnFoodData } from "../api/MenuApi";
import Button from 'react-bootstrap/Button';

function Cart ({ show, closeCart }) {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [cart, setCart] = React.useState([]);
  const [menu, setMenu] = React.useState({});
  // GET CART FROM DATABASE AND CALCULATE TOTAL PRICE
  React.useEffect(() => {
    viewCart(1)
      .then((data) => {
        setCart(data);
        let sum = 0;
        for (let item of data) {
          sum += item.price;
        }
        setTotalPrice(sum)
        
      });
    returnFoodData()
      .then((data) => {
        setMenu(data);
      })
  }, [])
  const checkoutButtonStyle = {
    backgroundColor: "black", 
    paddingLeft: "250px", 
    paddingRight: "250px", 
    position: "fixed", 
    bottom: "20px",
    fontWeight: "600",
    borderRadius: "6px"
  }
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={closeCart}>
        <Modal.Header style={{ display: "flex", justifyContent: "center"}}>
          <CloseButton style={{float: "left", marginLeft: "0"}} onClick={closeCart}/>
          <Modal.Title style={{margin: "auto"}}>Cart</Modal.Title>
          <div style={{ width: "16px", height: "16px", padding: "8px 8px 8px 8px", margin: "8px 8px 8px 0px"}}></div>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>      
          {cart.length === 0 
            ? "Your cart is empty!"
            : <ListGroup>
                {cart.map((element, index) => (
                  <CartItem key={index} element={element}/>
                ))}
                <Card style={{ border: "0", paddingTop: "10px"}}>
                  <Card.Body>
                    <Card.Title>
                      Total
                      <Card.Title style={{ float: "right", fontSize: "30px" }}>
                        ${parseFloat(totalPrice).toFixed(2)}
                      </Card.Title>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </ListGroup>
          } 
          <Button variant="secondary" size="lg" style={checkoutButtonStyle} >
            Checkout
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Cart;