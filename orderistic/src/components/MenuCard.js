import Card from 'react-bootstrap/Card';
import React from 'react';
import FoodInfo from './FoodInfo';

function MenuCard({ element }) {
  // For showing the food information modal
  const [show, setShow] = React.useState(false);

  const closeFoodInfo = () => setShow(false);
  const openFoodInfo = () => setShow(true);
  // Style for the menu cards
  const imgStyle = {
    width: "210px",
    objectFit: "cover",
    height: "100%"
  }
  const cardStyle = {
    flexDirection: "row",
    height: "210px",
    width: "100%",
    maxHeight: "500px",
    cursor: "pointer"
  }
  return (  
    <>
      <Card onClick={openFoodInfo} style={cardStyle}>  
        {element.image 
          ? <Card.Img variant="top" src={element.image} style={imgStyle} className="img-fluid" />
          : <></>
        }
        <Card.Body style={{position: "relative"}}>
          <Card.Title>
            {element.name}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px"}}>
            {element.description}
          </Card.Text>
          <Card.Text style={{ position: "absolute", bottom: "10px" }}>
            ${parseFloat(element.price).toFixed(2)}
          </Card.Text>
        </Card.Body>
      </Card>
      <FoodInfo show={show} closeForm={closeFoodInfo} element={element}/>
    </>
  )
}

export default MenuCard;