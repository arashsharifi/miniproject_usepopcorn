import React from "react";

const ErrorMessage = ({ message }) => (
  <div className="error-message-container">
    <p  className="error-title">{message}</p>
  </div>
);
export default ErrorMessage;
