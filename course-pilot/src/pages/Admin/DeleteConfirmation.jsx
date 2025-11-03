import React from 'react';
import './DeleteConfirmation.css';

const DeleteConfirmation = ({ courseCode, onConfirm, onCancel }) => {
    // If no courseCode is passed (or the state is closed), don't render anything
    if (!courseCode) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="warning-title">Warning</h3>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete the course **{courseCode}**?</p>
                    <p className="danger-text">This action cannot be undone.</p>
                </div>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="confirm-btn" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;