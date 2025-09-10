'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { getApiUrl } from '@/src/utils/utils';
import { handleOtpInputChange } from '@/src/utils';
const OtpVerificationPopup = ({
  isMobile,
  otp,
  primaryId,
  onClose,
  mobile,
  selectedType,
  bradn_name,
  selectedModel,
  product_id,
  state,
  district,
  tehsil,
  name,
}) => {
  const [otpTimer, setOtpTimer] = useState(20);
  const [localMobile, setLocalMobile] = useState(mobile || '');
  const [otpMobile, setOtpMobile] = useState('');
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(otp);
  const [showSuggestedPopup, setShowSuggestedPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(true);
  const [suggestedTractors, setSuggestedTractors] = useState([]);
  const [suggestedTyres, setSuggestedTyres] = useState([]);

  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedFlag, setVerifiedFlag] = useState('Non_Verified');
  const apiUrl = getApiUrl();
  const verifyOtp = e => {
    e.preventDefault();
    if (!generatedOtp || !primaryId) {
      alert('OTP or request ID is missing. Please request a new OTP.');
      return;
    }
    if (enteredOtp === generatedOtp.toString()) {
      axios
        .post(`${apiUrl}/api/enquiry_otp_verify`, {
          otp: enteredOtp,
          primary_id: primaryId,
        })
        .then(response => {
          if (response.data.success) {
            setOtpVerified(true);
            setShowOTPPopup(false); // Hide OTP popup on success
            fetchSuggestedTractors(true); // Fetch suggested tractors
          } else {
            alert('Failed to verify OTP. Please try again.');
          }
        })
        .catch(error => console.error('Error verifying OTP:', error));
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };
  useEffect(() => {
    const getSuggestedTyres = async () => {
      // if (!otp) return;
      try {
        const result = await postData('/api/suggested_tyre', {
          brand_name: 'mrf',
        });
        console.log('suggest', result.data);
        if (result.success) {
          setSuggestedTyres(result.data);
        }
      } catch (error) {
        console.error('Error in suggested_tyre:', error);
      }
    };
    getSuggestedTyres();
  }, []);

  // OTP Timer
  useEffect(() => {
    let timer;
    if (showOTPPopup && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer(prevTimer => prevTimer - 1), 1000);
    }
    if (otpTimer === 0) setShowResendButton(true);
    return () => clearInterval(timer);
  }, [showOTPPopup, otpTimer]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Edit Mobile Section
  const handleEditMobile = () => setIsEditingMobile(true);
  const handleSaveMobile = () => {
    setOtpMobile(mobile);
    setIsEditingMobile(false);
    handleResendOtp();
  };
  const handleCancelEdit = () => setIsEditingMobile(false);

  const handleResendOtp = () => {
    if (!mobile || !primaryId) {
      alert('Mobile number or OTP request ID is missing.');
      return;
    }
    axios
      .post(`${apiUrl}/api/enquiry_otp_resend`, {
        mobile,
        primary_id: primaryId,
      })
      .then(response => {
        if (response.data.success) {
          setGeneratedOtp(response.data.data.otp);
          setOtpTimer(20);
          setShowResendButton(false);
        } else {
          alert('Failed to resend OTP. Please try again.');
        }
      })
      .catch(() => console.error('Error resending OTP'));
  };

  // Suggested Tractors Fetching
  const fetchSuggestedTractors = otpVerified => {
    axios
      .post(`${apiUrl}/api/suggested_tyre`, {
        product_id: product_id,
        brand_name: bradn_name,
      })
      .then(response => {
        if (response.data.success) {
          setSuggestedTractors(response.data.data);
          setShowSuggestedPopup(true);
          setOtpVerified(otpVerified);
        } else {
          alert('Failed to fetch suggested tractors. Please try again.');
        }
      })
      .catch(() => alert('Error fetching suggested tractors. Please try later.'));
  };

  // Close Popups
  const closeSuggestedPopup = () => setShowSuggestedPopup(false);

  const skipOtpVerification = () => {
    setShowOTPPopup(false); // Hide OTP popup on skip
    fetchSuggestedTractors(false);
    setShowSuggestedPopup(true); // Show suggested tractors popup
  };

  const verifyOtpForPrice = () => {
    handleResendOtp();
    setShowSuggestedPopup(false);
    setShowOTPPopup(true);
  };

  const handleInterestClick = tyre => {
    const typeId = isMobile ? 99 : 100;
    const enquiryData = {
      name,
      mobile: mobile,
      type: selectedType,
      brand: bradn_name,
      model: selectedModel,
      state,
      district,
      tehsil,
      primary_id: primaryId,
      page_source: 'Whatsapp Popup',
      type_id: typeId,
      verified_flag: verifiedFlag,
    };
    axios
      .post(`${apiUrl}/api/whatsapp_popup_enquiry`, enquiryData)
      .then(response => {
        if (response.data.success) {
          console.log('Enquiry submitted successfully:', response.data);
        } else {
          console.error('Error in enquiry submission:', response.data);
        }
      })
      .catch(error => {
        console.error('Error submitting enquiry:', error);
      });
  };

  return (
    <>
      {showOTPPopup && (
        <>
          <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
            <div className="container">
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
                      <span> skip</span>
                    </button>
                  </div>
                  <div className="mx-auto max-w-[350px]">
                    <div className="mb-3 text-center text-xl font-bold text-black">
                      <span className="border-b-2 border-b-secondary pb-1">Enter OTP</span>
                    </div>
                    <div className="mb-2 text-center text-sm font-normal text-gray-main">
                      <span> Please Enter OTP For Tyre Price</span>
                    </div>

                    <form className="mb-6 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2">
                      <div className="col-span-6">
                        {isEditingMobile ? (
                          <>
                            <label
                              htmlFor="mobileNumber"
                              className="mb-0 block text-sm font-semibold text-black"
                            >
                              Edit Mobile Number
                            </label>
                            <div className="mt-1 flex gap-2">
                              <input
                                type="text"
                                name="mobileNumber"
                                id="mobileNumber"
                                value={mobile}
                                onChange={e => setMobile(e.target.value)}
                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={handleSaveMobile}
                                  className="flex items-center justify-center gap-2 rounded-md bg-primary px-2 py-2 text-sm text-white"
                                >
                                  <span> Save</span>
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="flex items-center justify-center gap-2 rounded-md bg-red-danger px-2 py-1.5 text-sm text-white"
                                >
                                  <span> Cancel</span>
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <label
                              htmlFor="mobileNumber"
                              className="mb-0 block text-sm font-semibold text-black"
                            >
                              Edit Mobile Number
                            </label>
                            <div className="mt-1 flex gap-2">
                              <input
                                type="text"
                                name="mobileNumber"
                                id="mobileNumber"
                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                                value={mobile}
                                readOnly
                              />
                              <button
                                onClick={handleEditMobile}
                                className="text-nowrap text-blue-light"
                              >
                                ✎ Edit Number
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="otp"
                          className="mb-0 block text-sm font-semibold text-black"
                        >
                          OTP
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="otp"
                            id="otp"
                            autoComplete="off"
                            value={enteredOtp}
                            onChange={e => handleOtpInputChange(e, setEnteredOtp)}
                            className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-gray-main placeholder:text-gray-main focus:outline-none"
                            placeholder={translation?.whatsappPopup.enterOtp}
                            maxLength="6"
                          />
                          <span className="absolute right-2 top-2 text-blue-light">
                            {otpTimer > 0 && (
                              <span className="timerSection">{formatTime(otpTimer)}</span>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          {showResendButton ? (
                            <button
                              className="mt-1 text-nowrap text-blue-light"
                              onClick={handleResendOtp}
                            >
                              <span> Resend OTP</span>
                            </button>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </form>

                    <button className="mx-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-lg text-white">
                      <span> Verify</span>
                    </button>
                  </div>
                </div>
                <Image
                  src={
                    'https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp'
                  }
                  height={500}
                  width={500}
                  alt="enquiry-form-image"
                  title="enquiry-form-image"
                  className="h-auto max-w-full"
                />
              </div>
            </div>
          </div>
          {/* <div className="otpPopup">
                        <div className="otpPopupContent">
                            <div className="otpTopSection">
                                <img src="https://images.tractorgyan.com/uploads/113889/66979a515cb48-tractorgyanBlacklogoPopup.webp" title="TractorGyan Logo" alt="TractorGyan Logo" loading="lazy" />
                                <span className="otpCloseBtn" onClick={skipOtpVerification}>Skip</span>
                            </div>
                            <h2>Enter OTP</h2>
                            <p>Please Enter OTP For Tractor Price</p>
                            <div className="otpMobileSection">
                                {isEditingMobile ? (
                                    <div className="editMobileSection">
                                        <input type="text" className="userMobileNumber" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile Number" />
                                        <button onClick={handleSaveMobile} className="saveBtn commonNumberBtn">Save</button>
                                        <button onClick={handleCancelEdit} className="cancelBtn commonNumberBtn">Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <input type="text" className="userMobileNumber" value={mobile} readOnly />
                                        <span onClick={handleEditMobile}>✎ Edit Number</span>
                                    </>
                                )}
                            </div>
                            <form>
                                <input type="number" placeholder="Enter OTP" value={enteredOtp} onChange={handleOtpChange} />
                                {otpTimer > 0 && <span className="timerSection">{formatTime(otpTimer)}</span>}
                                <span className="otpSubmitResend">
                                    <button type="submit" onClick={verifyOtp}>Submit OTP</button>
                                    {showResendButton && <span className="resendOtpSpan" onClick={handleResendOtp}>Resend OTP</span>}
                                </span>
                            </form>
                            <img src="https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp" title="OTP Footer Img" alt="OTP Footer Img" loading="lazy" className="optFooterImg" />
                        </div>
                    </div> */}
        </>
      )}
      {showSuggestedPopup && (
        // <div className="suggestedPopup">
        //     <div className="suggestedPopupContent">
        //         <Image width={84} height={84} src='https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp' title="sucsess icon" alt="sucsess icon" priority unoptimized className='sucsessRelatedIcon' />
        //         <span className="suggestedPopupCloseBtn" onClick={closeSuggestedPopup}>
        //             <img src="https://images.tractorgyan.com/uploads/114009/66a13c3da996e-langPopupClose.webp" title="close icon" alt="close icon" loading="lazy" />
        //         </span>
        //         <h2 className='brandModelRelatedHeading brandModelRelatedHeadingImplements'><span>Succesesfully ! </span> {selectedType} {bradn_name} {selectedModel} Enquiry</h2>
        //         <span className='relatedPopupPara'>Your Inquiry has been successfully submitted. Thank you for reaching out.</span>
        //         <span className='relatedYoutubeSpan'><Image width={73} height={40} src='https://images.tractorgyan.com/uploads/113944/669c110053e08-relatedYoutube.webp' title="youtube icon" alt='youtube icon' priority unoptimized /> For more interesting content please join TractorGyan Channel.</span>
        //         <div className="suggestedTractorsList">
        //             {suggestedTractors && suggestedTractors.length > 0 ? (
        //                 suggestedTractors.slice(0, 3).map((tractor, index) => (
        //                     <div key={index} className="suggestedTractor">
        //                         <Image width={146} height={164} src={`https://images.tractorgyan.com/uploads/${tractor.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`} title={`${tractor.brand} ${tractor.model}`} alt={`${tractor.brand} ${tractor.model}`} priority unoptimized />
        //                         <span className="relatedInterestBtn" onClick={() => handleInterestClick(tractor)}>Interest</span>
        //                         <p className="relatedBrandModels">{tractor.brand} {tractor.model}</p>
        //                         {otpVerified ? (
        //                             <p className="relatedBPriceRange">Price Range: <strong>{tractor.price}</strong></p>
        //                         ) : (
        //                             <button className="relatedVerifyButton" onClick={verifyOtpForPrice}>Verify mobile number to know the price</button>
        //                         )}
        //                     </div>
        //                 ))
        //             ) : (
        //                 <p>No Suggested Implements Available.</p>
        //             )}

        //         </div>
        //     </div>
        // </div>
        <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
          <div className="container">
            <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[700px] md:px-8">
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
                  onClick={closeSuggestedPopup}
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
                    Your Inquiry has been successfully submitted. Thank you for reaching out.
                  </span>
                  <div className="mx-auto my-2 flex flex-col items-center justify-center rounded-lg border-[1px] border-primary bg-white px-8 py-1 text-sm text-primary">
                    <span className="text-xs">Get this tractor for</span>
                    <span className="text-base font-bold">₹9,XX,XXX - ₹15,XX,XXX*</span>
                    <span className="text-xs text-gray-main">
                      *Prices may vary in different states
                    </span>
                  </div>
                  <button onClick={handleGetPrice} className="text-base text-blue-link">
                    Verify your mobile number and get price
                  </button>
                </div>
                <Link
                  href="https://whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
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
                  For more interesting content please join TractorGyan Channel.
                </Link>
              </div>
              <div className="text-cente">
                <div className="my-2 text-center text-sm font-bold md:text-lg">Similar Tyres</div>
                <div className="updates-section w-full pb-8 md:pb-2">
                  <Slider
                    className="custom-slider"
                    infinite={true}
                    speed={500}
                    slidesToShow={3}
                    slidesToScroll={1}
                    dots={false}
                    autoplay={false}
                    arrows={false}
                    autoplaySpeed={2000}
                    responsive={[
                      {
                        breakpoint: 786,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                          dots: true,
                          arrows: true,
                          autoplay: true,
                        },
                      },
                      {
                        breakpoint: 400,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          dots: true,
                          arrows: true,
                          autoplay: true,
                        },
                      },
                    ]}
                  >
                    {console.log('suggestedTyres', suggestedTyres)}
                    {suggestedTyres &&
                      suggestedTyres.map((tyre, index) => (
                        <div key={index} className="p-2">
                          <div className="w-full rounded-2xl p-4 shadow-card">
                            <div className="mx-auto max-h-[168px] w-full max-w-[210px]">
                              <Image
                                src={
                                  'https://images.tractorgyan.com/uploads/112275/65f2f11f8aa55-MRF-Shakti-Super-12-4-28.webp'
                                }
                                height={500}
                                width={500}
                                alt={tyre.brand_name + tyre.model}
                                title={tyre.brand_name + tyre.model + ' Tyre Image'}
                                className="h-auto w-full max-w-[210px]"
                              />
                            </div>
                            <div className="mb-2 text-center">
                              <span>{tyre.brand_name + tyre.model} Farmtrac 45 Smart</span>
                            </div>
                            <button
                              onClick={() => handleInterestClick(tyre)}
                              className="text-md mx-auto mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-white"
                            >
                              <span> I’m Interested</span>
                            </button>
                            <div className="mx-auto flex w-full flex-col items-center justify-center rounded-lg border-[1px] border-primary bg-white px-1 py-1.5 text-sm text-primary">
                              <span className="font-bold">₹ 15,XX,XXX*</span>
                            </div>
                            {otpVerified ? (
                              <p className="relatedBPriceRange">
                                Price Range: <strong>{tractor.price}</strong>
                              </p>
                            ) : (
                              <button className="relatedVerifyButton" onClick={verifyOtpForPrice}>
                                Verify mobile number to know the price
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpVerificationPopup;
