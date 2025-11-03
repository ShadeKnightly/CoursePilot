import React from 'react';
// Import your styling file here (e.g., './StudentItem.css')

const StudentItem = ({ id, name, program, department, onDetails }) => {
    
    return (
        <div className="student-item-card">
            
            {/* Left side: Student Info Block (Purple area in your design) */}
            <div className="student-info-block">
                
                <p className="student-name">Name: <span>{name}</span></p>
                <p className="student-program">Program: <span>{program}</span></p>
                <p className="student-department">Department: <span>{department}</span></p>
            </div>

            {/* Right side: Action Button */}
            <div className="student-actions">
                <button 
                    className="details-btn" 
                    onClick={() => onDetails(id)}
                >
                    Details
                </button>
            </div>
        </div>
    );
};

export default StudentItem;