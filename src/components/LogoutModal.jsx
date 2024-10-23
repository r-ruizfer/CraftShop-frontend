import React from "react";
import '../assets/styles/LogoutModal.css'
function LogoutModal({ show, onClose, onConfirm }) {
  if (!show) return null; 

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal-content">
        <h2>Are you sure you want to Log Out?</h2>
        <button onClick={onConfirm}>Yes, Log Out</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default LogoutModal;
