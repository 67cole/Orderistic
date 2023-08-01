import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import RemoveModal from "./RemoveModal";
import UpdateModal from "./UpdateModal";
import React from "react";
import { MenuContext } from "./StaffMenu";
import { RemoveItem } from "../api/MenuApi";

function StaffMenuCard({ element }) {
  const { menu, setMenu } = React.useContext(MenuContext);
  const [image, setImage] = React.useState(element.image);
  const [name, setName] = React.useState(element.name);
  const [description, setDescription] = React.useState(element.description);
  const [price, setPrice] = React.useState(element.price);
  const [showRemove, setShowRemove] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);

  React.useEffect(() => {}, [name]);
  function setStates(image, name, desc, price) {
    setImage(image);
    setName(name);
    setDescription(desc);
    setPrice(price);
  }
  const closeRemForm = () => setShowRemove(false);
  const showRemForm = () => setShowRemove(true);
  const closeUpdateForm = () => setShowUpdate(false);
  const showUpdateForm = () => setShowUpdate(true);

  function remove() {
    RemoveItem(element["id"]);
    let tempMenu = [...menu];
    for (let i = 0; i < tempMenu.length; i++) {
      if (tempMenu[i].id === element["id"]) {
        tempMenu.splice(i, 1);
      }
    }
    setMenu(tempMenu);
  }
  const imgStyle = {
    width: "200px",
    objectFit: "cover",
    height: "100%",
  };
  const cardStyle = {
    flexDirection: "row",
    height: "200px",
    width: "100%",
  };
  return (
    <>
      <Card style={cardStyle}>
        {image ? (
          <Card.Img variant="top" src={image} style={imgStyle} />
        ) : (
          <></>
        )}
        <Card.Body style={{ position: "relative" }}>
          <Card.Title>{name}</Card.Title>
          <Card.Text style={{ fontSize: "14px" }}>{description}</Card.Text>
          <Card.Text style={{ position: "absolute", bottom: "5px" }}>
            ${parseFloat(price).toFixed(2)}
          </Card.Text>
          <Button
            variant="outline-danger"
            onClick={showRemForm}
            style={{ position: "absolute", bottom: "15px", right: "15px" }}
          >
            Remove
          </Button>
          <Button
            variant="light"
            onClick={showUpdateForm}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            ✏️
          </Button>
        </Card.Body>
      </Card>
      <RemoveModal show={showRemove} closeForm={closeRemForm} remove={remove} />
      <UpdateModal
        show={showUpdate}
        closeForm={closeUpdateForm}
        element={element}
        setStates={setStates}
      />
    </>
  );
}

export default StaffMenuCard;
