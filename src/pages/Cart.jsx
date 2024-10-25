import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/config";

import ProductList from "../components/ProductList";
import NotLogin from "../components/NotLogin";
import PaymentIntent from "../components/PaymentIntent";

import { CartContext } from "../context/cart.context.jsx";
import { AuthContext } from "../context/auth.context";
import { WishlistContext } from "../context/wishlist.context";
import { Button, Spinner, Breadcrumb } from "react-bootstrap";

function Cart() {
  const { productsInCart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  const navigate = useNavigate();

  const cartBreadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Cart</Breadcrumb.Item>
    </Breadcrumb>
  );

  useEffect(() => {
    const getUserProfile = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user && user._id) {
        try {
          const response = await service.get(`/users/${user._id}`);
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
        } catch (err) {
          setErrorMessage(err.response?.data?.message || "Error loading profile");
          navigate("/error");
        }
      } else {
        setErrorMessage("User ID is not available.");
      }
      setLoading(false);
    };
    getUserProfile();
  }, [isLoggedIn, user, navigate, setWishlist]);

  const totalPrice = productsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
        <Spinner animation="border" variant="dark" className="homepage-spinner" />
        <p>...Loading Cart...</p>
      </>
    );
  }

  if (productsInCart.length === 0) {
    return (
      <>
        {cartBreadcrumb}
        <div className="info-page">
          <p>No products yet in your cart</p>
          <Link to="/">
            <button className="keep-looking-btn">Keep looking</button>
          </Link>
        </div>
      </>
    );
  }

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
          {!showPaymentIntent ? (
            <Button
              className="purchase-button"
              id="checkout-btn"
              onClick={() => setShowPaymentIntent(true)}
            >
              Proceed to checkout
            </Button>
          ) : (
            <>
              <PaymentIntent productDetails={productsInCart} />
              <Button
                onClick={() => setShowPaymentIntent(false)}
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
