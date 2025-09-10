import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "@/src/utils/utils";
import { handleOtpInputChange } from "@/src/utils";

// Popup Wrapper for overlays
const PopupWrapper = ({ children }) => (
  <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
    <div className="container">{children}</div>
  </div>
);

// WhatsApp Channel Link
export const WhatsappChannel = ({ translation }) => (
  <Link
    href="https://www.whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
    target="_blank"
    className="inline-flex items-center gap-2 rounded-2xl bg-green-lighter px-4 py-2.5 text-xs text-primary md:text-sm lg:text-base"
  >
    <Image
      src="https://images.tractorgyan.com/uploads/117376/6780c85caf9ca-tractorgyan-whatsapp-icon.webp"
      height={100}
      width={100}
      title="whatsapp icon"
      alt="whatsapp icon"
      className="h-full max-h-10 min-h-10 w-auto"
    />
    {translation?.suggestedPopup.mainParaRForWhatsappJoin}
  </Link>
);

const SubmitOtpForm = ({
  translation,
  otp,
  primaryId,
  mobile,
  bradn_name,
  product_id,
  existVerified,
  closeEnquryPopup,
}) => {
  // State
  const [otpTimer, setOtpTimer] = useState(20);
  const [localMobile, setLocalMobile] = useState(mobile || "");
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [showResendButton, setShowResendButton] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(otp);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(true);
  const apiUrl = getApiUrl();

  // Helpers
  const maskMobile = (m) =>
    !m || m.length < 6 ? m : m.slice(0, 2) + " ***** " + m.slice(-2);
  const maskOneWords = (str) =>
    !str || str.length < 3 ? str : str.slice(0, 1) + " *** " + str.slice(-1);
  const formatTime = (time) =>
    `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60,
    ).padStart(2, "0")}`;

  // OTP Timer
  useEffect(() => {
    if (!showOTPPopup || otpTimer <= 0) return;
    const timer = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    if (otpTimer === 1) setShowResendButton(true);
    return () => clearInterval(timer);
  }, [showOTPPopup, otpTimer]);

  useEffect(() => {
    // Reset OTP UI and related states when a new enquiry is started
    setShowOTPPopup(true);
    setEnteredOtp("");
    setOtpTimer(20);
    setShowResendButton(false);
  }, [primaryId, product_id, bradn_name]);

  // API Calls
  const verifyOtp = (e) => {
    e.preventDefault();
    if (!primaryId) return alert("OTP or request ID missing.");
    axios
      .post(`${apiUrl}/api/enquiry_otp_verify`, {
        // otp: enteredOtp,
        // primary_id: primaryId,
        out: enteredOtp,
        main_id: generatedOtp,
        p_id: primaryId,
        button_type: "submit",
        keyup: "session_verify",
        mobile: localMobile,
        submit_form_name: "enquiry_datas",
      })
      .then((res) => {
        console.log("otp", res.data.data.status === "invalid_otp");
        if (res.data.success && res.data.data) {
          if (res.data.data.status === "invalid_otp") {
            alert("invalid otp");
          } else {
            setShowOTPPopup(false);
            setShowThankYouPopup(true);
          }
        } else alert("Failed to verify OTP. Please try again.");
      })
      .catch(() => alert("Error verifying OTP."));
  };

  const handleResendOtp = () => {
    if (!localMobile || !primaryId)
      return alert("Mobile or request ID missing.");
    axios
      .post(`${apiUrl}/api/enquiry_otp_resend`, {
        mobile: localMobile,
        primary_id: primaryId,
      })
      .then((res) => {
        if (res.data.success) {
          setGeneratedOtp(res.data.data.otp);
          setOtpTimer(20);
          setShowResendButton(false);
        } else alert("Failed to resend OTP.");
      })
      .catch(() => alert("Error resending OTP."));
  };

  // UI Handlers
  const handleEditMobile = () => setIsEditingMobile(true);
  const handleSaveMobile = () => {
    setIsEditingMobile(false);
    handleResendOtp();
  };
  const handleCancelEdit = () => setIsEditingMobile(false);
  const skipOtpVerification = () => {
    setShowOTPPopup(false);
    setShowThankYouPopup(true);
  };

  // Main Render
  return (
    <>
      {/* OTP Popup */}
      {console.log("showOTPPopup", showOTPPopup, existVerified)}
      {existVerified != "Exist_Verified" && showOTPPopup && (
        <PopupWrapper>
          <div className="mx-auto mt-10 w-full max-w-[450px] overflow-hidden rounded-xl bg-green-lighter shadow-main md:mt-4">
            <div className="relative p-4 md:p-4 md:pt-3">
              <div className="mb-5 flex items-center justify-between">
                <div className="h-[44px] w-full max-w-[180px]">
                  <Image
                    src="https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp"
                    alt="tractorGyan logo"
                    title="tractorGyan logo"
                    height={52}
                    width={245}
                    className="h-auto w-full"
                  />
                </div>
                <button
                  className="flex items-center justify-center gap-2 rounded-md bg-primary px-2 py-1 text-base text-white"
                  onClick={skipOtpVerification}
                >
                  <span>{translation?.whatsappPopup.skip}</span>
                </button>
              </div>
              <div className="mx-auto max-w-[350px]">
                <div className="mb-3 text-center text-xl font-bold text-black">
                  <span className="border-b-2 border-b-secondary pb-1">
                    {translation?.whatsappPopup.EnterOTP}
                  </span>
                </div>
                {/* <div className="text-sm font-normal text-center text-gray-main mb-2">
                                    <span>
                                        {translation?.whatsappPopup.EnterOTPPleaseforTyre}
                                    </span>
                                </div> */}
                <form className="mb-6 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2">
                  <div className="col-span-6">
                    {isEditingMobile ? (
                      <>
                        <label className="mb-0 block text-sm font-semibold text-black">
                          {translation?.whatsappPopup.EditNumber}
                        </label>
                        <div className="mt-1 flex gap-2">
                          <input
                            type="text"
                            value={localMobile}
                            onChange={(e) => setLocalMobile(e.target.value)}
                            className="h-[38px] w-full max-w-[220px] rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleSaveMobile}
                              className="rounded-md bg-primary px-2 py-2 text-sm text-white"
                            >
                              <span>{translation?.whatsappPopup.save}</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="rounded-md bg-red-danger px-2 py-1.5 text-sm text-white"
                            >
                              <span>{translation?.whatsappPopup.Cancel}</span>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <label className="mb-0 block text-sm font-semibold text-black">
                          {translation?.whatsappPopup.EditNumber}
                        </label>
                        <div className="mt-1 flex gap-2">
                          <input
                            type="text"
                            className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                            value={localMobile}
                            readOnly
                          />
                          <button
                            onClick={handleEditMobile}
                            className="text-nowrap text-blue-light"
                          >
                            ✎ {translation?.whatsappPopup.EditNumber}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-span-6">
                    <label className="mb-0 block text-sm font-semibold text-black">
                      {translation?.whatsappPopup.enterOtp}
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={enteredOtp}
                        onChange={(e) => handleOtpInputChange(e, setEnteredOtp)}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-gray-main placeholder:text-gray-main focus:outline-none"
                        placeholder={translation?.whatsappPopup.enterOtp}
                        maxLength="4"
                      />
                      <span className="absolute right-2 top-2 text-blue-light">
                        {otpTimer > 0 && (
                          <span className="timerSection">
                            {formatTime(otpTimer)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      {showResendButton && (
                        <button
                          type="button"
                          className="mt-1 text-nowrap text-blue-light"
                          onClick={handleResendOtp}
                        >
                          <span>{translation?.whatsappPopup.resentOtp}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </form>
                <button
                  type="submit"
                  onClick={verifyOtp}
                  className="mx-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-lg text-white"
                >
                  <span>{translation?.whatsappPopup.verify}</span>
                </button>
              </div>
            </div>
            <Image
              src="https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp"
              height={500}
              width={500}
              alt="enquiry-form-image"
              title="enquiry-form-image"
              className="h-auto max-w-full"
            />
          </div>
        </PopupWrapper>
      )}

      {/* Thank you Popup */}
      {(showThankYouPopup || existVerified === "Exist_Verified") && (
        <PopupWrapper>
          <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[600px] md:px-4">
            <div className="flex flex-col items-center justify-center gap-2 overflow-auto">
              <Image
                src="https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp"
                height={100}
                width={100}
                title="success icon"
                alt="success icon"
                className="mx-auto my-2 flex max-w-[60px] md:my-4 md:max-w-[80px]"
              />
              <button
                className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                onClick={() => {
                  setShowThankYouPopup(false);
                  closeEnquryPopup();
                }}
              >
                <Image
                  src={
                    "https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp"
                  }
                  height={50}
                  width={50}
                  alt="close icon"
                  title="close icon"
                />
              </button>
              <div className="mb-4 text-center">
                <span className="text-sm text-gray-main md:text-2xl">
                  { }
                  {existVerified === "Exist_Verified" ||
                    existVerified === "Non_Verified_Exist"
                    ? translation?.suggestedPopup.mainParaRepeat
                    : translation?.suggestedPopup.mainPara}
                </span>
              </div>
              <WhatsappChannel translation={translation} />
            </div>
          </div>
        </PopupWrapper>
      )}
    </>
  );
};

export default SubmitOtpForm;
