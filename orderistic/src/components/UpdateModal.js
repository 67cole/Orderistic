import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import React from "react";
import { fileToDataUrl } from "./helper";
import { UpdateItem } from "../api/MenuApi";

function UpdateModal({show, closeForm, element, reloadMenu}) {

  const [name, setName] = React.useState(element.name);
  const [description, setDescription] = React.useState(element.description);
  const [price, setPrice] = React.useState(element.price);
  const [category, setCategory] = React.useState(element.category);
  const [image, setImage] = React.useState(element.image);

  function submitForm() {
    const item = {
      name: name,
      description: description,
      price: price,
      category: category,
      image: image
    }
    UpdateItem(element.id, item);
    closeForm();
    reloadMenu();
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
      <Modal.Title>Update Item</Modal.Title>
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
          <Form.Label>Image</Form.Label><br/>
          <Image src={image} width="260px" fluid/>
          <Form.Control type="file" onChange={convertImg}/>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={submitForm}>
          Update
      </Button>
      <Button variant="secondary" onClick={closeForm}>
          Close
      </Button>
      </Modal.Footer>
    </Modal>
    </>
        
  )
}

export default UpdateModal;