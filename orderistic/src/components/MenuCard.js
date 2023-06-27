import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { addToCart } from '../api/TableApi';

function MenuCard({ element, cart, changeCart }) {
  const [quantity, setQuantity] = React.useState(1);
  const imgStyle = {
    width: "210px",
    objectFit: "cover",
    height: "100%"
  }
  const cardStyle = {
    flexDirection: "row",
    height: "210px",
    width: "100%",
    maxHeight: "500px",
  }
  function addQuantity() {
    setQuantity(quantity + 1);
  }
  function subtractQuantity() {
    setQuantity(quantity - 1);
  }
  function addToOrder() {
    let cartItem = {
      id: element.id,
      quantity: quantity,
      price: element.price
    };
    addToCart(1, cartItem);
    let tempCart = [...cart];
    tempCart.push(cartItem);
    changeCart(tempCart);
  }
  return (  
    <>
      <Card style={cardStyle}>  
        {element.image 
          ? <Card.Img variant="top" src={element.image} style={imgStyle}/>
          : <></>
        }
        <Card.Body style={{position: "relative"}}>
          <Card.Title>
            {element.name}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px"}}>
            {element.description}
          </Card.Text>
          <Card.Text style={{ position: "absolute", bottom: "5px" }}>
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
    </>
  )
}

export default MenuCard;