"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getApiUrl } from "@/src/utils/utils";
import { postData } from "@/src/services/apiMethods";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = ({
  formData,
  errors,
  handleChange,
  setActivePopup,
  setErrors,
  from,
  onClose,
  translation,
  currentLang,
}) => {
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(true);
  const [isOtpLoginFrom, setIsOtpLoginFrom] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isOTPVerifiedFrom, setIsOTPVerifiedFrom] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSentUnVerified, setOtpSentUnverified] = useState(true);
  const [timer, setTimer] = useState(30); // 30 seconds timer
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const apiUrl = getApiUrl();
  const router = useRouter();

  useEffect(() => {
    if (from) {
      setIsOtpLogin(false);
    }
  }, [from, isOtpLogin]);

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendEnabled(true);
      setSuccessMessage(null);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleGetOtp = async () => {
    if (!/^\d+$/.test(formData.number)) {
      setErrors((prev) => ({
        ...prev,
        number: `${translation?.signin?.mobileIsValid}`,
      }));
      return;
    }
    if (formData.number?.length < 10) {
      setErrors((prev) => ({
        ...prev,
        number: `${translation?.signin?.mobileIsValid}`,
      }));
      return;
    }

    try {
      const res = await postData("/api/enquiry_sendotp", {
        mobile_name: formData.number,
        otp_type: "send_login",
        form_type: "login",
      });

      if (res?.message == "success") {
        setSuccessMessage(`${translation?.signin?.otpSentMobile}`);
        setOtpSent(true);
        setOtpSentUnverified(false);
        setLoginError("");
        setTimer(30);
        setIsResendEnabled(false);
      } else {
        setLoginError(`${translation?.loginValidations?.notRegisterdUser}`);
        setOtpSent(false);
        setSuccessMessage(null);
      }
    } catch (error) {
      setLoginError(`${translation?.signin?.faildToSentOTP}`);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpSent(true);

    try {
      const res = await postData("/api/enquiry_verification_otp", {
        out: otp,
        mobile: formData.number,
        main_id: "login_verify",
      });

      if (res?.message == "valid_otp") {
        setSuccessMessage(`${translation?.signin?.otpSuccessfullyVerified}`);
        setLoginError("");
        setIsOTPVerified(true);
        setIsOTPVerifiedFrom(true);
        setOtpSentUnverified(false);
      } else {
        setLoginError(`${translation?.signin?.otpIsValid}`);
        setSuccessMessage(null);
        setIsOTPVerified(false);
      }
    } catch (error) {
      setIsOTPVerified(false);
      setSuccessMessage(null);
      setLoginError(`${translation?.signin?.otpNotRecived}`);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    setLoginError("");
    setSuccessMessage("");

    if (isOtpLogin && !isOTPVerified) {
      setLoginError(`${translation?.loginValidations?.pleaseVerifyOTP}`);
      return;
    }

    try {
      let response;
      if (isOtpLogin) {
        response = await axios.post(`${apiUrl}/api/auth/login`, {
          mobile: formData.number,
          otp: otp,
        });
      } else {
        response = await axios.post(`${apiUrl}/api/auth/login`, {
          mobile: formData.number,
          password: formData.userpassword,
        });
      }

      if (response.data.success) {
        const userData = response.data.user_data;
        localStorage.setItem("username", userData.name);
        localStorage.setItem("isLoggedIn", "true");

        onClose();

        router.push(
          `${apiUrl}/user-dashboard?token=${response.data?.access_token}`,
        );

        setActivePopup(null);
        setLoginError("");
      } else {
        setLoginError(
          response.data.message ||
            `${translation?.loginValidations?.InvalidLoginDetails}`,
        );
      }
    } catch (error) {
      setLoginError(
        error?.error || `${translation?.loginValidations?.errorOccuredLogin}`,
      );
    }
  };

  useEffect(() => {
    if (otp.length === 4 && otpSent && !isOTPVerified) {
      handleVerifyOtp();
    }
  }, [otp]);

  return (
    <form
      className="registerPopForm loginRegisterPopForm mt-2"
      onSubmit={handleLoginSubmit}
    >
      <div className="registerPopMAinDiv">
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
              id="mobileNumber"
              name="number"
              placeholder=" xxxxxxxxxx"
              value={formData.number}
              onChange={(e) => {
                setLoginError("");
                handleChange(e);
              }}
              required
              pattern="[6-9]{1}[0-9]{9}"
              maxLength="10"
              className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                errors.number ? "error" : ""
              }`}
            />
            <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
              <span>+91</span>
            </div>
          </div>
          {errors.number && <p className="error_message">{errors.number}</p>}
        </div>
        {!from && isOtpLogin ? (
          <>
            {otpSent ? (
              <div className="flex items-center gap-2">
                <span className="loginNameMobileSpan mt-2">
                  <label htmlFor="otp">
                    {translation?.signInForm?.otpLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      required
                      placeholder={translation?.signInForm?.otpPlaceholder}
                      value={otp}
                      onChange={(e) => {
                        const enteredValue = e.target.value.replace(/\D/g, "");
                        setOtp(enteredValue);
                      }}
                      maxLength="4"
                      className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                        errors.otp ? "error" : ""
                      }`}
                    />
                    {!isResendEnabled && !isOTPVerified && (
                      <span className="absolute right-3 top-[10px] text-sm text-[#0CAEE5]">
                        {timer}
                      </span>
                    )}
                  </div>
                </span>
                {/* {!isOTPVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="whitespace-nowrap h-[38px] text-sm rounded-[10px] px-[10px] mt-[35px] mb-0 bg-[#46aa48] text-white"
                  >
                    Verify OTP
                  </button>
                )} */}
                {!isOTPVerified && isResendEnabled && (
                  <button
                    type="button"
                    onClick={handleGetOtp}
                    className="text-green mb-0 mt-[35px] h-[38px] whitespace-nowrap rounded-[10px] border border-[#46aa48] bg-white px-[10px] text-sm"
                  >
                    {translation?.signInForm?.resend}
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGetOtp}
                className="submitRegisterPopup mt-4"
              >
                {translation?.signInForm?.getOtp}
              </button>
            )}
          </>
        ) : (
          !from && (
            <>
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
                    id="userpassword"
                    name="userpassword"
                    required
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
                      marginLeft: "5px",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1px",
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
              </span>
              <Link
                href="/password/reset"
                title="Forget Password"
                className="forgetPassword"
              >
                {translation?.loginValidations?.ForgetPassword}
              </Link>
            </>
          )
        )}

        {from && isOtpLoginFrom ? (
          <>
            {otpSent ? (
              <div className="flex items-center gap-2">
                <span className="loginNameMobileSpan mt-2">
                  <label htmlFor="otp">
                    {translation?.signInForm?.otpLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      required
                      placeholder={translation?.signInForm?.otpPlaceholder}
                      value={otp}
                      onChange={(e) => {
                        const enteredValue = e.target.value.replace(/\D/g, "");
                        setOtp(enteredValue);
                      }}
                      maxLength="4"
                      className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                        errors.otp ? "error" : ""
                      }`}
                    />
                    {!isResendEnabled && !isOTPVerified && (
                      <span className="absolute right-3 top-[10px] text-sm text-[#0CAEE5]">
                        {timer}
                      </span>
                    )}
                  </div>
                </span>
                {/* {!isOTPVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="whitespace-nowrap h-[38px] text-sm rounded-[10px] px-[10px] mt-[35px] mb-0 bg-[#46aa48] text-white"
                  >
                    Verify OTP
                  </button>
                )} */}
                {!isOTPVerified && isResendEnabled && (
                  <button
                    type="button"
                    onClick={handleGetOtp}
                    className="text-green mb-0 mt-[35px] h-[38px] whitespace-nowrap rounded-[10px] border border-[#46aa48] bg-white px-[10px] text-sm"
                  >
                    {translation?.signInForm?.resend}
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGetOtp}
                className="submitRegisterPopup mt-4"
              >
                {translation?.signInForm?.getOtp}
              </button>
            )}
          </>
        ) : (
          from &&
          !isOtpLoginFrom && (
            <>
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
                    id="userpassword"
                    name="userpassword"
                    required
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
                      marginLeft: "5px",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1px",
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
              </span>
              <Link
                href="/password/reset"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                title="Forget Password"
                className="forgetPassword"
              >
                {translation?.loginValidations?.ForgetPassword}
              </Link>
            </>
          )
        )}
      </div>

      {loginError && <p className="error-message mt-2">{loginError}</p>}
      {successMessage && (
        <p className="success-message mt-2">{successMessage}</p>
      )}

      {isOtpLogin && otpSent && otp && (
        <button type="submit" className="submitRegisterPopup mt-4">
          {translation?.loginValidations?.LoginWithOTP}
        </button>
      )}

      {!isOtpLogin && !from && (
        <button type="submit" className="submitRegisterPopup mt-4">
          {translation?.loginValidations?.submit}
        </button>
      )}

      {isOtpLoginFrom && otpSent && otp && (
        <button type="submit" className="submitRegisterPopup mt-4">
          {translation?.loginValidations?.LoginWithOTP}
        </button>
      )}

      {!isOtpLoginFrom && from && (
        <button type="submit" className="submitRegisterPopup mt-4">
          {translation?.loginValidations?.submit}
        </button>
      )}

      <div className="registerAndLoginFeature mt-2">
        {isOtpLogin && !from && (
          <p
            className="logInWithOtp"
            onClick={() => {
              setIsOtpLogin(false);
              setSuccessMessage("");
              setLoginError("");
            }}
          >
            {translation?.loginValidations?.LogInWithPassword}
          </p>
        )}

        {!isOtpLogin && !from && (
          <p
            className="logInWithOtp"
            onClick={() => {
              setIsOtpLogin(true);
              setSuccessMessage("");
              setLoginError("");
            }}
          >
            {translation?.loginValidations?.LogInWithOTP}
          </p>
        )}

        {isOtpLoginFrom && from && (
          <p
            className="logInWithOtp"
            onClick={() => {
              setIsOtpLogin(false);
              setIsOtpLoginFrom(false);
              setSuccessMessage("");
              setLoginError("");
            }}
          >
            {translation?.loginValidations?.LogInWithPassword}
          </p>
        )}

        {!isOtpLoginFrom && from && (
          <p
            className="logInWithOtp"
            onClick={() => {
              setIsOtpLogin(true);
              setIsOtpLoginFrom(true);
              setSuccessMessage("");
              setLoginError("");
            }}
          >
            {translation?.loginValidations?.LogInWithOTP}
          </p>
        )}

        {!from && (
          <p className="registerNowAgain">
            {translation?.loginValidations?.DontHaveAnAccount}{" "}
            <span
              onClick={() => setActivePopup("register")}
              style={{ cursor: "pointer", color: "#007bff" }}
            >
              {translation?.loginValidations?.RegisterNow}
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
