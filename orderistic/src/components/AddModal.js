import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { fileToDataUrl } from "./helper";
import { AddItem } from "../api/MenuApi";

function AddModal({ show, closeForm, menu, handleMenu }) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(1.00.toFixed(2));
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");

  function submitForm() {
    const item = {
      name: name,
      description: description,
      price: price,
      category: category,
      image: image,
      time: [],
    }
    AddItem(item)
      .then((data) => {
        item.id = data;
    });
    closeForm();
    let tempMenu = [...menu];
    tempMenu.push(item);
    handleMenu(tempMenu);
    setName("");
    setDescription("");
    setPrice(1.00.toFixed(2));
    setCategory("");
    setImage("");
  }
  function convertImg(e) {
    fileToDataUrl(e.target.files[0])
      .then((data) => {
        setImage(data);
      })
  }
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category</Form.Label>
          <Form.Control
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
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
          <Form.Control type="file" onChange={convertImg}/>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={submitForm}>
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