import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
// Modal component for removing items
function RemoveModal({ show, closeForm, remove }) {
  // Calls remove function passed in as a prop and closes modal
  function removeFunction() {
    remove();
    closeForm();
  }
  return (
    <>
      <Modal show={show} onHide={closeForm} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove this item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="danger"
            onClick={removeFunction}
            style={{ marginRight: "5px" }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={closeForm}>
            No
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RemoveModal;
