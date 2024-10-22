import React from "react";
import "../assets/styles/error-page.css";
import errorimage from "../assets/images/404.jpg";

function ErrorPage() {
  return (
    <div className="error-page-container">
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">
        Oops! The page you are looking for does not exist.
      </p>
      <img src={errorimage} alt="Page not found" className="error-image" />
    </div>
  );
}

export default ErrorPage;
