import React from "react";
import FoodInfo from "./FoodInfo";
import PreviewMenuCard from "./PreviewMenuCard";

function MenuCard({ element }) {
  // For showing the food information modal
  const [show, setShow] = React.useState(false);

  const openFoodInfo = () => {
    setShow(true);
  };
  const closeFoodInfo = () => setShow(false);
  return (
    <>
      <PreviewMenuCard
        element={element}
        showModal={true}
        openFoodInfo={openFoodInfo}
        reviews={true}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FoodInfo show={show} closeForm={closeFoodInfo} element={element} />
      </div>
    </>
  );
}

export default MenuCard;
