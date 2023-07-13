import React from "react";
import MenuCard from './MenuCard';

import { returnFoodData } from "../api/MenuApi";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Cart from './Cart';
import { viewCart } from "../api/TableApi";

import MenuNav from "./MenuNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validStaff } from "../api/AuthApi";
import MenuSearchBar from "./MenuSearchBar";

function Menu() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  async function checkStaff() {
    if (
      currentUser !== null &&
      (await validStaff(currentUser.email)) === true
    ) {
      navigate("/staff-menu");
    }
  }

  checkStaff();

  
  const [menu, setMenu] = React.useState([]);
  const [menuDict, setMenuDict] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [cart, setCart] = React.useState([]);


  const changeCart = (newCart) => setCart(newCart);
  const closeCart = () => setShow(false);
  const showCart = () => setShow(true);
  React.useEffect(() => {
    returnFoodData()
      .then((data) => {
        setMenuDict(data);
        let tempMenu = [];
        let tempDict = {};
        for (const [key, value] of Object.entries(data)) {
          tempDict = value;
          tempDict.id = key;
          tempMenu.push(tempDict);
        }
        setMenu(tempMenu);
      })
    viewCart(1)
      .then((data) => {
        setCart(data); 

      });
  }, [])

  
  const cartButtonStyle = {
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
      <MenuNav />
      <MenuSearchBar />
      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4"
        style={{ margin: "40px 40px 40px 40px", paddingBottom: "40px" }}
      >
        {menu.map((element, index) => (
          <Col key={index}>
            <MenuCard element={element} cart={cart} changeCart={changeCart}/>
          </Col>
        ))}
      </Row>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="secondary" size="lg" style={cartButtonStyle} onClick={showCart}>
          View cart
        </Button>
      </div>
      <Cart show={show} closeCart={closeCart} cart={cart} changeCart={changeCart} menu={menuDict}/>
    </>
  )
}

export default Menu;
