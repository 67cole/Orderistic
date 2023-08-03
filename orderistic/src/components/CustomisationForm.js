import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from 'react-bootstrap/Collapse';
import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { generateID } from "./helper";
import Alert from 'react-bootstrap/Alert';
// Form component when adding a new component
function CustomisationForm({ customisations, handleCustomisations }) {
  const radioStyle = {
    accentColor: "black", 
    verticalAlign: "middle", 
    width: "14px", 
    height: "14px"
  }
  const [showForm, setShowForm] = React.useState(false);
  const [custName, setCustName] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [required, setRequired] = React.useState("");
  const [optionNum, setOptionNum] = React.useState(1);
  const [select, setSelect] = React.useState("upTo");
  const [showAlert, setShowAlert] = React.useState(false);

  function newCustomisation() {
    setShowForm(!showForm);
  }
  function changeName(value) {
    setCustName(value);
  }
  // Changes the text of the option for the customisation
  function changeOptions(value, optionIndex) {
    let newOptions = [...options];
    newOptions[optionIndex].option = value;
    setOptions(newOptions);
  }
  // Adds an option to the customisation
  function addOption() {
    const newOption = {
      id: generateID(),
      option: ""
    }
    let newOptions = [...options, newOption];
    setOptions(newOptions);
  }
  // Removes an option to the customisation
  function removeOption(optionIndex) {
    let newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    setOptions(newOptions);
  }
  // Ensures that a customisation name given and if options have been added
  function checkCustomisation() {
    if (!custName || !optionNum) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return false;
    }
    return true;
  }
  // Finalises the customisation and adds it to the customisation list.
  function addCustomisation() {
    if (checkCustomisation()) {
      const customisation = {
        id: generateID(),
        name: custName,
        options: options,
        required: required,
        select: select,
        optionNum: optionNum
      }
      const tempCust = [...customisations, customisation];
      handleCustomisations(tempCust);
      setCustName("");
      setOptions([]);
    }
  }
  // Cancels the customisation and resets states used
  function discardCustomisation() {
    setShowForm(false);
    setCustName("");
    setOptions([]);
  }
  // Updates the amount of options a customer can choose in the customisation
  function changeNumber(value) {
    if (value !== "") {
      setOptionNum(parseInt(value));
    }
    else {
      setOptionNum("");
    }
  }
  return (
    <>
      {showAlert
        ? 
          <div style={{position: "fixed", top: "80px", zIndex: "1", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Alert variant="dark" onClose={() => setShowAlert(false)} dismissible>
              Please fill in all fields in the customisation form.
            </Alert>
          </div>
        : <></>
      }
      <p>Food Customisations (e.g choice of sauce or drink)</p>
      <Button onClick={newCustomisation} variant="dark">
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
          <Form.Group className="mb-3">
            <Form.Label>Options</Form.Label>
            {options.map((option, optionIndex) => (
              <div style={{ display: "flex", alignItems: "center" }} key={optionIndex}>
                <Form.Control
                  type="text"
                  value={option.option}
                  onChange={e => changeOptions(e.target.value, optionIndex)}
                />
                <CloseButton onClick={() => removeOption(optionIndex)} style={{ marginLeft: "10px" }} />
              </div>
            ))} <br/>
            <Button onClick={() => addOption()} variant="dark">
              Add option
            </Button> <br/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="limits">
            <Form.Label>How many options can the customer choose? </Form.Label> <br/>  
            <Form.Select aria-label="Up to or exactly" onChange={e => setSelect(e.target.value)} id={"select"}>
              <option value="upTo">up to </option>
              <option value="exactly">exactly</option>
            </Form.Select>
            <Form.Control
              type="number"
              value={optionNum}
              onChange={e => changeNumber(e.target.value)}
              min="1"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="required">
            Are customers required to pick an option? <br/>
            <div>
              <input 
                type="radio" 
                name="optional" 
                id="optionalYes" 
                value="yes" 
                style={radioStyle}
                onChange={() => setRequired(true)}/>
              <label htmlFor="optionalYes" style={{ width: "30px", paddingLeft: "5px", marginRight: "10px" }}>Yes</label>
              <input type="radio" name="optional" id="optionalNo" value="no" defaultChecked style={radioStyle} onChange={() => setRequired(false)}/>
              <label htmlFor="optionalNo" style={{ width:"30px", paddingLeft: "5px" }}>No</label>
            </div>
          </Form.Group>
          <Button onClick={() => addCustomisation()} variant="dark" style={{ marginRight: "5px" }}>
            Add customisation
          </Button> 
          <Button variant="outline-danger" onClick={discardCustomisation}>
            Discard changes
          </Button> 
          </div>
        </Collapse><br/>

    </>
  )
}

export default CustomisationForm;