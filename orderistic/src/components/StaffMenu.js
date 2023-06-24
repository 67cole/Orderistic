import NavBar from './NavBar';
import StaffMenuCard from './StaffMenuCard';
import Button from 'react-bootstrap/Button';
import React from "react";
import AddModal from "./AddModal";

function StaffMenu() {
  const [show, setShow] = React.useState(false);

  const closeForm = () => setShow(false);
  const showForm = () => setShow(true);
  return (
    <>
      <NavBar />
      <Button variant="primary" onClick={showForm}>Add Item</Button>
      <AddModal show={show} closeForm={closeForm}/>
      <StaffMenuCard />
    </>    
  )
}

export default StaffMenu;