import React from "react";
import MenuCard from "./MenuCard";
import { returnFoodData } from "../../api/MenuApi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Cart from "../cart/Cart";
import { viewCart } from "../../api/TableApi";
import Container from "react-bootstrap/Container";
import MenuNav from "./MenuNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validStaff } from "../../api/AuthApi";
import CardSkeleton from "./CardSkeleton";

export const CartContext = React.createContext();

function Menu() {
  const { currentUser, tableNumber } = useAuth();
  const navigate = useNavigate();
  // Checks if the current user is a staff and navigates them to staff menu if they are staff
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
  // Gets menu data and adds ID as one of the keys
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
  // Loads the cart for chosen table number
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
    minWidth: "300px",
    marginTop: "20px",
    padding: "10px 0px 10px 0px",
    fontSize: "20px",
    textAlign: "center",
  };
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  // Filters menu items into and creates a category button component
  function category() {
    const arrayCategory = menu.map((element) => element.category);
    const uniqueCategory = Array.from(new Set(arrayCategory)).filter(
      (element) => element
    );

    const categoryDisplay = uniqueCategory.map((element, index) => (
      <span
        key={index}
        style={{
          backgroundColor: "white",
          margin: "0px 2.5px 0px 2.5px",
          borderRadius: "20px",
          padding: "2px 0px 7px 0px",
        }}
      >
        <Button
          variant="outline-dark"
          onClick={() => {
            setFilter(element);
          }}
          style={{
            boxShadow: "none",
            borderRadius: "20px",
            padding: "3px 12px 3px 12px",
            border: "1px solid #dfdfdf",
          }}
        >
          {element}
        </Button>
      </span>
    ));

    return categoryDisplay;
  }
  return (
    <>
      <MenuNav />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <input
          style={searchStyle}
          type="text"
          placeholder="Search menu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <span
          style={{
            backgroundColor: "white",
            margin: "0px 2.5px 0px 2.5px",
            borderRadius: "20px",
            padding: "2px 0px 7px 0px",
          }}
        >
          <Button
            variant="outline-dark"
            onClick={() => {
              setFilter(null);
            }}
            style={{
              boxShadow: "none",
              borderRadius: "20px",
              padding: "3px 12px 3px 12px",
              border: "1px solid #dfdfdf",
            }}
          >
            Full Menu
          </Button>
        </span>
        {category()}
      </div>

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
                      (element.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                        element.description
                          .toLowerCase()
                          .includes(search.toLowerCase()))
                    );
                  }
                  return (
                    element.name.toLowerCase().includes(search.toLowerCase()) ||
                    element.description
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  );
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
