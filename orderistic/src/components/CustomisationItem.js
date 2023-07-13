import ListGroup from 'react-bootstrap/ListGroup';
import RemoveModal from "./RemoveModal";
import Button from "react-bootstrap/Button";
import React from "react";
import Form from "react-bootstrap/Form";
import Collapse from 'react-bootstrap/Collapse';

function CustomisationItem({ customisations, index, element, handleCustomisations }) {
  const textStyle = {
    paddingBottom: "5px", 
    paddingTop: "5px"
  }
  const [showRemove, setShowRemove] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(element.name);
  const [newOptions, setNewOptions] = React.useState(element.options);

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
    tempOptions[index] = value;
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
    handleCustomisations(newCustom); 
    setEditing(false);
  }
  return(
    <>
      <ListGroup.Item key={index}>
        <Button variant="outline-danger" onClick={showRemForm} style={{ marginLeft: "10px", float: "right" }}>Remove</Button>
        <Button variant="outline-dark" style={{ float: "right" }} onClick={() => editCustomisation(index)}>Edit</Button>
        <div style={{ fontWeight: "500" }}>{element.name}</div>
        <div style={{ marginBottom: "10px" }}>
          {element.options.map((option, index) => (
            <div key={index}>&nbsp;&nbsp;&nbsp;{option}</div>
          ))}
        </div>
        <Collapse in={editing}>
          <div style={{ borderTop: "1px solid #dfdfdf" }}>
            <div style={textStyle}>Customisation Name:</div>
            <Form.Control type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
            <div style={textStyle}>Options:</div>
            {newOptions.map((option, index) => (
              <Form.Control key={index} type="text" value={option} onChange={e => changeOptions(e.target.value, index)}/>
            ))} <br/>
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