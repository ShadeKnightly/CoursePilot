import React, { useState } from 'react';
import "./StudentFilterPanel.css";
// Import your styling file here (e.g., './StudentFilterPanel.css')

const StudentFilterPanel = ({ onFilter, onAddStudent }) => {
    
    // State to hold the current values of the filter inputs
    const [filters, setFilters] = useState({
        name: '',
        id: '',
        program: '',
    });

    // Placeholder data for the Program dropdown
    const programOptions = [
        "All Programs",
        "Software Development",
        "Data Analytics",
        "IT Operations",
        // Add more programs as needed
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleApply = () => {
        // Pass the current filter state to the parent component (AdminStudents.jsx)
        onFilter(filters);
    };

    return (
        // This container needs CSS to position it on the right side
        <div className="filter-panel-container"> 
            
            {/* Filter Header Section */}
            <div className="filter-panel-header">
                <h3>Filter</h3>
            </div>

            {/* Filter Inputs */}
            <div className="filter-inputs">
                
                {/* Name Filter */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={filters.name} 
                        onChange={handleChange} 
                        placeholder="Value"
                    />
                </div>

                {/* ID Filter */}
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input 
                        type="text" 
                        id="id"
                        name="id" 
                        value={filters.id} 
                        onChange={handleChange} 
                        placeholder="Value"
                    />
                </div>

                {/* Program Filter (Dropdown) */}
                <div className="form-group">
                    <label htmlFor="program">Program</label>
                    <select 
                        id="program"
                        name="program" 
                        value={filters.program} 
                        onChange={handleChange}
                    >
                        {programOptions.map(program => (
                            <option key={program} value={program === "All Programs" ? "" : program}>
                                {program}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Apply Button */}
                <button className="apply-btn" onClick={handleApply}>
                    Apply
                </button>
            </div>
            
            {/* Add New Student Button (at the bottom, based on your design) */}
            <div className="add-student-section">
                <button className="add-student-btn" onClick={onAddStudent}>
                    Add New Student
                </button>
            </div>
        </div>
    );
};

export default StudentFilterPanel;