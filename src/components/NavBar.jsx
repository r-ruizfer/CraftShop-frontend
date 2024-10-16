import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar";

function Navbar() {
  return (
    <div>
    <nav>
        <Link to={"/"}> <li>Logo</li> </Link>
        <li><SearchBar/></li>
        <Link to={"/wishlist"}> <li>Favs</li> </Link>
        <Link to={"/cart"}> <li>Cartbutton</li> </Link>
        <Link to={"/login"}> <li>Log in</li> </Link>
        <Link to={"/signup"}> <li>Sign up</li> </Link>
        <li>profilebutton</li>
        </nav>
    </div>
  )
}

export default Navbar
