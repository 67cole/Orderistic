import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";
import ReviewModal from "./ReviewModal";
import { returnDishRating } from "../api/ReviewApi";


function PreviewMenuCard({ element, showModal, openFoodInfo, quantity, reviews }) {
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
    // For showing the review modal
    const [showReview, setShowReview] = React.useState(false);
    const [dishRating, setDishRating] = React.useState(0);
    React.useEffect(() => {
      if (reviews) {
        returnDishRating(element.id).then((data) => {
          setDishRating(data);
        })
      }
    }, [element, reviews])
    function openReviews(e) {
      e.stopPropagation();
      setShowReview(true);
    } 
    const closeReviews = (e) => {
      if (e) {
        e.stopPropagation();
      }
      setShowReview(false);
    }
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
          {reviews
            ? <>
                <Button 
                  onClick={e => openReviews(e)} 
                  variant="outline-dark"
                  style={{ 
                    borderRadius:"20px", 
                    boxShadow: "none", 
                    padding: "0px 5px 0px 5px",
                    borderColor: "#dfdfdf"
                  }}
                > 
                  ★ {isNaN(dishRating) ? 0 : dishRating.toFixed(1)}
                </Button>
                <ReviewModal show={showReview} handleClose={e => closeReviews(e)} element={element}/>
              </>
            : <></>
          }
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