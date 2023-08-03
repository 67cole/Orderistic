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
import Styles from "./Modal.module.css";
import { useAuth } from "../contexts/AuthContext";
import timeout from "../api/Timeout";
import RadioOption from "./RadioOption";
import { generateID } from "./helper";
// Component for showing the food information for an individual dish
function FoodInfo({ show, closeForm, element }) {
  const { tableNumber } = useAuth();

  const [loading, setLoading] = useState(false);
  // Style for the menu cards
  const imgStyle = {
    maxWidth: "50%",
    objectFit: "cover",
    height: "auto",
    width: "50%"
  };
  const cardStyle = {
    flexDirection: "row",
    height: "500px",
    width: "100%",
    border: "0",
  };

  const { cart, setCart } = React.useContext(CartContext);
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(element.price);
  const [checkboxList, setCheckboxList] = React.useState([]);
  const [quantityList, setQuantityList] = React.useState([]);
  const [radioList, setRadioList] = React.useState([]);
  const [required, setRequired] = React.useState([]);
  const [custList, setCustList] = React.useState([]);
  // Initialise required list to handle customisations that are required
  React.useEffect(() => {
    let tempRequired = [];
    for (let i = 0; i < element.customisations.length; i++) {
      tempRequired.push(true);
    }
    setRequired(tempRequired);
  }, [element])

  function handleCustList(newList) {
    setCustList(newList);
  }
  function handleCheckboxList(newList) {
    setCheckboxList(newList)
  }
  function handleQuantityList(newList) {
    setQuantityList(newList)
  }
  function handleRadioList(newList) {
    setRadioList(newList);
  }
  // Adds quantity and adjusts total price
  function addQuantity() {
    setPrice(parseFloat(price) + parseFloat(element.price));
    setQuantity(quantity + 1);
  }
  // Subtracts quantity and adjusts total price
  function subtractQuantity() {
    setPrice(parseFloat(price) - parseFloat(element.price));
    setQuantity(quantity - 1);
  }
  // Checks if all required options have been filled in
  function checkRequired() {
    let valid = true;
    let tempRequired = [...required];
    for (let i = 0; i < element.customisations.length; i++) {
      if (element.customisations[i].required) {
        let optionChosen = false;
        for (let cust of custList) {
          if (cust.id === element.customisations[i].id) {
            optionChosen = true
          }
        }
        if (!optionChosen) {
          tempRequired[i] = false;
          valid = false;
        }
        else {
          tempRequired[i] = true;
        }
        setRequired(tempRequired);
      }
    }

    return valid;
  }
  // Resets the required list 
  function resetRequired() {
    let tempRequired = [];
    for (let i = 0; i < element.customisations.length; i++) {
      tempRequired.push(true);
    }
    setRequired(tempRequired);
  }
  // Adding the food to the cart and resetting cart on com
  async function addToOrder() {
    setLoading(true);
    await timeout(250);
    let finalList = [
      ...checkboxList,
      ...quantityList,
      ...radioList,
    ];
    let count = 0;
    for (let item of finalList) {
      count += item.id;
    }
    resetRequired();
    if (checkRequired()) {
      let cartItem = {
        id: element.id,
        quantity: quantity,
        totalCustomId: count,
        price: element.price,
        customisations: finalList,
        order_time: Date.now(),
        finish_time: 0,
        cartItemId: generateID()
      };
      addToCart(tableNumber, cartItem);
      let tempCart = [...cart];
      let found = false;
      for (let item of tempCart) {
        if (item.id === cartItem.id && cartItem.totalCustomId === item["totalCustomId"]) {
          found = true;
          item.quantity += cartItem.quantity;
        }
      }
      if (found === false) {
        tempCart.push(cartItem);
      }
      
      setCart(tempCart);
      setQuantityList([]);
      setCheckboxList([]);
      setRadioList([]);
      setQuantity(1);
      setPrice(element.price);
      setRequired([]);
      resetRequired();
      setCustList([]);
      closeForm();
    }
    setLoading(false);
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
        dialogClassName={Styles.modalsize}
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
            <div
              style={{
                fontSize: "16px",
                borderBottom: "2px solid #dfdfdf",
                paddingBottom: "15px",
              }}
            >
              {element.description}
              <div style={{ fontSize: "13px", marginTop: "3px"}}>
              {element.dietInfo 
                ? <>{element.dietInfo}</>
                : <></>
              }
              </div>
            </div>
            </div>
            <div style={{ overflowY: "auto", height: "55%", paddingLeft: "30px", paddingRight: "15px" }}>
              {element.customisations.map((customisation, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <div style={{ fontWeight: "500", fontSize: "17px" }}>
                    {customisation.name}{" "}
                    {customisation.required 
                      ? (required[index] 
                          ? <span style={{ color: "black" }}>
                              (Required)
                            </span>
                          : <span style={{ color: "red" }}>
                              (Required)
                            </span>
                        )
                      : <></>
                    }
                  </div>
                  <div>
                    {customisation.select === "upTo" ? (
                      <Checkbox
                        key={index}
                        customisation={customisation}
                        list={checkboxList}
                        setList={handleCheckboxList}
                        custList={custList}
                        handleCustList={handleCustList}
                      />
                    ) : customisation.optionNum === 1 ? (
                      <RadioOption 
                        customisation={customisation}
                        list={radioList}
                        setList={handleRadioList}
                        custList={custList}
                        handleCustList={handleCustList}
                      />
                    ) : (
                      <QuantityOption
                        customisation={customisation}
                        list={quantityList}
                        setList={handleQuantityList}
                        custList={custList}
                        handleCustList={handleCustList}
                      />
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
