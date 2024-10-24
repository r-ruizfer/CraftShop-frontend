import React from 'react'
import { AuthContext } from "../context/auth.context";
import {useContext } from "react";
import { Link } from "react-router-dom";
import alto from "../assets/images/alto.jpg"
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
function notLogIn() {
const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <div id='not-login'>
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
        <img src={alto} alt="Alto ahi hermano" style={{width:"500px", marginTop:"20px"}} />
    </div>
  )
}

export default notLogIn

