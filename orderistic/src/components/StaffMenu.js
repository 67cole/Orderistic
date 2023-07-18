import StaffNav from "./StaffNav";
import StaffMenuCard from "./StaffMenuCard";
import React, { useState } from "react";
import AddModal from "./AddModal";
import { returnFoodData } from "../api/MenuApi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validStaff } from "../api/AuthApi";
import CardSkeleton from "./CardSkeleton";

export const MenuContext = React.createContext();

function StaffMenu() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  async function checkStaff() {
    if ((await validStaff(currentUser.email)) === false) {
      navigate("/menu");
    }
  }
  checkStaff();
  const [show, setShow] = React.useState(false);
  const [menu, setMenu] = React.useState([]);

  React.useEffect(() => {
    returnFoodData().then((data) => {
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
  const closeForm = () => setShow(false);
  const showForm = () => setShow(true);
  return (
    <>
      <MenuContext.Provider value={{ menu, setMenu }}>
        <StaffNav showForm={showForm} />
        <AddModal show={show} closeForm={closeForm} />
        <Row
          xs={1}
          md={2}
          lg={3}
          className="g-4"
          style={{ margin: "40px 40px 40px 40px" }}
        >
          {isLoading && <CardSkeleton cards={9} />}
          {menu.map((element) => (
            <Col key={element.name}>
              <StaffMenuCard element={element} />
            </Col>
          ))}
        </Row>
      </MenuContext.Provider>
    </>
  );
}

export default StaffMenu;
