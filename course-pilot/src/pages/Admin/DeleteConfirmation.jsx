import React from 'react';
import './DeleteConfirmation.css'; // Add styling here

/**
 * Renders a confirmation modal for deleting a course.
 * @param {string | null} courseCode - The code of the course to delete. If null, the modal is hidden.
 * @param {function} onConfirm - Function to execute the final deletion.
 * @param {function} onCancel - Function to close the modal without deleting.
 */
function DeleteConfirmation({ courseCode, onConfirm, onCancel }) {
    
    // If courseCode is null, the modal is not visible
    if (!courseCode) {
        return null;
    }

    return (
        // The modal overlay should be fixed/absolute to cover the screen
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                
                <div className="warning-box">
                    <h3 className="warning-title">Warning</h3>
                </div>
                
                {/* Display a clear message to the user */}
                <p className="confirmation-message">
                    Are you sure you want to delete course **{courseCode}**?
                </p>
                <p className="irreversible-message">
                    **This action cannot be undone.**
                </p>
                
                <div className="modal-actions">
                    {/* The Cancel button closes the modal */}
                    <button 
                        className="cancel-btn" 
                        onClick={onCancel}>
                        Cancel
                    </button>
                    
                    {/* The Confirm button executes the deletion (handleConfirmDelete) */}
                    <button 
                        className="confirm-delete-btn" 
                        onClick={onConfirm}>
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmation;