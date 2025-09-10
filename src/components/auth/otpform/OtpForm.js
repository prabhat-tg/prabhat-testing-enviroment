import React from "react";

const OtpForm = ({ formData, errors, handleChange, handleSubmit }) => (
  <form className="registerPopForm" onSubmit={handleSubmit}>
    <div className="registerPopMAinDiv">
      <span className="otpNameMobileSpan">
        <label htmlFor="mobile">Mobile</label>
        <input
          type="number"
          id="mobileNumber"
          name="number"
          required
          placeholder="+91 0000000000"
          value={formData.number}
          onChange={handleChange}
          className={errors.number ? "error" : ""}
        />
      </span>
      <span className="registerPasswordSpan">
        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          name="otp"
          required
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          className={errors.otp ? "error" : ""}
        />
      </span>
    </div>
    <button type="submit" className="submitRegisterPopup">
      Submit OTP
    </button>
  </form>
);

export default OtpForm;
