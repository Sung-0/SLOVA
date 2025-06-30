import React from "react";
import "./LogModal.css";
import LogPopup from "./LogPopup";

const LogModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="log-close-btn" onClick={onClose}>X</button>
        <LogPopup onClose={onClose} />
      </div>
    </div>
  );
};

export default LogModal;