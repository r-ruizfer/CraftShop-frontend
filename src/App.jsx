import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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

function App() {
  console.log("URL backend", import.meta.env.VITE_SERVER_URL);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile/"
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
{
  /* </> */
}
