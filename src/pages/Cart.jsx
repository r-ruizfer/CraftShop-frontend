import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/config";

import ProductList from "../components/ProductList";
import NotLogin from "../components/NotLogin";
import PaymentIntent from "../components/PaymentIntent";

import { CartContext } from "../context/cart.context.jsx";
import { AuthContext } from "../context/auth.context";
import { WishlistContext } from "../context/wishlist.context";
import { Button } from "react-bootstrap";
import { Spinner, Breadcrumb } from "react-bootstrap";

function Cart() {
  const { productsInCart, setProductsInCart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goCart = () => {
    navigate("/cart");
  };
  const cartBreadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item onClick={goHome}>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Cart</Breadcrumb.Item>
    </Breadcrumb>
  );
  const {
    wishlist,
    setWishlist,
    isWishlisted,
    setIsWishlisted,
    handleWishlist,
  } = useContext(WishlistContext);

  console.log(productsInCart, "products in cart");

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

  // TOTAL A PAGAR DEL CARRITO
  let totalPrice = 0;
  for (let i = 0; i < productsInCart.length; i++) {
    totalPrice += productsInCart[i].price * productsInCart[i].quantity;
  }

  if (errorMessage) return <div>{errorMessage}</div>;
  
  
  if (!userProfile) {
    return (
      <>
        {cartBreadcrumb}
        <NotLogin />
      </>
    );
  }
  if (loading) {
    return (
      <>
        {cartBreadcrumb}
        <Spinner
          animation="border"
          variant="dark"
          className="homepage-spinner"
        />
        <p>...Loading Cart...</p>
      </>
    );
  }

  if (!productsInCart || productsInCart.length === 0)
    return (
      <>
        {cartBreadcrumb}
        <div className="info-page">
          <p>No products yet in you cart</p>
          <Link to={"/"}>
            <button className="keep-looking-btn">Keep looking</button>
          </Link>
        </div>
      </>
    );

 

  return (
    <>
      {cartBreadcrumb}
      <div id="cart-screen">
        <ProductList type="cart" products={productsInCart} />

        <div id="cart-total">
          <div>
            <h2>Total amount to pay:</h2>
            <p>{totalPrice.toFixed(2)} €</p>
          </div>

          {showPaymentIntent === false ? (
            <div className="box-buttons">
              <Button
                className="purchase-button"
                id="checkout-btn"
                onClick={() => setShowPaymentIntent(true)}
              >
                Proceed to checkout
              </Button>
            </div>
          ) : (
            <>
              <PaymentIntent productDetails={productsInCart} />
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
        </div>
      </div>
    </>
  );
}

export default Cart;
