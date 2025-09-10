"use client";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import SignInPopup from "../SignInPopup";

const ForgetPasswordMain = (translation, currentLang) => {
  const [isShowSigninPopup, setIsShowSigninPopup] = useState(false);
  const [signInSource, setSignInSource] = useState("");

  const handleClosePopup = () => {
    setIsShowSigninPopup(false);
  };
  return (
    <>
      <ForgetPassword
        onShowSignIn={(from) => {
          setSignInSource(from);
          setIsShowSigninPopup(true);
        }}
        translation={translation?.translation}
        currentLang={currentLang}
      />

      {isShowSigninPopup && (
        <SignInPopup
          onClose={handleClosePopup}
          onLoginSuccess={null}
          from={signInSource}
          translation={translation}
          currentLang={currentLang}
        />
      )}
    </>
  );
};

export default ForgetPasswordMain;
