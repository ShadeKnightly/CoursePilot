import React from "react";
import "./classItem.css";

function ClassItem({ courseCode, name, term, startEnd, program, description, onAdd, onRemove }) {
  return (
    <div className="class-card">
      <div className="course-code">
        <h4>{courseCode}</h4>
      </div>

      <div className="course-details">
        <div className="info">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Term:</strong> {term}</p>
          <p><strong>Start/End:</strong> {startEnd}</p>
          <p><strong>Program:</strong> {program}</p>
        </div>
        <div className="description">
          <p><strong>Description:</strong> {description}</p>
        </div>
      </div>

      <div className="actions">
        <button className="add-btn" onClick={onAdd}>Add to course cart</button>
        <button className="remove-btn" onClick={onRemove}>Remove from course cart</button>
      </div>
    </div>
  );
}

export default ClassItem;
