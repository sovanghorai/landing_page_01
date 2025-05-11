// src/components/OtpModal.jsx
import React, { useState } from "react";
import "./OtpModal.css"; // Import your CSS file
const OtpModal = ({ mobile, onVerify, onClose }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Fake verify for now; in real case, you should match with actual OTP
    const correctOtp = localStorage.getItem("sentOtp");
    if (otp === correctOtp) {
      onVerify(true);
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="otp-modal">
      <div className="otp-box">
        <h3>Verify OTP sent to {mobile}</h3>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={handleVerify}>Verify OTP</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default OtpModal;
