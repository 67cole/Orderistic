import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { fileToDataUrl } from "./helper";
import { AddItem } from "../api/MenuApi";
import CustomisationForm from "./CustomisationForm";
import { MenuContext } from "./StaffMenu";
import { Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import CustomisationItem from "./CustomisationItem";
import PreviewMenuCard from "./PreviewMenuCard";

function AddModal({ show, closeForm }) {
  const { menu, setMenu } = React.useContext(MenuContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(1.00.toFixed(2));
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [customisations, setCustomisations] = React.useState([]);

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
      customisations: customisations,
      time: [],
    }
    AddItem(item)
      .then((data) => {
        item.id = data;
    });
    closeForm();
    let tempMenu = [...menu];
    tempMenu.push(item);
    setMenu(tempMenu);
    setName("");
    setDescription("");
    setPrice(1.00.toFixed(2));
    setCategory("");
    setImage("");
    setCustomisations([]);
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
      <Modal.Title>Add New Item to the Menu</Modal.Title>
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
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={convertImg}/>
            </Form.Group>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>Preview</p>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginBottom: "30px"}}>

          <PreviewMenuCard 
            element ={{
              image: image,
              name: name,
              description: description,
              price: price,
            }}
          />
        </div>
        <Form.Group
        className="mb-3"
        controlId="description"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <CustomisationForm customisations={customisations} handleCustomisations={handleCustomisations}/>
        <ListGroup>
          {customisations.map((element, index) => (
            <CustomisationItem key={index} customisations={customisations} handleCustomisations={handleCustomisations} element={element} index={index} />
          ))}
        </ListGroup>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="dark" onClick={submitForm}>
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