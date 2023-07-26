import React from "react";
import { useAuth } from "../contexts/AuthContext";
import MenuNav from "./MenuNav";
import { returnOrdersForTable } from "../api/TableApi";
import { returnFoodData } from "../api/MenuApi";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import EstimatedTime from "./EstimatedTime";


function PreviousOrder() {
  const imgStyle = {
    width: "100%",
    objectFit: "cover",
    minHeight: "142px",
    height: "142px"
  };
  const center = {
    display: "flex", 
    justifyContent: "center"
  }
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
    })
  }, [tableNumber])

  return (
    <>
      <MenuNav />
      <p style={{ fontSize: "26px", fontWeight: "500", marginTop: "20px" }}>Current Orders</p>
      {currOrders.map((element, index) => (
        <div key={index} style={{width: "100%", paddingBottom: "30px", backgroundColor: "white", marginBottom: "30px"}}>
          <div style={center}>
            <p style={{ fontSize: "20px", fontWeight: "500" }}>Order {index + 1}</p>
          </div>
          <div style={center}>
          <div style={{display: "inline-block", width: "30%"}}>
            <div style={center}><p>In Progress</p></div>
            <CardGroup style={{ marginBottom: "16px", justifyContent: "space-evenly"}}>
              {element.food_ordered.map((food, index) => (
                <div key={index}>
                  <Card style={{ width: '10rem', height: "15rem"}}>
                    <Card.Img variant="top" src={menu[food.id].image} style={imgStyle} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "16px"}}>{menu[food.id].name}</Card.Title>
                      <div style={{position: "absolute", bottom: "10px", display: "inline-block"}}>
                        ${food.price}
                      </div>
                      <div style={{position: "absolute", bottom: "10px", right: "16px", display: "inline-block"}}>
                        Qty: {food.quantity}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                ))
              }
            </CardGroup>
          </div>
          <EstimatedTime element={element} />
          <div style={{...center, display: "inline-block", width: "30%"}}>
            <div style={center}><p>To be delivered</p> </div>
            <CardGroup style={{ marginBottom: "16px"}}>
              {element.food_completed.map((food, index) => (
                  <div key={index}>
                    <Card style={{ width: '10rem', height: "15rem", margin: "0px 5px 0px 5px"}}>
                      <Card.Img variant="top" src={menu[food.id].image} style={imgStyle} />
                      <Card.Body>
                        <Card.Title style={{ fontSize: "16px"}}>{menu[food.id].name}</Card.Title>
                        <div style={{position: "absolute", bottom: "10px", display: "inline-block"}}>
                          ${food.price}
                        </div>
                        <div style={{position: "absolute", bottom: "10px", right: "16px", display: "inline-block"}}>
                          Qty: {food.quantity}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </CardGroup>
          </div>
          </div>
          <div style={{...center, paddingTop: "20px"}}>
            <ProgressBar animated now={45} style={{ width: "90%", backgroundColor: "#edeff3"}} />
          </div>
        </div>
        ))
      }
      <p style={{ fontSize: "26px", fontWeight: "500", marginTop: "20px" }}>Past Orders</p>
      {prevOrders.map((element, index) => (
        <div key={index} style={{width: "100%", paddingBottom: "30px", backgroundColor: "white", marginBottom: "30px"}}>
          <div style={center}>
            <p style={{ fontSize: "20px", fontWeight: "500" }}>Order on {element.time_finished}</p>
          </div>
          <div style={center}>
            <CardGroup style={{ marginBottom: "16px"}}>
              {element.food_completed.map((food, index) => (
                <div key={index}>
                  <Card style={{ width: '10rem', height: "15rem", margin: "0px 10px 0px 0px", }}>
                    <Card.Img variant="top" src={menu[food.id].image} style={imgStyle} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "16px"}}>{menu[food.id].name}</Card.Title>
                      <div style={{position: "absolute", bottom: "10px", display: "inline-block"}}>
                        ${parseFloat(menu[food.id].price).toFixed(2)}
                      </div>
                      <div style={{position: "absolute", bottom: "10px", right: "16px", display: "inline-block"}}>
                        Qty: {food.quantity}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                ))
              }
            </CardGroup>
          </div>
        </div>
      ))}
    </>
  );
}
export default PreviousOrder;
