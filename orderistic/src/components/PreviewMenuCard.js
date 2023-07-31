import Card from "react-bootstrap/Card";
import React from "react";

function PreviewMenuCard({ element, showModal, openFoodInfo, quantity }) {
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
    console.log(element)
  return(
    <>
      <Card onClick={openFoodInfo} style={{...cardStyle, cursor: showModal ? "pointer": "default", marginBottom: "5px" }}>
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
          <div
            style={{ position: "absolute", bottom: "10px" }}
            >
            ${parseFloat(element.price).toFixed(2)}
          </div>
          <div
          style={{ position: "absolute", bottom: "10px", right: "10px" }}
          >
            {element.recommend ? ("✨ Chef's Recommendation ✨"
            ):
            (<>
            </>)}
          </div>
          <div
            style={{position: "absolute", bottom: "10px", right: "15px"}}
            >
            {quantity 
              ? <>
                  Qty: {quantity}
                </>
              : <></>
            }
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default PreviewMenuCard;