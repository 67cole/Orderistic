import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { addToCart } from '../api/TableApi';
import { CartContext } from './Menu.js';

function FoodInfo({ show, closeForm, element }) {
  const { cart, setCart } = React.useContext(CartContext);
  const [quantity, setQuantity] = React.useState(1);
  function addQuantity() {
    setQuantity(quantity + 1);
  }
  function subtractQuantity() {
    setQuantity(quantity - 1);
  }
  // Adding the food to the cart
  function addToOrder() {
    let cartItem = {
      id: element.id,
      quantity: quantity,
      price: element.price
    };
    addToCart(1, cartItem);
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
    setCart(tempCart);
  }
  // Style for the menu cards
  const imgStyle = {
    width: "400px",
    objectFit: "cover",
    height: "100%"
  }
  const cardStyle = {
    flexDirection: "row",
    height: "400px",
    width: "100%",
    border: "0"
  }
  return (
    <> 
    <Modal show={show} onHide={closeForm} centered style={{ flexDirection: "row" }} size="lg" >
      <Card style={cardStyle}>  
        {element.image 
          ? <Card.Img variant="top" src={element.image} style={imgStyle} className="img-fluid" />
          : <></>
        }
        <Card.Body style={{position: "relative"}}>
          <CloseButton style={{float: "right", margin: "10px"}} onClick={closeForm}/>
          <Card.Title>
            {element.name}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px"}}>
            {element.description}
          </Card.Text>
          <Card.Text>
            ${parseFloat(element.price).toFixed(2)}
          </Card.Text>
          <ButtonGroup aria-label="Choose quantity of food" style={{ border: "2px solid black", borderRadius: "5px"}}>
            {quantity === 1 
              ? <Button variant="light" onClick={subtractQuantity} style={{ backgroundColor: "white", boxShadow: "none" }} disabled>-</Button>
              : <Button variant="light" onClick={subtractQuantity} style={{ backgroundColor: "white", boxShadow: "none"}}>-</Button>
            }
            <div style={{ margin: "auto", paddingLeft: "10px", paddingRight: "10px", userSelect: "none" }}>{quantity}</div>
            <Button variant="light" onClick={addQuantity} style={{ backgroundColor: "white", boxShadow: "none"}}>+</Button>
          </ButtonGroup>
          <Button variant="dark" style={{ position: "absolute", bottom: "15px", right: "15px", boxShadow: "none"}} onClick={addToOrder}>Add to order</Button> 
        </Card.Body>
      </Card>
    </Modal>
    </>
        
  )
}

export default FoodInfo;