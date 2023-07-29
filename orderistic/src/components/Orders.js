import React from "react";
import { useAuth } from "../contexts/AuthContext";
import MenuNav from "./MenuNav";
import { returnOrdersForTable } from "../api/TableApi";
import { returnFoodData } from "../api/MenuApi";
import CardGroup from "react-bootstrap/CardGroup";
import OrderCard from "./OrderCard";
import CurrentOrder from "./CurrentOrder";

function Orders() {
  const center = {
    display: "flex",
    justifyContent: "center",
  };
  const { tableNumber } = useAuth();
  const [currOrders, setCurrOrders] = React.useState([]);
  const [prevOrders, setPrevOrders] = React.useState([]);
  const [menu, setMenu] = React.useState({});

  React.useEffect(() => {
    returnOrdersForTable(tableNumber).then((data) => {
      setCurrOrders(data.currOrders);
      let tempPrev = [...data.prevOrders];
      for (let order of tempPrev) {
        let date = new Date(order.time_finished);
        order.time_finished = date.toLocaleDateString();
      }
      setPrevOrders(tempPrev);
    });
    returnFoodData().then((menuData) => {
      setMenu(menuData);
    });
  }, [tableNumber]);

  return (
    <>
      <MenuNav />
      <p style={{ fontSize: "26px", fontWeight: "500", marginTop: "20px" }}>
        Current Orders
      </p>
      {currOrders.map((element, index) => (
        <CurrentOrder key={index} element={element} menu={menu} index={index} />
      ))}
      <p style={{ fontSize: "26px", fontWeight: "500", marginTop: "20px" }}>
        Past Orders
      </p>
      {prevOrders.map((element, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            paddingBottom: "30px",
            backgroundColor: "white",
            marginBottom: "30px",
          }}
        >
          <div style={center}>
            <p style={{ fontSize: "20px", fontWeight: "500" }}>
              Order on {element.time_finished}
            </p>
          </div>
          <div style={center}>
            <CardGroup style={{ marginBottom: "16px" }}>
              {element.food_delivered.map((food, index) => (
                <OrderCard
                  key={index}
                  menu={menu}
                  food={food}
                  price={parseFloat(menu[food.id].price).toFixed(2)}
                />
              ))}
            </CardGroup>
          </div>
        </div>
      ))}
    </>
  );
}
export default Orders;