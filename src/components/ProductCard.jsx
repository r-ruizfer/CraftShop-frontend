import React from "react";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import "../assets/styles/homepage.css";

function ProductCard(props) {
  const { eachProduct } = props;

  if(!eachProduct){
   return (
      <>
        <Spinner animation="border" variant="dark"  className="homepage-spinner" />
        <p>...Loading product details...</p>
      </>
    );
  }
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
