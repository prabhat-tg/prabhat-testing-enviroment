"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../auth/SignInPopup.css";
import Image from "next/image";
import ForgotPasswordForm from "./ForgetPasswordForm";
import { useRouter } from "next/navigation";

const ForgetPassword = ({
  onShowSignIn,
  translation,
  onClose,
  currentLang,
  onResetForm,
}) => {
  const popupRef = useRef();
  const [activePopup, setActivePopup] = useState("register");
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
  const router = useRouter();

  const handleOverlayClick = (event) => {
    // if (popupRef.current && !popupRef.current.contains(event.target)) {
    //   onClose();
    // }
  };
  const handleRegisterNow = () => {
    if (onShowSignIn) {
      onShowSignIn("register");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);
    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

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
      console.log(formData);
      //   onLoginSuccess(formData.username);
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

  console.log("-----translation", translation);

  return (
    <div className="SignInPopupOverlay">
      <div className={`signUpFullDiv ${activePopup}`} ref={popupRef}>
        <div className="relative mx-auto flex w-[90%] max-w-[479px] items-center justify-between pt-6">
          <Image
            src="https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp"
            alt="Logo"
            className="signUpLogoTg"
            height={100}
            width={100}
          />
          <div className="sign-in-heading-container">
            <h4 className="registerPopupHeading mt-8 lg:mt-0">
              {translation?.signInForm?.forgotPassword}
            </h4>
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-secondary bg-white text-xl"
          >
            {"×"}
          </button>
        </div>
        <div className="SignInPopupContent">
          <ForgotPasswordForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setErrors={setErrors}
            onShowSignIn={onShowSignIn}
            translation={translation}
            currentLang={currentLang}
            onClose={onClose}
          />
          <div className="registerAndLoginFeature mt-4">
            <p className="registerNowAgain">
              {translation?.loginValidations?.DontHaveAnAccount}{" "}
              <span
                onClick={handleRegisterNow}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                {translation?.loginValidations?.RegisterNow}
              </span>
            </p>
          </div>
        </div>
        <Image
          src="https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp"
          alt="OTP Footer Img"
          className="optFooterImg w-full"
          height={100}
          width={100}
        />
      </div>
    </div>
  );
};
export default ForgetPassword;
