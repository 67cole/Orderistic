import CardGroup from "react-bootstrap/CardGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import OrderCard from "./OrderCard";
import React from "react";
import { returnOrderTime } from "../../api/OrderApi";
// Current order card component in orders page
function CurrentOrder({ index, element, menu }) {
  const center = {
    display: "flex",
    justifyContent: "center",
  };
  const [orderTime, setOrderTime] = React.useState(0);
  const [estimateTime, setEstimateTime] = React.useState(0);
  // Obtains estimated time of order and calculates remaining time using current time.
  React.useEffect(() => {
    returnOrderTime(element.id).then((data) => {
      let tempTime = Math.ceil(
        element.time_ordered / 60000 + data / 60 - Date.now() / 60000
      );
      if (tempTime < 0 || isNaN(data)) {
        tempTime = 0;
      }
      setOrderTime(tempTime);
      setEstimateTime(data / 60);
    });
  }, [element]);
  // Creates an interval which updates the estimated time every minute
  React.useEffect(() => {
    const timer = setInterval(() => changeTime(), 60000);
    return () => clearInterval(timer);
  }, []);
  // Updates the estimated time to decrease by 1 minute
  function changeTime() {
    setOrderTime((s) => (s === 0 ? 0 : s - 1));
  }
  return (
    <>
      <div
        style={{
          width: "100%",
          paddingBottom: "30px",
          backgroundColor: "white",
          marginBottom: "30px",
          borderBottom: "1px solid #e5e5e5",
          borderTop: "1px solid #e5e5e5",
        }}
      >
        <div style={{ ...center, marginTop: "20px" }}>
          <p style={{ fontSize: "20px", fontWeight: "500" }}>
            Order {index + 1}
          </p>
        </div>
        <div style={{ ...center, marginBottom: "20px" }}>
          <div style={{ ...center, width: "30%", flexDirection: "column" }}>
            <div style={{ ...center }}>Estimated Time:</div>
            <div style={{ ...center, fontSize: "70px" }}>
              {orderTime} {orderTime === 1 ? "minute" : "minutes"}
            </div>
          </div>
        </div>
        <div style={center}>
          <div style={{ display: "inline-block", width: "30%" }}>
            <div style={center}>
              <p>Cooking</p>
            </div>
            <CardGroup
              style={{ marginBottom: "16px", justifyContent: "center" }}
            >
              {element.food_ordered.map((food, index) => (
                <OrderCard key={index} menu={menu} food={food} />
              ))}
            </CardGroup>
          </div>
          <div style={{ ...center, display: "inline-block", width: "30%" }}>
            <div style={center}>
              <p>To be delivered</p>{" "}
            </div>
            <CardGroup
              style={{ marginBottom: "16px", justifyContent: "center" }}
            >
              {element.food_prepared.map((food, index) => (
                <OrderCard key={index} menu={menu} food={food} />
              ))}
            </CardGroup>
          </div>
          <div style={{ ...center, display: "inline-block", width: "30%" }}>
            <div style={center}>
              <p>Delivered</p>{" "}
            </div>
            <CardGroup
              style={{ marginBottom: "16px", justifyContent: "center" }}
            >
              {element.food_delivered.map((food, index) => (
                <OrderCard key={index} menu={menu} food={food} />
              ))}
            </CardGroup>
          </div>
        </div>
        <div style={{ ...center, paddingTop: "20px" }}>
          <ProgressBar
            animated={orderTime !== 0}
            now={
              estimateTime === 0
                ? 0
                : ((estimateTime - orderTime) / estimateTime) * 100
            }
            style={{ width: "90%", backgroundColor: "#edeff3" }}
          />
        </div>
      </div>
    </>
  );
}

export default CurrentOrder;
