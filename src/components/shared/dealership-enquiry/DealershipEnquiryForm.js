// This is for Business Enquiry to take dealerhsip
'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import SubmitOtpForm from '@/src/features/tyreComponents/commonComponents/submitOtpForm/SubmitOtpForm';
import SuccessPopup from '@/src/features/tyreComponents/components/tyreRatingAndReviews/SuccessPopup';
import { postData } from '@/src/services/apiMethods';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import { tgi_arrow_right } from '@/src/utils/assets/icons';

const TractorDealershipEnquiryForm = ({
  bgColor = 'bg-white',
  heading,
  brands,
  currentLang,
  translation,
  brandName,
  submitBtnText,
  type = 'TYRE',
}) => {
  let headingTitle = brandName ? tg_getTittleFromNestedKey(translation, heading) : heading;
  if (brandName || brandName == '') headingTitle = headingTitle.replace('{brand}', brandName);
  const isMobile = useIsMobile();
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [product_id, setProductId] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [tehsils, setTehsils] = useState([]);
  const [selectedTehsil, setSelectedTehsil] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [currentBusiness, setCurrentBusiness] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [pincode, setPincode] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [existVerified, setExistVerified] = useState('');
  const [otp, setOtp] = useState('');
  const [primaryId, setPrimaryId] = useState(null);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  useEffect(() => {
    if (!showOtpPopup && !showThankYouPopup) {
      // Reset form only when both popups are closed
      // setName('');
      // setMobile('');
      // setSelectedBrand('');
      // setSelectedModel('');
      // setSelectedState('');
      // setSelectedDistrict('');
      // setSelectedTehsil('');
    }
  }, [showOtpPopup, showThankYouPopup]);

  useEffect(() => {
    const fetchState = async () => {
      const data = await getAllStates();
      setStates(data || []);
    };

    fetchState();
  }, []);

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

  // Clear field error when user starts typing
  const clearFieldError = fieldName => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
    // Clear general error as well
    if (error) setError('');
  };

  // Handle OTP verification success
  const handleOtpSuccess = () => {
    // Close OTP popup
    setShowOtpPopup(false);

    // Reset form fields
    setName('');
    setMobile('');
    setCurrentBusiness('');
    setInvestmentAmount('');
    setSelectedBrand('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTehsil('');
    setPincode('');
    setUserMessage('');

    // Show success popup
    setShowThankYouPopup(true);
  };

  // Validation function
  const validateForm = () => {
    const errors = {};

    if (!name.trim())
      errors.name = translation.enquiryForm?.dealershipNameRequired || 'Name is required';
    if (!mobile.trim())
      errors.mobile =
        translation.enquiryForm?.dealershipMobileRequired || 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(mobile))
      errors.mobile =
        translation.enquiryForm?.invalidMobile || 'Please enter a valid mobile number';
    if (!currentBusiness.trim())
      errors.currentBusiness =
        translation.enquiryForm?.currentBusinessRequired ||
        'Current business information is required';
    if (!investmentAmount.trim())
      errors.investmentAmount =
        translation.enquiryForm?.investmentAmountRequired || 'Investment amount is required';
    if (!selectedBrand)
      errors.selectedBrand = translation.enquiryForm?.brandRequired || 'Please select a brand';
    if (!selectedState)
      errors.selectedState =
        translation.enquiryForm?.dealershipStateRequired || 'Please select a state';
    if (!selectedDistrict)
      errors.selectedDistrict =
        translation.enquiryForm?.dealershipDistrictRequired || 'Please select a district';
    if (!selectedTehsil)
      errors.selectedTehsil =
        translation.enquiryForm?.dealershipTehsilRequired || 'Please select a tehsil';
    if (!pincode.trim())
      errors.pincode = translation.enquiryForm?.pincodeRequired || 'Pincode is required';
    else if (!/^\d{6}$/.test(pincode))
      errors.pincode =
        translation.enquiryForm?.invalidPincode || 'Please enter a valid 6-digit pincode';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!validateForm()) {
      setError(translation.enquiryForm?.fixErrorsMessage || 'Please fix the errors below');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      mobile_name: mobile.trim(),
      manufacture_id: selectedBrand,
      first: currentBusiness.trim(), // Using current business as 'first' field
      district: selectedDistrict,
      tahsil: selectedTehsil, // Note: API uses 'tahsil' not 'tehsil'
      state: selectedState,
      type_id: isMobile ? 14 : 13, // 13 for desktop, 14 for mobile
      'user-message':
        userMessage || `Dealership Enquiry - Investment: ₹${investmentAmount}, Pincode: ${pincode}`,
      otp_type: 'form_submit_otp_send',
    };

    try {
      const result = await postData('/api/enquiry_data_otp_send', payload);
      console.log('API result:', result);

      if (result.status === 'success') {
        // Show OTP popup for verification first
        setOtp(result.otp || '');
        if (result.text == 'Exist_Verified') {
          setShowThankYouPopup(true);
        } else {
          setShowOtpPopup(true);
        }
        setPrimaryId(result.primary_id);
        setExistVerified(result.text || 'success');
        setError('');
      } else {
        setError(
          result.message ||
          translation.enquiryForm?.submissionFailed ||
          'Submission failed. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(
        translation.enquiryForm?.submissionError ||
        'An error occurred during submission. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="container" id="inquire-section">
        <div >
          {headingTitle && <MainHeadings text={headingTitle} />}
          <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
            <div className="w-full overflow-hidden rounded-2xl shadow-main lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
              <div className={`${bgColor} p-4 md:p-8`}>
                <div className="mb-2 text-center text-sm font-normal text-black">
                  <MainHeadings
                    extraCss={'border-0'}
                    marginBottom="mb-0"
                    text={translation.enquiryForm?.enquiryForDealership || 'Enquiry For Dealership'}
                  />
                </div>
                <div className="mb-4 text-center text-sm font-normal text-black md:mb-10">
                  <span>
                    {translation.enquiryForm?.dealershipFormDescription ||
                      'Please fill out the form below to submit your dealership enquiry. We will verify your mobile number and get back to you soon.'}
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-6 gap-x-4 gap-y-2">
                  {/* Display general error */}
                  {error && (
                    <div className="col-span-6 mb-2">
                      <p className="text-red-500 bg-red-50 border-red-200 rounded border p-2 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Name and Mobile in one row, half width each on all screens */}
                  <div className="col-span-6 flex flex-row gap-x-2">
                    <div className="basis-1/2">
                      <label htmlFor="name" className="mb-0 block text-sm font-bold text-black">
                        {translation.enquiryForm.name}
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="name"
                          placeholder={translation.enquiryForm.enterName}
                          value={name}
                          onChange={e => {
                            setName(e.target.value);
                            clearFieldError('name');
                          }}
                          required
                          autoComplete="given-name"
                          className={`h-[38px] w-full rounded-lg border ${fieldErrors.name ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none`}
                        />
                        {fieldErrors.name && (
                          <p className="text-red-500 mt-1 text-xs">{fieldErrors.name}</p>
                        )}
                      </div>
                    </div>
                    <div className="basis-1/2">
                      <label htmlFor="userMobile" className="mb-0 block text-sm font-bold text-black">
                        {translation.enquiryForm.mobile}
                      </label>
                      <div className="relative mt-2">
                        <input
                          type="tel"
                          id="userMobile"
                          placeholder=" xxxxxxxxxx"
                          value={mobile}
                          onChange={e => {
                            setMobile(e.target.value);
                            clearFieldError('mobile');
                          }}
                          required
                          pattern="[6-9]{1}[0-9]{9}"
                          maxLength="10"
                          className={`h-[38px] w-full rounded-lg border ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none`}
                        />
                        <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                          <span>+91</span>
                        </div>
                        {fieldErrors.mobile && (
                          <p className="text-red-500 mt-1 text-xs">{fieldErrors.mobile}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="currentBusiness"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation.enquiryForm?.currentBusiness || 'Current Business'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="currentBusiness"
                        placeholder={
                          translation.enquiryForm?.currentBusinessPlaceholder ||
                          'Enter Details about your Current Business'
                        }
                        value={currentBusiness}
                        onChange={e => {
                          setCurrentBusiness(e.target.value);
                          clearFieldError('currentBusiness');
                        }}
                        required
                        className={`h-[38px] w-full rounded-lg border ${fieldErrors.currentBusiness ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none`}
                      />
                      {fieldErrors.currentBusiness && (
                        <p className="text-red-500 mt-1 text-xs">{fieldErrors.currentBusiness}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="investmentAmount"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation.enquiryForm?.investmentAmount || 'Investment Amount'}
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="number"
                        id="investmentAmount"
                        placeholder={
                          translation.enquiryForm?.investmentAmountPlaceholder || '000000.00'
                        }
                        value={investmentAmount}
                        onChange={e => {
                          setInvestmentAmount(e.target.value);
                          clearFieldError('investmentAmount');
                        }}
                        required
                        min="0"
                        step="0.01"
                        className={`h-[38px] w-full rounded-lg border ${fieldErrors.investmentAmount ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 ps-6 text-sm text-black placeholder:text-gray-main focus:outline-none`}
                      />
                      <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                        <span>₹</span>
                      </div>
                      {fieldErrors.investmentAmount && (
                        <p className="text-red-500 mt-1 text-xs">{fieldErrors.investmentAmount}</p>
                      )}
                    </div>
                  </div>
                  {/* Brand and State in one row, half width each on all screens */}
                  <div className="col-span-6 flex flex-row gap-x-2">
                    <div className="basis-1/2">
                      <label htmlFor="tyreBrand" className="mb-0 block text-sm font-bold text-black">
                        {type === 'TYRE'
                          ? translation.enquiryForm.tyreBrand
                          : type === 'TRACTOR'
                            ? translation.enquiryForm.tractorBrand || 'Tractor Brand'
                            : type === 'IMPLEMENT'
                              ? translation.enquiryForm.implementBrand
                              : translation.enquiryForm.selectBrand}
                      </label>
                      <div className="mt-2">
                        <select
                          id="tyreBrand"
                          value={selectedBrand}
                          onChange={e => setSelectedBrand(e.target.value)}
                          required
                          className={`h-[38px] w-full rounded-lg border ${fieldErrors.selectedBrand ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 text-sm text-black focus:outline-none`}
                        >
                          <option value="">{translation.enquiryForm.selectBrand}</option>
                          {brands?.length > 0 ? (
                            brands.map((brand, index) => (
                              <option key={index} value={brand.brand_id || brand.id || brand.name}>
                                {currentLang == 'hi' ? brand.name_hi || brand.name : brand.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>Loading...</option>
                          )}
                        </select>
                        {fieldErrors.selectedBrand && (
                          <p className="text-red-500 mt-1 text-xs">{fieldErrors.selectedBrand}</p>
                        )}
                      </div>
                    </div>
                    <div className="basis-1/2">
                      <label
                        htmlFor="selectState"
                        className="mb-0 block text-sm font-bold text-black"
                      >
                        {translation.enquiryForm.selectState}
                      </label>
                      <div className="mt-2">
                        <select
                          id="selectState"
                          value={selectedState}
                          onChange={e => {
                            setSelectedState(e.target.value);
                            clearFieldError('selectedState');
                          }}
                          required
                          className={`h-[38px] w-full rounded-lg border ${fieldErrors.selectedState ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 text-sm text-black focus:outline-none`}
                        >
                          <option value="">{translation.enquiryForm.selectState}</option>
                          {states?.length > 0 ? (
                            states.map(state => (
                              <option key={state.id} value={state.state}>
                                {state.state}
                              </option>
                            ))
                          ) : (
                            <option disabled>Loading...</option>
                          )}
                        </select>
                        {fieldErrors.selectedState && (
                          <p className="text-red-500 mt-1 text-xs">{fieldErrors.selectedState}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-3">
                    <label
                      htmlFor="selectDistrict"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation.enquiryForm.selectDistrict}
                    </label>
                    <div className="mt-2">
                      <select
                        id="selectDistrict"
                        value={selectedDistrict}
                        onChange={e => {
                          setSelectedDistrict(e.target.value);
                          clearFieldError('selectedDistrict');
                        }}
                        required
                        disabled={!selectedState}
                        className={`h-[38px] w-full rounded-lg border ${fieldErrors.selectedDistrict ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 text-sm text-black focus:outline-none ${!selectedState ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <option value="">{translation.enquiryForm.selectDistrict}</option>
                        {districts?.length > 0 ? (
                          districts.map(district => (
                            <option key={district.id} value={district.district}>
                              {district.district}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                      {fieldErrors.selectedDistrict && (
                        <p className="text-red-500 mt-1 text-xs">{fieldErrors.selectedDistrict}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-3">
                    <label
                      htmlFor="selectTehsil"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation.enquiryForm.selectTehsil}
                    </label>
                    <div className="mt-2">
                      <select
                        id="selectTehsil"
                        value={selectedTehsil}
                        onChange={e => {
                          setSelectedTehsil(e.target.value);
                          clearFieldError('selectedTehsil');
                        }}
                        required
                        disabled={!selectedDistrict}
                        className={`h-[38px] w-full rounded-lg border ${fieldErrors.selectedTehsil ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 text-sm text-black focus:outline-none ${!selectedDistrict ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <option value="">{translation.enquiryForm.selectTehsil}</option>
                        {tehsils?.length > 0 ? (
                          tehsils.map(tehsil => (
                            <option key={tehsil.id} value={tehsil.tehsil}>
                              {tehsil.tehsil}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                      {fieldErrors.selectedTehsil && (
                        <p className="text-red-500 mt-1 text-xs">{fieldErrors.selectedTehsil}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="pincode" className="mb-0 block text-sm font-bold text-black">
                      {translation.enquiryForm?.pincode || 'Pincode'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="pincode"
                        placeholder={translation.enquiryForm?.pincodePlaceholder || 'Enter Pincode'}
                        value={pincode}
                        onChange={e => {
                          setPincode(e.target.value);
                          clearFieldError('pincode');
                        }}
                        required
                        pattern="\d{6}"
                        maxLength="6"
                        className={`h-[38px] w-full rounded-lg border ${fieldErrors.pincode ? 'border-red-500' : 'border-gray-light'} bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none`}
                      />
                      {fieldErrors.pincode && (
                        <p className="text-red-500 mt-1 text-xs">{fieldErrors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="userMessage"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation.enquiryForm?.additionalMessage ||
                        'Additional Message (Optional)'}
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="userMessage"
                        placeholder={
                          translation.enquiryForm?.additionalMessagePlaceholder ||
                          'Please share any additional information about your dealership enquiry...'
                        }
                        value={userMessage}
                        onChange={e => {
                          setUserMessage(e.target.value);
                          clearFieldError('userMessage');
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 mt-2">
                    <label className="inline-flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="form-checkbox text-light h-5 w-5 border-primary text-lg md:h-3.5 md:w-3.5"
                        required
                        defaultChecked
                      />
                      <label htmlFor="terms" className="text-sm text-gray-dark">
                        {translation.enquiryForm.termsConditionText}
                        <Link
                          href={'https://tractorgyan.com/terms-of-use'}
                          className="ms-1 font-bold text-primary"
                        >
                          {translation.enquiryForm.termsConditionLink}
                        </Link>
                      </label>
                    </label>
                  </div>
                  <div className="col-span-6 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`mx-auto flex w-full max-w-[263px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-lg text-white hover:bg-primary-dark bg-primary`}
                    >
                      <span>
                        {isSubmitting
                          ? translation.enquiryForm?.submitting || 'Submitting...'
                          : submitBtnText ||
                          translation.enquiryForm?.submitEnquiry ||
                          'Submit Enquiry'}
                      </span>
                      {!isSubmitting && (
                        <Image
                          src={tgi_arrow_right}
                          height={50}
                          width={50}
                          alt="arrow-icon"
                          title="arrow-icon"
                          className="h-3 w-3"
                        />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Link
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}tractors`}
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
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}tractors`}
              className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
            >
              <Image
                src={
                  'https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp'
                }
                height={200}
                width={200}
                alt="All Tractor Page Banner"
                title="All Tractor Page Banner"
                className="h-full w-full object-contain object-center"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Popup after OTP verification */}
      {showThankYouPopup && (
        <SuccessPopup
          translation={translation}
          message={
            translation.common?.dealershipEnquirySuccess ||
            'Thank you for your dealership enquiry! Our team will review your application and get back to you within 2-3 business days.'
          }
          onClose={() => setShowThankYouPopup(false)}
        />
      )}

      {showOtpPopup && (
        <SubmitOtpForm
          translation={translation}
          otp={otp}
          primaryId={primaryId}
          mobile={mobile}
          bradn_name={selectedBrand}
          product_id={product_id}
          existVerified={existVerified}
          closeEnquryPopup={() => setShowOtpPopup(false)}
          enquiryType={'Dealership'}
          onClose={handleOtpSuccess}
          tehsil={selectedTehsil}
          state={selectedState}
          district={selectedDistrict}
          name={name}
        />
      )}
    </>
  );
};

export default TractorDealershipEnquiryForm;
