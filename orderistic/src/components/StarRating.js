import React from "react";

function StarRating({ handleCurrentRating, openForm, newRating }) {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const stars = ["★", "★", "★", "★", "★"];
  const starStyle = {
    fontSize: "40px",
    cursor: "pointer",
    userSelect: "none"
  }
  const hoverStyle = {
    ...starStyle,
    color: "grey",
  }
  const ratingStyle = {
    ...starStyle,
    color: "#fabb05",
  }
  // Resets rating when form is closed and sets rating to new rating if prop is passed.  
  React.useEffect(() => {
    if (newRating) {
      setRating(newRating);
      setHoverRating(0);
    }
    else {
      setRating(0);
      setHoverRating(0);
    }
  }, [openForm, newRating])
  function changeRating(index) {
    if (index === rating) {
      setRating(0);
      handleCurrentRating(0);
    }
    else {
      setRating(index);
      handleCurrentRating(index);
    }
    
  }
  return(
    <>
      {[...stars].map((star, index) => (
        <span 
          key={index} 
          onClick={() => changeRating(index + 1)} 
          style={(index + 1 <= (hoverRating || rating)) ? ratingStyle : hoverStyle}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(rating)}
        >
          {star}
        </span>
      ))}
    </>
  )
}

export default StarRating;