"use client";

import { useState } from "react";
import { postData } from "@/src/services/apiMethods";
// import { useTranslation } from "react-i18next";

const SubscriptionForm = ({ translation }) => {
  // const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      setResponseMessage("Email is required.");
      setMessageColor("red");
      return;
    }

    if (!validateEmail(email)) {
      setResponseMessage("Please enter a valid email address.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await postData(
        "https://staging.tractorgyan.com/api/news_letter_save",
        { email },
      );
      if (response.success === true) {
        setResponseMessage("Thank You for Subscribing.");
        setMessageColor("green");
        setEmail("");
      } else if (response.success === false) {
        setResponseMessage("This email is already registered.");
        setMessageColor("red");
      } else {
        setResponseMessage("Something went wrong. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      setResponseMessage("Network error. Please try again later.");
      setMessageColor("red");
    }
  };

  return (
    <div className="w-full max-w-[650px]">
      <h5 className="mb-2 text-lg font-semibold">
        {translation.footer.subscribetoNewsletter}
      </h5>
      <div className="flex h-[45px] w-full gap-2.5">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-full w-full flex-1 rounded-[40px] border-[1px] border-gray-secondary bg-transparent px-[27px] py-2 text-xs"
        />
        <button
          onClick={handleSubscribe}
          className="w-[135px] rounded-full bg-black px-4 py-2 text-base font-medium text-white"
        >
          {translation.buttons.subscribe}
        </button>
      </div>
      <div className="mt-1 h-5 text-sm">
        {responseMessage && (
          <p style={{ color: messageColor }}>{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionForm;
