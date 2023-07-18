import React from "react";
import { useAuth } from "../contexts/AuthContext";
import MenuNav from "./MenuNav";
import { returnOrdersForTable } from "../api/TableApi";
import { returnFoodData } from "../api/MenuApi";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function PreviousOrder() {
  const imgStyle = {
    width: "100%",
    objectFit: "cover",
    height: "200px",
  };
  const { tableNumber } = useAuth();
  const [currOrders, setCurrOrders] = React.useState([]);
  const [prevOrders, setPrevOrders] = React.useState([]);
  const [menu, setMenu] = React.useState({});
  React.useEffect(() => {
    returnOrdersForTable(tableNumber).then((data) => {
      setCurrOrders(data.currOrders);
      console.log(data.currOrders);
      setPrevOrders(data.prevOrders);
    });
    returnFoodData().then((data) => {
      setMenu(data);
    })
  }, [tableNumber])

  return (
    <>
      <MenuNav />
      <div>
        <p style={{ fontSize: "26px", fontWeight: "500" }}>Current Orders</p>
      </div>
      {currOrders.map((element) => (
        <>
          <Container fluid>
            <Row
              className="g-4"
              style={{ margin: "0px 40px 40px 40px", paddingBottom: "40px" }}
            > 
            {element.food_ordered.map((food) => (
              <>
                <Col>
                  <Card style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={menu[food.id].image} style={imgStyle} />
                    <Card.Body>
                      <Card.Title>{menu[food.id].name}</Card.Title>
                      <Card.Text>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </>
              ))
            }
            </Row>
          </Container>
        </>
        ))
      }
    </>
  );
}
export default PreviousOrder;
