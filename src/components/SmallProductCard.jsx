import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context.jsx";
import service from "../services/config";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import PaymentIntent from "./PaymentIntent";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { shopping_cart_remove } from "react-icons-kit/ikons/shopping_cart_remove";

function SmallProductCard(props) {
  const { eachProduct, type, wishlist, setWishlist } = props;
  const { productsInCart, setProductsInCart } = useContext(CartContext);

  const [userProfile, setUserProfile] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  // Add to wishlist
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

  const handleWishlist = async (productId) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        if (isWishlisted) {
          console.log("entrando en quitar");
          const response = await service.patch(
            `users/${user._id}/products/${eachProduct._id}/removeWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
          setIsWishlisted(false);
          console.log("quitado de favoritos");
          console.log("wishlist");
        } else if (!isWishlisted) {
          console.log("entrando en añadir");
          const response = await service.patch(
            `users/${user._id}/products/${productId}/addWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
          setIsWishlisted(true);
          console.log("añadido a favoritos");
          console.log("wishlist");
        } else {
          console.log(isWishlisted, "error");
        }
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
  console.log(wishlist, "lista de deseos");

  return (
    <div className="small-card">
      <div className="small-product-image">
        <Link key={eachProduct._id} to={`/${eachProduct._id}`}>
          <img src={eachProduct.image} alt="" />
        </Link>
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
      </div>

      <div id="small-card-right">
        <div className="small-card-info">
          <h2>{eachProduct.title}</h2>
          <p>{eachProduct.price} €</p>
        </div>
        {type === "cart" ? (
          <div className="box-buttons">
            <Button
              id="remove-item-btn"
              onClick={(event) => {
                event.preventDefault();
                handleDeleteCart(eachProduct._id);
              }}
            >
              <Icon icon={shopping_cart_remove} /> Remove
            </Button>{" "}
            <div className="buy-button">
              {!showPaymentIntent ? (
                <Button
                  id="purchase-btn"
                  onClick={() => setShowPaymentIntent(true)}
                >
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
