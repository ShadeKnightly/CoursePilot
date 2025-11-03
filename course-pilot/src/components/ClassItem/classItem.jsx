import React from "react";
import "./classItem.css";
import { useLocation } from "react-router-dom";

function ClassItem({ courseCode, name, term, startEnd, program, description, onAdd, onRemove, onEdit, isSignedIn, isAdmin, isAdminStudent, department }) 
{
    const location = useLocation();
    
    // Student path checks 
    const isCoursesPage = location.pathname === "/courses";
    const isCartPage = location.pathname === "/cart";

    // conditional for admin student page
    if (isAdminStudent) {
        return (
            <div className="class-card student-view-card">
                <div className="student-photo-placeholder">
                </div>
                
                <div className="course-details-student-details">
                    <div className="info">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Program:</strong> {program}</p>
                        <p><strong>Department:</strong> {department}</p>
                    </div>
                </div>
                
                <div className="actions-student-actions">
                    <button className="details-btn">Details</button>
                </div>
            </div>
        );
    }

    return (
        // this is unchanged
        <div className="class-card">
            <div className="course-code">
                <h4>{courseCode}</h4>
            </div>

            <div className="course-details">
                {/* ... */}
            </div>

            {/* ... */}
        </div>
    );
} 

export default ClassItem;