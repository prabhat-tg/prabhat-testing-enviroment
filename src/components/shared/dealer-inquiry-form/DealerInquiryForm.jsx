'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { postData } from '@/src/services/apiMethods';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import SubmitOtpForm from '@/src/features/tyreComponents/commonComponents/submitOtpForm/SubmitOtpForm';
import { tgi_arrow_right } from '@/src/utils/assets/icons';

export default function ContactForm({
  onClose,
  dealerMobile,
  dealerContactName,
  isCloseAfterSubmit,
  setIsCloseAfterSubmit,
  translation,
}) {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [product_id, setProductId] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [tehsils, setTehsils] = useState([]);
  const [selectedTehsil, setSelectedTehsil] = useState('');
  const [name, setName] = useState('');
  const [mobile_name, setMobile_name] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [existVerified, setExistVerified] = useState(false);
  const [isOtpTyping, setIsOtpTyping] = useState(false);
  const [primaryId, setPrimaryId] = useState(null);
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [tempMobile, setTempMobile] = useState('');

  const [getTractorPrice, setGetTractorPrice] = useState(false);
  const [otherQuery, setOtherQuery] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isOtpPopup, setIsOtpPopup] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [successDealerFormShow, setSuccessDealerFormShow] = useState('no');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      const data = await getAllStates();
      setStates(data);
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    const fetchDistricts = async () => {
      const data = await getFetchDistricts(selectedState);
      setDistricts(data);
      setTehsils([]);
    };
    fetchDistricts();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedDistrict) return;
    const fetchTehsils = async () => {
      const data = await getFetchTehsil(selectedDistrict);
      setTehsils(data || []);
    };
    fetchTehsils();
  }, [selectedDistrict]);

  const handleNameChange = event => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^A-Za-z\s]/g, '').substring(0, 50);
    setName(filteredValue);
    if (formErrors.name) {
      setFormErrors(prev => ({ ...prev, name: null }));
    }
  };

  const handleCheckboxChange = type => {
    if (type === 'tractor') {
      setGetTractorPrice(true);
      setOtherQuery(false);
    } else {
      setOtherQuery(true);
      setGetTractorPrice(false);
    }
    if (formErrors.checkbox) {
      setFormErrors(prev => ({ ...prev, checkbox: null }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) errors.name = translation.enquiryForm.nameRequired;
    if (!/^[6-9]\d{9}$/.test(mobile_name))
      errors.mobile_name = translation.enquiryForm.mobileRequired;
    if (!selectedState) errors.state = translation.enquiryForm.stateRequired;
    if (!selectedDistrict) errors.district = translation.enquiryForm.districtRequired;
    if (!selectedTehsil) errors.tehsil = translation.enquiryForm.tehsilRequired;
    if (!getTractorPrice && !otherQuery) errors.checkbox = translation.enquiryForm.optionRequired;
    if (otherQuery && !queryText.trim()) errors.queryText = translation.enquiryForm.queryRequired;
    if (!termsAccepted) errors.terms = translation.enquiryForm.termsRequired;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name,
      mobile_name,
      text: otherQuery ? queryText : 'get_tractor_price',
      district: selectedDistrict,
      tehsil: selectedTehsil,
      state: selectedState,
      type_id: 94,
      user_message: 'Enquiry',
      otp_type: 'form_submit_otp_send',
      form_name: 'connect_with_dealer',
    };

    try {
      setIsSubmitLoading(true);
      const result = await postData('/api/enquiry_data_otp_send', payload);
      console.log('-----result', result);
      if (result.status === 'success') {
        setOtp(result?.otp);
        setShowOtpPopup(true);
        setExistVerified(result?.text || null);
        setPrimaryId(result?.primary_id);
        setIsCloseAfterSubmit(true);
      } else {
        setError(result.status || 'Submission failed');
        setShowOtpPopup(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred during submission');
    } finally {
      setIsSubmitting(false);
      setIsSubmitLoading(false);
    }
  };

  return (
    <div
      className={
        isCloseAfterSubmit
          ? `fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45`
          : ''
      }
    >
      <div className="container">
        {showOtpPopup ? (
          <SubmitOtpForm
            otp={otp}
            mobile={mobile_name}
            primaryId={primaryId}
            product_id={product_id}
            state={selectedState}
            district={selectedDistrict}
            tehsil={selectedTehsil}
            onClose={() => setShowOtpPopup(false)}
            dealerMobile={dealerMobile}
            successDealerFormShow={successDealerFormShow}
            setSuccessDealerFormShow={setSuccessDealerFormShow}
            isCloseAfterSubmit={isCloseAfterSubmit}
            setIsCloseAfterSubmit={setIsCloseAfterSubmit}
            // dealerSuggestionShow={successDealerFormShow}
            dealerContactName={dealerContactName}
            existVerified={existVerified}
            productNameSingular={'Dealer'}
          />
        ) : (
          isCloseAfterSubmit && (
            <>
              <div className="mx-auto w-full overflow-hidden rounded-2xl bg-green-lighter shadow-main lg:max-w-[540px]">
                <div className="relative p-4 md:p-8 md:pt-3">
                  <button
                    className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                    onClick={onClose}
                  >
                    <Image
                      src={
                        'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'
                      }
                      height={50}
                      width={50}
                      alt="close icon"
                      title="close icon"
                    />
                  </button>
                  {isOtpPopup ? null : (
                    <div className="mb-6 text-center text-xl font-bold text-black">
                      <span>{translation.enquiryForm.enterYourDetails}</span>
                    </div>
                  )}
                  <form
                    onSubmit={handleSubmit}
                    className="mb-4 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2"
                  >
                    <div className="col-span-3">
                      <label className="text-sm font-bold text-black">
                        {translation.enquiryForm.name}
                      </label>
                      <input
                        type="text"
                        value={name}
                        placeholder={translation.enquiryForm.enterName}
                        onChange={handleNameChange}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 ps-2 pt-2 text-xs" style={{ color: 'red' }}>
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label className="text-sm font-bold text-black">
                        {translation.enquiryForm.mobile}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder={translation.enquiryForm.mobilePlaceholder}
                          value={mobile_name}
                          onChange={e => {
                            setMobile_name(e.target.value);
                            if (formErrors.mobile) {
                              setFormErrors(prev => ({
                                ...prev,
                                mobile: null,
                              }));
                            }
                          }}
                          maxLength="10"
                          className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none"
                        />
                        <div className="absolute left-3 top-0 flex h-full items-center text-sm font-bold text-black">
                          +91
                        </div>
                      </div>
                      {formErrors.mobile && (
                        <p className="text-red-500 pt-2 text-xs" style={{ color: 'red' }}>
                          {formErrors.mobile}
                        </p>
                      )}
                    </div>

                    {/* State Dropdown */}
                    <div className="col-span-6">
                      <label className="text-sm font-bold text-black">
                        {translation.enquiryForm.state}
                      </label>
                      <select
                        value={selectedState}
                        onChange={e => {
                          setSelectedState(e.target.value);
                          if (formErrors.state) {
                            setFormErrors(prev => ({ ...prev, state: null }));
                          }
                        }}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">{translation.enquiryForm.selectState}</option>
                        {states.map(state => (
                          <option key={state.id} value={state.state}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                      {formErrors.state && (
                        <p className="text-red-500 ps-2 pt-2 text-xs" style={{ color: 'red' }}>
                          {formErrors.state}
                        </p>
                      )}
                    </div>

                    {/* District Dropdown */}
                    <div className="col-span-3">
                      <label className="text-sm font-bold text-black">
                        {translation.enquiryForm.district}
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={e => {
                          setSelectedDistrict(e.target.value);
                          if (formErrors.district) {
                            setFormErrors(prev => ({
                              ...prev,
                              district: null,
                            }));
                          }
                        }}
                        disabled={!selectedState}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">{translation.enquiryForm.selectDistrict}</option>
                        {districts.map(district => (
                          <option key={district.id} value={district.district}>
                            {district.district}
                          </option>
                        ))}
                      </select>
                      {formErrors.district && (
                        <p className="text-red-500 ps-2 pt-2 text-xs" style={{ color: 'red' }}>
                          {formErrors.district}
                        </p>
                      )}
                    </div>

                    <div className="col-span-3">
                      <label className="text-sm font-bold text-black">
                        {translation.enquiryForm.tehsil}
                      </label>
                      <select
                        value={selectedTehsil}
                        onChange={e => {
                          setSelectedTehsil(e.target.value);
                          if (formErrors.tehsil) {
                            setFormErrors(prev => ({
                              ...prev,
                              tehsil: null,
                            }));
                          }
                        }}
                        disabled={!selectedDistrict}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">{translation.enquiryForm.selectTehsil}</option>
                        {tehsils.map(tehsil => (
                          <option key={tehsil.id} value={tehsil.tehsil}>
                            {tehsil.tehsil}
                          </option>
                        ))}
                      </select>
                      {formErrors.tehsil && (
                        <p className="text-red-500 ps-2 pt-2 text-xs" style={{ color: 'red' }}>
                          {formErrors.tehsil}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 flex flex-col gap-2 pb-2 pt-2">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={getTractorPrice}
                            onChange={() => handleCheckboxChange('tractor')}
                            className="mr-2"
                          />
                          {translation.enquiryForm.getTractorPriceOption}
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={otherQuery}
                            onChange={() => handleCheckboxChange('query')}
                            className="mr-2"
                          />
                          {translation.enquiryForm.anyOtherQueryOption}
                        </label>
                      </div>

                      {formErrors.checkbox && (
                        <p className="text-red-500 text-xs" style={{ color: 'red' }}>
                          {formErrors.checkbox}
                        </p>
                      )}

                      {otherQuery && (
                        <div className="col-span-6">
                          <label className="text-sm font-bold text-black">
                            {translation.enquiryForm.anyOtherQuery}
                          </label>
                          <input
                            type="text"
                            placeholder={translation.enquiryForm.queryPlaceholder}
                            value={queryText}
                            onChange={e => {
                              setQueryText(e.target.value);
                              if (formErrors.queryText) {
                                setFormErrors(prev => ({
                                  ...prev,
                                  queryText: null,
                                }));
                              }
                            }}
                            className="h-[38px] w-full rounded-lg border border-gray-light px-4 py-2 text-sm text-black"
                          />
                          {formErrors.queryText && (
                            <p className="text-red-500 ps-2 pt-2 text-xs" style={{ color: 'red' }}>
                              {formErrors.queryText}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label className="flex items-center text-sm text-black">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={() => {
                            setTermsAccepted(!termsAccepted);
                            if (formErrors.terms) {
                              setFormErrors(prev => ({
                                ...prev,
                                terms: null,
                              }));
                            }
                          }}
                          className="mr-2"
                        />
                        <label htmlFor="terms" className="text-xs text-gray-dark">
                          {translation.enquiryForm.termsConditionText}
                          <Link
                            href={'https://tractorgyan.com/terms-of-use'}
                            className="ms-1 font-bold text-blue-link"
                          >
                            {translation.enquiryForm.termsConditionLink}
                          </Link>
                        </label>
                      </label>
                      {formErrors.terms && (
                        <p className="text-red-500 text-xs" style={{ color: 'red' }}>
                          {formErrors.terms}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mx-auto flex w-full max-w-[263px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-lg text-white"
                      >
                        {isSubmitLoading ? (
                          <span className="loader-spinner h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        ) : (
                          <>
                            <span>{translation.enquiryForm.submit}</span>
                            <Image
                              src={tgi_arrow_right}
                              height={50}
                              width={50}
                              alt="arrow-icon"
                              className="h-2.5 w-2.5"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
                <Image
                  src="https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp"
                  height={500}
                  width={500}
                  alt="enquiry-form-image"
                  className="h-auto max-w-full"
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
