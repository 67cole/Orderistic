import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MenuCard() {
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
  return (
    <>
      <Card style={cardStyle}>  
        <Card.Img variant="top" src="logo192.png" style={imgStyle}/>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default MenuCard;