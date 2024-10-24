import React, { useContext, useState, useEffect } from "react";
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
    handleWishlist,
  } = useContext(WishlistContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

// COMPROBAR SI LISTA DE DESEOS CAMBIA
useEffect(() => {
  if (
    wishlist &&
    wishlist.some((product) => product._id === eachProduct._id)
  ) {
    setIsWishlisted(true);
  } else {
    setIsWishlisted(false);
  }
}, [wishlist, eachProduct._id]);

const toggleWishlist = () => {
  handleWishlist(eachProduct._id); // Añadir o quitar del wishlist
  setIsWishlisted(!isWishlisted); // Cambiar el estado de este producto
};


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
          onClick={toggleWishlist}
        >
          {isWishlisted ? (
            <Icon icon={ic_favorite} />
          ) : (
            <Icon icon={ic_favorite_border} />
          )}
        </button>
        
        <Link key={eachProduct._id} to={`/product/${eachProduct._id}`}>
          <Card.Img className="card-image" variant="top" src={eachProduct.image} />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{eachProduct.title}</Card.Title>
            <Card.Text className="mt-auto">{eachProduct.price.toFixed(2)} €</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
}

export default ProductCard;
