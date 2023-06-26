import React from "react";
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { ListGroup } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

function Cart ({ show, closeCart, cart, updateCart }) {
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
    borderRight: "0px",
    borderLeft: "0px",
    borderRadius: "0px"
  }
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={closeCart}>
        <Modal.Header style={{ display: "flex", justifyContent: "center"}}>
          <CloseButton style={{float: "left", marginLeft: "0"}} onClick={closeCart}/>
          <Modal.Title style={{margin: "auto"}}>Cart</Modal.Title>
          <div style={{ width: "16px", height: "16px", padding: "8px 8px 8px 8px", margin: "8px 8px 8px 0px"}}></div>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center"}}>      
          {!cart 
            ? "Your cart is empty!"
            : <ListGroup>
                {cart.map((element, index) => (
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
                        ${parseFloat(element.price).toFixed(2)}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "14px", }}>
                        {element.description}
                      </Card.Text>
                      <Card.Text style={{ fontSize: "14px", }}>
                        Quantity: {element.quantity}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                //   <ListGroup.Item key={index}>
                    
                //     {element.image 
                //       ? <Image variant="top" src={element.image} style={imgStyle}/>
                //       : <></>
                //     }
                //     <Modal.Title>{element.name}</Modal.Title>
                //   </ListGroup.Item>
                ))}
              </ListGroup>
          } 
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Cart;