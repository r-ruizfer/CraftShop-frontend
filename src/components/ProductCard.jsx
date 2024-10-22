import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "../assets/styles/homepage.css";

function ProductCard(props) {
  const { eachProduct } = props;
  return (
    <div className="cards-container">
      <Card className="product-card" key={eachProduct.id}>
        <Card.Img variant="top" src={eachProduct.image} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{eachProduct.title}</Card.Title>
          <Card.Text className="mt-auto">{eachProduct.price} €</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
