import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from "react";
import { addReview, returnDishReview, returnUserReview } from '../api/ReviewApi';
import { useAuth } from "../contexts/AuthContext";
import Form from 'react-bootstrap/Form';
import StarRating from './StarRating';
import Collapse from 'react-bootstrap/Collapse';
import Review from './Review';
import { generateID } from './helper';

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
    returnDishReview(element.id).then((data) => {
      data.sort((date1, date2) => date2.date - date1.date);
      setReviews(data);
    })
    if (currentUser) {
      returnUserReview(currentUser.uid).then((data) => {
        data.sort((date1, date2) => date2.date - date1.date);
        setUserReviews(data);
      })
    }
  }, [element, currentUser])

  function handleCurrentRating(newRating) {
    setCurrentRating(newRating);
  }
  // function checkReview() {
  //   if (!name) {

  //   }
  // }
  function addCurrentReview() {
    const review = {
      name: name,
      review: currentReview,
      date: Date.now(),
      food_id: element.id,
      user_id: currentUser ? currentUser.uid : "",
      rating: currentRating,
      review_id: generateID()
    }
    addReview(review);
    setName("");
    setCurrentRating(0);
    setCurrentReview("");
  }
  function cancelReview() {
    setName("");
    setCurrentRating(0);
    setCurrentReview("");
    setOpenForm(false);
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
            variant="light" 
            style={{ 
              backgroundColor: "white", 
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
                <StarRating handleCurrentRating={handleCurrentRating}/>
              </div>
              <Form.Group className="mb-3" controlId="review">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  size="sm" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="review">
                <Form.Label>Place a review</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  value={currentReview}
                  onChange={(e) => setCurrentReview(e.target.value)}
                />
              </Form.Group>
              <div style={center}>
              <Button variant="dark" style={{marginRight: "5px", boxShadow: "none"}} onClick={addCurrentReview}>
                Post
              </Button>
              <Button variant="dark" style={{ boxShadow: "none" }} onClick={cancelReview}>
                Cancel
              </Button>
              </div>
            </div>
            </Collapse>
          <div style={{borderTop: "1px solid #dfdfdf", marginTop: "20px", marginBottom: "20px"}}>
            {userReviews.map((review) => (
              <Review review={review}/>
            ))}
          </div>
          <div>
            <Button 
              variant="light" 
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #dfdfdf", 
                borderRadius: "20px", 
                padding: "3px 12px 3px 12px", 
                boxShadow: "none"
              }} 
            >
              Newest
            </Button>
          </div>
          <div>
          {reviews.map((review) => (
              <Review review={review}/>
            ))}
          </div>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default ReviewModal;