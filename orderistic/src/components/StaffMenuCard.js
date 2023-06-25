import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RemoveModal from './RemoveModal';
import UpdateModal from './UpdateModal';
import React from 'react';

function StaffMenuCard({ element, reloadMenu }) {
  const imgStyle = {
    maxWidth: "260px",
    maxHeight: "260px",
  }
  const cardStyle = {
    flexDirection: "row",
    width: "auto",
    height: "auto",
    maxWidth: "650px",
    maxHeight: "260px",
  }
  const [showRemove, setShowRemove] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const closeRemForm = () => setShowRemove(false);
  const showRemForm = () => setShowRemove(true);
  const closeUpdateForm = () => setShowUpdate(false);
  const showUpdateForm = () => setShowUpdate(true);

  return (
    <>
      <Card style={cardStyle}>  
        <Card.Img variant="top" src={element.image} style={imgStyle}/>
        <Card.Body>
          <Card.Title>{element.name}</Card.Title>
          <Card.Text>
            {element.description}
          </Card.Text>
          <Button variant="primary" onClick={showUpdateForm}>Update Item</Button>
          <Button variant="danger" onClick={showRemForm}>Remove Item</Button> 
        </Card.Body>
      </Card>
      <RemoveModal show={showRemove} closeForm={closeRemForm} id={element["id"]} reloadMenu={reloadMenu}/>
      <UpdateModal show={showUpdate} closeForm={closeUpdateForm} element={element} reloadMenu={reloadMenu}/>
    </>
  )
}

export default StaffMenuCard;