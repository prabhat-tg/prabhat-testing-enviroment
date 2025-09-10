'use client';

import React, { useEffect, useReducer, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import LoanTabs from './loanDetailsForm/LoanTabs';
import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import TG_SelectField from '@/src/components/ui/inputs/TG_SelectField';
import SubmitOtpForm from '@/src/components/shared/otpVerificationAndThankYouPopup/SubmitOtpForm';

import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';

import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import { getAllTractorModels } from '@/src/services/tractor/all-tractor-models';

import { postLoanInsuranceForm } from '@/src/services/loan/LoanInsuranceForm';

const GoogleAdVerticalClientWrapper = dynamic(
  () => import('../../features/social/GoogleAdVertical/GoogleAdVerticalClientWrapper'),
  { ssr: false }
);
const GoogleAdHorizontalClientWrapper = dynamic(
  () => import('../../features/social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper'),
  { ssr: false }
);

const initialForm = {
  name: '',
  mobile: '',
  brand: '',
  model: '',
  product_id: '',
  state: '',
  district: '',
  tehsil: '',
  amount: '',
};

function formReducer(state, next) {
  return { ...state, ...next };
}

const isValidMobile = val => /^[6-9]\d{9}$/.test(val);
const sanitizeName = val => val.replace(/[^A-Za-z\s]/g, '').substring(0, 50);

const LoanDetailsForm = ({ isMobile, activeTab, description, translation }) => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);

  const modelsCacheRef = useRef(new Map());
  const districtsCacheRef = useRef(new Map());
  const tehsilsCacheRef = useRef(new Map());

  const [form, setForm] = useReducer(formReducer, initialForm);
  const [errors, setErrors] = useReducer(formReducer, {});
  const [globalError, setGlobalError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [primaryId, setPrimaryId] = useState(null);
  const [existVerified, setExistVerified] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [statesData, brandsData] = await Promise.all([getAllStates(), getAllTractorBrands()]);
        if (!alive) return;
        setStates(statesData || []);
        setBrands(brandsData || []);
      } catch (err) {
        if (!alive) return;
        console.error('Error loading initial data:', err);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const brand = form.brand?.trim();
    if (!brand) {
      setModels([]);
      setForm({ model: '', product_id: '' });
      return;
    }

    if (modelsCacheRef.current.has(brand)) {
      setModels(modelsCacheRef.current.get(brand));
      return;
    }

    (async () => {
      try {
        const data = await getAllTractorModels(brand);
        if (!alive) return;
        const list = data || [];
        modelsCacheRef.current.set(brand, list);
        setModels(list);
      } catch (err) {
        if (!alive) return;
        console.error(`Error fetching models for brand ${brand}:`, err);
        setModels([]);
        setForm({ model: '', product_id: '' });
      }
    })();

    return () => {
      alive = false;
    };
  }, [form.brand]);

  useEffect(() => {
    let alive = true;
    const st = form.state?.trim();
    if (!st) {
      setDistricts([]);
      setTehsils([]);
      setForm({ district: '', tehsil: '' });
      return;
    }

    if (districtsCacheRef.current.has(st)) {
      setDistricts(districtsCacheRef.current.get(st));
      setTehsils([]);
      setForm({ district: '', tehsil: '' });
      return;
    }

    (async () => {
      try {
        const list = await getFetchDistricts(st);
        if (!alive) return;
        districtsCacheRef.current.set(st, list || []);
        setDistricts(list || []);
        setTehsils([]);
        setForm({ district: '', tehsil: '' });
      } catch (err) {
        if (!alive) return;
        console.error('Error fetching districts:', err);
        setDistricts([]);
        setTehsils([]);
        setForm({ district: '', tehsil: '' });
      }
    })();

    return () => {
      alive = false;
    };
  }, [form.state]);

  useEffect(() => {
    let alive = true;
    const dist = form.district?.trim();
    if (!dist) {
      setTehsils([]);
      setForm({ tehsil: '' });
      return;
    }

    if (tehsilsCacheRef.current.has(dist)) {
      setTehsils(tehsilsCacheRef.current.get(dist));
      setForm({ tehsil: '' });
      return;
    }

    (async () => {
      try {
        const list = await getFetchTehsil(dist);
        if (!alive) return;
        tehsilsCacheRef.current.set(dist, list || []);
        setTehsils(list || []);
        setForm({ tehsil: '' });
      } catch (err) {
        if (!alive) return;
        console.error('Error fetching tehsils:', err);
        setTehsils([]);
        setForm({ tehsil: '' });
      }
    })();

    return () => {
      alive = false;
    };
  }, [form.district]);

  const handleInput = useCallback(
    e => {
      const { name, value } = e.target;
      setGlobalError('');

      if (name === 'name') {
        const v = sanitizeName(value);
        setForm({ name: v });
        if (!v) setErrors({ name: translation?.loan?.nameRequired || '' });
        else setErrors({ name: '' });
        return;
      }

      if (name === 'mobile') {
        if (/^[6-9]?\d{0,9}$/.test(value)) {
          setForm({ mobile: value });
          if (value.length === 10 && !isValidMobile(value)) {
            setErrors({ mobile: translation?.loan?.mobileNumberValid || 'Invalid mobile number' });
          } else {
            setErrors({ mobile: '' });
          }
        }
        return;
      }

      if (name === 'amount') {
        const numeric = value.replace(/[^\d]/g, '');
        setForm({ amount: numeric });
        setErrors({ amount: '' });
        return;
      }

      setForm({ [name]: value });
    },
    [translation]
  );

  const handleBrandChange = useCallback(e => {
    const brand = e.target.value;
    setForm({ brand, model: '', product_id: '' });
  }, []);

  const handleModelChange = useCallback(
    e => {
      const idx = e.target.selectedIndex;
      const selected = models[idx - 1];
      if (selected) {
        setForm({ model: selected.model_en, product_id: selected.product_id });
      } else {
        setForm({ model: '', product_id: '' });
      }
    },
    [models]
  );

  const validateBeforeSubmit = useCallback(() => {
    let ok = true;
    const nextErrors = {};

    if (!form.name?.trim()) {
      nextErrors.name = translation?.loan?.nameRequired || 'Name is required';
      ok = false;
    }
    if (!isValidMobile(form.mobile || '')) {
      nextErrors.mobile = translation?.loan?.mobileNumberValid || 'Enter valid mobile number';
      ok = false;
    }
    if (!form.amount) {
      nextErrors.amount = translation?.emiCalcytranslate?.amountPlaceholder || 'Amount is required';
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  }, [form, translation]);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      setGlobalError('');
      if (!validateBeforeSubmit()) return;

      setIsSubmitting(true);

      const { name, mobile, brand, product_id, state, district, tehsil, amount } = form;
      const payload = {
        loan_title: 'Loan / Finance / Refinance',
        description,
        amount,
        name,
        mobile_name: mobile,
        manufacture_id: brand,
        first: product_id,
        district,
        tahsil: tehsil,
        state,
        type_id: '5',
        form_type: 'loan_form',
        user_message: 'Enquiry',
        otp_type: 'form_submit_otp_send',
      };

      try {
        const result = await postLoanInsuranceForm(payload);
        if (result?.status === 'success') {
          setExistVerified(result?.text || null);
          setOtp(result?.otp);
          setPrimaryId(result?.primary_id);
          setShowOtpPopup(true);
        } else {
          setGlobalError(result?.message || 'Submission failed');
        }
      } catch (err) {
        console.error('Submission error:', err);
        setGlobalError(translation?.loan?.errorMessageInSubmisson || 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, description, translation, validateBeforeSubmit]
  );

  return (
    <>
      <section id="dealer-registration" className="pt-0">
        <div className="container">
          <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
            <div className="w-full overflow-hidden rounded-2xl shadow-main lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
              {activeTab ? <LoanTabs activeTab={activeTab} translation={translation} /> : null}

              <div className="bg-green-lighter p-3 md:p-8">
                <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-6 gap-x-4 gap-y-2">
                  <div className="col-span-6 md:col-span-2">
                    <TG_InputField
                      id="name"
                      name="name"
                      type="text"
                      placeholder={translation?.signInForm?.namePlaceholder}
                      value={form.name}
                      onChange={handleInput}
                      required
                      label={translation?.signInForm?.nameLabel}
                      error={errors.name}
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
                      label={translation?.signInForm?.mobileLabel}
                      error={errors.mobile}
                      prefix="+91"
                    />
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="brand"
                      label={translation?.enquiryForm?.selectBrand}
                      value={form.brand}
                      onChange={handleBrandChange}
                      options={brands}
                      optionLabelKey="name"
                      optionValueKey="name"
                      placeholder={translation?.enquiryForm?.selectBrand}
                      fallback={translation?.buttons?.Loading}
                    />
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="model"
                      label={translation?.enquiryForm?.selectModel}
                      value={form.model}
                      onChange={handleModelChange}
                      options={models}
                      optionLabelKey="model_en"
                      optionValueKey="model_en"
                      placeholder={translation?.enquiryForm?.selectModel}
                      fallback={translation?.buttons?.Loading}
                    />
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <TG_SelectField
                      id="state"
                      name="state"
                      label={translation?.enquiryForm?.selectState}
                      value={form.state}
                      onChange={handleInput}
                      options={states}
                      optionLabelKey="state"
                      optionValueKey="state"
                      placeholder={translation?.enquiryForm?.selectState}
                      fallback={translation?.buttons?.Loading}
                    />
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="district"
                      name="district"
                      label={translation?.enquiryForm?.selectDistrict}
                      value={form.district}
                      onChange={handleInput}
                      options={districts}
                      optionLabelKey="district"
                      optionValueKey="district"
                      placeholder={translation?.enquiryForm?.selectDistrict}
                      fallback={translation?.buttons?.Loading}
                    />
                  </div>

                  <div className="col-span-3 md:col-span-2">
                    <TG_SelectField
                      id="tehsil"
                      name="tehsil"
                      label={translation?.enquiryForm?.selectTehsil}
                      value={form.tehsil}
                      onChange={handleInput}
                      options={tehsils}
                      optionLabelKey="tehsil"
                      optionValueKey="tehsil"
                      placeholder={translation?.enquiryForm?.selectTehsil}
                      fallback={translation?.buttons?.Loading}
                    />
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <TG_InputField
                      id="amount"
                      name="amount"
                      type="number"
                      value={form.amount}
                      onChange={handleInput}
                      placeholder={translation?.emiCalcytranslate?.amountPlaceholder}
                      required
                      label={translation?.emiCalcytranslate?.AmountLabel}
                      error={errors.amount}
                    />
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
                        {translation?.enquiryForm?.termsConditionText}
                        <Link href="/terms-of-use" className="ms-1 font-bold text-blue-link">
                          {translation?.enquiryForm?.termsConditionLink}
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="col-span-6 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mx-auto flex w-full max-w-[128px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-lg text-white disabled:opacity-70"
                      aria-busy={isSubmitting}
                    >
                      <span>
                        {isSubmitting
                          ? translation?.buttons?.Loading || 'Loading...'
                          : translation?.buttons?.submit}
                      </span>
                    </button>
                  </div>
                </form>

                {globalError ? (
                  <p className="error_message text-sm" role="alert">
                    {globalError}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex-1">
              {isMobile ? <GoogleAdHorizontalClientWrapper /> : <GoogleAdVerticalClientWrapper />}
            </div>
          </div>
        </div>
      </section>

      {showOtpPopup && (
        <SubmitOtpForm
          translation={translation}
          otp={otp}
          mobile={form.mobile}
          primaryId={primaryId}
          bradn_name={form.brand}
          closeEnquryPopup={() => setShowOtpPopup(false)}
          existVerified={existVerified}
        />
      )}
    </>
  );
};

export default LoanDetailsForm;
