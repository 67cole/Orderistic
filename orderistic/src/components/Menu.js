import React from "react";
import MenuCard from "./MenuCard";
import { returnFoodData } from "../api/MenuApi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Cart from "./Cart";
import { viewCart } from "../api/TableApi";
import Container from "react-bootstrap/Container";
import MenuNav from "./MenuNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validStaff } from "../api/AuthApi";
import TableNumberModal from "./TableNumberModal";
import CardSkeleton from "./CardSkeleton";
import MenuSideDrawer from "./MenuSideDrawer";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const CartContext = React.createContext();

function Menu() {
  const { currentUser, tableNumber } = useAuth();
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
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  function closeCart() {
    setShow(false);
    setOrderComplete(false);
  }

  const showCart = () => setShow(true);

  React.useEffect(() => {
    returnFoodData().then((data) => {
      setMenuDict(data);
      let tempMenu = [];
      let tempDict = {};
      for (const [key, value] of Object.entries(data)) {
        tempDict = value;
        tempDict.id = key;
        tempMenu.push(tempDict);
      }
      setIsLoading(false);
      setMenu(tempMenu);
    });
  }, []);

  function loadCart() {
    viewCart(tableNumber).then((data) => {
      setCart(data);
    });
    showCart();
  }

  const cartButtonStyle = {
    backgroundColor: "black",
    paddingLeft: "250px",
    paddingRight: "250px",
    position: "fixed",
    bottom: "15px",
    fontWeight: "600",
    borderRadius: "6px",
  };
  const searchStyle = {
    width: "20%",
    minWidth: "200px",
    marginTop: "20px",
    padding: "20px",
    fontSize: "20px",
  };
  const sideDrawerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  };
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  function category() {
    const arrayCategory = menu.map((element) => element.category);
    const uniqueCategory = Array.from(new Set(arrayCategory)).filter(
      (element) => element
    );
    const categoryDisplay = uniqueCategory.map((element) => (
      <Typography
        variant="h6"
        padding="20px"
        onClick={() => {
          setFilter(element);
          setOpen(false);
        }}
      >
        <button type="button" class="btn btn-outline-dark">
          {element}
        </button>
      </Typography>
    ));

    return categoryDisplay;
  }
  return (
    <>
      <MenuNav />
      {
        <input
          style={searchStyle}
          type="text"
          placeholder="Search menu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      <div style={sideDrawerStyle}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box p={2} width="250px" textAlign="center" role="presentation">
            <Typography variant="h5" component="div">
              Menu Categories
              <Typography
                variant="h6"
                padding="20px"
                onClick={() => {
                  setFilter(null);
                  setOpen(false);
                }}
              >
                <button type="button" class="btn btn-outline-dark">
                  Full Menu
                </button>
              </Typography>
              {category()}
            </Typography>
          </Box>
        </Drawer>
      </div>
      <TableNumberModal />
      <CartContext.Provider value={{ cart, setCart }}>
        <Container fluid style={{ display: "flex", justifyContent: "center" }}>
          <Row
            className="g-4"
            style={{ margin: "0px 20px 40px 20px", paddingBottom: "40px" }}
          >
            {isLoading && <CardSkeleton cards={9} />}
            {menu
              .filter((element) => {
                if (search) {
                  if (filter) {
                    return (
                      element.category.includes(filter) &&
                      element.name.toLowerCase().includes(search.toLowerCase())
                    );
                  }
                  return element.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                }
                if (filter) {
                  return element.category.includes(filter);
                } else {
                  return menu;
                }
              })
              .map((element, index) => (
                <Col
                  key={index}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <MenuCard element={element} searchData={search} />
                </Col>
              ))}
          </Row>
        </Container>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="secondary"
            size="lg"
            style={cartButtonStyle}
            onClick={loadCart}
          >
            View cart
          </Button>
        </div>
        <Cart
          show={show}
          closeCart={closeCart}
          menu={menuDict}
          orderComplete={orderComplete}
          setOrderComplete={setOrderComplete}
        />
      </CartContext.Provider>
    </>
  );
}

export default Menu;
