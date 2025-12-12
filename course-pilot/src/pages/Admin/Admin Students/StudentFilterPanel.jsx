import React, { useState } from 'react';
import "./StudentFilterPanel.css";
// Import your styling file here (e.g., './StudentFilterPanel.css')

const StudentFilterPanel = ({ onFilter, programs = [] }) => {
    
    // State to hold the current values of the filter inputs
    const [filters, setFilters] = useState({
        name: '',
        id: '',
        program: '',
    });

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
                        <option value="">All Programs</option>
                        {programs.map((program) => (
                            <option key={program.programID} value={program.programID}>
                                {program.title}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Apply Button */}
                <button className="apply-btn" onClick={handleApply}>
                    Apply
                </button>
            </div>
            
            {/* Add student disabled/hidden: creation not supported */}
        </div>
    );
};

export default StudentFilterPanel;