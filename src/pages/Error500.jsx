import React from "react";
import error500 from "../assets/images/error-500.png"
function Error500() {
  return (
    <div className="error-page-container">
      <h1 className="error-title">500 - Internal Server Error</h1>
      <p className="error-message">Sorry! Something went wrong on our end.</p>
      <img
        src={error500}
        alt="Internal server error"
        className="error-image"
      />
    </div>
  );
}

export default Error500;
