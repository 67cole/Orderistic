import React from "react";
import { dishTime } from "../api/MenuApi";

function EstimatedTime({ element }) {
  const center = {
    display: "flex", 
    justifyContent: "center"
  }
  const [orderTime, setOrderTime] = React.useState(0);

  // React.useEffect(() => {
  //   let time = 0;
  //   for (let food of element.food_ordered) {
  //     dishTime(food.id).then((data) => {
  //       setOrderTime(data);
  //     })
  //     console.log(dishTime(food.id).then())
  //     // time += dishTime(food.id).then();
  //   }
  //   setOrderTime(time);
  // }, [element])

  return(
    <>
      <div style={{...center, width: "30%", flexDirection: "column"}}>
        <div style={{...center}}>
          Estimated Time:
        </div>
        <div style={{...center, fontSize: "70px"}}>
          {orderTime} minutes
        </div>
      </div>
    </>
  )
}

export default EstimatedTime;