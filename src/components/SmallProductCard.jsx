import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context.jsx";
import service from "../services/config";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import PaymentIntent from "./PaymentIntent";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {shopping_cart_remove} from 'react-icons-kit/ikons/shopping_cart_remove'


function SmallProductCard(props) {
  const { eachProduct, type, wishlist, setWishlist } = props;
  const { productsInCart, setProductsInCart } = useContext(CartContext);

  const [userProfile, setUserProfile] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  const handleWishlist = async (productId) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      //comprobar si usuario esta logeado
      if (storedToken && isLoggedIn && user) {
        const isWishlisted = wishlist.some(
          (product) => product._id === productId
        );
        // esta en la wishlist? lo quitamos
        if (isWishlisted) {
          const response = await service.patch(
            `users/${user._id}/products/${productId}/removeWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
        }
        //no esta, lo añadimos
        else {
          const response = await service.patch(
            `users/${user._id}/products/${productId}/addWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
        }

        //si usuario no esta logeado
      } else {
        setErrorMessage("User ID no available");
        alert("Sorry, you need to log in to add items to wishlist.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCart = (productId) => {
    const currentCart = productsInCart.filter(
      (eachProduct) => eachProduct._id !== productId
    );
    setProductsInCart(currentCart);
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  console.log("cada producto", eachProduct);
  console.log("user", user);
  console.log("logged", isLoggedIn);


  return (
  
    <div className="small-card">
      <Link key={eachProduct._id} to={`/product/${eachProduct._id}`}>
        <div className="small-product-image" >
          <img src={eachProduct.image} alt="" />
          <button
            className="fav-button"
            onClick={(event) => {
              event.preventDefault();
              handleWishlist(eachProduct._id);
            }}
          >
            <Icon icon={ic_favorite} />
          </button>
        </div>
      </Link>
      <div id="small-card-right">
      <div className="small-card-info">
        <h2>{eachProduct.title}</h2>
        <p>{eachProduct.price} €</p>
      </div>
      {type === "cart" ? (
         <div id="cart-buttons-box">

<Button variant="secondary" 
              id="remove-item-btn"
              onClick={(event) => {
                event.preventDefault();
                handleDeleteCart(eachProduct._id);
              }}
            >
              <Icon icon={shopping_cart_remove}/> Remove
              </Button>{' '}

            <div className="buy-button">
              {showPaymentIntent === false ? (
               
               <Button id="purchase-btn" variant="primary" onClick={() => setShowPaymentIntent(true)}>
                  Purchase
                  </Button>
              ) : (
                <PaymentIntent productDetails={eachProduct} />
              )}
            </div>
            </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SmallProductCard;
