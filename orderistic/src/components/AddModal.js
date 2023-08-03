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
import Alert from 'react-bootstrap/Alert';
// Modal to add an item to the menu
function AddModal({ show, closeForm }) {
  const { menu, setMenu } = React.useContext(MenuContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(1.00.toFixed(2));
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [customisations, setCustomisations] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [dietInfo, setDietInfo] = React.useState("");
  const [recommend, setRecommend] = React.useState(false);

  function handleCustomisations(customisations) {
    setCustomisations(customisations)
  }
  const onCheckChanged = () => setRecommend(!recommend);
  // Function to check if the entered inputs are filled in and not empty
  function checkForm() {
    if (!name || !description || !category || !price) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return false;
    }
    return true;
  }
  // Submits and resets the form and adds the item to menu
  function submitForm() {
    if (checkForm()) {
      const item = {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        customisations: customisations,
        time: [300],
        dietInfo: dietInfo,
        recommend: recommend,
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
      setRecommend(false);
    }
  }
  // Converts image to base64
  function convertImg(e) {
    fileToDataUrl(e.target.files[0])
      .then((data) => {
        setImage(data);
      })
  }
  return (
    <> 

    <Modal show={show} onHide={closeForm} centered size="lg">
      {showAlert
        ? 
          <div style={{position: "fixed", top: "80px", zIndex: "1", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Alert variant="dark" onClose={() => setShowAlert(false)} dismissible>
              Please fill in all the fields.
            </Alert>
          </div>
        : <></>
      }
      <Modal.Header closeButton>
      <Modal.Title>Add New Item to the Menu</Modal.Title>
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
            showModal={false}
          />
        </div>
        <Form.Group
        className="mb-3"
        controlId="description"
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
        <Form.Group
        className="mt-3"
        controlId="recommend"
        >
          <Form.Check
            type={'checkbox'}
            id={`Recommend`}
            label={`Recommend Item`}
            onChange={onCheckChanged}
          />
        </Form.Group>
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