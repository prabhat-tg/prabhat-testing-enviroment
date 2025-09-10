"use client";

import React, { useState } from "react";

const FooterClient = ({ translations }) => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      setResponseMessage(
        translations.footer.emailRequired || "Email is required.",
      );
      setMessageColor("red");
      return;
    }

    if (!validateEmail(email)) {
      setResponseMessage(
        translations.footer.invalidEmail ||
          "Please enter a valid email address.",
      );
      setMessageColor("red");
      return;
    }

    try {
      const response = await fetch(
        "https://staging.tractorgyan.com/api/news_letter_save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const result = await response.json();
      if (result.success) {
        setResponseMessage(
          translations.footer.subscribeSuccess || "Thank you for subscribing!",
        );
        setMessageColor("green");
        setEmail("");
      } else {
        setResponseMessage(
          translations.footer.alreadyRegistered ||
            "This email is already registered.",
        );
        setMessageColor("red");
      }
    } catch (error) {
      setResponseMessage(
        translations.footer.networkError ||
          "Network error. Please try again later.",
      );
      setMessageColor("red");
    }
  };

  return (
    <div>
      {/* Newsletter Subscription */}
      <div className="w-full max-w-[650px]">
        <h5 className="mb-2 text-lg font-semibold">
          {translations.footer.subscribetoNewsletter}
        </h5>
        <div className="flex h-[45px] w-full gap-2.5">
          <input
            type="email"
            placeholder={translations.footer.enterEmail || "Enter Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-full w-full flex-1 rounded-[40px] border-[1px] border-gray-secondary bg-transparent px-[27px] py-2 text-xs"
          />
          <button
            onClick={handleSubscribe}
            className="w-[135px] rounded-full bg-black px-4 py-2 text-base font-medium text-white"
          >
            {translations.buttons.subscribe || "Subscribe"}
          </button>
        </div>
        <div className="mt-1 h-5 text-sm">
          {responseMessage && (
            <p style={{ color: messageColor }}>{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FooterClient;
