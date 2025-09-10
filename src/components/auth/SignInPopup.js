import React, { useEffect, useRef, useState } from "react";
import "../auth/SignInPopup.css";
import Image from "next/image";
import RegisterForm from "./register/RegisterForm";
import LoginForm from "./login/LoginForm";
import ForgotPasswordForm from "./forget-password/ForgetPasswordForm";
import OtpForm from "./otpform/OtpForm";

const SignInPopup = ({
  onClose,
  onLoginSuccess,
  from,
  translation,
  currentLang,
}) => {
  const popupRef = useRef();
  const [activePopup, setActivePopup] = useState("login");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedIsLoggedIn === "true" && storedUsername) {
      setUserName(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);
  const [formData, setFormData] = useState({
    username: "",
    number: "",
    useremail: "",
    userpassword: "",
    userConfirmPassword: "",
    terms: true,
  });
  const [errors, setErrors] = useState({});
  const handleOverlayClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOverlayClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOverlayClick);
  //   };
  // }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Name is required";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.username)) {
      newErrors.username =
        "Name must contain only letters, spaces, apostrophes, or hyphens";
    }
    if (!formData.number) {
      newErrors.number = "Mobile number is required";
    } else if (!/^\d+$/.test(formData.number)) {
      newErrors.number = "Enter a valid mobile number";
    } else if (!/^[5-9]\d{9}$/.test(formData.number)) {
      newErrors.number =
        "Mobile number must be 10 digits and start with 5, 6, 7, 8, or 9";
    }
    if (!formData.useremail) {
      newErrors.useremail = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net|org|edu|gov|co|info|io|me|biz|us|uk|ac|ca|au|int|mil|id|ae|asia|tech|xyz|tv)$/i.test(
        formData.useremail,
      )
    ) {
      newErrors.useremail =
        "Email must be valid and end with a valid domain like .com, .in, .net, etc.";
    }
    if (!formData.userpassword) {
      newErrors.userpassword = "Password is required";
    } else if (formData.userpassword.length < 5) {
      newErrors.userpassword = "Password must be at least 5 characters";
    }
    if (formData.userpassword !== formData.userConfirmPassword) {
      newErrors.userConfirmPassword = "Passwords do not match";
    }
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      onLoginSuccess(formData.username);
      setFormData({
        username: "",
        number: "",
        useremail: "",
        userpassword: "",
        userConfirmPassword: "",
        terms: false,
      });
    }
  };

  return (
    <div className="SignInPopupOverlay">
      <div className={`signUpFullDiv ${activePopup}`} ref={popupRef}>
        <div className="relative mx-auto flex w-[90%] max-w-[479px] items-center justify-between pt-3">
          <Image
            src="https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp"
            alt="Logo"
            className="signUpLogoTg"
            height={100}
            width={100}
          />
          <div className="sign-in-heading-container">
            {from ? (
              <h4 className="registerPopupHeading">
                {activePopup ===
                `${translation?.translation?.signInForm?.logIn}`
                  ? "Log In"
                  : activePopup === "forgotPassword"
                    ? "Forgot Password"
                    : `${translation?.translation?.signin?.signIn}`}
              </h4>
            ) : (
              <h4 className="registerPopupHeading">
                {activePopup === "login"
                  ? `${translation?.signInForm?.logIn}`
                  : activePopup === "forgotPassword"
                    ? "Forgot Password"
                    : `${translation?.signInForm?.register}`}
              </h4>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-secondary bg-white text-xl"
          >
            {"×"}
          </button>
        </div>
        <div className="SignInPopupContent">
          {activePopup === "register" && !from && (
            <RegisterForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setActivePopup={setActivePopup}
              setErrors={setErrors}
              translation={translation}
              currentLang={currentLang}
              onClose={onClose}
            />
          )}
          {activePopup === "login" && !from && (
            <LoginForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setActivePopup={setActivePopup}
              setUserName={setUserName}
              setIsLoggedIn={setIsLoggedIn}
              setErrors={setErrors}
              translation={translation}
              currentLang={currentLang}
              onClose={onClose}
            />
          )}
          {from === "getIntoLogin" && (
            <LoginForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setActivePopup={setActivePopup}
              setUserName={setUserName}
              setIsLoggedIn={setIsLoggedIn}
              setErrors={setErrors}
              from={from}
              translation={translation?.translation}
              currentLang={currentLang}
              onClose={onClose}
            />
          )}
          {from === "register" && (
            <RegisterForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setActivePopup={setActivePopup}
              setErrors={setErrors}
              translation={translation?.translation}
              currentLang={currentLang}
              onClose={onClose}
              from={from}
            />
          )}
          {activePopup === "otp" && !from && (
            <OtpForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setErrors={setErrors}
            />
          )}
        </div>
        <Image
          src="https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp"
          alt="OTP Footer Img"
          className="optFooterImg w-full"
          height={641}
          width={133}
        />
      </div>
    </div>
  );
};
export default SignInPopup;
