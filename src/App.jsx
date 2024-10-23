import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Private from "./components/auth/Private";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Login from "./pages/Auth/Login";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Signup from "./pages/Auth/Signup";
import WishList from "./pages/WishList";
import ErrorPage from "./pages/ErrorPage";
import SearchResults from "./pages/SearchResults";
import PaymentSuccess from "./pages/PaymentSuccess";
import Error500 from "./pages/Error500";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import "./assets/styles/small-product-card.css";
import "./assets/styles/signup.css";
import "./assets/styles/login.css";
import "./assets/styles/homepage.css";
import "./assets/styles/profile.css";
import "./assets/styles/error-page.css";
import "./assets/styles/product-detail.css";
import "./assets/styles/search-result.css";
import "./assets/styles/payment-success.css";

function App() {
  console.log("URL backend", import.meta.env.VITE_SERVER_URL);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/error" element={<Error500 />} />

        <Route
          path="/products/searchresults/:query"
          element={<SearchResults />}
        />

        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
