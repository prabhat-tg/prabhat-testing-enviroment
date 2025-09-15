'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import { fetchData, postData } from '@/src/services/apiMethods';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import apiUrl from '@/src/services/apiUrl';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';

const DealershipRegistrationForm = ({ translation, dealerType = 'Tyre', showBanner = false }) => {
  const isMobile = useIsMobile();
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [tehsils, setTehsils] = useState([]);
  const [selectedTehsil, setSelectedTehsil] = useState('');
  const [pincode, setPincode] = useState('');
  const [dealershipName, setDealershipName] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dealershipAddress, setDealershipAddress] = useState('');
  const [serviceCenterAddress, setServiceCenterAddress] = useState('');
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [verifiedText, setVerifiedText] = useState(null);

  const [otpTimer, setOtpTimer] = useState(20);
  const [localMobile, setLocalMobile] = useState(mobile || '');
  const [otpMobile, setOtpMobile] = useState('');
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [reToken, setResToken] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSkipVerification, setIsSkipVerification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Thank you for reaching out.');
  const [fileError, setFileError] = useState('');

  // const { t, i18n } = useTranslation();

  const handleFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (isSameAddress) {
      setServiceCenterAddress(dealershipAddress);
    }
  }, [isSameAddress, dealershipAddress]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (dealerType == 'tractor') {
        const result = await getAllTractorBrands();
        setBrands(result);
      } else {
        const result = await getTyreBrands();
        setBrands(result);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    // const fetchBrands = async () => {
    //     try {
    //         const result = await postData("/api/all_tyre_brands");
    //         setBrands(result.data);
    //     } catch (error) {
    //         console.error("Error fetching in brands:", error);
    //     }
    // };
    // const fetchState = async () => {
    //   try {
    //     const result = await fetchData("/api/all_state");
    //     setStates(result.data || []);
    //   } catch (error) {
    //     console.error("Error fetching states:", error);
    //   }
    // };

    const fetchState = async () => {
      const data = await getAllStates();
      setStates(data || []);
    };

    // fetchBrands();
    fetchState();
  }, []);
  // useEffect(() => {
  //   const fetchDistricts = async () => {
  //     if (!selectedState) return;
  //     try {
  //       const result = await postData("/api/all_district", {
  //         state: selectedState,
  //       });
  //       setDistricts(result.data);
  //       setTehsils([]);
  //       // setTehsils(result.data)
  //     } catch (error) {
  //       console.error("Error fetching districts:", error);
  //     }
  //   };

  //   fetchDistricts();
  // }, [selectedState]);

  useEffect(() => {
    if (!selectedState) return;

    const fetchModels = async () => {
      const data = await getFetchDistricts(selectedState);
      setDistricts(data);
      setTehsils([]);
    };
    fetchModels();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchModels = async () => {
      const data = await getFetchTehsil(selectedDistrict);
      setTehsils(data || []);
    };
    fetchModels();
  }, [selectedDistrict]);

  const submitFinalForm = async (isSkipped = false) => {
    const formData = new FormData();
    formData.append('dealership_name', dealershipName);
    formData.append('mobile', mobile);
    formData.append('manufacture', selectedBrand);
    formData.append('person_name', contactPersonName);
    formData.append('district', selectedDistrict);
    formData.append('tahsil', selectedTehsil);
    formData.append('state', selectedState);
    formData.append('pincode', pincode);
    formData.append('emailid', email);
    formData.append('dealership_addr', dealershipAddress);
    formData.append('service_addr', serviceCenterAddress);
    formData.append('dealer_type', dealerType || 'Tyre');

    if (file) {
      formData.append('support_doc', file);
    }

    try {
      const response = await fetch(`${apiUrl}/api/dealer_regstration`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setVerifiedText(result.message);

        // Set appropriate success message based on verification path
        if (isSkipped) {
          setSuccessMessage(
            translation?.dealerRegistration?.dealershipSubmissionSuccess ||
            'Thank you for submitting your dealership on TractorGyan. Our team will review the details within 2–3 days, and it will go live on our platform shortly after approval.'
          );
        } else {
          setSuccessMessage(
            translation?.dealerRegistration?.thankYouForReachingOut || 'Thank you for reaching out.'
          );
        }

        // Show success popup
        setShowSuccessPopup(true);

        // Reset form fields
        setDealershipName('');
        setMobile('');
        setSelectedBrand('');
        setContactPersonName('');
        setSelectedDistrict('');
        setSelectedTehsil('');
        setPincode('');
        setSelectedState('');
        setEmail('');
        setDealershipAddress('');
        setServiceCenterAddress('');
        setFile(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(
        translation?.dealerRegistration?.submissionError || 'An error occurred during submission'
      );
    }
  };

  const sendOtp = () => {
    setShowOTPPopup(true);
    // if (!generatedOtp || !mobile) {
    //   alert("Phone Number or request ID is missing.");
    //   return;
    // }

    if (!mobile) {
      alert(
        translation?.dealerRegistration?.phoneNumberMissing ||
        'Phone Number or request ID is missing.'
      );
    }

    axios
      .post(`${apiUrl}/api/enquiry_data_otp_send`, {
        mobile_name: mobile,
        get_otp_type: 'without_db',
        otp_type: 'send',
      })
      .then(response => {
        console.log('otp response', response);
        setResToken(response?.data);

        // if (response.data.success) {
        //   if (typeof setSuccessDealerFormShow === "function") {
        //     setSuccessDealerFormShow("yes");
        //   }
        //   if (typeof setIsCloseAfterSubmit === "function") {
        //     setIsCloseAfterSubmit(false);
        //   }
        //   setOtpVerified(true);
        //   if (
        //     response.data.data.text === "verified" ||
        //     response.data.data.text === "exist_verified"
        //   ) {
        //     console.log("----is otp verified triggerd");
        //     setIsOtpVerified(true);
        //   }
        //   setShowOTPPopup(false);
        //   if (dealerContactName != null || dealerContactName != undefined) {
        //     console.log("---trigegrdddddddd not null");
        //     fetchSuggestedTractors(false);
        //   }
        //   if (dealerContactName == null || dealerContactName == undefined) {
        //     console.log("---trigegrdddddddd null");
        //     fetchSuggestedTractors(true);
        //   }
        // } else {
        //   alert("Failed to verify OTP. Please try again.");
        // }
      })
      .catch(error => console.error('Error verifying OTP:', error));

    // if (enteredOtp === generatedOtp.toString()) {
    //   axios
    //     .post(`${apiUrl}/api/enquiry_data_otp_send`, {
    //       mobile_name: mobile,
    //       get_otp_type: "without_db",
    //       otp_type: "send",
    //     })
    //     .then((response) => {
    //       console.log("otp response", response);
    //       if (response.data.success) {
    //         if (typeof setSuccessDealerFormShow === "function") {
    //           setSuccessDealerFormShow("yes");
    //         }
    //         if (typeof setIsCloseAfterSubmit === "function") {
    //           setIsCloseAfterSubmit(false);
    //         }
    //         setOtpVerified(true);
    //         if (
    //           response.data.data.text === "verified" ||
    //           response.data.data.text === "exist_verified"
    //         ) {
    //           console.log("----is otp verified triggerd");
    //           setIsOtpVerified(true);
    //         }
    //         setShowOTPPopup(false); // Hide OTP popup on success
    //         if (dealerContactName != null || dealerContactName != undefined) {
    //           console.log("---trigegrdddddddd not null");
    //           fetchSuggestedTractors(false);
    //         }
    //         if (dealerContactName == null || dealerContactName == undefined) {
    //           console.log("---trigegrdddddddd null");
    //           fetchSuggestedTractors(true);
    //         }
    //       } else {
    //         alert("Failed to verify OTP. Please try again.");
    //       }
    //     })
    //     .catch((error) => console.error("Error verifying OTP:", error));
    // } else {
    //   alert("Invalid OTP. Please try again.");
    // }
  };

  const verifyOtp = () => {
    if (!mobile) {
      alert(
        translation?.dealerRegistration?.phoneNumberMissing ||
        'Phone Number or request ID is missing.'
      );
      return;
    }

    axios
      .post(`${apiUrl}/api/enquiry_otp_verify`, {
        out: enteredOtp,
        main_id: reToken,
        keyup: 'session_verify',
        mobile: mobile,
      })
      .then(response => {
        console.log('otp response', response);
        if (response.data.success) {
          setOtpVerified(true);
          if (
            response.data.data.text === 'verified' ||
            response.data.data.text === 'exist_verified'
          ) {
            setIsOtpVerified(true);
          }
          if (response.data?.data?.status === 'valid_otp') {
            setIsOtpVerified(true);
            submitFinalForm(false);
            setShowOTPPopup(false);
          }
          if (response.data?.data?.status === 'invalid_otp') {
            alert(translation?.dealerRegistration?.invalidOtp || 'Invalid OTP. Please try again.');
          }
        } else {
          alert(
            translation?.dealerRegistration?.failedToVerifyOtp ||
            'Failed to verify OTP. Please try again.'
          );
        }
      })
      .catch(error => console.error('Error verifying OTP:', error));
  };

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
    setOtpMobile(localMobile);
    setIsEditingMobile(false);
    handleResendOtp();
  };
  const handleCancelEdit = () => setIsEditingMobile(false);

  const handleResendOtp = () => {
    // if (!localMobile || !primaryId) {
    //   alert("Mobile number or OTP request ID is missing.");
    //   return;
    // }
    if (!localMobile || !mobile) {
      alert(
        translation?.dealerRegistration?.mobileNumberMissing ||
        'Mobile number or OTP request ID is missing.'
      );
      return;
    }
    axios
      .post(`${apiUrl}/api/enquiry_otp_resend`, {
        mobile: localMobile,
        primary_id: null,
      })
      .then(response => {
        console.log('resend', response);
        if (response.data.success) {
          setGeneratedOtp(response.data.data.otp);
          setOtpTimer(20);
          setShowResendButton(false);
        } else {
          alert(
            translation?.dealerRegistration?.failedToResendOtp ||
            'Failed to resend OTP. Please try again.'
          );
        }
      })
      .catch(() => console.error('Error resending OTP'));
  };

  const skipOtpVerification = () => {
    setShowOTPPopup(false);
    // Submit the form directly when skipping OTP verification
    submitFinalForm(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Clear previous errors
    setError('');
    setFileError('');

    // Check for document upload
    if (!file) {
      setFileError(translation?.dealerRegistration?.documentRequired || 'Please upload a document');
      return;
    }

    if (!selectedTehsil) {
      setError(translation?.dealerRegistration?.tehsilRequired || 'Tehsil is required');
      return;
    }

    if (!pincode || pincode.length !== 6) {
      setError(translation?.dealerRegistration?.pincodeRequired || 'Please enter a valid 6-digit pincode');
      return;
    }

    sendOtp();
  };

  const handleClose = () => {
    setShowSuccessPopup(false);
    setShowOTPPopup(false);
    setIsSkipVerification(false);
  };

  const handleGetPrice = () => {
    setShowOTPPopup(pre => !pre);
    setShowSuccessPopup(false);
    setIsSkipVerification(false);
  };

  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  return (
    <>
      <section id="dealer-registration">
        <div className="container">
          <div className={`flex w-full flex-col gap-8 md:items-center md:justify-between ${showBanner ? 'lg:flex-row' : ''}`}>
            <div className={`w-full overflow-hidden rounded-2xl shadow-main ${showBanner ? 'lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]' : ''}`}>
              <div className="relative h-full max-h-[143px] w-full shadow-nav md:min-h-[118px] xl:max-h-[118px]">
                <Image
                  src={`${isMobile
                    ? 'https://images.tractorgyan.com/uploads/117764/67a053360489f-dealership-banner--mobile.webp'
                    : 'https://images.tractorgyan.com/uploads/117763/67a05290a2458-dealership-banner-desktop.webp'
                    }`}
                  height={500}
                  width={2000}
                  title="Dealership Banner"
                  alt="tyre price banner"
                  className="h-full max-h-[143px] w-full md:min-h-[118px] xl:max-h-[118px]"
                />
                <div className="absolute left-0 top-0 h-full p-3 text-white sm:p-5 md:w-full md:py-6 md:ps-8">
                  <h3 className="mb-1.5 text-lg font-bold md:text-2xl">
                    {translation?.dealerRegistration?.[dealerType == 'tractor' ? 'tractorDealershipRegistration' : 'tyreDealershipRegistration'] ||
                      'Tyre Dealership Registration'}
                  </h3>
                  <div className="max-w-[60%] text-xs font-medium md:text-sm">
                    {translation?.dealerRegistration?.[dealerType == 'tractor' ? 'dealershipDescriptionTractor' : 'dealershipDescriptionTyre'] ||
                      'If you are a Tyre dealer, Please showcase your dealership in our platform.'}
                  </div>
                </div>
              </div>
              <div className="bg-green-lighter p-3 md:p-8">
                <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-6 gap-x-4 gap-y-2">
                  <div className="col-span-6 md:col-span-2">
                    <label
                      htmlFor="dealershipName"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.dealershipName || 'Dealership Name'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="dealershipName"
                        placeholder={
                          translation?.dealerRegistration?.dealershipNamePlaceholder ||
                          'Dealership Name'
                        }
                        value={dealershipName}
                        onChange={e => setDealershipName(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label htmlFor="tyreBrand" className="mb-0 block text-sm font-bold text-black">
                      {translation?.dealerRegistration?.selectBrand || 'Select Brand'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="tyreBrand"
                        value={selectedBrand}
                        onChange={e => setSelectedBrand(e.target.value)}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">
                          {translation?.dealerRegistration?.selectBrandPlaceholder ||
                            'Select Brand'}
                        </option>
                        {brands?.length > 0 ? (
                          brands.map((brand, index) => (
                            <option key={index} value={brand.name}>
                              {brand.name}
                            </option>
                          ))
                        ) : (
                          <option>
                            {translation?.dealerRegistration?.loading || 'Loading...'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-span-3 md:col-span-2">
                                        <label
                                            htmlFor="registrationMonth"
                                            className="block mb-0 text-sm text-black font-bold"
                                        >
                                            Registration Month
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="registrationMonth"
                                                value={selectedBrand}
                                                onChange={(e) => setSelectedBrand(e.target.value)}
                                                className="w-full h-[38px] bg-transparent text-black text-sm border border-gray-light rounded-lg px-4 py-2  focus:outline-none  "
                                            >
                                                <option value="">Select Month</option>
                                                {brands.length > 0 ? (
                                                    brands.map((brand, index) => (
                                                        <option key={index} value={brand.name}>
                                                            {brand.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option>Loading...</option>
                                                )}
                                            </select>
                                        </div>
                                    </div> */}
                  <div className="col-span-6 md:col-span-2">
                    <label
                      htmlFor="contactPersonName"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.contactPersonName || 'Contact Person Name'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="contactPersonName"
                        placeholder={
                          translation?.dealerRegistration?.contactPersonNamePlaceholder ||
                          'Enter Name'
                        }
                        value={contactPersonName}
                        onChange={e => setContactPersonName(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label
                      htmlFor="mobileNumber"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.mobile || 'Mobile'}
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="tel"
                        id="mobileNumber"
                        placeholder={
                          translation?.dealerRegistration?.mobilePlaceholder || ' xxxxxxxxxx'
                        }
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        required
                        pattern="[6-9]{1}[0-9]{9}"
                        maxLength="10"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                      <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                        <span>+91</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label htmlFor="email" className="mb-0 block text-sm font-bold text-black">
                      {translation?.dealerRegistration?.email || 'Email'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        id="email"
                        placeholder={
                          translation?.dealerRegistration?.emailPlaceholder || 'Enter email'
                        }
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="given-name"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label
                      htmlFor="selectState"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.selectState || 'Select State'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="selectState"
                        value={selectedState}
                        onChange={e => setSelectedState(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option defaultValue>
                          {translation?.dealerRegistration?.selectStatePlaceholder ||
                            'Select State'}
                        </option>
                        {states?.length > 0 ? (
                          states.map(state => (
                            <option key={state.id} value={state.state}>
                              {state.state}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {translation?.dealerRegistration?.loading || 'Loading...'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <label
                      htmlFor="selectDistrict"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.selectDistrict || 'Select District'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="selectDistrict"
                        value={selectedDistrict}
                        onChange={e => setSelectedDistrict(e.target.value)}
                        required
                        disabled={!selectedState}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option defaultValue>
                          {translation?.dealerRegistration?.selectDistrictPlaceholder ||
                            'Select District'}
                        </option>
                        {districts?.length > 0 ? (
                          districts.map(district => (
                            <option key={district.id} value={district.district}>
                              {district.district}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {translation?.dealerRegistration?.loading || 'Loading...'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <label
                      htmlFor="selectTehsil"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.selectTehsil || 'Select Tehsil'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="selectTehsil"
                        value={selectedTehsil}
                        onChange={e => setSelectedTehsil(e.target.value)}
                        required
                        disabled={!selectedDistrict}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option defaultValue>
                          {translation?.dealerRegistration?.selectTehsilPlaceholder ||
                            'Select Tehsil'}
                        </option>
                        {tehsils?.length > 0 ? (
                          tehsils.map(tehsil => (
                            <option key={tehsil.id} value={tehsil.tehsil}>
                              {tehsil.tehsil}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {translation?.dealerRegistration?.loading || 'Loading...'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <label
                      htmlFor="pincode"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.enquiryForm?.pincode || 'Pincode'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="pincode"
                        placeholder={
                          translation?.dealerRegistration?.pincodePlaceholder || 'Enter Pincode'
                        }
                        value={pincode}
                        onChange={e => setPincode(e.target.value)}
                        required
                        pattern="[0-9]{6}"
                        maxLength="6"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-3">
                    <label
                      htmlFor="dealershipAddress"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.dealershipAddress || 'Dealership Address'}
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows={4}
                        id="dealershipAddress"
                        placeholder={
                          translation?.dealerRegistration?.dealershipAddressPlaceholder ||
                          'Enter Address'
                        }
                        value={dealershipAddress}
                        onChange={e => setDealershipAddress(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-3">
                    <label
                      htmlFor="serviceCenterAddress"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.dealerRegistration?.serviceCenterAddress ||
                        'Service Center Address'}
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows={4}
                        id="serviceCenterAddress"
                        placeholder={
                          translation?.dealerRegistration?.serviceCenterAddressPlaceholder ||
                          'Enter Address'
                        }
                        value={serviceCenterAddress}
                        onChange={e => setServiceCenterAddress(e.target.value)}
                        disabled={isSameAddress}
                        required
                        className="w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>

                    <div className="mt-2 inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sameAsDealerAddress"
                        className="form-checkbox text-blue-600 h-3.5 w-3.5"
                        checked={isSameAddress}
                        onChange={e => setIsSameAddress(e.target.checked)}
                      />
                      <label
                        htmlFor="sameAsDealerAddress"
                        className="text-sm font-normal text-gray-dark"
                      >
                        {translation?.dealerRegistration?.sameAsDealershipAddress ||
                          'Same as Dealership Address'}
                      </label>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="uploadFile" className="mb-0 block text-sm font-bold text-black">
                      {translation?.dealerRegistration?.uploadDocument ||
                        'Upload PDF Document (Max 10mb)'}{' '}
                      <span className="text-red-500">
                        {translation?.dealerRegistration?.requiredField || '*'}
                      </span>
                    </label>
                    <div className="mt-2">
                      <label
                        htmlFor="file-upload"
                        className={`flex h-16 w-full items-center justify-center gap-2.5 rounded-lg border ${fileError ? 'border-red-500' : 'border-gray-light'
                          } bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none`}
                      >
                        {file ? (
                          <span className="text-sm font-medium text-blue-link underline">
                            {file.name}
                          </span>
                        ) : (
                          <>
                            <Image
                              src={
                                'https://images.tractorgyan.com/uploads/117711/679a1237b16b0-file-upload-cloud-icon.webp'
                              }
                              height={200}
                              width={200}
                              alt="upload file"
                              title="upload file"
                              className="h-7 w-8"
                            />
                            <span className="cursor-pointer text-sm font-medium text-blue-link underline">
                              {translation?.dealerRegistration?.uploadFile || 'Upload File'}
                            </span>
                          </>
                        )}
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.rtf,.odt,.csv"
                      />
                      {fileError && <p className="text-red-500 mt-1 text-xs">{fileError}</p>}
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <div className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="form-checkbox text-blue-600 h-3.5 w-3.5"
                        required
                        defaultChecked
                      />
                      <label htmlFor="terms" className="text-sm text-gray-dark">
                        {translation?.dealerRegistration?.termsAndConditions ||
                          'By proceeding ahead you expressly agree to the TractorGyan'}
                        <Link
                          href={'https://tractorgyan.com/terms-of-use'}
                          className="ms-1 font-bold text-blue-link"
                        >
                          {translation?.dealerRegistration?.termsAndConditionsLink ||
                            'Terms and Condition'}
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-6 flex justify-center">
                    <button
                      type="submit"
                      // disabled={isSubmitting}
                      className="mx-auto flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-lg bg-primary px-6 py-2 text-lg text-white"
                    >
                      <span>{translation?.dealerRegistration?.submit || 'Submit'}</span>
                    </button>
                  </div>
                </form>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            {/* Banner Section - conditionally rendered */}
            {showBanner && (
              <>
                <Link
                  href="https://tractorgyan.com/tractors"
                  className="h-full w-full overflow-hidden rounded-2xl lg:hidden"
                >
                  <Image
                    src="https://images.tractorgyan.com/uploads/118100/67c190c6d514b-Implement-Listing-Banner-Mob.webp"
                    height={500}
                    width={500}
                    alt="All Tractor Page Banner"
                    title="All Tractor Page Banner"
                    className="h-full object-cover"
                  />
                </Link>
                <Link
                  href="https://tractorgyan.com/tractors"
                  className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
                >
                  <Image
                    src="https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp"
                    height={200}
                    width={200}
                    alt="All Tractor Page Banner"
                    title="All Tractor Page Banner"
                    className="h-full w-full object-contain object-center"
                  />
                </Link>
              </>
            )}
            {/* <!-- Verticle ad for full website desktop --> */}
            {/* <div>
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5083557383595231"
                crossorigin="anonymous"
              ></script>
              <ins
                className="adsbygoogle"
                style={{
                  display: "inline-block",
                  width: "300px",
                  height: "500px",
                }}
                data-ad-client="ca-pub-5083557383595231"
                data-ad-slot="3483754940"
              ></ins>
              <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </div> */}
          </div>
        </div>
      </section>
      {showOTPPopup && (
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
                    <span>
                      {' '}
                      {translation?.dealerRegistration?.skipVerification ||
                        translation?.whatsappPopup?.skip ||
                        'Skip'}
                    </span>
                  </button>
                </div>
                <div className="mx-auto max-w-[350px]">
                  <div className="mb-3 text-center text-xl font-bold text-black">
                    <span className="border-b-2 border-b-secondary pb-1">
                      {translation?.dealerRegistration?.enterOtp ||
                        translation?.whatsappPopup?.EnterOTP ||
                        'Enter OTP'}
                    </span>
                  </div>
                  {/* <div className="mb-2 text-center text-sm font-normal text-gray-main">
                    <span> {translation?.whatsappPopup.EnterOTPPleaseforTyre}</span>
                  </div> */}

                  <form className="mb-6 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2">
                    <div className="col-span-6">
                      {isEditingMobile ? (
                        <>
                          <label
                            htmlFor="mobileNumber"
                            className="mb-0 block text-sm font-semibold text-black"
                          >
                            {translation?.dealerRegistration?.editNumber ||
                              translation?.whatsappPopup?.EditNumber ||
                              'Edit Number'}
                          </label>
                          <div className="mt-1 flex gap-2">
                            <input
                              type="text"
                              name="mobileNumber"
                              id="mobileNumber"
                              value={localMobile || mobile}
                              onChange={e => {
                                setLocalMobile(e.target.value);
                                setMobile(e.target.value);
                              }}
                              className="h-[38px] w-full max-w-[220px] rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={handleSaveMobile}
                                className="flex items-center justify-center gap-2 rounded-md bg-primary px-2 py-2 text-sm text-white"
                              >
                                <span>
                                  {' '}
                                  {translation?.dealerRegistration?.save ||
                                    translation?.whatsappPopup?.save ||
                                    'Save'}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="flex items-center justify-center gap-2 rounded-md bg-red-danger px-2 py-1.5 text-sm text-white"
                              >
                                <span>
                                  {' '}
                                  {translation?.dealerRegistration?.cancel ||
                                    translation?.whatsappPopup?.Cancel ||
                                    'Cancel'}
                                </span>
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
                            {translation?.dealerRegistration?.editNumber ||
                              translation?.whatsappPopup?.EditNumber ||
                              'Edit Number'}
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
                              ✎{' '}
                              {translation?.dealerRegistration?.editNumber ||
                                translation?.whatsappPopup?.EditNumber ||
                                'Edit Number'}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="otp" className="mb-0 block text-sm font-semibold text-black">
                        {translation?.dealerRegistration?.enterOtp ||
                          translation?.whatsappPopup?.enterOtp ||
                          'Enter OTP'}
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
                          onChange={e => setEnteredOtp(e.target.value)}
                          className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-gray-main placeholder:text-gray-main focus:outline-none"
                          placeholder={
                            translation?.dealerRegistration?.enterOtpPlaceholder ||
                            translation?.whatsappPopup?.enterOtp ||
                            'Enter OTP'
                          }
                          maxLength="6"
                        />
                        <span className="absolute right-2 top-2 text-blue-light">
                          {otpTimer > 0 && (
                            <span className="timerSection">{formatTime(otpTimer)}</span>
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
                            <span>
                              {translation?.dealerRegistration?.resendOtp ||
                                translation?.whatsappPopup?.resentOtp ||
                                'Resend OTP'}
                            </span>
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
                    <span>
                      {' '}
                      {translation?.dealerRegistration?.verify ||
                        translation?.whatsappPopup?.verify ||
                        'Verify'}
                    </span>
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
      )}

      {showSuccessPopup && (
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
                  onClick={handleClose}
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
                  <span className="md:text-md text-sm text-gray-main">{successMessage}</span>
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
                  {translation?.dealerRegistration?.joinWhatsappChannel ||
                    translation?.suggestedPopup?.mainParaRForWhatsappJoin ||
                    'Join our WhatsApp channel for latest updates'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DealershipRegistrationForm;
