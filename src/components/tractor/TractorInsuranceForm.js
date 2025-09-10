'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import SubmitOtpForm from '@/src/features/tyreComponents/commonComponents/submitOtpForm/SubmitOtpForm';
import { postData } from '@/src/services/apiMethods';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorModelsByBrand } from '@/src/services/tractor/get-tractor-models-by-brand';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import { tgi_arrow_right } from '@/src/utils/assets/icons';

const TractorInsuranceForm = ({
  bgColor = 'bg-white',
  heading,
  currentLang,
  translation,
  brandName,
}) => {
  let headingTitle = brandName ? tg_getTittleFromNestedKey(translation, heading) : heading;
  if (brandName || brandName == '') headingTitle = headingTitle.replace('{brand}', brandName);
  const isMobile = useIsMobile();

  // Insurance form specific states
  const [tractorRegistrationNumber, setTractorRegistrationNumber] = useState('');
  const [insuranceRange, setInsuranceRange] = useState('');
  const [registrationMonth, setRegistrationMonth] = useState('');
  const [tractorModels, setTractorModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [tractorBrands, setTractorBrands] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [tehsils, setTehsils] = useState([]);
  const [selectedTehsil, setSelectedTehsil] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP states
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [existVerified, setExistVerified] = useState('');
  const [otp, setOtp] = useState('');
  const [primaryId, setPrimaryId] = useState(null);

  // Generate year options for insurance range (last 30 years)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 30; year--) {
      years.push(year);
    }
    return years;
  };

  // Generate month options
  const monthOptions = [
    { value: 'January', label: currentLang === 'hi' ? 'जनवरी' : 'January' },
    { value: 'February', label: currentLang === 'hi' ? 'फरवरी' : 'February' },
    { value: 'March', label: currentLang === 'hi' ? 'मार्च' : 'March' },
    { value: 'April', label: currentLang === 'hi' ? 'अप्रैल' : 'April' },
    { value: 'May', label: currentLang === 'hi' ? 'मई' : 'May' },
    { value: 'June', label: currentLang === 'hi' ? 'जून' : 'June' },
    { value: 'July', label: currentLang === 'hi' ? 'जुलाई' : 'July' },
    { value: 'August', label: currentLang === 'hi' ? 'अगस्त' : 'August' },
    { value: 'September', label: currentLang === 'hi' ? 'सितंबर' : 'September' },
    { value: 'October', label: currentLang === 'hi' ? 'अक्टूबर' : 'October' },
    { value: 'November', label: currentLang === 'hi' ? 'नवंबर' : 'November' },
    { value: 'December', label: currentLang === 'hi' ? 'दिसंबर' : 'December' },
  ];

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (!showOtpPopup) {
    }
  }, [showOtpPopup]);

  // Fetch tractor brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getTractorBrands();
        setTractorBrands(data || []);
      } catch (error) {
        console.error('Error fetching tractor brands:', error);
        setError(currentLang === 'hi' ? 'ब्रांड लोड करने में समस्या' : 'Error loading brands');
      }
    };
    fetchBrands();
  }, [currentLang]);

  // Fetch tractor models when brand is selected
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) {
        setTractorModels([]);
        return;
      }
      try {
        const data = await getTractorModelsByBrand(selectedBrand);
        setTractorModels(data || []);
      } catch (error) {
        console.error('Error fetching tractor models:', error);
        setError(currentLang === 'hi' ? 'मॉडल लोड करने में समस्या' : 'Error loading models');
      }
    };
    fetchModels();
  }, [selectedBrand, currentLang]);

  // Fetch states on component mount
  useEffect(() => {
    const fetchState = async () => {
      try {
        const data = await getAllStates();
        setStates(data || []);
      } catch (error) {
        console.error('Error fetching states:', error);
        setError(currentLang === 'hi' ? 'राज्य लोड करने में समस्या' : 'Error loading states');
      }
    };
    fetchState();
  }, [currentLang]);

  // Fetch districts when state is selected
  useEffect(() => {
    if (!selectedState) return;

    const fetchDistricts = async () => {
      try {
        const data = await getFetchDistricts(selectedState);
        setDistricts(data || []);
        setTehsils([]);
        setSelectedDistrict('');
        setSelectedTehsil('');
      } catch (error) {
        console.error('Error fetching districts:', error);
        setError(currentLang === 'hi' ? 'जिला लोड करने में समस्या' : 'Error loading districts');
      }
    };
    fetchDistricts();
  }, [selectedState, currentLang]);

  // Fetch tehsils when district is selected
  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchTehsils = async () => {
      try {
        const data = await getFetchTehsil(selectedDistrict);
        setTehsils(data || []);
        setSelectedTehsil('');
      } catch (error) {
        console.error('Error fetching tehsils:', error);
        setError(currentLang === 'hi' ? 'तहसील लोड करने में समस्या' : 'Error loading tehsils');
      }
    };
    fetchTehsils();
  }, [selectedDistrict, currentLang]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate required fields
    if (!tractorRegistrationNumber.trim()) {
      setError(
        currentLang === 'hi'
          ? 'ट्रैक्टर पंजीकरण संख्या आवश्यक है'
          : 'Tractor registration number is required'
      );
      return;
    }
    if (!insuranceRange) {
      setError(currentLang === 'hi' ? 'खरीद का साल आवश्यक है' : 'Year of purchase is required');
      return;
    }
    if (!registrationMonth) {
      setError(currentLang === 'hi' ? 'पंजीकरण महीना आवश्यक है' : 'Registration month is required');
      return;
    }
    if (!selectedBrand) {
      setError(currentLang === 'hi' ? 'ब्रांड चुनना आवश्यक है' : 'Brand selection is required');
      return;
    }
    if (!selectedModel) {
      setError(currentLang === 'hi' ? 'मॉडल चुनना आवश्यक है' : 'Model selection is required');
      return;
    }
    if (!name.trim()) {
      setError(currentLang === 'hi' ? 'नाम आवश्यक है' : 'Name is required');
      return;
    }
    if (!mobile.trim() || mobile.length !== 10) {
      setError(
        currentLang === 'hi' ? 'वैध मोबाइल नंबर आवश्यक है' : 'Valid mobile number is required'
      );
      return;
    }
    if (!selectedState) {
      setError(currentLang === 'hi' ? 'राज्य चुनना आवश्यक है' : 'State selection is required');
      return;
    }
    if (!selectedDistrict) {
      setError(currentLang === 'hi' ? 'जिला चुनना आवश्यक है' : 'District selection is required');
      return;
    }
    if (!selectedTehsil) {
      setError(currentLang === 'hi' ? 'तहसील चुनना आवश्यक है' : 'Tehsil selection is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      tractor_registered_number: tractorRegistrationNumber,
      insurance_title: 'Old_Tractor_Insurance',
      insurance_range: insuranceRange,
      registration_month: registrationMonth,
      name: name,
      mobile_name: mobile,
      manufacture_id: selectedBrand,
      first: selectedModel,
      district: selectedDistrict,
      tahsil: selectedTehsil,
      state: selectedState,
      form_type: 'insurance_form',
      user_message: 'Insurance Enquiry',
      otp_type: 'form_submit_otp_send',
    };

    try {
      const result = await postData('api/loan_insurance_form', payload);
      console.log('Insurance form result:', result);

      if (result.status === 'success') {
        setOtp(result.otp);
        setShowOtpPopup(true);
        setPrimaryId(result.primary_id);
        setExistVerified(result.text);
      } else {
        setError(result.message || (currentLang === 'hi' ? 'सबमिशन विफल' : 'Submission failed'));
      }
    } catch (error) {
      console.error('Error submitting insurance form:', error);
      setError(
        currentLang === 'hi'
          ? 'सबमिशन के दौरान एक त्रुटि हुई'
          : 'An error occurred during submission'
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
              <div className={`${bgColor} p-3 md:p-8`}>
                <div className="mb-4 text-center text-sm font-normal text-black">
                  <MainHeadings
                    extraCss={'border-0'}
                    marginBottom="mb-0"
                    text={
                      currentLang === 'hi' ? 'अपनी बीमा विवरण जोड़ें' : 'Add Your Insurance Detail'
                    }
                  />
                </div>
                <form onSubmit={handleSubmit} className="mb-0 md:mb-4 grid grid-cols-6 gap-x-2 md:gap-x-4 gap-y-2">
                  <div className="col-span-6 md:col-span-2">
                    <label
                      htmlFor="tractorRegistration"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi'
                        ? 'ट्रैक्टर पंजीकरण संख्या'
                        : 'Tractor Registration Number'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="tractorRegistration"
                        placeholder={
                          currentLang === 'hi'
                            ? 'ट्रैक्टर पंजीकरण संख्या दर्ज करें'
                            : 'Enter Tractor Registration Number'
                        }
                        value={tractorRegistrationNumber}
                        onChange={e => setTractorRegistrationNumber(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <label
                      htmlFor="yearOfPurchase"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi' ? 'खरीद का साल' : 'Year of Purchase'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="yearOfPurchase"
                        value={insuranceRange}
                        onChange={e => setInsuranceRange(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">
                          {currentLang === 'hi' ? 'साल चुनें' : 'Select Year'}
                        </option>
                        {generateYearOptions().map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <label
                      htmlFor="registrationMonth"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi' ? 'पंजीकरण महीना' : 'Registration Month'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="registrationMonth"
                        value={registrationMonth}
                        onChange={e => setRegistrationMonth(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">
                          {currentLang === 'hi' ? 'महीना चुनें' : 'Select Month'}
                        </option>
                        {monthOptions.map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="tractorBrand"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi' ? 'ट्रैक्टर ब्रांड चुनें' : 'Select Tractor Brand'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="tractorBrand"
                        value={selectedBrand}
                        onChange={e => setSelectedBrand(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">
                          {currentLang === 'hi' ? 'ब्रांड चुनें' : 'Select Brand'}
                        </option>
                        {tractorBrands?.length > 0 ? (
                          tractorBrands.map((brand, index) => (
                            <option key={index} value={brand.name}>
                              {currentLang === 'hi' ? brand.name_hi || brand.name : brand.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {currentLang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="tractorModel"
                      className="mb-0 block text-sm font-medium text-black text-nowrap"
                    >
                      {currentLang === 'hi' ? 'ट्रैक्टर मॉडल चुनें' : 'Select Tractor Model'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="tractorModel"
                        value={selectedModel}
                        onChange={e => setSelectedModel(e.target.value)}
                        required
                        disabled={!selectedBrand}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">
                          {currentLang === 'hi' ? 'मॉडल चुनें' : 'Select Model'}
                        </option>
                        {tractorModels?.length > 0 ? (
                          tractorModels.map((model, index) => (
                            <option key={index} value={model.model}>
                              {model.model}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {selectedBrand
                              ? currentLang === 'hi'
                                ? 'लोड हो रहा है...'
                                : 'Loading...'
                              : currentLang === 'hi'
                                ? 'पहले ब्रांड चुनें'
                                : 'Select brand first'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="name" className="mb-0 block text-sm font-medium text-black">
                      {currentLang === 'hi' ? 'नाम' : 'Name'}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        placeholder={
                          currentLang === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter your name'
                        }
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        autoComplete="given-name"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="userMobile"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="tel"
                        id="userMobile"
                        placeholder=" xxxxxxxxxx"
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
                    <label
                      htmlFor="selectState"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi' ? 'राज्य चुनें' : 'Select State'}
                    </label>
                    <div className="mt-2">
                      <select
                        id="selectState"
                        value={selectedState}
                        onChange={e => setSelectedState(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">
                          {currentLang === 'hi' ? 'राज्य चुनें' : 'Select State'}
                        </option>
                        {states?.length > 0 ? (
                          states.map(state => (
                            <option key={state.id} value={state.state}>
                              {state.state}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {currentLang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <label
                      htmlFor="selectDistrict"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi' ? 'जिला चुनें' : 'Select District'}
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
                        <option value="">
                          {currentLang === 'hi' ? 'जिला चुनें' : 'Select District'}
                        </option>
                        {districts?.length > 0 ? (
                          districts.map(district => (
                            <option key={district.id} value={district.district}>
                              {district.district}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {selectedState
                              ? currentLang === 'hi'
                                ? 'लोड हो रहा है...'
                                : 'Loading...'
                              : currentLang === 'hi'
                                ? 'पहले राज्य चुनें'
                                : 'Select state first'}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <label
                      htmlFor="selectTehsil"
                      className="mb-0 block text-sm font-medium text-black"
                    >
                      {currentLang === 'hi' ? 'तहसील चुनें' : 'Select Tehsil'}
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
                        <option value="">
                          {currentLang === 'hi' ? 'तहसील चुनें' : 'Select Tehsil'}
                        </option>
                        {tehsils?.length > 0 ? (
                          tehsils.map(tehsil => (
                            <option key={tehsil.id} value={tehsil.tehsil}>
                              {tehsil.tehsil}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {selectedDistrict
                              ? currentLang === 'hi'
                                ? 'लोड हो रहा है...'
                                : 'Loading...'
                              : currentLang === 'hi'
                                ? 'पहले जिला चुनें'
                                : 'Select district first'}
                          </option>
                        )}
                      </select>
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
                        {currentLang === 'hi'
                          ? 'मैं नियमों और शर्तों से सहमत हूँ'
                          : 'I agree to the terms and conditions'}
                        <Link
                          href={'https://tractorgyan.com/terms-of-use'}
                          className="ms-1 font-bold text-primary"
                        >
                          {currentLang === 'hi' ? 'नियम और शर्तें' : 'Terms and Conditions'}
                        </Link>
                      </label>
                    </label>
                  </div>

                  <div className="col-span-6 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mx-auto flex w-full max-w-[263px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-lg text-white disabled:opacity-50"
                    >
                      <span>
                        {isSubmitting
                          ? currentLang === 'hi'
                            ? 'सबमिट हो रहा है...'
                            : 'Submitting...'
                          : currentLang === 'hi'
                            ? 'पूछताछ सबमिट करें'
                            : 'Submit Enquiry'}
                      </span>
                      <Image
                        src={tgi_arrow_right}
                        height={50}
                        width={50}
                        alt="arrow-icon"
                        title="arrow-icon"
                        className="h-2.5 w-2.5"
                      />
                    </button>
                  </div>

                  {error && (
                    <div className="col-span-6">
                      <p className="text-red-500 text-center text-sm">{error}</p>
                    </div>
                  )}
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
      {showOtpPopup && (
        <SubmitOtpForm
          translation={translation}
          isMobile={isMobile}
          primaryId={primaryId}
          onClose={() => setShowOtpPopup(false)}
          mobile={mobile}
          bradn_name={selectedBrand}
          selectedModel={selectedModel}
          product_id={null}
          state={selectedState}
          district={selectedDistrict}
          tehsil={selectedTehsil}
          name={name}
          existVerified={existVerified}
          closeEnquryPopup={() => setShowOtpPopup(false)}
          enquiryType={'Insurance'}
          productNameSingular={currentLang === 'hi' ? 'बीमा' : 'Insurance'}
          productNamePlural={currentLang === 'hi' ? 'बीमा' : 'Insurance'}
          currentLang={currentLang}
        />
      )}
    </>
  );
};

export default TractorInsuranceForm;
