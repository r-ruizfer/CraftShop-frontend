import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import "../assets/styles/homepage.css";
import { WishlistContext } from "../context/wishlist.context";
import Icon from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import { Link } from "react-router-dom";
function ProductCard(props) {
  const { eachProduct } = props;
  const {
    wishlist,
    setWishlist,
    isWishlisted,
    setIsWishlisted,
    handleWishlist,
  } = useContext(WishlistContext);

  if (!eachProduct) {
    return (
      <>
        <Spinner
          animation="border"
          variant="dark"
          className="homepage-spinner"
        />
        <p>...Loading product details...</p>
      </>
    );
  }
  return (
    <div className="cards-container">
      <Card className="product-card" key={eachProduct.id}>
        <button
          className="fav-button"
          onClick={() => handleWishlist(eachProduct._id)}
        >
          {isWishlisted ? (
            <Icon icon={ic_favorite} />
          ) : (
            <Icon icon={ic_favorite_border} />
          )}
        </button>
        <Link key={eachProduct._id} to={`/product/${eachProduct._id}`}>
          <Card.Img variant="top" src={eachProduct.image} />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{eachProduct.title}</Card.Title>
            <Card.Text className="mt-auto">{eachProduct.price} €</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
}

export default ProductCard;
