// src/components/MessageItem/messageItem.jsx
import React from "react";
import "./messageItem.css";

function MessageItem({ senderId, subject, body, date, onRemove }) {
  return (
    <div className="class-card">
      <div className="course-code">
        <h4>{subject}</h4>
      </div>

      <div className="course-details">
        <div className="info">
          <p><strong>From (user ID):</strong> {senderId}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>
        <div className="description">
          <p>{body}</p>
        </div>
      </div>

      <div className="actions">
        <button className="remove-btn" onClick={onRemove}>Delete</button>
      </div>
    </div>
  );
}

export default MessageItem;
