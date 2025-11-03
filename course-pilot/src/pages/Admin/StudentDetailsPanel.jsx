import React, { useState, useEffect } from 'react';
// Import your styling file here (e.g., './StudentDetailsPanel.css')

const initialEmptyStudent = {
    name: '',
    program: '',
    department: '',
    id: '',
    email: '',
    phone: '',
    // Add other fields relevant to a full student record
};

/**
 * Handles View, Edit, and Create modes for student records.
 * @param {object} panelData - The student object for view/edit, or null for create.
 * @param {string} panelType - 'view', 'edit', or 'create'.
 * @param {function} onClose - Handler to close the panel.
 * @param {function} onSave - Handler to save/update the student record.
 */
const StudentDetailsPanel = ({ panelData, panelType, onClose, onSave }) => {
    
    // Use student data for initial state, or the empty template for 'create'
    const [formData, setFormData] = useState(panelData || initialEmptyStudent);
    
    // Local state to manage the mode (e.g., allow "view" to switch to "edit")
    const [mode, setMode] = useState(panelType);

    // Update state when panel data changes (e.g., admin views a different student)
    useEffect(() => {
        setFormData(panelData || initialEmptyStudent);
        setMode(panelType); // Reset the local mode based on the prop
    }, [panelData, panelType]);

    // Determine if inputs should be editable
    const isEditable = mode === 'edit' || mode === 'create';
    
    // --- Handlers ---

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.program) {
             alert("Please fill in Name and Program.");
             return;
        }
        
        onSave(formData, mode); // Pass data and mode (e.g., save vs create) to AdminStudents
        setMode('view'); // Switch back to view mode after save (if it was an edit)
    };

    const title = mode === 'create' ? "Add New Student" : 
                  mode === 'edit' ? `Edit Student: ${formData.name}` : 
                  `Student Details: ${formData.name}`;

    return (
        // Position the panel over the filter view
        <div className="student-details-panel"> 
            <div className="panel-header-title">{title}</div>
            <form onSubmit={handleSubmit} className="details-form">
                
                {/* --- Student ID (Read-only/Disabled for Edit/View) --- */}
                <div className="form-group">
                    <label htmlFor="id">Student ID</label>
                    <input 
                        type="text" 
                        id="id"
                        name="id" 
                        value={formData.id} 
                        readOnly={mode !== 'create'} // Only allow input if creating
                        disabled={mode !== 'create'} // Disable once set
                        placeholder={mode === 'create' ? 'Auto-assigned or enter new ID' : 'N/A'}
                    />
                </div>

                {/* --- Name --- */}
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        readOnly={!isEditable} 
                        required 
                    />
                </div>

                {/* --- Program (e.g., Dropdown) --- */}
                <div className="form-group">
                    <label htmlFor="program">Program</label>
                    {/* Placeholder for a dropdown or text input */}
                    <input 
                        type="text" 
                        id="program"
                        name="program" 
                        value={formData.program} 
                        onChange={handleChange} 
                        readOnly={!isEditable} 
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
                        onChange={handleChange} 
                        readOnly={!isEditable} 
                    />
                </div>
                
                {/* --- Contact Info --- */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} readOnly={!isEditable} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} readOnly={!isEditable} />
                </div>

                {/* --- Actions --- */}
                <div className="form-actions">
                    <button type="button" onClick={onClose} className="cancel-btn">
                        Close
                    </button>
                    
                    {/* If in VIEW mode, show EDIT button */}
                    {mode === 'view' && (
                        <button type="button" onClick={() => setMode('edit')} className="edit-mode-btn">
                            Edit Student
                        </button>
                    )}

                    {/* If in EDIT or CREATE mode, show SUBMIT button */}
                    {(mode === 'edit' || mode === 'create') && (
                        <button type="submit" className="submit-btn">
                            {mode === 'create' ? 'Create Student' : 'Save Changes'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentDetailsPanel;