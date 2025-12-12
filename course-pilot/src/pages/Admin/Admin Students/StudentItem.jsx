import React from 'react';
// Import your styling file here (e.g., './StudentItem.css')

const StudentItem = ({userId, name, program, department }) => {
    
    return (
        <div className="student-item-card">
            {/* Left side: Student Info Block (Purple area in your design) */}
            <div className="student-info-block">
                <p>student id: {userId || "N/A"}</p>
                <p className="student-name">Name: <span>{name}</span></p>
                <p className="student-program">Program: <span>{program || ""}</span></p>
                <p className="student-department">Department: <span>{department}</span></p>
            </div>
            <br/>
        </div>
    );
};

export default StudentItem;