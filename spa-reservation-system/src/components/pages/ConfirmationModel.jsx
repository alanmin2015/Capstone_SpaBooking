import React from 'react';
import './ConfirmationModel.css';

const ConfirmationModal = ({ onConfirmation, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <h3>Confirm Booking</h3>
      <p>Are you sure you want to proceed with this booking?</p>
      <div className="modal-buttons">
        <button onClick={() => onConfirmation(true)}>Confirm</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
