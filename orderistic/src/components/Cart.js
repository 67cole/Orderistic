import React from "react";
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { ListGroup } from "react-bootstrap";
import CartItem from './CartItem';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartContext } from './Menu.js';

function Cart ({ show, closeCart, menu }) {
  const { cart } = React.useContext(CartContext);
  const [total, setTotal] = React.useState(0);
  const changeTotal = (newTotal) => setTotal(newTotal)
  React.useEffect(() => {
    let sum = 0;
    for (let item of cart) {
      sum += parseFloat(item.price * item.quantity);
    }
    setTotal(sum);
  }, [cart])
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
                  <CartItem key={index} info={menu[element.id]} index={index} total={total} changeTotal={changeTotal} />
                ))}
                <Card style={{ border: "0", paddingTop: "10px", paddingBottom: "100px"}}>
                  <Card.Body style={{borderBottom: "1px solid #ededed"}}>
                    <Card.Title>
                      Total
                      <Card.Title style={{ float: "right", fontSize: "30px" }}>
                        ${parseFloat(total).toFixed(2)}
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