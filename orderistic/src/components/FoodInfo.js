import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { addToCart } from '../api/TableApi';
import { CartContext } from './Menu.js';
import Checkbox from "./Checkbox";
import QuantityOption from "./QuantityOption";
import "./Modal.css"

function FoodInfo({ show, closeForm, element }) {
  // Style for the menu cards
  const imgStyle = {
    width: "500px",
    objectFit: "cover",
    height: "100%"
  }
  const cardStyle = {
    flexDirection: "row",
    height: "500px",
    width: "100%",
    border: "0"
  }
  const subheadingStyle = {
    fontSize: "13px", 
    color: "grey"
  }
  const { cart, setCart } = React.useContext(CartContext);
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(element.price);


  function addQuantity() {
    setPrice(parseFloat(price) + parseFloat(element.price));
    setQuantity(quantity + 1);
  }
  function subtractQuantity() {
    setPrice(parseFloat(price) - parseFloat(element.price));
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

  return (
    <> 
    <Modal show={show} onHide={closeForm} dialogClassName="modal-size" centered style={{ flexDirection: "row" }} >
      <Card style={cardStyle}>  
        {element.image 
          ? <Card.Img variant="top" src={element.image} style={imgStyle} className="img-fluid" />
          : <></>
        }
        <Card.Body style={{ position: "relative" }}>
          <CloseButton style={{float: "right", margin: "10px"}} onClick={closeForm}/>
          <Card.Title style={{ fontSize: "26px", marginBottom: "0px" }}>
            {element.name}
          </Card.Title>
          <Card.Text style={{marginBottom: "4px", fontWeight: "500"}}>
            ${parseFloat(element.price).toFixed(2)}
          </Card.Text>
          <Card.Text style={{ fontSize: "14px", borderBottom: "2px solid #dfdfdf", paddingBottom: "15px" }}>
            {element.description}
          </Card.Text>
          <div style={{ overflowY: "auto", height: "55%" }}>
            {element.customisations.map((customisation, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <div style={{ fontWeight: "500", fontSize: "18px" }}>
                  {customisation.name} {customisation.required ? "(Required)" : <></>} 
                </div>
                <div>
                  {customisation.select === "upTo"
                    ? <>
                        <div style={subheadingStyle}>
                          Choose up to {customisation.optionNum} {customisation.optionNum === 1 ? <>item</> : <>items</>}
                        </div>
                        <Checkbox key={index} customisation={customisation} maxOptionNum={customisation.optionNum}/>
                      </>

                    : (customisation.optionNum === 1)
                        ? <>
                            <div style={subheadingStyle}>
                              Choose 1 item
                            </div>
                            <div>
                              {customisation.options.map((element, index) => (
                                <div key={index} style={{borderBottom: "1px solid #dfdfdf"}}>
                                  <label htmlFor={element} name={customisation.name} style={{ width:"93%", paddingBottom: "10px", paddingTop: "10px", paddingLeft: "5px" }}>{element}</label>
                                  <input type="radio" id={element} name={customisation.name} style={{ accentColor: "black", verticalAlign: "middle", width: "17px", height: "17px"}}/>
                                </div>
                              ))}
                            </div>
                          </>
                        : <>
                            <div style={subheadingStyle}>
                              Choose {customisation.optionNum} items
                            </div>
                            <QuantityOption customisation={customisation} maxOptionNum={customisation.optionNum}/>
                          </>
                  }
                </div>
              </div> 
            ))}
          </div>

          <Card.Text style={{ position: "absolute", bottom: "7px", right: "150px"}}>
            Total - ${parseFloat(price).toFixed(2)}
          </Card.Text>
          <ButtonGroup aria-label="Choose quantity of food" style={{ border: "2px solid black", borderRadius: "5px", position: "absolute", bottom: "15px",  }}>
            {quantity === 1 
              ? <Button variant="light" onClick={subtractQuantity} style={{ backgroundColor: "white", boxShadow: "none" }} disabled>-</Button>
              : <Button variant="light" onClick={subtractQuantity} style={{ backgroundColor: "white", boxShadow: "none"}}>-</Button>
            }
            <div style={{ margin: "auto", paddingLeft: "10px", paddingRight: "10px", userSelect: "none" }}>{quantity}</div>
            <Button variant="light" onClick={addQuantity} style={{ backgroundColor: "white", boxShadow: "none"}}>+</Button>
          </ButtonGroup>
          <Button variant="dark" style={{ position: "absolute", bottom: "15px", right: "15px", boxShadow: "none", paddingTop: "8px", paddingBottom: "8px"}} onClick={addToOrder}>Add to order</Button> 
        </Card.Body>
      </Card>
    </Modal>
    </>
        
  )
}

export default FoodInfo;