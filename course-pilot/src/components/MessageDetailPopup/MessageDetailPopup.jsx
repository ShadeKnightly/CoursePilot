import React from 'react';
import './MessageDetailPopup.css';
import CardComp from "../card/cardComponent";

const MessageDetailPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <CardComp className="message-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        <h3 className="selected-message-subject">
          {message.subject}
        </h3>
        
        <p className="selected-message-info">
          From: <b>{message.sender}</b> ({message.email}) | {message.date}
        </p>
        
        <hr />
        
        <p className="selected-message-body">
          {message.message}
        </p>
      </CardComp>
    </div>
  );
};

export default MessageDetailPopup;
