import React from "react";
import Button from "react-bootstrap/Button";
import RemoveModal from "../menu/RemoveModal";
import { removeReview, updateReview } from "../../api/ReviewApi";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import StarRating from "./StarRating";
// Individual review component
function Review({ review, handleUserReviews, userReviews }) {
  const [date, setDate] = React.useState(0);
  const [dateText, setDateText] = React.useState("");
  const [showRemove, setShowRemove] = React.useState(false);
  const [editForm, setEditForm] = React.useState(false);
  const [newName, setNewName] = React.useState(review.name);
  const [newDetails, setNewDetails] = React.useState(review.review);
  const [newRating, setNewRating] = React.useState(review.rating);

  function handleNewRating(newRating) {
    setNewRating(newRating);
  }
  // Opening and closing edit form for a review
  const openEdit = () => setEditForm(true);
  const closeEdit = () => setEditForm(false);
  // Opening and closing remove modal
  const openRemove = () => setShowRemove(true);
  const closeRemove = () => setShowRemove(false);
  // Converting date to use relative time format
  React.useEffect(() => {
    const timeDiffSec = (Date.now() - review.date) / 1000;
    const timeDiffMin = timeDiffSec / 60;
    const timeDiffHour = timeDiffMin / 60;
    const timeDiffDay = timeDiffHour / 24;
    const timeDiffWeek = timeDiffDay / 7;
    const timeDiffMonth = timeDiffDay / 30;
    const timeDiffYear = timeDiffMonth / 12;
    if (timeDiffYear >= 1) {
      setDate(timeDiffYear);
      setDateText("year");
    } else if (timeDiffMonth >= 1) {
      setDate(timeDiffMonth);
      setDateText("month");
    } else if (timeDiffWeek >= 1) {
      setDate(timeDiffWeek);
      setDateText("week");
    } else if (timeDiffDay >= 1) {
      setDate(timeDiffDay);
      setDateText("day");
    } else if (timeDiffHour >= 1) {
      setDate(timeDiffHour);
      setDateText("hour");
    } else if (timeDiffMin >= 1) {
      setDate(timeDiffMin);
      setDateText("minute");
    } else {
      setDate(timeDiffSec);
      setDateText("second");
    }
  }, [review]);
  const stars = ["★", "★", "★", "★", "★"];
  const starStyle = {
    userSelect: "none",
  };
  const hoverStyle = {
    ...starStyle,
    color: "grey",
  };
  const ratingStyle = {
    ...starStyle,
    color: "#fabb05",
  };
  function removeCurrentReview() {
    removeReview(review.review_id);
    let tempUserReviews = [...userReviews];
    for (let i = 0; i < tempUserReviews.length; i++) {
      if (tempUserReviews[i].review_id === review.review_id) {
        tempUserReviews.splice(i, 1);
      }
    }
    handleUserReviews(tempUserReviews);
  }
  function updateCurrentReview() {
    const updatedReview = {
      name: newName,
      review: newDetails,
      date: Date.now(),
      food_id: review.food_id,
      user_id: review.user_id,
      rating: newRating,
    };
    updateReview(review.review_id, updatedReview);
    let tempUserReviews = [...userReviews];
    for (let rev of tempUserReviews) {
      if (rev.review_id === review.review_id) {
        rev.name = newName;
        rev.review = newDetails;
        rev.rating = newRating;
      }
    }
    handleUserReviews(tempUserReviews);
    closeEdit();
  }
  // Discards the current edit
  function cancelEdit() {
    setNewName(review.name);
    setNewRating(review.rating);
    setNewDetails(review.review);
    closeEdit();
  }
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid #dfdfdf",
          padding: "20px 10px 30px 20px",
        }}
      >
        <span style={{ fontWeight: "500" }}>{review.name}&nbsp;</span>
        {[...stars].map((star, index) => (
          <span
            key={index}
            style={index + 1 <= review.rating ? ratingStyle : hoverStyle}
          >
            {star}
          </span>
        ))}
        {userReviews ? (
          <>
            <Button
              variant="light"
              style={{ boxShadow: "none", float: "right" }}
              onClick={openEdit}
            >
              ✏️
            </Button>
          </>
        ) : (
          <></>
        )}
        <div style={{ color: "grey", fontSize: "14px", marginBottom: "10px" }}>
          {Math.floor(date)}{" "}
          {Math.floor(date) === 1 ? dateText + " ago" : dateText + "s ago"}
        </div>
        <div>
          {review.review}
          {userReviews ? (
            <>
              <Button
                variant="outline-danger"
                style={{ float: "right" }}
                onClick={openRemove}
              >
                Remove
              </Button>
              <RemoveModal
                show={showRemove}
                closeForm={closeRemove}
                remove={removeCurrentReview}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <Collapse in={editForm}>
          <div
            style={{
              paddingTop: "20px",
              marginTop: "20px",
              borderTop: "1px solid #dfdfdf",
            }}
          >
            <StarRating
              handleCurrentRating={handleNewRating}
              openForm={editForm}
              newRating={newRating}
            />
            <Form.Group className="mb-3" controlId="edit-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="edit-details">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                size="sm"
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="dark"
              onClick={updateCurrentReview}
              style={{ marginRight: "5px" }}
            >
              Save
            </Button>
            <Button
              variant="light"
              onClick={cancelEdit}
              style={{ border: "1px solid #dfdfdf" }}
            >
              Cancel
            </Button>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default Review;
