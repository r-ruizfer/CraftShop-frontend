import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import PaymentIntent from "./PaymentIntent";

import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context.jsx";
import { WishlistContext } from "../context/wishlist.context";

import Button from "react-bootstrap/Button";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import { shopping_cart_remove } from "react-icons-kit/ikons/shopping_cart_remove";

function SmallProductCard(props) {
  const { eachProduct, type } = props;

  const { productsInCart, setProductsInCart, handleDeleteCart } =
    useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const {
    wishlist,
    setWishlist,
    
    handleWishlist,
  } = useContext(WishlistContext);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

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

  // CONSOLE LOGS

  console.log("cada producto", eachProduct);
  console.log("user", user);
  console.log("logged", isLoggedIn);
  console.log(wishlist, "lista de deseos DESDE SMALL PRODUCT");

  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="small-card">
      <div className="small-product-image">
        <Link key={eachProduct._id} to={`/product/${eachProduct._id}`}>
          <img src={eachProduct.image} alt="" />
        </Link>
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
      </div>

      <div id="small-card-right">
        <div className="small-card-info">
          <h2>{eachProduct.title}</h2>
          <p>{eachProduct.price} €</p>
          {type === "cart" ? <p>{eachProduct.quantity} units</p> : ""}
        </div>

        {type === "cart" ? 
       (<>
        {!showPaymentIntent ? (
          <div className="box-buttons">
            <Button
              id="remove-item-btn"
              onClick={(event) => {
                event.preventDefault();
                handleDeleteCart(eachProduct._id);
              }}
            >
              <Icon icon={shopping_cart_remove} /> Remove
            </Button>
            <Button
              id="purchase-btn"
              onClick={() => setShowPaymentIntent(true)}
            >
              Purchase
            </Button>
          </div>
        ) : (
          <>
            <PaymentIntent productDetails={eachProduct} />
            <Button
              onClick={() => {
                setShowPaymentIntent(false);
              }}
              id="back-pay-button"
            >
              Cancel
            </Button>
          </>
        )}
        </>) : ("")
      }
      </div>
    </div>
  );
}

export default SmallProductCard;
