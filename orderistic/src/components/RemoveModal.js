import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function RemoveModal({ show, closeForm, remove }) {
  function removeFunction() {
    remove();
    closeForm();
  }
  return (
    <> 
    <Modal show={show} onHide={closeForm} centered>
      <Modal.Header closeButton >
      <Modal.Title>Are you sure you want to remove this item?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Button variant="danger" onClick={removeFunction} style={{ marginRight: "5px"}}>
          Yes
      </Button>
      <Button variant="secondary" onClick={closeForm}>
          No
      </Button>
      </Modal.Body>
    </Modal>
    </>
        
  )
}

export default RemoveModal;