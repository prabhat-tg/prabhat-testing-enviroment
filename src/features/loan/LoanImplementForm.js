'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import { getAllImplementBrandsByType } from '@/src/services/implement/all-implement-brands-by-type';
import { getAllImplementModelsByBrand } from '@/src/services/implement/all-implement-models';
import GoogleAdVerticalClientWrapper from '../../features/social/GoogleAdVertical/GoogleAdVerticalClientWrapper';
import GoogleAdHorizontalClientWrapper from '../../features/social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper';
import SubmitOtpForm from '@/src/components/shared/otpVerificationAndThankYouPopup/SubmitOtpForm';
import { postLoanInsuranceForm } from '@/src/services/loan/LoanInsuranceForm';
import TG_SelectField from '@/src/components/ui/inputs/TG_SelectField';
import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
const LoanImplementForm = ({ loanTitle, translation, title, currentLang, isMobile }) => {
  // Data State
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  // UI State
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  // Form State
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    brand: '',
    model: '',
    type: '',
    product_id: '',
    state: '',
    district: '',
    tehsil: '',
    amount: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // OTP State
  const [otp, setOtp] = useState('');
  const [primaryId, setPrimaryId] = useState(null);
  const [existVerified, setExistVerified] = useState('');

  // Fetch initial data (states) and handle scroll
  useEffect(() => {
    getAllStates().then(setStates);
    getAllImplementTypes().then(setTypes);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // useEffect(() => {
  //     const fetchImplementTypes = async () => {
  //         const result = await getAllImplementTypes();
  //         setImplementTypes(result);
  //     };
  //     fetchImplementTypes();
  // }, []);
  // useEffect(() => {
  //     const fetchImplementBrands = async () => {
  //         const result = await getAllImplementBrandsByType(selectedType);
  //         setBrands(result);
  //     };
  //     fetchImplementBrands();
  // }, [selectedType]);
  useEffect(() => {
    const resetBrandFields = () => {
      setBrands([]);
      setForm(f => ({ ...f, brand: '', product_id: '' }));
    };
    getAllImplementBrandsByType(form.type)
      .then(data => {
        setBrands(data || []);
      })
      .catch(error => {
        console.error(`Error fetching brands for implement type ${form.type}:`, error);
        resetBrandFields();
      });
  }, [form.type]);

  // useEffect(() => {
  //     const fetchModels = async () => {
  //         const result = await getAllImplementModelsByBrand(
  //             selectedType,
  //             selectedBrand
  //         );
  //         setModels(result);
  //     };
  //     fetchModels();
  // }, [selectedType, selectedBrand]);
  useEffect(() => {
    const resetModelFields = () => {
      setModels([]);
      setForm(f => ({ ...f, model: '', product_id: '' }));
    };
    getAllImplementModelsByBrand(form.type, form.brand)
      .then(data => {
        setModels(data || []);
      })
      .catch(error => {
        console.error(`Error fetching models for brand ${form.brand}:`, error);
        resetModelFields();
      });
  }, [form.type, form.brand]);
  // Fetch districts when state changes
  useEffect(() => {
    if (!form.state) {
      setDistricts([]);
      setTehsils([]);
      setForm(f => ({ ...f, district: '', tehsil: '' }));
      return;
    }
    getFetchDistricts(form.state).then(setDistricts);
    setTehsils([]);
    setForm(f => ({ ...f, district: '', tehsil: '' }));
  }, [form.state]);

  // Fetch tehsils when district changes
  useEffect(() => {
    if (!form.district) {
      setTehsils([]);
      setForm(f => ({ ...f, tehsil: '' }));
      return;
    }
    getFetchTehsil(form.district).then(data => setTehsils(data || []));
    setForm(f => ({ ...f, tehsil: '' }));
  }, [form.district]);
  // Handlers
  const handleInput = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setForm(f => ({
        ...f,
        name: value.replace(/[^A-Za-z\s]/g, '').substring(0, 50),
      }));
    } else if (name === 'mobile') {
      if (/^[6-9]\d{0,9}$/.test(value)) {
        setForm(f => ({ ...f, mobile: value }));
        setError('');
      } else {
        setError(translation.loan.mobileNumberValid);
      }
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  const handleBrandChange = e => {
    setForm(f => ({
      ...f,
      brand: e.target.value,
      model: '',
      product_id: '',
    }));
  };
  const handleModelChange = e => {
    const selectedIndex = e.target.selectedIndex;
    const selectedModelObject = models[selectedIndex - 1]; // Adjust index if first option is placeholder

    if (selectedModelObject) {
      setForm(f => ({
        ...f,
        model: selectedModelObject.model_en,
        product_id: selectedModelObject.id,
      }));
    } else {
      setForm(f => ({ ...f, model: '', product_id: '' }));
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const { name, mobile, type, brand, model, state, district, tehsil, product_id, amount } = form;
    const payload = {
      loan_title: loanTitle
        ? 'seacond hand impmlement Loan/Finance/Refinance'
        : 'Loan / Finance / Refinance',
      description: `Implement(Finance) - ${type}`,
      amount,
      name,
      mobile_name: mobile,
      manufacture_id: brand,
      implement_type: type,
      first: product_id,
      district,
      tahsil: tehsil,
      state,
      type_id: '5',
      form_type: 'loan_form',
      user_message: 'Enquiry',
      otp_type: 'form_submit_otp_send',
    };
    if (mobile?.length === 10 && /^[6-9]\d{9}$/.test(mobile)) {
      try {
        const result = await postLoanInsuranceForm(payload);
        if (result?.status === 'success') {
          setExistVerified(result?.text || null);
          setOtp(result?.otp);
          setShowOtpPopup(true);
          setPrimaryId(result.primary_id);
        } else {
          setError(result.message || 'Submission failed');
        }
      } catch (error) {
        setError(translation.buttons.errorMessageInSubmisson);
        console.log('error', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError(translation.loan.isMobileValidDigit);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <section id="dealer-registration" className="pt-0">
        <div className="container">
          <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
            <div className="w-full overflow-hidden rounded-2xl shadow-main lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
              <div className="bg-green-lighter p-3 md:p-8">
                <div className="flex justify-center">
                  {/* <MainHeadings text={title} extraCss="mx-auto" /> */}
                  <h2
                    className={`mx-auto mb-4 inline-block border-b-2 border-secondary pb-1 text-center text-lg font-bold leading-6 md:mb-8 md:text-2xl`}
                  >
                    {title}
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-6 gap-x-4 gap-y-2">
                  <div className="col-span-6 md:col-span-2">
                    <TG_InputField
                      id="name"
                      name="name"
                      type="text"
                      placeholder={translation.signInForm.namePlaceholder}
                      value={form.name}
                      onChange={handleInput}
                      required
                      label={translation.signInForm.nameLabel}
                      error={error.name}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <TG_InputField
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="xxxxxxxxxx"
                      value={form.mobile}
                      onChange={handleInput}
                      required
                      pattern="[6-9]{1}[0-9]{9}"
                      maxLength="10"
                      label={translation.signInForm.mobileLabel}
                      error={error.mobile}
                      prefix="+91"
                    />
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <TG_SelectField
                      id="type"
                      label={translation.whatsappPopup.SelectEnquiryFormType}
                      value={form.type}
                      onChange={handleInput}
                      options={types}
                      optionLabelKey={currentLang === 'hi' ? 'name_hi' : 'name'}
                      optionValueKey="name"
                      placeholder={translation.whatsappPopup.SelectType}
                      fallback={translation.whatsappPopup.SelectType}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="brand"
                      label={translation.whatsappPopup.SelectEnquiryFormBrand}
                      value={form.brand}
                      onChange={handleBrandChange}
                      options={brands}
                      optionLabelKey="brand_name"
                      optionValueKey="brand_name"
                      placeholder={translation.whatsappPopup.SelectEnquiryFormBrand}
                      fallback={translation.buttons.Loading}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="model"
                      label={translation.whatsappPopup.SelectEnquiryFormModel}
                      value={form.model}
                      onChange={handleModelChange}
                      required
                      disabled={!form.brand}
                      options={models}
                      optionLabelKey="model"
                      optionValueKey="model"
                      placeholder={translation.whatsappPopup.SelectEnquiryFormModel}
                      fallback={translation.buttons.Loading}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <TG_SelectField
                      id="state"
                      label={translation.enquiryForm.selectState}
                      value={form.state}
                      onChange={handleInput}
                      required
                      options={states}
                      optionLabelKey="state"
                      optionValueKey="state"
                      placeholder={translation.enquiryForm.selectState}
                      fallback={translation.buttons.Loading}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="district"
                      label={translation.enquiryForm.selectDistrict}
                      value={form.district}
                      onChange={handleInput}
                      required
                      disabled={!form.state}
                      options={districts}
                      optionLabelKey="district"
                      optionValueKey="district"
                      placeholder={translation.enquiryForm.selectDistrict}
                      fallback={translation.buttons.Loading}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="tehsil"
                      label={translation.enquiryForm.selectTehsil}
                      value={form.tehsil}
                      onChange={handleInput}
                      required
                      disabled={!form.district}
                      options={tehsils}
                      optionLabelKey="tehsil"
                      optionValueKey="tehsil"
                      placeholder={translation.enquiryForm.selectTehsil}
                      fallback={translation.buttons.Loading}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label htmlFor="amount" className="mb-0 block text-sm font-bold text-black">
                      {translation.emiCalcytranslate.AmountLabel}
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={form.amount}
                        onChange={handleInput}
                        placeholder={translation.emiCalcytranslate.amountPlaceholder}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <div className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className="form-checkbox text-blue-600 h-3.5 w-3.5"
                        required
                        defaultChecked
                      />
                      <label htmlFor="terms" className="text-sm text-gray-dark">
                        {translation.enquiryForm.termsConditionText}
                        <Link
                          href={'https://tractorgyan.com/terms-of-use'}
                          className="ms-1 font-bold text-blue-link"
                        >
                          {translation.enquiryForm.termsConditionLink}
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <button
                      type="submit"
                      // disabled={isSubmitting}
                      className="mx-auto flex w-full max-w-[108px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-lg text-white"
                    >
                      <span>{translation.buttons.submit}</span>
                    </button>
                  </div>
                </form>

                {error && <p className="error">{error}</p>}
              </div>
            </div>
            <div className="flex-1">
              {isMobile ? <GoogleAdHorizontalClientWrapper /> : <GoogleAdVerticalClientWrapper />}
            </div>
          </div>
        </div>
      </section>
      {/* OTP Popup */}
      {showOtpPopup && (
        <SubmitOtpForm
          translation={translation}
          otp={otp}
          mobile={form.mobile}
          primaryId={primaryId}
          // product_id={form.product_id}
          bradn_name={form.brand}
          closeEnquryPopup={() => {
            setShowOtpPopup(false);
          }}
          existVerified={existVerified}
        />
      )}
    </>
  );
};

export default LoanImplementForm;
