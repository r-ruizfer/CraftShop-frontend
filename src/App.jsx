import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Login from "./pages/Auth/Login";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Signup from "./pages/Auth/Signup";
import WishList from "./pages/WishList";
import ErrorPage from "./pages/ErrorPage";
import Private from "./components/auth/Private";
import SearchResults from "./pages/SearchResults";
function App() {
  console.log("URL backend", import.meta.env.VITE_SERVER_URL);

  const [productsInCart, setProductsInCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/:productId"
          element={
            <ProductDetails
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
            />
          }
        />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/products/searchresults/:query"
          element={<SearchResults />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
{
  /* </> */
}
