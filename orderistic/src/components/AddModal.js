import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

function AddModal({show, closeForm}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(1.00.toFixed(2));

  // SUBMIT FORM
  return (
    <>
      <Modal show={show} onHide={closeForm} centered>
        <Modal.Header closeButton>
        <Modal.Title>Add New Item to the Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type="text"
                  autoFocus
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={closeForm}>
            Add
        </Button>
        <Button variant="secondary" onClick={closeForm}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
    </>
        
  )
}

export default AddModal;