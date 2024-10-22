import React from "react";
import { useState, useEffect, useContext } from "react";
import ProductList from "../components/ProductList";
import service from "../services/config";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart.context.jsx";
import { AuthContext } from "../context/auth.context";

function Cart() {
  const { productsInCart, setProductsInCart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate()

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
              ;
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
    return (
      <>
        <h1>You are not logged in!</h1>
        {!isLoggedIn && (
          <Link to="/signup">
            {" "}
            <li>Sign Up</li>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <li>Log In</li>
          </Link>
        )}
      </>
    );
  }

  if (!productsInCart || productsInCart.length === 0)
    return (
      <div>
        <p>No products yet in you cart</p>
        <Link to={"/"}>
          <button>Keep looking</button>
        </Link>
      </div>
    );
  console.log("carrito desde pagina cart", productsInCart);

  return (
    <div id="cart-screen">
      <ProductList type="cart" products={productsInCart} />
    </div>
  );
}

export default Cart;
