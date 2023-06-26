import StaffNav from './StaffNav';
import StaffMenuCard from './StaffMenuCard';
import Button from 'react-bootstrap/Button';
import React from "react";
import AddModal from "./AddModal";
import { returnData } from "../api/MenuApi";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function StaffMenu() {
  const [show, setShow] = React.useState(false);
  const [menu, setMenu] = React.useState([]);
  React.useEffect(() => {
    returnData()
      .then((data) => {
        setMenu(data);
      })
  }, [])
  const closeForm = () => setShow(false);
  const showForm = () => setShow(true);
  function reloadMenu() {
    returnData()
      .then((data) => {
        setMenu(data);
      })
  }
  return (
    <>
      <StaffNav />
      <AddModal show={show} closeForm={closeForm} reloadMenu={reloadMenu}/>
      <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: "40px 40px 40px 40px"}}>
        {menu.map((element, index) => (
          <Col key={index} >
            <StaffMenuCard element={element} reloadMenu={reloadMenu}/>
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={showForm}>Add Item</Button>
    </>    
  )
}

export default StaffMenu;