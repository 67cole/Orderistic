import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from "react";
import { addReview, returnDishReview, returnUserReview } from '../api/ReviewApi';
import { useAuth } from "../contexts/AuthContext";
import Form from 'react-bootstrap/Form';
import StarRating from './StarRating';
import Collapse from 'react-bootstrap/Collapse';
import Review from './Review';

function ReviewModal({ show, handleClose, element }) {
  const center = {
    display: "flex",
    justifyContent: "center",
  };

  const { currentUser } = useAuth();

  const [reviews, setReviews] = React.useState([]);
  const [userReviews, setUserReviews] = React.useState([]);
  const [currentReview, setCurrentReview] = React.useState("");
  const [name, setName] = React.useState("");
  const [currentRating, setCurrentRating] = React.useState(0);
  const [openForm, setOpenForm] = React.useState(false);
  React.useEffect(() => {
    // Obtains all dish reviews for a dish and filters out the reviews made by the user
    returnDishReview(element.id).then((data) => {
      if (currentUser) {
        data = data.filter(review => 
          review.user_id !== currentUser.uid  
        )
      }
      data.sort((date1, date2) => date2.date - date1.date);
      setReviews(data);
    })
    // If current user is not a guest, it will obtain all reviews made by the user for the dish.
    if (currentUser) {
      returnUserReview(currentUser.uid).then((data) => {
        data = data.filter(review => 
          review.food_id === element.id
        )
        data.sort((date1, date2) => date2.date - date1.date);
        setUserReviews(data);
      })
    }
  }, [element, currentUser])
  function handleUserReviews(newReviewList) {
    setUserReviews(newReviewList)
  }
  function handleCurrentRating(newRating) {
    setCurrentRating(newRating);
  }
  // Adding review and resetting the form
  function addCurrentReview() {
    const review = {
      name: name,
      review: currentReview,
      date: Date.now(),
      food_id: element.id,
      user_id: currentUser ? currentUser.uid : "",
      rating: currentRating,
    }
    addReview(review);
    let tempUserReviews = [...userReviews, review];
    tempUserReviews.sort((date1, date2) => date2.date - date1.date)
    setUserReviews(tempUserReviews);
    setName("");
    setCurrentRating(0);
    setCurrentReview("");
    setOpenForm(false);
  }
  function cancelReview() {
    setName("");
    setCurrentReview("");
    setCurrentRating(0);
    setOpenForm(false);
  }
  function sortByDate() {
    let tempReviews = [...reviews];
    tempReviews.sort((date1, date2) => date2.date - date1.date);
    setReviews(tempReviews);
  }
  function sortByHighestRating() {
    let tempReviews = [...reviews];
    tempReviews.sort((review1, review2) => review2.rating - review1.rating);
    setReviews(tempReviews);
  }
  function sortByLowestRating() {
    let tempReviews = [...reviews];
    tempReviews.sort((review1, review2) => review1.rating - review2.rating);
    setReviews(tempReviews);
  }
  return(
    <div onClick ={(e) => e.stopPropagation()}>
      <Modal 
        show={show} 
        onHide={handleClose}
      >
        <div style={center}>
          <Modal.Header style={{ width: "100%"}}closeButton>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body style={{ padding: "20px 30px 10px 30px" }}>
          <div style={{...center, fontSize: "24px", color: "#585858", marginBottom: "10px"}}>
          {element.name}
          </div>
          <div style={center}>
          <Button 
            variant="outline-light" 
            style={{ 
              color: "black",
              border: "1px solid #dfdfdf", 
              borderRadius: "20px", 
              padding: "3px 12px 3px 12px", 
              boxShadow: "none"
            }} 
            onClick={() => setOpenForm(true)}
          >
            Write review
          </Button>
          </div>
          <Collapse in={openForm}>
            <div>
              <div style={center}>
                <StarRating handleCurrentRating={handleCurrentRating} openForm={openForm} newRating={currentRating}/>
              </div>
              <Form.Group className="mb-3" controlId="review-name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  size="sm" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="review-details">
                <Form.Label>Details</Form.Label>
                <Form.Control 
                  as="textarea" 
                  size="sm" 
                  rows={3}
                  value={currentReview}
                  onChange={(e) => setCurrentReview(e.target.value)}
                />
              </Form.Group>
              <div style={center}>
              <Button variant="dark" disabled={currentRating === 0 || name === ""} style={{marginRight: "5px", boxShadow: "none", borderRadius: "10px"}} onClick={addCurrentReview}>
                Post
              </Button>
              <Button variant="outline-light" style={{ color: "black", boxShadow: "none", border: "1px solid #dfdfdf", borderRadius: "10px" }} onClick={cancelReview}>
                Cancel
              </Button>
              </div>
            </div>
            </Collapse>
          <div style={{borderTop: "1px solid #dfdfdf", marginTop: "20px", marginBottom: "20px"}}>
            {userReviews.map((review) => (
              <Review key={review.review_id} review={review} handleUserReviews={handleUserReviews} userReviews={userReviews}/>
            ))}
          </div>
          {reviews.length === 0 && userReviews.length === 0
            ? <div style={center}>
                No reviews yet.
              </div>
            : <div>
                <Button 
                  variant="outline-light" 
                  style={{ 
                    border: "1px solid #dfdfdf", 
                    borderRadius: "20px", 
                    padding: "3px 12px 3px 12px", 
                    boxShadow: "none",
                    marginRight: "5px",
                    color: "black"
                  }} 
                  onClick={sortByDate}
                >
                  Newest
                </Button>
                <Button 
                  variant="outline-light" 
                  style={{ 
                    border: "1px solid #dfdfdf", 
                    borderRadius: "20px", 
                    padding: "3px 12px 3px 12px", 
                    boxShadow: "none",
                    marginRight: "5px",
                    color: "black"
                  }} 
                  onClick={sortByHighestRating}
                >
                  Highest
                </Button>
                <Button 
                  variant="outline-light" 
                  style={{ 
                    border: "1px solid #dfdfdf", 
                    borderRadius: "20px", 
                    padding: "3px 12px 3px 12px", 
                    boxShadow: "none",
                    color: "black"
                  }} 
                  onClick={sortByLowestRating}
                >
                  Lowest
                </Button>
              </div>
          }
          
          <div style={{ marginBottom: "10px" }}>
          {reviews.map((review, index) => (
              <Review key={index} review={review}/>
            ))}
          </div>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default ReviewModal;