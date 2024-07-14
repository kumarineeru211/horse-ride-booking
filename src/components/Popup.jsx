import React from 'react';
import { useSelector } from 'react-redux';
import './Popup.css'; 

const Popup = ({ onClose }) => {
  const { selectedHorse } = useSelector(state => state.booking); // Access the selectedHorse from the Redux store

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Booking Confirmed</h2>
        <p>Thank you for booking a ride with {selectedHorse}!</p>
        <p>A professional calendar invite has been sent to you.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
