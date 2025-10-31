import React from "react";
import "./classItem.css";
import { useLocation } from "react-router-dom";

function ClassItem({ courseCode, name, term, startEnd, program, description, onAdd, onRemove }) {
    const location = useLocation();
    
    const isCoursesPage = location.pathname === "/courses";
    const isCartPage = location.pathname === "/cart";
  
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
        {/* Hide Add button on /cart and /courses */}
        {!isCartPage && !isCoursesPage && (
          <button className="add-btn" onClick={onAdd}>Add to course cart</button>
        )}

        {/* Show Remove button only on /cart */}
        {isCartPage && (
          <button className="remove-btn" onClick={onRemove}>Remove from course cart</button>
        )}

        {/* Show Unregister button only on /courses */}
        {isCoursesPage && (
          <button className="remove-btn" onClick={onRemove}>Unregister</button>
        )}
      </div>
    </div>
  );
}

export default ClassItem;
