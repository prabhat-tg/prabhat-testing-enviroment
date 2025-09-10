"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { postData } from "@/src/services/apiMethods";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/src/utils/utils";

const RegisterForm = ({
  formData,
  errors,
  handleChange,
  setActivePopup,
  setErrors,
  translation,
  currentLang,
  onClose,
  from,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [lastOtpSentNumber, setLastOtpSentNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userSuccessMsg, SetUserSuccessMsg] = useState("");
  const [otpSuccessMsg, SetOtpSuccessMsg] = useState(false);
  const [localOtp, setLocalOtp] = useState("");
  const [mainId, setMainId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [showOtpVerifiedMessage, setShowOtpVerifiedMessage] = useState(false);
  const [timer, setTimer] = useState(30);
  const [touchedFields, setTouchedFields] = useState({
    number: false,
  });
  const [isResendEnabled, setIsResendEnabled] = useState(false);
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

  const handleInputChange = (e) => {
    handleChange(e);
    setOtpError(null);
    SetOtpSuccessMsg(null);
    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: null,
      }));
    }
  };

  const handleGetOtp = async (event) => {
    event.preventDefault();
    setOtpError("");
    try {
      const res = await postData("/api/enquiry_sendotp", {
        mobile_name: formData.number,
        otp_type: "otp",
        form_type: "register",
      });

      if (res?.enc_otp) {
        const generatedOtp = res;
        if (generatedOtp) {
          SetOtpSuccessMsg(`${translation?.signin?.otpSentMobile}`);
          setShowVerifyMessage(false);
          setOtpSent(true);
          setTimer(30);
          setIsResendEnabled(false);
          setLocalOtp(generatedOtp?.enc_otp);
          setMainId("");
          setLastOtpSentNumber(formData.number);
        } else {
          setOtpError(`${translation?.signin?.faildToGenerateOTP}`);
        }
      } else {
        setOtpError(
          `${
            res?.message == "mobile_exists" &&
            `${translation?.signin?.mobileIsAlreadyRegistered}`
          }` || `${translation?.signin?.faildToSentOTP}`,
        );
        setOtpSent(false);
      }

      // if (res?.message !== "mobile_exists") {
      //   const generatedOtp = res;
      //   if (generatedOtp) {
      //     SetOtpSuccessMsg(`${translation?.signin?.otpSentMobile}`);
      //     setOtpSent(true);
      //     setTimer(30);
      //     setIsResendEnabled(false);
      //     setLocalOtp(generatedOtp?.enc_otp);
      //     setMainId("");
      //     setLastOtpSentNumber(formData.number);
      //   } else {
      //     setOtpError(`${translation?.signin?.faildToGenerateOTP}`);
      //   }
      // } else {
      //   setOtpError(
      //     `${
      //       res?.message == "mobile_exists" &&
      //       `${translation?.signin?.mobileIsAlreadyRegistered}`
      //     }` || `${translation?.signin?.faildToSentOTP}`
      //   );
      //   setOtpSent(false);
      // }
    } catch (error) {
      setOtpError(`${translation?.signin?.errorOccurredOTP}`);
    }
  };

  const handleVerifyOtp = async (enteredValue = otp.trim()) => {
    const sanitizedOtp = enteredValue.replace(/\D/g, "");

    if (sanitizedOtp.length < 4) {
      setOtpError(`${translation?.signin?.enterOtp}`);
      SetOtpSuccessMsg("");
      return;
    }

    if (!localOtp) {
      setOtpError(`${translation?.signin?.otpNotRecived}`);
      SetOtpSuccessMsg("");
      return;
    }

    try {
      const res = await postData("/api/enquiry_verification_otp", {
        out: sanitizedOtp,
        mobile: formData.number,
        main_id: localOtp,
        keyup: `session_verify`,
      });

      if (res.message === "valid_otp") {
        setIsVerified(true);
        setShowOtpVerifiedMessage(true);
        setOtpSent(false);
        setOtp("");
        setShowVerifyMessage(false);
        setTimer(0);
        setIsResendEnabled(false);

        SetOtpSuccessMsg(`${translation?.signin?.otpSuccessfullyVerified}`);
        setOtpError("");

        setTimeout(() => {
          setShowOtpVerifiedMessage(false);
        }, 3000);
      } else {
        setOtpError(`${translation?.signin?.otpIsValid}`);
        SetOtpSuccessMsg("");
      }
    } catch (error) {
      setOtpError(`${translation?.signin?.faildToGenerateOTP}`);
      SetOtpSuccessMsg("");
    }

    // const expectedOtp = localOtp.toString();

    // if (enteredValue === expectedOtp) {
    //   setIsVerified(true);
    //   setShowOtpVerifiedMessage(true);
    //   setOtpSent(false);
    //   setOtp("");
    //   setShowVerifyMessage(false);
    //   setTimer(0);
    //   setIsResendEnabled(false);

    //   SetOtpSuccessMsg(`${translation?.signin?.otpSuccessfullyVerified}`);
    //   setOtpError("");

    //   setTimeout(() => {
    //     setShowOtpVerifiedMessage(false);
    //   }, 3000);
    // } else {
    //   setOtpError(`${translation?.signin?.otpIsValid}`);
    //   SetOtpSuccessMsg("");
    // }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = `${translation?.signin?.nameIsRequired}`;
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.username)) {
      newErrors.username = `${translation?.signin?.nameIsValid}`;
    }

    if (!formData.number.trim()) {
      newErrors.number = `${translation?.signin?.mobileIsRequired}`;
    } else if (!/^[6-9]\d{9}$/.test(formData.number.trim())) {
      newErrors.number = `${translation?.signin?.mobileIsValid}`;
    }

    // if (!formData.useremail.trim()) {
    //   newErrors.useremail = `${translation?.signin?.emailIsRequired}`;
    // } else if (
    //   !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net|org|edu|gov|co|info|io|me|biz|us|uk|ac|ca|au|int|mil|id|ae|asia|tech|xyz|tv)$/i.test(
    //     formData.useremail.trim()
    //   )
    // ) {
    //   newErrors.useremail = `${translation?.signin?.emailIsValid}`;
    // }

    if (!formData.userpassword) {
      newErrors.userpassword = `${translation?.signin?.passwordIsRequired}`;
    } else if (formData.userpassword.length < 5) {
      newErrors.userpassword = `${translation?.signin?.passwordIsValid}`;
    }

    if (!formData.userConfirmPassword) {
      newErrors.userConfirmPassword = `${translation?.signin?.confirmPasswordIsRequired}`;
    } else if (formData.userConfirmPassword !== formData.userpassword) {
      newErrors.userConfirmPassword = `${translation?.signin?.passwordDoNotMatch}`;
    }

    if (!formData.terms) {
      newErrors.terms = `${translation?.signin?.termAndConditionIsRequired}`;
    }

    if (formData.number && !isVerified) {
      setShowVerifyMessage(true);
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // const response = await axios.post(
      //   "https://dealer.tractorgyan.com/api/user_register",
      //   {
      //     name: formData.username,
      //     mobile: formData.number,
      //     password: formData.userpassword,
      //   }
      // );

      const payload = {
        name: formData.username,
        mobile: formData.number,
        password: formData.userpassword,
        email: formData?.useremail || "",
      };

      const response = await postData("/api/register", payload);

      if (response.success) {
        const userData = response?.user_data;
        const userName = userData.name;
        SetUserSuccessMsg(
          `${translation?.signin?.registrationSuccessfull}, ${userName}!`,
        );
        setShowThankYouMessage(true);
        setShowVerifyMessage(false);
        setActivePopup(null);
        onClose();
        route.push(`${ApiUrl}/user-dashboard?token=${response?.access_token}`);
      } else {
        SetUserSuccessMsg(
          response?.message || `${translation?.signin?.registrationFaild}`,
        );
      }
    } catch (error) {
      SetUserSuccessMsg(`${translation?.signin?.errorInRegistration}`);
    }
  };

  const isMobileValid = /^[6-9]\d{9}$/.test(formData.number.trim());

  const validateMobile = (number) => {
    if (!number.trim()) return `${translation?.signin?.mobileIsRequired}`;
    if (!/^[6-9]\d{9}$/.test(number.trim()))
      return `${translation?.signin?.mobileIsValid}`;
    return null;
  };

  return (
    <form className="registerPopForm mt-2" onSubmit={handleSubmitForm}>
      <div className="registerPopMAinDiv">
        <span className="registerNameMobileSpanDual">
          <span className="registerNameMobileSpan relative">
            <label htmlFor="username">
              {translation?.signInForm?.nameLabel}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder={`${translation?.signInForm?.namePlaceholder}`}
              value={formData.username}
              onChange={handleInputChange}
              className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                errors.username ? "error" : ""
              }`}
            />
            {errors.username && (
              <span className="error-message absolute bottom-[-20px]">
                {errors.username}
              </span>
            )}
          </span>
          <div className="relative col-span-6 hidden w-full md:col-span-2 md:block lg:w-fit">
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
                  handleInputChange({
                    target: {
                      name: "number",
                      value: value,
                    },
                  });
                }}
                onBlur={() =>
                  setTouchedFields((prev) => ({ ...prev, number: true }))
                }
                maxLength="10"
                className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                  errors.number ? "error" : ""
                }`}
              />
              <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                <span>+91</span>
              </div>
            </div>
            {(touchedFields.number || errors.number) && (
              <p className="error_message absolute bottom-[-20px]">
                {validateMobile(formData.number) || errors.number}
              </p>
            )}
          </div>
          {isMobileValid && !isVerified && (
            <div className="hidden w-fit md:block">
              {formData.number === lastOtpSentNumber ? (
                isResendEnabled ? (
                  <button
                    onClick={handleGetOtp}
                    className="whitespace-nowrap px-[10px] text-[13px]"
                  >
                    {translation?.signInForm?.resend}
                  </button>
                ) : (
                  !otpSent && (
                    <button
                      onClick={handleGetOtp}
                      disabled={!formData.number}
                      className="text-green whitespace-nowrap px-[10px] text-[13px]"
                    >
                      {translation?.signInForm?.getOtp}
                    </button>
                  )
                )
              ) : (
                <button
                  onClick={handleGetOtp}
                  disabled={!formData.number}
                  className="text-green whitespace-nowrap px-[10px] text-[13px]"
                >
                  {translation?.signInForm?.getOtp}
                </button>
              )}
            </div>
          )}
          {/* {isMobileValid && !isVerified && (
            <div className="hidden md:block w-fit">
              {!otpSent && (
                <button
                  onClick={handleGetOtp}
                  disabled={!formData.number}
                  className="whitespace-nowrap text-green text-[13px] px-[10px]"
                >
                  {translation?.signInForm?.getOtp}
                </button>
              )}
              {isResendEnabled && (
                <button
                  onClick={handleGetOtp}
                  className="whitespace-nowrap text-[13px] px-[10px]"
                >
                  {translation?.signInForm?.resend}
                </button>
              )}
            </div>
          )} */}

          <div className="block flex w-full items-end gap-2 pt-2 md:hidden">
            <div className="col-span-6 w-full md:col-span-2">
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
                    handleInputChange({
                      target: {
                        name: "number",
                        value: value,
                      },
                    });
                  }}
                  onBlur={() =>
                    setTouchedFields((prev) => ({ ...prev, number: true }))
                  }
                  maxLength="10"
                  className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                    errors.number ? "error" : ""
                  }`}
                />
                <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                  <span>+91</span>
                </div>
              </div>
              {(touchedFields.number || errors.number) && (
                <p className="error_message">
                  {validateMobile(formData.number) || errors.number}
                </p>
              )}
            </div>
            {/* {isMobileValid && !isVerified && (
              <button onClick={handleGetOtp} disabled={!formData.number}>
                Get OTP
              </button>
            )} */}
            {isMobileValid && !isVerified && (
              <>
                {formData.number === lastOtpSentNumber ? (
                  isResendEnabled ? (
                    <button
                      onClick={handleGetOtp}
                      className="whitespace-nowrap px-[10px] text-[13px]"
                    >
                      {translation?.signInForm?.resend}
                    </button>
                  ) : (
                    !otpSent && (
                      <button
                        onClick={handleGetOtp}
                        disabled={!formData.number}
                        className="text-green text-red whitespace-nowrap px-[10px] text-[13px]"
                      >
                        {translation?.signInForm?.getOtp}
                      </button>
                    )
                  )
                ) : (
                  <button
                    onClick={handleGetOtp}
                    disabled={!formData.number}
                    className="text-green text-red whitespace-nowrap px-[10px] text-[13px]"
                  >
                    {translation?.signInForm?.getOtp}
                  </button>
                )}
              </>
            )}
            {/* {isMobileValid && !isVerified && (
              <>
                {!otpSent && (
                  <button
                    onClick={handleGetOtp}
                    disabled={!formData.number}
                    className="whitespace-nowrap text-green text-[13px] px-[10px] text-red"
                  >
                    {translation?.signInForm?.getOtp}
                  </button>
                )}
                {isResendEnabled && (
                  <button
                    onClick={handleGetOtp}
                    className="whitespace-nowrap text-[13px] px-[10px]"
                  >
                    {translation?.signInForm?.resend}
                  </button>
                )}
              </>
            )} */}
          </div>
        </span>
        {otpError && !otpSent && (
          <span className="error-message mt-2 text-start">{otpError}</span>
        )}
        {otpSuccessMsg && otpSent && (
          <span className="success-message mt-[-7px] text-end lg:mt-1">
            {otpSuccessMsg}
          </span>
        )}
        {/* {otpSent && !isResendEnabled && (
          <span className="text-[13px] text-end text-[#4682b4] font-medium">
            {timer}s
          </span>
        )} */}
        {otpSent && !isVerified && formData.number === lastOtpSentNumber && (
          <>
            <span
              className={`${
                otpError ? "mt-4" : otpSuccessMsg ? "mt-[-16px]" : "mt-0"
              } registerOtpSpan relative`}
            >
              <label htmlFor="otp">{translation?.signInForm?.otpLabel}</label>
              {otpSent && !isResendEnabled && (
                <span className="absolute right-0 text-end text-[13px] font-medium text-[#4682b4] md:hidden">
                  {timer}s
                </span>
              )}
              <span className="verifyOtpBtnSpan">
                <span className="viefyOtpWithTimer">
                  <input
                    type="tel"
                    id="otp"
                    name="otp"
                    required
                    placeholder={translation?.signInForm?.otpPlaceholder}
                    value={otp}
                    maxLength="4"
                    onChange={(e) => {
                      const enteredValue = e.target.value.replace(/\D/g, "");
                      setOtpError(null);
                      if (enteredValue.length <= 4) {
                        setOtp(enteredValue);
                        if (enteredValue.length === 4) {
                          handleVerifyOtp(enteredValue);
                        }
                      }
                    }}
                    className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${
                      otpError ? "error" : ""
                    }`}
                  />
                  {!isResendEnabled && (
                    <span className="otpTimer hidden md:block">{timer}s</span>
                  )}
                </span>
                {/* <button type="button" onClick={handleVerifyOtp}>
                  {"Verify"}
                </button> */}
              </span>
              {otpError && <span className="error-message">{otpError}</span>}
            </span>
          </>
        )}
        {showOtpVerifiedMessage && (
          <span className="success-message">
            {" "}
            {`${translation?.signin?.otpSuccessfullyVerified}!`}
          </span>
        )}
        {showVerifyMessage && (
          <span className="error-message mt-1 text-start">
            {translation?.signin?.verifyYourMobile}
          </span>
        )}
        {showThankYouMessage && (
          <span className="success-message">
            {translation?.signin?.thanksForRegistration}
          </span>
        )}
        <span className="registerEmailSpan mt-2">
          <label htmlFor="email">{translation?.signInForm?.emailLabel}</label>
          <input
            type="email"
            id="useremail"
            name="useremail"
            placeholder={translation?.signInForm?.emailPlaceholder}
            value={formData.useremail}
            onChange={handleInputChange}
            className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none`}
          />
          {/* {errors.useremail && (
            <span className="error-message">{errors.useremail}</span>
          )} */}
        </span>
        <span className="registerNameMobileSpanDual relative lg:mt-1">
          <span className="registerNameMobileSpan mt-2">
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
                placeholder={translation?.signInForm?.passwordPlaceholder}
                value={formData.userpassword}
                onChange={handleInputChange}
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
            {errors.userpassword && (
              <span className="error-message absolute bottom-[-20px]">
                {errors.userpassword}
              </span>
            )}
          </span>
          <span className="registerNameMobileSpan mt-2">
            <label htmlFor="password">
              {translation?.signInForm?.confirmPasswordLabel}
            </label>
            <div
              className="passwordContainer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="userConfirmPassword"
                name="userConfirmPassword"
                placeholder={
                  translation?.signInForm?.confirmPasswordPlaceholder
                }
                value={formData.userConfirmPassword}
                onChange={handleInputChange}
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
              <span className="error-message absolute bottom-[-20px]">
                {errors.userConfirmPassword}
              </span>
            )}
          </span>
        </span>
      </div>
      <p className="termsParaOfRegister mt-4">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleInputChange}
          className={errors.terms ? "error" : ""}
        />
        <span>
          {translation?.signInForm?.termsMessage}{" "}
          <Link href="/terms-of-use">
            {translation?.signInForm?.termsLinkText}
          </Link>
        </span>
        {errors.terms && <span className="error-message">{errors.terms}</span>}
      </p>
      {userSuccessMsg && (
        <span className="error-message text-center">{userSuccessMsg}</span>
      )}
      <button type="submit" className="submitRegisterPopup mt-4">
        {translation?.signInForm?.createAccount}
      </button>

      {!from && (
        <p className="termsParaOfRegister logInParaOfRegister">
          <span>
            {translation?.signInForm?.alreadyHaveAccount}{" "}
            <span
              className="loginInSpan"
              onClick={() => setActivePopup("login")}
            >
              {translation?.signInForm?.logIn}
            </span>
          </span>
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
