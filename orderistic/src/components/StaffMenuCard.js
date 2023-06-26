import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RemoveModal from './RemoveModal';
import UpdateModal from './UpdateModal';
import React from 'react';


function StaffMenuCard({ element, reloadMenu }) {
  const [showRemove, setShowRemove] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const imgStyle = {
    // maxWidth: "260px",
    // maxHeight: "260px",
    width: "100%",
    objectFit: "cover",
    height: "200px"
  }
  const cardStyle = {
    display: "inline-block",
    // flexDirection: "row",
    height: "100%",
    width: "100%",
    maxHeight: "500px",
  }
  const closeRemForm = () => setShowRemove(false);
  const showRemForm = () => setShowRemove(true);
  const closeUpdateForm = () => setShowUpdate(false);
  const showUpdateForm = () => setShowUpdate(true);

  return (  
    <>
      <Card style={cardStyle}>  
        {/* {element.image 
          ? <Card.Img variant="top" src={element.image} style={imgStyle}/>
          : <></>
        } */}
        <Card.Img variant="top" src={element.image} style={imgStyle}/>
        <Card.Body style={{position: "relative", maxHeight: "200px", height: "200px"}}>
          <Card.Title>
            {element.name}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px"}}>
            {element.description}
          </Card.Text>
          <Card.Text style={{ position: "absolute", bottom: "5px" }}>
            ${parseFloat(element.price).toFixed(2)}
          </Card.Text>
          <Button variant="outline-danger" onClick={showRemForm} style={{ position: "absolute", bottom: "15px", right: "15px"}}>Remove</Button> 
          <Button variant="light" onClick={showUpdateForm} style={{position: "absolute", top: "10px", right: "10px"}}>✏️</Button>
        </Card.Body>
      </Card>
      <RemoveModal show={showRemove} closeForm={closeRemForm} id={element["id"]} reloadMenu={reloadMenu}/>
      <UpdateModal show={showUpdate} closeForm={closeUpdateForm} element={element} reloadMenu={reloadMenu}/>
    </>
  )
}

export default StaffMenuCard;