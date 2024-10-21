import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function ProductCard(props) {
  const { eachProduct } = props;
  return (
    <div className="cards-container">
      <Card style={{ width: "18rem" }} key={eachProduct._id}>
        <Card.Img variant="top" src={eachProduct.image} />
        <Card.Body>
          <Card.Title>{eachProduct.title}</Card.Title>
          <Card.Text>{eachProduct.price} €</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
