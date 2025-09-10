"use client";
import React, { useState, useEffect } from "react";
import { postData } from "@/src/services/apiMethods";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/src/utils/utils";

const ForgotPasswordForm = ({ onShowSignIn, translation, currentLang }) => {
  const [formData, setFormData] = useState({
    number: "",
    otp: "",
    userpassword: "",
    userConfirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errorMessage, setErrorMessage] = useState({ text: "", type: "" });
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(30); // 30 seconds timer
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let route = useRouter();
  const ApiUrl = getApiUrl();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMessage({ text: "", type: "" });
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateMobile = () => {
    if (!formData.number.trim()) {
      setErrors((prev) => ({
        ...prev,
        number: `${translation?.signin?.mobileIsRequired}`,
      }));
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.number.trim())) {
      setErrors((prev) => ({
        ...prev,
        number: `${translation?.signin?.mobileIsValid}`,
      }));
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    if (!formData.otp.trim()) {
      setErrors((prev) => ({
        ...prev,
        otp: `${translation?.signin?.enterOtp}`,
      }));
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!formData.userpassword) {
      newErrors.userpassword = `${translation?.signin?.passwordIsRequired}`;
    } else if (formData.userpassword.length < 5) {
      newErrors.userpassword = `${translation?.signin?.passwordIsValid}`;
    }
    if (formData.userpassword !== formData.userConfirmPassword) {
      newErrors.userConfirmPassword = `${translation?.signin?.passwordDoNotMatch}`;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (e && !validateMobile()) return;

    try {
      const res = await postData("/api/enquiry_sendotp", {
        mobile_name: formData.number,
        otp_type: "send",
        form_type: "reset_password",
      });

      if (res.enc_otp) {
        setOtpSent(true);
        setGeneratedOtp(res?.enc_otp);
        setMessage({
          text: `${translation?.signin?.otpSentMobile}`,
          type: "success",
        });
        setErrorMessage(null);
        setTimer(30);
        setIsResendEnabled(false);
      } else {
        setErrorMessage({
          text: `${translation?.signInForm?.notRegisteredYet}`,
          type: "error",
        });
        setMessage(null);
      }
    } catch (error) {
      setErrorMessage({
        text: `${translation?.signin?.errorOccurredOTP}`,
        type: "error",
      });
    }
  };

  const handleVerifyOtp = async (e = null) => {
    if (e) e.preventDefault();
    if (!validateOtp()) return;

    if (formData?.otp < 4) {
      return;
    }

    try {
      const res = await postData("/api/enquiry_verification_otp", {
        out: formData.otp,
        mobile: formData.number,
        main_id: generatedOtp,
        keyup: `session_verify`,
      });

      if (res.message === "valid_otp") {
        setIsVerified(true);
        setMessage({
          text: `${translation?.signin?.otpSuccessfullyVerified}`,
          type: "success",
        });
        setErrorMessage(null);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else {
        setErrorMessage({
          text: `${translation?.signin?.otpIsValid}`,
          type: "error",
        });
        setMessage(null);
      }
    } catch (error) {
      setErrorMessage({
        text: `${translation?.signin?.otpIsValid}`,
        type: "error",
      });
      setMessage(null);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      const res = await postData("/api/password_reset", {
        mobile: formData.number,
        password: formData.userpassword,
        otp_verify: "verify",
        otp_get: "get",
      });

      if (res.success) {
        setMessage({
          text: `${translation?.signin?.PasswordResetSuccessfully}`,
          type: "success",
        });

        setTimeout(() => {
          if (onShowSignIn) {
            onShowSignIn("getIntoLogin");
            setFormData({
              number: "",
              otp: "",
              userpassword: "",
              userConfirmPassword: "",
            });
            setMessage({
              text: "",
              type: "",
            });
            setOtpSent(false);
            setIsVerified(false);
            setErrors({});
            setErrorMessage({ text: "", type: "" });
            setGeneratedOtp("");
            setTimer(30);
            setIsResendEnabled(false);
            setShowPassword(false);
            setShowConfirmPassword(false);
          } else {
            onShowSignIn(null);
            route.push(`${ApiUrl}/user-dashboard?token=${res?.access_token}`);
          }
        }, 2000);
      } else {
        setMessage({
          text: res.message || `${translation?.signin?.FailedResetPassword}`,
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: `${translation?.signin?.ErrorResettingPassword}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (formData.otp.length === 4 && otpSent && !isVerified) {
      handleVerifyOtp({ preventDefault: () => {} });
    }
  }, [formData.otp, otpSent]);

  return (
    <div className="forgot-password-container mt-8 w-full lg:mt-4">
      {message?.text && (
        <div className="mb-2 mt-2">
          <span className="success-message">{message?.text}</span>
        </div>
      )}

      {errorMessage?.text && (
        <div className="mb-2 mt-2">
          <span className="error-message">{errorMessage?.text}</span>
        </div>
      )}

      {!otpSent ? (
        // Step 1: Enter mobile number
        <form className="registerPopForm" onSubmit={handleSendOtp}>
          <div className="col-span-6 md:col-span-2">
            <label
              htmlFor="mobileNumber"
              className="mb-0 block text-[14px] text-sm text-black"
            >
              {translation?.signInForm?.mobileLabel}
            </label>
            <div className="relative mt-2">
              <input
                type="tel"
                id="number"
                name="number"
                placeholder=" xxxxxxxxxx"
                value={formData.number}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  handleChange({
                    target: {
                      name: "number",
                      value: value,
                    },
                  });
                }}
                maxLength="10"
                className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                  errors.number ? "error" : ""
                }`}
              />
              <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                <span>+91</span>
              </div>
            </div>
            {errors.number && (
              <span className="error-message">{errors.number}</span>
            )}
          </div>
          <button type="submit" className="submitRegisterPopup mt-6">
            {translation?.signInForm?.getOtp}
          </button>
        </form>
      ) : !isVerified ? (
        // Step 2: Enter OTP
        <form className="registerPopForm" onSubmit={handleVerifyOtp}>
          <div className="registerPopMAinDiv">
            <span className="registerPasswordSpan">
              <label htmlFor="otp">{translation?.signInForm?.otpLabel}</label>
              <div className="relative">
                <input
                  type="tel"
                  id="otp"
                  name="otp"
                  placeholder={translation?.signInForm?.otpPlaceholder}
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength="4"
                  className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                    errors.otp ? "error" : ""
                  }`}
                />
                {!isResendEnabled && (
                  <span className="absolute right-3 top-3 text-sm text-[#0CAEE5]">
                    {timer}s
                  </span>
                )}
              </div>
              {errors.otp && (
                <span className="error-message">{errors.otp}</span>
              )}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {/* <button type="submit" className="submitRegisterPopup">
              Verify OTP
            </button> */}
            {isResendEnabled && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-green text-sm font-medium hover:underline"
              >
                {translation?.signInForm?.resend}
              </button>
            )}
          </div>
        </form>
      ) : (
        // Step 3: Reset password
        <form className="registerPopForm" onSubmit={handleResetPassword}>
          <div className="registerPopMAinDiv">
            <span className="registerPasswordSpan mt-3">
              <label htmlFor="password">
                {translation?.signInForm?.passwordLabel}
              </label>
              <div
                className="passwordContainer"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="userpassword"
                  placeholder={translation?.signInForm?.passwordPlaceholder}
                  value={formData.userpassword}
                  onChange={handleChange}
                  className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                    errors.userpassword ? "error" : ""
                  }`}
                  style={{ flex: 1 }}
                />
                <span
                  className="togglePassword"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    marginLeft: "5x",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0px",
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#595959"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#595959"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 012.299-3.964M6.18 6.18A9.964 9.964 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.142 5.173M6.18 6.18L17.82 17.82M6.18 6.18L2 2m4.18 4.18L2 2m0 0l2.18 2.18M22 22l-2.18-2.18"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {errors.userpassword && (
                <span className="error-message">{errors.userpassword}</span>
              )}
            </span>
            <span className="registerConfirmPasswordSpan mt-3">
              <label htmlFor="confirmPassword">
                {translation?.signInForm?.confirmPasswordLabel}
              </label>
              <div
                className="passwordContainer"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="userConfirmPassword"
                  placeholder={
                    translation?.signInForm?.confirmPasswordPlaceholder
                  }
                  value={formData.userConfirmPassword}
                  onChange={handleChange}
                  className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                    errors.userConfirmPassword ? "error" : ""
                  }`}
                  style={{ flex: 1 }}
                />
                <span
                  className="togglePassword"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    cursor: "pointer",
                    marginLeft: "5x",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1px",
                  }}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#595959"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#595959"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 012.299-3.964M6.18 6.18A9.964 9.964 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.142 5.173M6.18 6.18L17.82 17.82M6.18 6.18L2 2m4.18 4.18L2 2m0 0l2.18 2.18M22 22l-2.18-2.18"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {errors.userConfirmPassword && (
                <span className="error-message">
                  {errors.userConfirmPassword}
                </span>
              )}
            </span>
          </div>
          <button type="submit" className="submitRegisterPopup mt-6">
            {translation?.signInForm?.resetPassword}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
