import React from "react";

function Review({ review }) {
  const [date, setDate] = React.useState(0);
  const [dateText, setDateText] = React.useState("");
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
    }
    else if (timeDiffMonth >= 1) {
      setDate(timeDiffMonth);
      setDateText("month");
    }
    else if (timeDiffWeek >= 1) {
      setDate(timeDiffWeek);
      setDateText("week");
    }
    else if (timeDiffDay >= 1) {
      setDate(timeDiffDay);
      setDateText("day");
    }
    else if (timeDiffHour >= 1) {
      setDate(timeDiffHour);
      setDateText("hour");
    }
    else if (timeDiffMin >= 1) {
      setDate(timeDiffMin);
      setDateText("minute");
    }
    else {
      setDate(timeDiffSec);
      setDateText("second");
    }
  }, [review])
  const stars = ["★", "★", "★", "★", "★"];
  const starStyle = {
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
  return(
    <>
      <div style={{ borderBottom: "1px solid #dfdfdf", padding: "20px 0px 20px 20px"}}>
        <span style={{ fontWeight: "500"}}>
        {review.name}&nbsp;
        </span>
        {[...stars].map((star, index) => (
          <span 
            key={index} 
            style={(index + 1 <= review.rating) ? ratingStyle : hoverStyle}
          >
            {star}
          </span>
        ))}
        <div style={{ color: "grey", fontSize: "14px", marginBottom: "10px" }}>
          {Math.floor(date)} {Math.floor(date) === 1 ? dateText + " ago" : dateText + "s ago"}
        </div>
        <div>
        {review.review}
        </div>
      </div>
    </>
  )
}

export default Review;