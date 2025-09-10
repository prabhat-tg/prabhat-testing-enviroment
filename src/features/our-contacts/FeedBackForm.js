"use client"
import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";
import TG_Button from "@/src/components/ui/buttons/MainButtons";
import TG_InputField from "@/src/components/ui/inputs/TG_InputField";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { postOurContactForm } from "@/src/services/our-contacts/our-contacts";
import { sendOtp, verifyOtp } from "@/src/services/otp/otp-service";

const FeedBackForm = ({ isMobile, translation, bgColor }) => {
  // Add states for formData and errors (assuming these are required)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
    number: "",
    terms: true,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [lastOtpSentNumber, setLastOtpSentNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [userSuccessMsg, setUserSuccessMsg] = useState("");
  const [otpSuccessMsg, setOtpSuccessMsg] = useState("");
  const [localOtp, setLocalOtp] = useState("");
  const [mainId, setMainId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);
  const [showOtpVerifiedMessage, setShowOtpVerifiedMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [errors, setErrors] = useState({});

  const [timer, setTimer] = useState(30);
  const [touchedFields, setTouchedFields] = useState({
    number: false,
  });
  const [isResendEnabled, setIsResendEnabled] = useState(false);

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
    const { name, value, type, checked } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Reset OTP-related state if number field is updated
    if (name === 'number') {
      setIsVerified(false);
      setOtpSent(false);
      setLocalOtp('');
      setLastOtpSentNumber('');

      if (touchedFields.number) {
        const valid = /^[6-9]\d{9}$/.test(value.trim());
        setErrors((prev) => ({
          ...prev,
          number: valid ? null : 'Please enter a valid 10-digit mobile number.',
        }));
      }
    }

    // Clear errors
    setErrors((prev) => ({ ...prev, [name]: null }));
    setOtpError('');
    setOtpSuccessMsg('');
  };


  const handleGetOtp = async (event) => {
    event.preventDefault();
    setOtpError("");
    setOtpSuccessMsg("");

    try {

      const res = await sendOtp(formData.number);

      // Handle already verified number
      if (res?.text === "Non_Verified_Exist") {
        setIsVerified(true);
        setShowOtpVerifiedMessage(true);
        setOtpSent(false);
        setOtpError("");
        setOtp("");
        setTimer(0);
        setIsResendEnabled(false);
        setLocalOtp(res?.primary_id);
        setLastOtpSentNumber(formData.number);
        setOtpSuccessMsg("Mobile number already verified. You can proceed.");
        return;
      }

      // Handle OTP sent
      if (res?.enc_otp) {
        setOtpSuccessMsg("OTP has been sent to your mobile number.");
        setShowVerifyMessage(false);
        setOtpSent(true);
        setTimer(30);
        setIsResendEnabled(false);
        setLocalOtp(res?.enc_otp);
        setMainId("");
        setLastOtpSentNumber(formData.number);
      } else {
        setOtpError("Failed to send OTP. Please try again.");
        setOtpSent(false);
      }
    } catch (error) {
      console.error("OTP send error:", error);
      setOtpError("Something went wrong while sending OTP.");
    }
  };

  const handleVerifyOtp = async (enteredValue = otp.trim()) => {
    const sanitizedOtp = enteredValue.replace(/\D/g, "");

    if (sanitizedOtp.length < 4) {
      setOtpError("Please enter a valid 4-digit OTP.");
      setOtpSuccessMsg("");
      return;
    }

    if (!localOtp) {
      setOtpError("OTP not received. Please try resending.");
      setOtpSuccessMsg("");
      return;
    }

    try {
      const res = await verifyOtp({
        otp: sanitizedOtp,
        mobile: formData.number,
        main_id: localOtp,
      });

      if (res.message === "valid_otp") {
        setIsVerified(true);
        setShowOtpVerifiedMessage(true);
        setOtpSent(false);
        setOtp("");
        setShowVerifyMessage(false);
        setTimer(0);
        setIsResendEnabled(false);
        setOtpSuccessMsg("OTP verified successfully.");
        setOtpError("");

        setTimeout(() => {
          setShowOtpVerifiedMessage(false);
        }, 3000);
      } else {
        setOtpError("Invalid OTP. Please check and try again.");
        setOtpSuccessMsg("");
      }
    } catch (error) {
      console.error("OTP verify error:", error);
      setOtpError("Something went wrong during OTP verification.");
      setOtpSuccessMsg("");
    }
  };



  const isMobileValid = /^[6-9]\d{9}$/.test(formData.number.trim());

  const validateMobile = (number) => {
    if (!number.trim()) return `${translation?.signin?.mobileIsRequired}`;
    if (!/^[6-9]\d{9}$/.test(number.trim()))
      return `${translation?.signin?.mobileIsValid}`;
    return null;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
      newErrors.name = "Please enter a valid name.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Mobile number validation
    if (!formData.number.trim()) {
      newErrors.number = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.number)) {
      newErrors.number = "Please enter a valid 10-digit Indian mobile number.";
    }

    // Query validation
    if (!formData.query.trim()) {
      newErrors.query = "Query is required.";
    }

    // Terms checkbox validation
    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions.";
    }

    // Set validation errors if any
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if OTP is verified
    if (formData.number && !isVerified) {
      setShowVerifyMessage(true);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        mobile_name: formData.number,
        email: formData.email,
        text: formData.query,
        type_id: isMobile ? 4 : 3,
        "user-message": "Partner Contact Us",
        otp_type: "form_submit_otp_send",
      };


      const response = await postOurContactForm(payload);


      if (response.status === "success") {
        setUserSuccessMsg(`Thank you for reaching out to us. Our team will connect with you shortly regarding your query.`);
        setShowVerifyMessage(false);
        setShowSuccessPopup(true);

        setFormData({
          name: "",
          email: "",
          query: "",
          number: "",
          terms: false,
        });
        setIsVerified(false);
        setOtp("");
        setLocalOtp("");
        setErrors({});

      }

    } catch (error) {
      console.error("API call failed:", error);
      setUserSuccessMsg("Something went wrong. Please try again later.");
    }
  };





  return (
    <section className={`${bgColor ? bgColor : ''} lg:mt-[159px] ${isMobile ? 'pt-8 -my-6' : ''}`}>
      <div className="container ">
        <TittleAndCrumbs
          title={`Contact Us`}
          breadcrumbs={[
            {
              label: 'Home',
              href: '/',
              title: 'Home',
            },
            {
              label: 'Contacts Us',
              href: '/our-contacts',
              title: 'Contacts Us',
              isCurrent: true,
            },
          ]}
        />

        {isMobile ? (



          <>
            <div className="grid grid-cols-1 md:grid-cols-2  items-center md:mx-16">

              <div className="flex gap-2.5 justify-between">
                <div className="min-w-[63px] w-[63px] h-[81px]">

                  <Image
                    src="https://images.tractorgyan.com/uploads/120045/687e0ce21fd70-contact-us-illustration-mobile.webp"
                    alt="Sample"
                    width={63}
                    title="Contact Us Illustration"
                    height={81}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div >
                  <h1 className="text-xl font-bold  text-black">
                    Got a question or A Feedback?
                  </h1>
                  <h2 className="mb-6 text-sm font-normal text-black">
                    Enter your comments through the form below, and our customer service professionals will contact you as soon as possible.
                  </h2>
                </div>
              </div>
              <div className="bg-white p-3 md:p-8 rounded-2xl shadow">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <TG_InputField
                    name="name"
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={translation.blogs.enterName}
                    label={translation.blogs.name}
                    error={errors.name}
                    required
                  />



                  <div className="col-span-4 flex  items-end gap-2 md:col-span-4">
                    {/* Mobile Input Field */}
                    <div className="relative w-full md:w-auto flex-grow">
                      <label
                        htmlFor="mobileNumber"
                        className="block mb-1 text-sm font-semibold text-black"
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
                          className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${errors.number ? "error" : ""
                            }`}
                        />
                        <div className="absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                          <span>+91</span>
                        </div>
                      </div>
                      {(touchedFields.number || errors.number) && errors.number && (
                        <p className="error_message absolute -bottom-5 text-[12px]">
                          {errors.number}
                        </p>
                      )}

                    </div>

                    {/* OTP Button */}
                    {isMobileValid && !isVerified && (
                      <div className="mt-2 md:mt-6">
                        {formData.number === lastOtpSentNumber ? (
                          isResendEnabled ? (
                            <TG_Button
                              onClick={handleGetOtp}
                              variant="outline"
                              className="whitespace-nowrap px-2 text-sm"
                            >
                              {translation?.signInForm?.resend}
                            </TG_Button>
                          ) : (
                            !otpSent && (
                              <TG_Button
                                variant="outline"
                                onClick={handleGetOtp}
                                disabled={!formData.number}
                                className="text-green whitespace-nowrap px-2 text-sm"
                              >
                                {translation?.signInForm?.getOtp}
                              </TG_Button>
                            )
                          )
                        ) : (
                          <TG_Button
                            onClick={handleGetOtp}
                            disabled={!formData.number}
                            variant="outline"
                            className="text-green whitespace-nowrap px-2 text-sm"
                          >
                            {translation?.signInForm?.getOtp}
                          </TG_Button>
                        )}
                      </div>
                    )}
                  </div>




                  {otpError && !otpSent && (
                    <span className="error-message mt-2 text-start">{otpError}</span>
                  )}
                  {otpSuccessMsg && otpSent && (
                    <span className="success-message mt-[-7px] text-end lg:mt-1">
                      {otpSuccessMsg}
                    </span>
                  )}

                  {otpSent && !isVerified && formData.number === lastOtpSentNumber && (
                    <>
                      <span
                        className={`${otpError ? "mt-4" : otpSuccessMsg ? "mt-[-16px]" : "mt-0"
                          } registerOtpSpan relative`}
                      >
                        <label htmlFor="otp"
                          className="block mb-1 text-[14px] font-semibold text-black">{translation?.signInForm?.otpLabel}</label>
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
                              className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${otpError ? "error" : ""
                                }`}
                            />
                            {!isResendEnabled && (
                              <span className="otpTimer hidden md:block">{timer}s</span>
                            )}
                          </span>

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

                  {showSuccessPopup && userSuccessMsg && (
                    <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
                      <div className="container">
                        <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[700px] md:px-4">
                          <div className="flex flex-col items-center justify-center gap-2 overflow-auto">
                            <Image
                              src="https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp"
                              height={100}
                              width={100}
                              title="success icon"
                              alt="success icon"
                              className="mx-auto flex max-w-[60px]"
                            />
                            <button
                              className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                              onClick={() => setShowSuccessPopup(false)}
                            >
                              <Image
                                src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                                height={50}
                                width={50}
                                alt="close icon"
                                title="close icon"

                              />
                            </button>
                            <div className="text-center">
                              <span className="md:text-md text-sm text-gray-main">
                                {userSuccessMsg}
                              </span>
                            </div>
                            <Link
                              href="https://www.whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
                              target="_blank"
                              className="inline-flex items-center gap-2 rounded-2xl bg-green-lighter px-4 py-2.5 text-xs text-primary md:text-sm"
                            >
                              <Image
                                src="https://images.tractorgyan.com/uploads/117376/6780c85caf9ca-tractorgyan-whatsapp-icon.webp"
                                height={100}
                                width={100}
                                title="youtube icon"
                                alt="youtube icon"
                                className="h-full max-h-10 min-h-10 w-auto"
                              />
                              {translation?.suggestedPopup.mainParaRForWhatsappJoin}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}





                  <TG_InputField
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={translation.blogs.enterEmail}
                    label={translation.blogs.email}
                    error={errors.email}
                  />
                  <TG_InputField
                    name="query"
                    id="query"
                    type="textarea"
                    value={formData.query}
                    onChange={handleInputChange}
                    placeholder={translation.blogs.enterText}
                    label={"Write your Query"}
                    error={errors.query}
                    rows={4}
                    required
                  />

                  <div className="termsParaOfRegister mt-4">
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
                  </div>
                  {errors.terms && <span className="error-message">{errors.terms}</span>}




                  <div className="flex justify-center">
                    <TG_Button type="submit" className="w-full md:w-auto px-6 py-2 text-base">
                      Submit
                    </TG_Button>
                  </div>

                </form>
              </div>
            </div>
          </>


        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mx-2 md:mx-16">
              {/* Left Side - Title and Form */}
              <div>
                <h1 className="text-3xl font-bold mb-4 text-black">
                  Got a question or a feedback?
                </h1>
                <h2 className="mb-6 text-base font-semibold text-black">
                  Enter your comments through the form below, and our customer service professionals will contact you as soon as possible.
                </h2>

                <div className="bg-white p-3 md:p-8 rounded-2xl shadow">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <TG_InputField
                      name="name"
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={translation.blogs.enterName}
                      label={translation.blogs.name}
                      error={errors.name}
                      required
                    />



                    <div className="col-span-6 flex flex-wrap items-end gap-2 md:col-span-4">
                      {/* Mobile Input Field */}
                      <div className="relative w-full md:w-auto flex-grow">
                        <label
                          htmlFor="mobileNumber"
                          className="block mb-1 text-[14px] font-semibold text-black"
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
                            className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${errors.number ? "error" : ""
                              }`}
                          />
                          <div className="absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                            <span>+91</span>
                          </div>
                        </div>
                        {(touchedFields.number || errors.number) && errors.number && (
                          <p className="error_message absolute -bottom-5 text-[12px]">
                            {errors.number}
                          </p>
                        )}

                      </div>

                      {/* OTP Button */}
                      {isMobileValid && !isVerified && (
                        <div className="mt-7 md:mt-6">
                          {formData.number === lastOtpSentNumber ? (
                            isResendEnabled ? (
                              <TG_Button
                                onClick={handleGetOtp}
                                variant="outline"
                                className=" !py-[6px] "
                              >
                                {translation?.signInForm?.resend}
                              </TG_Button>
                            ) : (
                              !otpSent && (
                                <TG_Button
                                  variant="outline"
                                  onClick={handleGetOtp}
                                  disabled={!formData.number}
                                  className="text-green  !py-[6px] "
                                >
                                  {translation?.signInForm?.getOtp}
                                </TG_Button>
                              )
                            )
                          ) : (
                            <TG_Button
                              onClick={handleGetOtp}
                              disabled={!formData.number}
                              variant="outline"
                              className="text-green  !py-[6px] "
                            >
                              {translation?.signInForm?.getOtp}
                            </TG_Button>
                          )}
                        </div>
                      )}
                    </div>




                    {otpError && !otpSent && (
                      <span className="error-message mt-2 text-start">{otpError}</span>
                    )}
                    {otpSuccessMsg && otpSent && (
                      <span className="success-message mt-[-7px] text-end lg:mt-1">
                        {otpSuccessMsg}
                      </span>
                    )}

                    {otpSent && !isVerified && formData.number === lastOtpSentNumber && (
                      <>
                        <span
                          className={`${otpError ? "mt-4" : otpSuccessMsg ? "mt-[-16px]" : "mt-0"
                            } registerOtpSpan relative`}
                        >
                          <label htmlFor="otp"
                            className="block mb-1 text-[14px] font-semibold text-black">{translation?.signInForm?.otpLabel}</label>
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
                                className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${otpError ? "error" : ""
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

                    {showSuccessPopup && userSuccessMsg && (
                      <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
                        <div className="container">
                          <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[700px] md:px-4">
                            <div className="flex flex-col items-center justify-center gap-2 overflow-auto">
                              <Image
                                src="https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp"
                                height={100}
                                width={100}
                                title="success icon"
                                alt="success icon"
                                className="mx-auto flex max-w-[60px]"
                              />
                              <button
                                className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                                onClick={() => setShowSuccessPopup(false)}
                              >
                                <Image
                                  src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                                  height={50}
                                  width={50}
                                  alt="close icon"
                                  title="close icon"
                                />
                              </button>
                              <div className="text-center">
                                <span className="md:text-md text-sm text-gray-main">
                                  {userSuccessMsg}
                                </span>
                              </div>
                              <Link
                                href="https://www.whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
                                target="_blank"
                                className="inline-flex items-center gap-2 rounded-2xl bg-green-lighter px-4 py-2.5 text-xs text-primary md:text-sm"
                              >
                                <Image
                                  src="https://images.tractorgyan.com/uploads/117376/6780c85caf9ca-tractorgyan-whatsapp-icon.webp"
                                  height={100}
                                  width={100}
                                  title="youtube icon"
                                  alt="youtube icon"
                                  className="h-full max-h-10 min-h-10 w-auto"
                                />
                                {translation?.suggestedPopup.mainParaRForWhatsappJoin}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <TG_InputField
                      name="email"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={translation.blogs.enterEmail}
                      label={translation.blogs.email}
                      error={errors.email}
                    />
                    <TG_InputField
                      name="query"
                      id="query"
                      type="textarea"
                      value={formData.query}
                      onChange={handleInputChange}
                      placeholder={translation.blogs.enterText}
                      label={"Write your Query"}
                      error={errors.query}
                      rows={4}
                      required
                    />

                    <div className="termsParaOfRegister mt-4">
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
                    </div>
                    {errors.terms && <span className="error-message">{errors.terms}</span>}




                    <div className="flex justify-center">
                      <TG_Button type="submit" className="w-full md:w-auto px-6 py-2 text-base">
                        Submit
                      </TG_Button>
                    </div>

                  </form>
                </div>
              </div>


              {/* Right Side - Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.tractorgyan.com/uploads/120041/687de8cb0e1c2-contact-us-illustration.webp"
                  alt="Sample"
                  className="w-full h-auto max-w-md rounded-xl shadow-lg object-cover"
                />
              </div>
            </div>
          </>
        )
        }


      </div>
    </section>
  );
};

export default FeedBackForm;
