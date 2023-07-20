import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { addToCart } from "../api/TableApi";
import { CartContext } from "./Menu.js";
import Checkbox from "./Checkbox";
import QuantityOption from "./QuantityOption";
import "./Modal.css";
import { useAuth } from "../contexts/AuthContext";
import timeout from "../api/Timeout";

function FoodInfo({ show, closeForm, element }) {
  const { tableNumber } = useAuth();

  const [loading, setLoading] = useState(false);
  // Style for the menu cards
  const imgStyle = {
    maxWidth: "50%",
    objectFit: "cover",
    height: "auto",
    width: "auto"
  };
  const cardStyle = {
    flexDirection: "row",
    height: "500px",
    width: "100%",
    border: "0",
  };
  const subheadingStyle = {
    fontSize: "13px",
    color: "grey",
  };
  const { cart, setCart } = React.useContext(CartContext);
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(element.price);
  const [customisationList, setCustomisationList] = React.useState({
    checkbox: [],
    quantity: [],
  });
  const [oneItem, setOneItem] = React.useState("");

  function handleCustomisationList(newList) {
    setCustomisationList(newList);
  }
  function addQuantity() {
    setPrice(parseFloat(price) + parseFloat(element.price));
    setQuantity(quantity + 1);
  }
  function subtractQuantity() {
    setPrice(parseFloat(price) - parseFloat(element.price));
    setQuantity(quantity - 1);
  }
  // Adding the food to the cart
  async function addToOrder() {
    setLoading(true);
    await timeout(250);
    let finalList = [
      ...customisationList.checkbox,
      ...customisationList.quantity,
      oneItem,
    ];
    let cartItem = {
      id: element.id,
      quantity: quantity,
      price: element.price,
      customisations: finalList,
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
    setCart(tempCart);
    closeForm();
  }
  function setItem(element) {
    setOneItem(element);
  }

  const loadingStyle = {
    position: "absolute",
    bottom: "15px",
    right: "15px",
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeForm}
        dialogClassName="modal-size"
        centered
        style={{ flexDirection: "row" }}
      >
        <Card style={cardStyle}>
          {element.image ? (
            <Card.Img
              variant="top"
              src={element.image}
              style={imgStyle}
            />
          ) : (
            <></>
          )}
          <Card.Body style={{ position: "relative", padding: "0" }}>
            <CloseButton
              style={{ float: "right", margin: "40px 40px" }}
              onClick={closeForm}
            />
            <div style={{ padding: "30px 30px 10px 30px"}}>
            <Card.Title style={{ fontSize: "26px", marginBottom: "0px" }}>
              {element.name}
            </Card.Title>
            <Card.Text style={{ marginBottom: "4px", fontWeight: "500" }}>
              ${parseFloat(element.price).toFixed(2)}
            </Card.Text>
            <Card.Text
              style={{
                fontSize: "14px",
                borderBottom: "2px solid #dfdfdf",
                paddingBottom: "15px",
              }}
            >
              {element.description}
            </Card.Text>
            </div>
            <div style={{ overflowY: "auto", height: "55%", paddingLeft: "30px", paddingRight: "15px" }}>
              {element.customisations.map((customisation, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <div style={{ fontWeight: "500", fontSize: "17px" }}>
                    {customisation.name}{" "}
                    {customisation.required ? "(Required)" : <></>}
                  </div>
                  <div>
                    {customisation.select === "upTo" ? (
                      <>
                        <div style={subheadingStyle}>
                          Choose up to {customisation.optionNum}{" "}
                          {customisation.optionNum === 1 ? (
                            <>item</>
                          ) : (
                            <>items</>
                          )}
                        </div>
                        <Checkbox
                          key={index}
                          customisation={customisation}
                          maxOptionNum={customisation.optionNum}
                          list={customisationList}
                          setList={handleCustomisationList}
                        />
                      </>
                    ) : customisation.optionNum === 1 ? (
                      <>
                        <div style={subheadingStyle}>Choose 1 item</div>
                        <div>
                          {customisation.options.map((element, index) => (
                            <div
                              key={index}
                              style={{ borderBottom: "1px solid #dfdfdf" }}
                            >
                              <label
                                htmlFor={element}
                                name={customisation.name}
                                style={{
                                  width: "93%",
                                  paddingBottom: "10px",
                                  paddingTop: "10px",
                                  paddingLeft: "1px",
                                  fontSize: "14px",
                                }}
                              >
                                {element}
                              </label>
                              <input
                                type="radio"
                                id={element}
                                name={customisation.name}
                                onChange={() => setItem(element)}
                                style={{
                                  accentColor: "black",
                                  verticalAlign: "middle",
                                  width: "17px",
                                  height: "17px",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={subheadingStyle}>
                          Choose {customisation.optionNum} items
                        </div>
                        <QuantityOption
                          customisation={customisation}
                          maxOptionNum={customisation.optionNum}
                          list={customisationList}
                          setList={handleCustomisationList}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Card.Text
              style={{ position: "absolute", bottom: "7px", right: "160px" }}
            >
              Total: ${parseFloat(price).toFixed(2)}
            </Card.Text>
            <ButtonGroup
              aria-label="Choose quantity of food"
              style={{
                border: "2px solid black",
                borderRadius: "5px",
                position: "absolute",
                bottom: "15px",
                left: "30px"
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
            {loading ? (
              <div className="spinner-border" role="status" style={loadingStyle}>
                <span className="sr-only"></span>
              </div>
            ) : (
              <Button
                variant="dark"
                style={{
                  position: "absolute",
                  bottom: "15px",
                  right: "20px",
                  boxShadow: "none",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
                onClick={addToOrder}
              >
                Add to order
              </Button>
            )}
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}

export default FoodInfo;
