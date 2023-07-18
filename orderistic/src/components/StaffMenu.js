import StaffNav from "./StaffNav";
import StaffMenuCard from "./StaffMenuCard";
import React from "react";
import AddModal from "./AddModal";
import { returnFoodData } from "../api/MenuApi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validStaff } from "../api/AuthApi";

function StaffMenu() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function checkStaff() {
    if ((await validStaff(currentUser.email)) === false) {
      navigate("/menu");
    }
  }
  checkStaff();
  const [show, setShow] = React.useState(false);
  const [menu, setMenu] = React.useState([]);

  function handleMenu(newMenu) {
    setMenu(newMenu);
  }
  React.useEffect(() => {
    returnFoodData().then((data) => {
      let tempMenu = [];
      let tempDict = {};
      for (const [key, value] of Object.entries(data)) {
        tempDict = value;
        tempDict.id = key;
        tempMenu.push(tempDict);
      }
      setMenu(tempMenu);
    });
  }, []);
  React.useEffect(() => {
  }, [menu])
  const closeForm = () => setShow(false);
  const showForm = () => setShow(true);
  return (
    <>
      <StaffNav showForm={showForm}/>
      <AddModal show={show} closeForm={closeForm} menu={menu} handleMenu={handleMenu}/>
      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4"
        style={{ margin: "40px 40px 40px 40px" }}
      >
        {menu.map((element, index) => (
          <Col key={element.name}>
            <StaffMenuCard element={element} handleMenu={handleMenu} menu={menu} index={index}/>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default StaffMenu;
