import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import RemoveModal from "./RemoveModal";

function CustomisationForm({ customisations, handleCustomisations }) {
  const [showForm, setShowForm] = React.useState(false);
  const [custName, setCustName] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [showRemove, setShowRemove] = React.useState(false);

  const closeRemForm = () => setShowRemove(false);
  const showRemForm = () => setShowRemove(true);

  function newCustomisation() {
    setShowForm(!showForm);
  }
  function changeName(value) {
    setCustName(value);
  }
  function changeOptions(value, optionIndex) {
    let newOptions = [...options];
    newOptions[optionIndex] = value;
    setOptions(newOptions);
  }
  function addOption() {
    let newOptions = [...options, ""];
    setOptions(newOptions);
  }
  function removeOption(optionIndex) {
    let newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    setOptions(newOptions);
  }
  function addCustomisation() {
    const customisation = {
      name: custName,
      options: options
    }
    const tempCust = [...customisations, customisation];
    handleCustomisations(tempCust);
    setCustName("");
    setOptions([]);
  }
  function discardCustomisation() {
    setShowForm(false);
    setCustName("");
    setOptions([]);
  }
  function removeCustomisation(index) {
    let newCustom = [...customisations];
    newCustom.splice(index, 1);
    handleCustomisations(newCustom);
  }
  return (
    <>
      Food Customisations (e.g choice of sauce or drink) <br/>
      <Button onClick={newCustomisation}>
        {showForm 
          ? "-"
          : "+"
        }
      </Button> <br/> <br/>
        <Collapse in={showForm}>
          <div>
          <Form.Group className="mb-3" controlId="customisation-name">
            <Form.Label>Customisation Name</Form.Label>
            <Form.Control
                type="text"
                value={custName}
                onChange={e => changeName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="options">
            <Form.Label>Options</Form.Label>
            {options.map((option, optionIndex) => (
              <div style={{ display: "flex", alignItems: "center" }} key={optionIndex}>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={e => changeOptions(e.target.value, optionIndex)}
                />
                <CloseButton onClick={() => removeOption(optionIndex)} style={{ marginLeft: "10px" }} />
              </div>
            ))} <br/>
            <Button onClick={() => addOption()} >
              Add option
            </Button> <br/> <br/>
            <Button onClick={() => addCustomisation()}>
              Add customisation
            </Button> 
            <Button variant="outline-danger" onClick={discardCustomisation}>
              Discard changes
            </Button> 
          </Form.Group>
          </div>
        </Collapse>
      <ListGroup>
        {customisations.map((element, index) => (
          <ListGroup.Item key={index}>
            <Button variant="outline-danger" onClick={showRemForm} style={{ marginLeft: "10px", float: "right" }}>Remove </Button>
            <Button variant="outline-dark" style={{ float: "right" }} >Edit</Button>
            <div style={{ fontWeight: "500" }}>{element.name}</div>
            {element.options.map((option, index) => (
              <div key={index}>&nbsp;&nbsp;&nbsp;{option}</div>
            ))}
            <RemoveModal show={showRemove} closeForm={closeRemForm} remove={() => removeCustomisation(index)}/>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default CustomisationForm;