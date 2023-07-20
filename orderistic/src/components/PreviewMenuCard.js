import Card from "react-bootstrap/Card";
import React from "react";

function PreviewMenuCard({ element }) {
    // Style for the menu cards
    const imgStyle = {
      width: "210px",
      objectFit: "cover",
      height: "100%",
    };
    const cardStyle = {
      flexDirection: "row",
      height: "210px",
      width: "583px",
      maxHeight: "500px",
    };
  return(
    <>
      <Card style={cardStyle}>
        {element.image ? (
          <Card.Img
            variant="top"
            src={element.image}
            style={imgStyle}
            className="img-fluid"
          />
        ) : (
          <></>
        )}
        <Card.Body style={{ position: "relative" }}>
          <Card.Title style={{}}>{element.name}</Card.Title>
          <Card.Text style={{ fontSize: "14px" }}>
            {element.description}
          </Card.Text>
          <Card.Text
            style={{ position: "absolute", bottom: "10px", fontSize: "16px" }}
          >
            ${parseFloat(element.price).toFixed(2)}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default PreviewMenuCard;