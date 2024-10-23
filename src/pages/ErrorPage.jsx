import React from "react";
import "../assets/styles/error-page.css";
import errorimage from "../assets/images/404.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
  const navigate = useNavigate();
  const handleGoBack = ()=>{
    navigate("/")
  }
  return (
    <div className="error-page-container">
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">
        Oops! The page you are looking for does not exist.
      </p>
      <img src={errorimage} alt="Page not found" className="error-image" />
      <Button className="error-button" onClick={handleGoBack}>
        Go Back to Home Page
      </Button>
    </div>
  );
}

export default ErrorPage;
