import StaffNav from './StaffNav';
import StaffMenuCard from './StaffMenuCard';
import Button from 'react-bootstrap/Button';
import React from "react";
import AddModal from "./AddModal";
import { returnFoodData } from "../api/MenuApi";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function StaffMenu() {
  const [show, setShow] = React.useState(false);
  const [menu, setMenu] = React.useState([]);
  React.useEffect(() => {
    returnFoodData()
      .then((data) => {
        setMenu(data);
      })
  }, [])
  const closeForm = () => setShow(false);
  const showForm = () => setShow(true);
  function reloadMenu() {
    returnFoodData()
      .then((data) => {
        setMenu(data);
      })
  }
  return (
    <>
      <StaffNav showForm={showForm}/>
      <AddModal show={show} closeForm={closeForm} reloadMenu={reloadMenu}/>
      <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: "40px 40px 40px 40px"}}>
        {menu.map((element, index) => (
          <Col key={index} >
            <StaffMenuCard element={element} reloadMenu={reloadMenu}/>
          </Col>
        ))}
      </Row>
    </>    
  )
}

export default StaffMenu;