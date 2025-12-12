import React, { useState, useEffect } from 'react';
// Import your styling file here (e.g., './StudentDetailsPanel.css')
import "./StudentDetailsPanel.css";
const initialEmptyStudent = {
    id: '',
    firstName: '',
    lastName: '',
    name: '',
    program: '',
    department: '',
    email: '',
    phone: '',
    username: '',
    birthday: '',
    term: '',
};

/**
 * View-only student details.
 * @param {object} student - The student object to display.
 * @param {function} onClose - Handler to close the panel.
 */
const StudentDetailsPanel = ({ student, onClose }) => {
    
    // Use student data for initial state
    const [formData, setFormData] = useState(student || initialEmptyStudent);

    // Update state when student changes (e.g., admin views a different student)
    useEffect(() => {
        setFormData(student || initialEmptyStudent);
    }, [student]);
    
    const title = `Student Details: ${formData.name || `${formData.firstName} ${formData.lastName}`}`;

    return (
        // Position the panel over the filter view
        <div className="student-details-panel"> 
            <div className="panel-header-title">{title}</div>
            <form className="details-form" onSubmit={(e) => e.preventDefault()}>
                
                {/* --- Student ID (Read-only/Disabled for Edit/View) --- */}
                <div className="form-group">
                    <label htmlFor="id">Student ID</label>
                    <input 
                        type="text" 
                        id="id"
                        name="id" 
                        value={formData.id} 
                        readOnly
                        disabled
                        placeholder='ID'
                    />
                </div>

                {/* --- Name --- */}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        id="firstName"
                        name="firstName" 
                        value={formData.firstName} 
                        readOnly 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName"
                        name="lastName" 
                        value={formData.lastName} 
                        readOnly 
                        required 
                    />
                </div>

                {/* --- Program (e.g., Dropdown) --- */}
                <div className="form-group">
                    <label htmlFor="program">Program</label>
                    <input 
                        type="text" 
                        id="program"
                        name="program" 
                        value={formData.program} 
                        readOnly 
                    />
                </div>

                {/* --- Department --- */}
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input 
                        type="text" 
                        id="department"
                        name="department" 
                        value={formData.department} 
                        readOnly 
                    />
                </div>
                
                {/* --- Contact Info --- */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email || ''} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone || ''} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username || ''} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" id="birthday" name="birthday" value={formData.birthday || ''} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="term">Term</label>
                    <input type="text" id="term" name="term" value={formData.term || ''} readOnly />
                </div>

                {/* --- Actions --- */}
                <div className="form-actions">
                    <button type="button" onClick={onClose} className="cancel-btn">
                        Close
                    </button>
                    
                    {/* View-only: no edit/create actions */}
                </div>
            </form>
        </div>
    );
};

export default StudentDetailsPanel;