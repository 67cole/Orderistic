import NavBar from './NavBar';
import StaffMenuCard from './StaffMenuCard';
import Button from 'react-bootstrap/Button';
import React from "react";
import AddModal from "./AddModal";
import { returnData } from "../api/MenuApi";

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
      <NavBar />
      <AddModal show={show} closeForm={closeForm} reloadMenu={reloadMenu}/>
      {menu.map((element, index) => (
        <StaffMenuCard key={index} element={element} reloadMenu={reloadMenu}/>
      ))}
      <Button variant="primary" onClick={showForm}>Add Item</Button>
    </>    
  )
}

export default StaffMenu;