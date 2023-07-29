import ListGroup from 'react-bootstrap/ListGroup';
import RemoveModal from "./RemoveModal";
import Button from "react-bootstrap/Button";
import React from "react";
import Form from "react-bootstrap/Form";
import Collapse from 'react-bootstrap/Collapse';
import CloseButton from 'react-bootstrap/CloseButton';
import { generateID } from './helper';

function CustomisationItem({ customisations, index, element, handleCustomisations }) {
  const textStyle = {
    paddingBottom: "5px", 
    paddingTop: "5px"
  }
  const radioStyle = {
    accentColor: "black", 
    verticalAlign: "middle", 
    width: "14px", 
    height: "14px"
  }
  const [showRemove, setShowRemove] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(element.name);
  const [newOptions, setNewOptions] = React.useState(element.options);
  const [newRequired, setNewRequired] = React.useState(element.required);
  const [newOptionNum, setNewOptionNum] = React.useState(element.optionNum);
  const [newSelect, setNewSelect] = React.useState(element.select);
  const closeRemForm = () => setShowRemove(false);
  const showRemForm = () => setShowRemove(true);
  function removeCustomisation(index) {
    let newCustom = [...customisations];
    newCustom.splice(index, 1);
    handleCustomisations(newCustom);
  }
  function editCustomisation() {
    setEditing(true);
  }
  function changeOptions(value, index) {
    let tempOptions = [...newOptions];
    tempOptions[index].option = value;
    setNewOptions(tempOptions);
  }
  function discardChanges() {
    setNewName(element.name);
    setNewOptions(element.options);
    setEditing(false);
  }
  function saveChanges() {
    let newCustom = [...customisations];
    newCustom[index].name = newName;
    newCustom[index].options = newOptions;
    newCustom[index].required = newRequired;
    newCustom[index].optionNum = newOptionNum;
    newCustom[index].select = newSelect;
    handleCustomisations(newCustom); 
    setEditing(false);
  }
  function changeRequired() {
    setNewRequired(!newRequired);
  }
  function changeNumber(value) {
    if (value !== "") {
      setNewOptionNum(parseInt(value));
    }
    else {
      setNewOptionNum("");
    }
  }
  function addOption() {
    const newOption = {
      id: generateID(),
      option: ""
    }
    let tempOptions = [...newOptions, newOption];
    setNewOptions(tempOptions);
  }
  function removeOption(optionIndex) {
    let tempOptions = [...newOptions];
    tempOptions.splice(optionIndex, 1);
    setNewOptions(tempOptions);
  }
  return(
    <>
      <ListGroup.Item>
        <Button variant="outline-danger" onClick={showRemForm} style={{ marginLeft: "10px", float: "right" }}>Remove</Button>
        <Button variant="outline-dark" style={{ float: "right" }} onClick={() => editCustomisation(index)}>Edit</Button>
        <div style={{ fontWeight: "500" }}>{element.name}</div>
        <div style={{ marginBottom: "10px" }}>
          {element.options.map((option, index) => (
            <div key={index}>&nbsp;&nbsp;&nbsp;{option.option}</div>
          ))}
        </div>
        <Collapse in={editing}>
          <div style={{ borderTop: "1px solid #dfdfdf" }}>
            <div style={textStyle}>Customisation Name:</div>
            <Form.Control type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
            <div style={textStyle}>Options:</div>
            {newOptions.map((option, index) => (
              <div style={{ display: "flex", alignItems: "center" }} key={index}>
                <Form.Control type="text" value={option.option} onChange={e => changeOptions(e.target.value, index)}/>
                <CloseButton onClick={() => removeOption(index)} style={{ marginLeft: "10px" }} />
              </div>

            ))} <br/>
            <Button onClick={() => addOption()} variant="dark">
              Add option
            </Button> <br/>
            <Form.Group className="mb-3" controlId={"limits" + index}>
              <Form.Label>How many options can the customer choose? </Form.Label> <br/>  
              <Form.Select aria-label="Up to or exactly" value={newSelect} onChange={e => setNewSelect(e.target.value)} id={"select" + index}>
                <option value="upTo">up to </option>
                <option value="exactly">exactly</option>
              </Form.Select>
              <Form.Control
                type="number"
                value={newOptionNum}
                onChange={e => changeNumber(e.target.value)}
                min="1"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="required">
            Are customers required to pick an option? <br/>
            <div onChange={changeRequired}>
              <input 
                type="radio" 
                name={"optional" + index}  
                id={"optionalYes" + index}
                value="yes" 
                style={radioStyle}
                checked={newRequired}
                onChange={() => setNewRequired(true)}/>
              <label htmlFor={"optionalYes" + index} style={{ width: "30px", paddingLeft: "5px", marginRight: "10px" }}>Yes</label>
              <input type="radio" name={"optional" + index} id={"optionalNo" + index}  value="no" style={radioStyle} checked={!newRequired} onChange={() => setNewRequired(false)}/>
              <label htmlFor={"optionalNo" + index} style={{ width:"30px", paddingLeft: "5px" }}>No</label>
            </div>
          </Form.Group>
            <Button variant="outline-dark" onClick={saveChanges}>Save</Button>
            <Button variant="light" style={{ marginLeft: "10px", border: "0" }} onClick={discardChanges}>Cancel</Button>
          </div>
        </Collapse>
        <RemoveModal show={showRemove} closeForm={closeRemForm} remove={() => removeCustomisation(index)}/>
      </ListGroup.Item>
    </>
  )
}

export default CustomisationItem;