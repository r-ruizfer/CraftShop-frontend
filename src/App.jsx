import React from 'react'
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

function App() {
  return (
<>
         <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/:productId" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/profile/:userId" element={<Profile/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
      </Routes>
</>
  )
}

export default App;
{/* </> */}