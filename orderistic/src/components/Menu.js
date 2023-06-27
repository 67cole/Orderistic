import React from "react";
import MenuCard from './MenuCard';
import SearchBar from "./SearchBar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { returnFoodData } from "../api/MenuApi";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Cart from './Cart';

import MenuNav from "./MenuNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validStaff } from "../api/AuthApi";
function Menu() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function checkStaff() {
    if ((await validStaff(currentUser.email)) === true) {
      navigate("/staff-menu");
    }
  }

  checkStaff();

  const [searchString, setSearchString] = React.useState("");
  const [menu, setMenu] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [cart, setCart] = React.useState([]);

  const updateCart = (newCart) => setCart(newCart);
  const closeCart = () => setShow(false);
  const viewCart = () => setShow(true);
  function reloadMenu() {
    returnFoodData()
      .then((data) => {
        setMenu(data);
      })
  }
  React.useEffect(() => {
    reloadMenu();
  }, [])
  const search = (string) => {
    setSearchString(string);
  };
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
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <SearchBar onSearch={search} style={{ flex: "display" }} />
    <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: "40px 40px 40px 40px"}}>
      {menu.map((element, index) => (
        <Col key={index} >
          <MenuCard element={element} updateCart={updateCart} cart={cart} />
        </Col>
      ))}
    </Row>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="secondary" size="lg" style={cartButtonStyle} onClick={viewCart}>
        View cart
      </Button>
    </div>
    <Cart show={show} closeCart={closeCart} cart={cart} updateCart={updateCart}/>
    </>
  )
}

export default Menu;
