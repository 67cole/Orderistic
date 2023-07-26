import React from "react";
import Card from 'react-bootstrap/Card';
function OrderCard({ menu, food, price }) {
	const imgStyle = {
    width: "100%",
    objectFit: "cover",
    minHeight: "142px",
    height: "142px"
  };
	return(
		<div>
			<Card style={{ width: '10rem', height: "15rem", margin: "5px 5px 5px 5px"}}>
				<Card.Img variant="top" src={menu[food.id].image} style={imgStyle} />
				<Card.Body>
					<Card.Title style={{ fontSize: "16px"}}>{menu[food.id].name}</Card.Title>
					<div style={{position: "absolute", bottom: "10px", display: "inline-block"}}>
						${price ? price : food.price}
					</div>
					<div style={{position: "absolute", bottom: "10px", right: "16px", display: "inline-block"}}>
						Qty: {food.quantity}
					</div>
				</Card.Body>
			</Card>
			</div>
	)
}

export default OrderCard;