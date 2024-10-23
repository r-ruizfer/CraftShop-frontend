import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/config";
import { Spinner } from "react-bootstrap";

import ProductList from "../components/ProductList";
import NotLogin from "../components/NotLogin";

import { CartContext } from "../context/cart.context.jsx";
import { AuthContext } from "../context/auth.context";
import { WishlistContext } from "../context/wishlist.context";

function Cart() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { productsInCart, setProductsInCart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const {
    wishlist,
    setWishlist,
    isWishlisted,
    setIsWishlisted,
    handleWishlist,
  } = useContext(WishlistContext);

  useEffect(() => {
    const getUser = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        if (user._id) {
          service
            .get(`/users/${user._id}`)
            .then((response) => {
              setUserProfile(response.data);
              setWishlist(response.data.wishlistedItems);
              setLoading(false);
            })
            .catch((err) => {
              setErrorMessage(err.response.data.message);
              navigate("/error");
              console.log(err);
            });
        } else {
          setErrorMessage("User ID is not available.");
          setLoading(false);
        }
      }
    };
    getUser();
  }, [isLoggedIn, user]);

  if (errorMessage) return <div>{errorMessage}</div>;

  if (!userProfile) {
    return <NotLogin />;
  }

  if (!productsInCart || productsInCart.length === 0)
    return (
      <div className="info-page">
        <p>No products yet in you cart</p>
        <Link to={"/"}>
          <button className="keep-looking-btn">Keep looking</button>
        </Link>
      </div>
    );
  /* console.log("carrito desde pagina cart", productsInCart);*/
  if (loading)
    return (
      <>
        <Spinner
          animation="border"
          variant="dark"
          className="homepage-spinner"
        />
        <p>...Loading Cart...</p>
      </>
    );

  return (
    <div id="cart-screen">
      <ProductList type="cart" products={productsInCart} />
    </div>
  );
}

export default Cart;
