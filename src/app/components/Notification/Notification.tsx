import React from 'react';
import './Notification.css';

const Toast = ({ message, onClose }) => {
  return (
    <div className="toast">
      {message}
      <button onClick={onClose} className="close-button">×</button>
    </div>
  );
};

export default Toast;
