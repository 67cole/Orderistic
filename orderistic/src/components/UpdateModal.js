import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { fileToDataUrl } from "./helper";
import { UpdateItem } from "../api/MenuApi";
import { Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import CustomisationItem from "./CustomisationItem";
import CustomisationForm from "./CustomisationForm";
import PreviewMenuCard from "./PreviewMenuCard";
import Alert from 'react-bootstrap/Alert';

function UpdateModal({ show, closeForm, element, setStates }) {

  const [name, setName] = React.useState(element.name);
  const [description, setDescription] = React.useState(element.description);
  const [price, setPrice] = React.useState(parseFloat(element.price).toFixed(2));
  const [category, setCategory] = React.useState(element.category);
  const [image, setImage] = React.useState(element.image);
  const [customisations, setCustomisations] = React.useState(element.customisations);
  const [showAlert, setShowAlert] = React.useState(false);
  const [dietInfo, setDietInfo] = React.useState(element.dietInfo);
  const [recommend, setRecommend] = React.useState(false);

  function handleCustomisations(customisations) {
    setCustomisations(customisations)
  }
  function checkForm() {
    if (!name || !description || !category || !price) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return false;
    }
    return true;
  }
  function submitForm() {
    if (checkForm()) {
      const item = {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        customisations: customisations,
        time: element.time,
        dietInfo: dietInfo,
        recommend: recommend,
      }
      UpdateItem(element.id, item);
      closeForm();
      setStates(image, name, description, price);
    }
  }
  function convertImg(e) {
    fileToDataUrl(e.target.files[0])
      .then((data) => {
        setImage(data);
      })
  }
  const onCheckChanged = () => setRecommend(!recommend);

  return (
    <> 
    <Modal show={show} onHide={closeForm} centered size="lg">
      {showAlert
        ? <div style={{position: "fixed", top: "80px", zIndex: "1", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Alert variant="dark" onClose={() => setShowAlert(false)} dismissible>
              Please fill in all the fields.
            </Alert>
          </div>
        : <></>
      }
      <Modal.Header closeButton>
      <Modal.Title>Update Item</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "20px 40px 10px 40px" }}>
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
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFile">
              <Form.Label>Image</Form.Label><br/>
              <Form.Control type="file" onChange={convertImg}/><br/>
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
        controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group
        className="mb-3"
        controlId="diet-info"
        >
          <Form.Label>Dietary Information</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}
            value={dietInfo} 
            onChange={e => setDietInfo(e.target.value)} 
          />
        </Form.Group>
        <Form.Group
        className="mb-3"
        controlId="recommend"
        >
          <Form.Check
            type={'checkbox'}
            id={`Recommend`}
            label={`Recommend Item`}
            onChange={onCheckChanged}
          />
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