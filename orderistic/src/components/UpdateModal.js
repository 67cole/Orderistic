import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import React from "react";
import { fileToDataUrl } from "./helper";
import { UpdateItem } from "../api/MenuApi";
import { Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import CustomisationItem from "./CustomisationItem";
import CustomisationForm from "./CustomisationForm";

function UpdateModal({ show, closeForm, element, setStates }) {

  const [name, setName] = React.useState(element.name);
  const [description, setDescription] = React.useState(element.description);
  const [price, setPrice] = React.useState(parseFloat(element.price).toFixed(2));
  const [category, setCategory] = React.useState(element.category);
  const [image, setImage] = React.useState(element.image);
  const [customisations, setCustomisations] = React.useState(element.customisations);

  function handleCustomisations(customisations) {
    setCustomisations(customisations)
  }
  function submitForm() {
    const item = {
      name: name,
      description: description,
      price: price,
      category: category,
      image: image,
      customisations: customisations
    }
    UpdateItem(element.id, item);
    closeForm();
    setStates(image, name, description, price);
  }
  function convertImg(e) {
    fileToDataUrl(e.target.files[0])
      .then((data) => {
        setImage(data);
      })
  }
  return (
    <> 
    <Modal show={show} onHide={closeForm} centered size="lg">
      <Modal.Header closeButton>
      <Modal.Title>Update Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type="text"
                  autoFocus
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="off"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label><br/>
              <Form.Control type="file" onChange={convertImg}/><br/>
              {image ? <Image src={image} width="260px" fluid/> : <></>}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group
        className="mb-3"
        controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <CustomisationForm customisations={customisations} handleCustomisations={handleCustomisations}/>
        <ListGroup>
          {customisations.map((ctm, index) => (
            <CustomisationItem key={ctm.id} customisations={customisations} handleCustomisations={handleCustomisations} element={ctm} index={index} />
          ))}
        </ListGroup>
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