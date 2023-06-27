import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import React from 'react';

function CartItem({ element, index, updateCart, cart }) {
  const [price, setPrice] = React.useState(element.price);
  const imgStyle = {
    width: "200px",
    objectFit: "cover",
    height: "100%"
  }
  const cardStyle = {
    flexDirection: "row",
    height: "210px",
    width: "100%",
    maxHeight: "500px",
    borderTop: "0px",
    borderRight: "0px",
    borderLeft: "0px",
    borderRadius: "0px"
  }
  const quantityStyle = {
    margin: "auto", 
    paddingLeft: "10px", 
    paddingRight: "10px", 
    userSelect: "none", 
  }
  const quantityButton = {
    backgroundColor: "white", 
    border: "0",
    boxShadow: "none"
  }
  // function minusQuantityCheckout() {
  //   subtractQuantity(index);
  //   setPrice(element.price * element.quantity);
  // }
  // function addQuantityCheckout() {
  //   addQuantity(index);
  //   setPrice(element.price * element.quantity);
  // }
  function subtractQuantity(index) {
    let newCart = cart;
    newCart[index].quantity -= 1;
    updateCart(newCart);
  }
  function addQuantity(index) {
    let newCart = cart;
    newCart[index].quantity += 1;
    updateCart(newCart);
  }
  function removeItem(index) {
    let newCart = cart;
    newCart.splice(index, 1);
    updateCart(newCart);
  }
  return (
    <>
      <Card style={cardStyle}>  
        {element.image 
          ? <Card.Img variant="top" src={element.image} style={imgStyle}/>
          : <></>
        }
        <Card.Body style={{position: "relative", width: "500px"}}>
          <Card.Title style={{ display: "inline-block", marginRight: "300px" }}>
            {element.name}
          </Card.Title>
          <Card.Title style={{ float: "right" }}>
            ${parseFloat(price).toFixed(2)}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px", }}>
            {element.description}
          </Card.Text>
          <Card.Text style={{ fontSize: "14px", marginBottom: "5px"}}>
            Quantity:
          </Card.Text>
          <ButtonGroup aria-label="Choose quantity of food" style={{ border: "2px solid black", borderRadius: "5px"}}>
            {element.quantity === 1 
              ? <Button variant="light" onClick={subtractQuantity} style={quantityButton} disabled>-</Button>
              : <Button variant="light" onClick={subtractQuantity} style={quantityButton}>-</Button>
            }
            <div style={quantityStyle}>{element.quantity}</div>
            <Button variant="light" onClick={addQuantity} style={quantityButton}>+</Button>
          </ButtonGroup>
          <Button variant="outline-danger" onClick={removeItem} style={{ position: "absolute", bottom: "15px", right: "15px"}}>Remove</Button> 
        </Card.Body>
      </Card>
    </>
  )
}

export default CartItem;