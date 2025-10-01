'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useMemo, use } from 'react';
import SubmitOtpForm from './submitOtpForm/SubmitOtpForm';
import { postData } from '@/src/services/apiMethods';
import { getTyreModal } from '@/src/services/tyre/tyre-modal';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import { getTractorModelsByBrand } from '@/src/services/tractor/get-tractor-models-by-brand';
import { usePathname } from 'next/navigation';
import { tgi_arrow_right } from '@/src/utils/assets/icons';
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';
import { getAllImplementBrandListing } from '@/src/services/implement/get-all-implement-brand-listing';

const WhatsAppTopButton = ({
  translation,
  currentLang,
  isMobile,
  defaultEnquiryType = 'Tractor',
  tyreBrandsError,
  openEnquiryForm,
  preFilledTractorBrand,
  preFilledTractorModelId,
  onClose,
}) => {
  const pathname = usePathname(); // Get current route

  if (tyreBrandsError) {
    return (
      <div className="py-5 text-center">
        <p>
          {translation?.error_messages?.brands_unavailable ||
            'Tyre brands are currently unavailable.'}
        </p>
      </div>
    );
  }

  // Wrapper function to fetch implement models by brand
  const getImplementModelsByBrand = async (brandName) => {
    try {
      const response = await getAllImplementBrandListing({
        brand: brandName,
        lang: currentLang,
        start_limit: 0,
        end_limit: 1000
      });

      if (response && response.items) {
        // Transform the response to match the expected model structure
        return response.items.map(item => ({
          id: item.id,
          modal_name: item.model, // Map 'model' field to 'modal_name' for consistency
          model: item.model,
          brand_name: item.brand_name,
          implement_power: item.implement_power,
          price: item.price,
          image: item.image,
          page_url: item.page_url,
        }));
      }

      return [];
    } catch (error) {
      console.error('Error fetching implement models for brand:', brandName, error);
      return [];
    }
  };

  const enquiryConfigs = {
    Tyre: {
      formTitle: translation?.enquiryForm?.tyreEnquiryForm || 'Tyre Enquiry Form',
      brandLabel: translation?.enquiryForm?.tyreBrand || 'Tyre Brand',
      modelLabel: translation?.enquiryForm?.tyreModel || 'Tyre Model',
      fetchBrandsFn: getTyreBrands,
      fetchModelsFn: getTyreModal,
      typeId: isMobile ? 104 : 103,
      payloadType: 'Tyre',
      showBrandModelFields: true,
      productNameSingular: 'Tyre',
      productNamePlural: 'Tyres',
      getSubmitButtonText: () => `₹ ${translation?.enquiryForm.getTyrePrice || 'Get Price'}`,
    },
    Tractor: {
      formTitle: translation?.enquiryForm?.tractorEnquiryForm || 'Tractor Enquiry Form',
      brandLabel: translation?.enquiryForm?.tractorBrand || 'Tractor Brand',
      modelLabel: translation?.enquiryForm?.tractorModel || 'Tractor Model',
      fetchBrandsFn: getAllTractorBrands,
      fetchModelsFn: getTractorModelsByBrand,
      typeId: isMobile ? 71 : 72, // Updated for mobile/desktop
      payloadType: 'Tractor',
      showBrandModelFields: true,
      productNameSingular: 'Tractor',
      productNamePlural: 'Tractors',
      getSubmitButtonText: () => `₹ ${translation?.enquiryForm.getTractorPrice || 'Get Price'}`,
    },
    TyreDealer: {
      formTitle: translation?.enquiryForm?.dealerEnquiryForm || 'Dealer Enquiry Form',
      brandLabel: '', // Not applicable
      modelLabel: '', // Not applicable
      fetchBrandsFn: null,
      fetchModelsFn: null,
      typeId: 73, // Placeholder, adjust if needed
      payloadType: 'Dealer',
      showBrandModelFields: false,
      productNameSingular: 'Dealer', // Or perhaps not applicable for product context
      productNamePlural: 'Dealers',
      getSubmitButtonText: () => translation?.buttons?.submit || 'Submit',
    },
    Implement: {
      formTitle: translation?.enquiryForm?.implementEnquiryForm || 'Implement Enquiry Form',
      brandLabel: translation?.enquiryForm?.implementBrand || 'Implement Brand',
      modelLabel: translation?.enquiryForm?.implementModel || 'Implement Model',
      fetchBrandsFn: getAllImplementBrandsDetail,
      fetchModelsFn: getImplementModelsByBrand,
      typeId: isMobile ? 97 : 98,
      payloadType: 'Implement',
      showBrandModelFields: true,
      productNameSingular: 'Implement',
      productNamePlural: 'Implements',
      getSubmitButtonText: () => `₹ ${translation?.enquiryForm.getImplementPrice || 'Get Price'}`,
    },
  };

  // UI State
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  // Enquiry Type State - Now fixed by prop
  // const [enquiryType, setEnquiryType] = useState(
  //   defaultEnquiryType || "Tractor"
  // );

  // Form State
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    brand: '',
    model: '',
    product_id: '',
    state: '',
    district: '',
    tehsil: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data State
  const [brands, setBrands] = useState([]); // Can be tyre brands or tractor brands
  const [models, setModels] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);

  // OTP State
  // const [otp, setOtp] = useState("");
  const [primaryId, setPrimaryId] = useState(null);
  const [existVerified, setExistVerified] = useState('');
  const [otpResponseProductId, setOtpResponseProductId] = useState('');

  // open the Enqury form by defualt if user comes form blogs details prefilled URL
  useEffect(() => {
    if (openEnquiryForm) {
      setShowEnquiry(true);
    }
  }, [openEnquiryForm]);

  // Fetch initial data (states) and handle scroll
  useEffect(() => {
    if (showEnquiry) {
      getAllStates().then(setStates);
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showEnquiry]);

  // Fetch brands based on enquiryType
  useEffect(() => {
    if (showEnquiry) {
      const currentConfig = enquiryConfigs[defaultEnquiryType];
      if (currentConfig && currentConfig.fetchBrandsFn) {
        currentConfig
          .fetchBrandsFn()
          .then(setBrands)
          .catch(err => {
            console.error(`Error fetching ${defaultEnquiryType} brands:`, err);
            setBrands([]);
          });
      } else {
        setBrands([]); // Clear brands if no fetch function
      }
      // Reset model and product_id when brands are re-fetched or enquiryType changes
      setModels([]);
      setForm(f => ({ ...f }));
    }
  }, [defaultEnquiryType, isMobile, showEnquiry]); // Added isMobile because typeId for Tyre depends on it for config

  // Fetch models when brand changes, based on enquiryType
  useEffect(() => {
    if (showEnquiry) {
      setShowOtpPopup(false);
      const currentConfig = enquiryConfigs[defaultEnquiryType];

      const resetModelFields = () => {
        setModels([]);
        setForm(f => ({ ...f, model: '', product_id: '' }));
      };

      if (
        !form.brand ||
        !currentConfig ||
        !currentConfig.fetchModelsFn ||
        !currentConfig.showBrandModelFields
      ) {
        resetModelFields();
        return;
      }

      currentConfig
        .fetchModelsFn(form.brand)
        .then(data => {
          setModels(data || []);
        })
        .catch(error => {
          console.error(
            `Error fetching ${defaultEnquiryType} models for brand ${form.brand}:`,
            error
          );
          resetModelFields();
        });
    }
  }, [form.brand, defaultEnquiryType, isMobile, showEnquiry]); // Added isMobile because typeId for Tyre depends on it for config

  // Set model and product_id when models are loaded and we have a prefilled model
  useEffect(() => { }, [models, preFilledTractorModelId, openEnquiryForm, defaultEnquiryType]);

  // Reset form fields when enquiryType changes (brand/model/product_id handled by above useEffects)
  // This one can be simplified or merged if only name, mobile etc need to be preserved.
  // For now, this ensures other parts of form are not reset if not needed.
  // The brand/model/product_id reset is now primarily handled when enquiryType changes
  // in the brand fetching useEffect.
  useEffect(() => {
    setForm(f => ({
      ...f,
      brand: '',
      model: '',
      product_id: '',
      // Keep name, mobile, state, district, tehsil as they might be common
    }));
    setModels([]); // Clear models as well
  }, [defaultEnquiryType]);

  const fetchTractorModels = async brandName => {
    const models = await enquiryConfigs[defaultEnquiryType].fetchModelsFn(brandName);
    console.log('fetchTractorModels - models:', models);
    console.log('fetchTractorModels - preFilledTractorModelId:', preFilledTractorModelId);
    setModels(models);
    if (models.length > 0 && preFilledTractorModelId) {
      const matchingModel = models.find(modelItem => {
        if (defaultEnquiryType === 'Tractor') {
          const match = String(modelItem.id) === String(preFilledTractorModelId);
          console.log(`Checking tractor model ${modelItem.model} (product_id: ${modelItem.id}) against ${preFilledTractorModelId}:`, match);
          return match;
        } else if (defaultEnquiryType === 'Implement') {
          const match = String(modelItem.id) === String(preFilledTractorModelId);
          console.log(`Checking implement model ${modelItem.model} (id: ${modelItem.id}) against ${preFilledTractorModelId}:`, match);
          return match;
        } else {
          return String(modelItem.id) === String(preFilledTractorModelId);
        }
      });

      console.log('fetchTractorModels - matchingModel:', matchingModel);

      if (matchingModel) {
        if (defaultEnquiryType === 'Tractor') {
          setForm(f => ({
            ...f,
            model: matchingModel.model,
            product_id: matchingModel.product_id,
          }));
        } else if (defaultEnquiryType === 'Implement') {
          setForm(f => ({
            ...f,
            model: matchingModel.model,
            product_id: matchingModel.id,
          }));
        } else {
          setForm(f => ({
            ...f,
            model: matchingModel.modal_name,
            product_id: matchingModel.id,
          }));
        }
      }
    }
  };
  // Set prefilled brand and model when enquiry form is shown
  useEffect(() => {
    console.log('Prefill effect triggered:', { showEnquiry, preFilledTractorBrand, defaultEnquiryType });
    if (showEnquiry && preFilledTractorBrand && defaultEnquiryType === 'Tractor') {
      console.log('Setting prefilled brand:', preFilledTractorBrand);
      setForm(f => ({
        ...f,
        brand: preFilledTractorBrand,
        model: '', // Clear model initially, will be set after models are fetched
        product_id: '',
      }));
      fetchTractorModels(preFilledTractorBrand);
    }
  }, [showEnquiry, preFilledTractorBrand, defaultEnquiryType]);

  // Fetch districts when state changes
  useEffect(() => {
    if (showEnquiry) {
      setShowOtpPopup(false);

      if (!form.state) {
        setDistricts([]);
        setTehsils([]);
        setForm(f => ({ ...f, district: '', tehsil: '' }));
        return;
      }
      getFetchDistricts(form.state).then(setDistricts);
      setTehsils([]);
      setForm(f => ({ ...f }));
    }
  }, [form.state, showEnquiry]);

  // Fetch tehsils when district changes
  useEffect(() => {
    if (showEnquiry) {
      setShowOtpPopup(false);

      if (!form.district) {
        setTehsils([]);
        setForm(f => ({ ...f, tehsil: '' }));
        return;
      }
      getFetchTehsil(form.district).then(data => setTehsils(data || []));
      setForm(f => ({ ...f }));
    }
  }, [form.district, showEnquiry]);

  // Handlers
  const handleInput = e => {
    setShowOtpPopup(false);

    const { name, value } = e.target;
    if (name === 'name') {
      setForm(f => ({
        ...f,
        name: value.replace(/[^A-Za-z\s]/g, '').substring(0, 50),
      }));
    } else if (name === 'mobile') {
      // Allow empty string or any digits up to 10, validation will be on submit
      if (/^\d{0,10}$/.test(value)) {
        setForm(f => ({ ...f, mobile: value }));
        setError(''); // Clear error during typing
      }
      // No immediate error for invalid format during typing, only on submit
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
      if (defaultEnquiryType === 'Tractor') {
        setForm(f => ({
          ...f,
          model: selectedModelObject.model, // Tractor uses .model
          product_id: selectedModelObject.product_id, // Tractor uses .product_id
        }));
      } else if (defaultEnquiryType === 'Implement') {
        setForm(f => ({
          ...f,
          model: selectedModelObject.model, // Implement uses .model
          product_id: selectedModelObject.id, // Implement uses .id
        }));
      } else {
        // Default to Tyre structure
        setForm(f => ({
          ...f,
          model: selectedModelObject.modal_name, // Tyre uses .modal_name
          product_id: selectedModelObject.id, // Tyre uses .id
        }));
      }
    } else {
      setForm(f => ({ ...f, model: '', product_id: '' }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const currentConfig = enquiryConfigs[defaultEnquiryType];
    if (!currentConfig) {
      setError('Invalid enquiry type selected.');
      setIsSubmitting(false);
      return;
    }

    const { name, mobile, brand, model, state, district, tehsil, product_id } = form;

    // Construct payload using config
    const payload = {
      name,
      mobile,
      type: currentConfig.payloadType, // Use from config
      brand: currentConfig.showBrandModelFields ? brand : '', // Only send if applicable
      model: currentConfig.showBrandModelFields ? model : '', // Only send if applicable
      state,
      district,
      tehsil,
      page_source: pathname,
      type_id: currentConfig.typeId, // Use from config
      product_id: currentConfig.showBrandModelFields ? product_id : '', // Only send if applicable
    };

    console.log('Form submitted with data:', form);
    console.log('Payload to be sent:', payload);

    if (mobile?.length === 10 && /^[6-9]\d{9}$/.test(mobile)) {
      try {
        const result = await postData('/api/whatsapp_popup_enquiry', payload);
        if (result?.success) {
          setExistVerified(result?.data.text || null);
          // setOtp(result?.data?.otp);
          setPrimaryId(result.data?.primary_id);
          setOtpResponseProductId(result.data.product_id);
          setShowOtpPopup(true);
          setShowEnquiry(false);

          // Call api/suggested_tractor
          // if (result.data && result.data.product_id && result.data.text) {
          //   try {
          //     const suggestedTractorPayload = {
          //       product_id: result.data.product_id,
          //       otp_verify: result.data.text,
          //     };
          //     // Fire and forget, or handle response if needed
          //     postData("/api/suggested_tractor", suggestedTractorPayload)
          //       .then((suggestedResult) => {
          //         if (suggestedResult?.success) {
          //           console.log(
          //             "api/suggested_tractor call successful",
          //             suggestedResult
          //           );
          //         } else {
          //           console.error(
          //             "api/suggested_tractor call failed",
          //             suggestedResult?.message || "Unknown error"
          //           );
          //         }
          //       })
          //       .catch((err) => {
          //         console.error("Error calling api/suggested_tractor:", err);
          //       });
          //   } catch (suggestedError) {
          //     console.error(
          //       "Error preparing or calling api/suggested_tractor:",
          //       suggestedError
          //     );
          //   }
          // } else {
          //   console.warn(
          //     "Missing product_id or text in whatsapp_popup_enquiry response, skipping suggested_tractor call."
          //   );
          // }
        } else {
          setError(result.message || 'Submission failed');
        }
      } catch {
        setError('An error occurred during submission');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError('Please enter a valid 10-digit mobile number starting with 6-9.');
      setIsSubmitting(false);
    }
  };

  // Memoized brands for select
  const brandOptions = useMemo(() => brands || [], [brands]);

  return (
    <>
      {/* WhatsApp Button & Scroll to Top */}
      <div className="fixed bottom-20 right-1.5 z-20 flex cursor-pointer flex-col items-center md:bottom-1.5">
        <button onClick={() => setShowEnquiry(v => !v)}>
          <Image
            src="https://images.tractorgyan.com/uploads/113733/668690797dc8d-WhatsappIcon.webp"
            height={100}
            width={100}
            title="WhatsApp"
            alt="WhatsApp"
            className="h-auto w-full min-w-[70px] max-w-[70px]"
          />
        </button>
        {isScrolled && (
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center gap-1.5 rounded-3xl bg-secondary px-3 py-1 font-medium text-white"
          >
            {translation?.buttons.top}
            <span>&#x21E7;</span>
          </span>
        )}
      </div>

      {/* Enquiry Popup */}
      {showEnquiry && (
        <div className="fixed left-0 right-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
          <div className="container">
            <div className="mx-auto w-full overflow-hidden rounded-2xl bg-green-lighter shadow-main lg:max-w-[540px]">
              <div className="relative p-4 md:p-8 md:pt-3">
                <button
                  className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                  onClick={() => {
                    setShowEnquiry(false);
                    if (onClose) onClose();
                  }}
                >
                  <Image
                    src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                    height={50}
                    width={50}
                    alt="close icon"
                    title="close icon"
                  />
                </button>
                <div className="mb-2 text-center text-xl font-bold text-black">
                  <span>{enquiryConfigs[defaultEnquiryType]?.formTitle}</span>
                </div>
                <div className="mb-2 text-center text-sm font-normal text-black">
                  <span>
                    {translation?.enquiryForm?.[`${defaultEnquiryType.toLowerCase()}TextForOtp`]}
                  </span>
                </div>
                {/* Enquiry Type Radio Buttons REMOVED */}
                <form
                  onSubmit={handleSubmit}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.type !== 'submit') {
                      e.preventDefault();
                    }
                  }}
                  className="mb-4 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2"
                >
                  {/* Name */}
                  <div className="col-span-3">
                    <label htmlFor="name" className="mb-0 block text-sm font-bold text-black text-start">
                      {translation?.enquiryForm.name}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleInput}
                        placeholder={translation?.enquiryForm.enterName}
                        required
                        autoComplete="given-name"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="col-span-3">
                    <label htmlFor="mobile" className="mb-0 block text-sm font-bold text-black text-start">
                      {translation?.enquiryForm.mobile}
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        placeholder=" xxxxxxxxxx"
                        value={form.mobile}
                        onChange={handleInput}
                        required
                        pattern="[6-9]{1}[0-9]{9}"
                        maxLength="10"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                      <div className="absolute left-3 top-0 h-full py-2 text-sm font-bold leading-[22px] text-black">
                        <span>+91</span>
                      </div>
                    </div>
                  </div>

                  {/* Conditional Brand and Model Fields */}
                  {enquiryConfigs[defaultEnquiryType]?.showBrandModelFields && (
                    <>
                      {/* Brand */}
                      <div className="col-span-3">
                        <label htmlFor="brand" className="mb-0 block text-sm font-bold text-black text-start">
                          {enquiryConfigs[defaultEnquiryType]?.brandLabel}
                        </label>
                        <div className="mt-1">
                          <select
                            id="brand"
                            name="brand"
                            value={form.brand}
                            onChange={handleBrandChange}
                            required
                            className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                          >
                            <option value="">{translation?.enquiryForm.selectBrand}</option>
                            {brandOptions.length > 0 ? (
                              brandOptions.map(
                                (
                                  brandItem,
                                  idx // Renamed brand to brandItem
                                ) => (
                                  <option key={idx} value={brandItem.name}>
                                    {currentLang === 'hi' && brandItem.name_hi
                                      ? brandItem.name_hi
                                      : brandItem.name}
                                  </option>
                                )
                              )
                            ) : (
                              <option disabled>Loading...</option>
                            )}
                          </select>
                        </div>
                      </div>
                      {/* Model */}
                      <div className="col-span-3">
                        <label htmlFor="model" className="mb-0 block text-sm font-bold text-black text-start">
                          {enquiryConfigs[defaultEnquiryType]?.modelLabel}
                        </label>
                        <div className="mt-1">
                          <select
                            id="model"
                            name="model"
                            value={form.model}
                            onChange={handleModelChange}
                            required
                            disabled={!form.brand}
                            className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                          >
                            <option value="">{translation?.enquiryForm.selectModel}</option>
                            {models.length > 0 ? (
                              models.map((modelItem, idx) => {
                                const isTractor = defaultEnquiryType === 'Tractor';
                                const modelName = isTractor
                                  ? modelItem.model
                                  : modelItem.modal_name;
                                // Optional: Display modelItem.model_en for Tractor if currentLang !== 'hi' and model_en exists
                                // For simplicity as per subtask, directly using modelItem.model for tractor display text.
                                const displayText = isTractor
                                  ? currentLang !== 'hi' && modelItem.model_en
                                    ? modelItem.model_en
                                    : modelItem.model
                                  : modelItem.modal_name;

                                return (
                                  <option key={idx} value={modelName}>
                                    {displayText}
                                  </option>
                                );
                              })
                            ) : (
                              <option disabled>Loading...</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  {/* State */}
                  <div className="col-span-6">
                    <label htmlFor="state" className="mb-0 block text-sm font-bold text-black text-start">
                      {translation?.enquiryForm.selectState}
                    </label>
                    <div className="mt-1">
                      <select
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleInput}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">{translation?.enquiryForm.selectState}</option>
                        {states.length > 0 ? (
                          states.map(state => (
                            <option key={state.id} value={state.state}>
                              {state.state}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                    </div>
                  </div>
                  {/* District */}
                  <div className="col-span-3">
                    <label htmlFor="district" className="mb-0 block text-sm font-bold text-black text-start">
                      {translation?.enquiryForm.selectDistrict}
                    </label>
                    <div className="mt-1">
                      <select
                        id="district"
                        name="district"
                        value={form.district}
                        onChange={handleInput}
                        required
                        disabled={!form.state}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">{translation?.enquiryForm.selectDistrict}</option>
                        {districts.length > 0 ? (
                          districts.map(district => (
                            <option key={district.id} value={district.district}>
                              {district.district}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                    </div>
                  </div>
                  {/* Tehsil */}
                  <div className="col-span-3">
                    <label htmlFor="tehsil" className="mb-0 block text-sm font-bold text-black text-start">
                      {translation?.enquiryForm.selectTehsil}
                    </label>
                    <div className="mt-1">
                      <select
                        id="tehsil"
                        name="tehsil"
                        value={form.tehsil}
                        onChange={handleInput}
                        required
                        disabled={!form.district}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">{translation?.enquiryForm.selectTehsil}</option>
                        {tehsils.length > 0 ? (
                          tehsils.map(tehsil => (
                            <option key={tehsil.id} value={tehsil.tehsil}>
                              {tehsil.tehsil}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                    </div>
                  </div>
                  {/* Terms */}
                  <div className="col-span-6">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="form-checkbox text-blue-600 h-3.5 w-3.5"
                        required
                        defaultChecked
                      />
                      <span className="text-xs text-gray-dark">
                        {translation?.enquiryForm.termsConditionText}
                        <Link
                          href="https://tractorgyan.com/terms-of-use"
                          className="ms-1 font-bold text-blue-link"
                        >
                          {translation?.enquiryForm.termsConditionLink}
                        </Link>
                      </span>
                    </label>
                  </div>
                  {/* Submit */}
                  <div className="col-span-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mx-auto flex w-full max-w-[263px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-lg text-white"
                    >
                      <span>{enquiryConfigs[defaultEnquiryType]?.getSubmitButtonText()}</span>
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
                  {/* Error */}
                  {error && (
                    <div className="text-red-600 col-span-6 text-center text-xs">{error}</div>
                  )}
                </form>
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
          </div>
        </div>
      )}

      {/* OTP Popup */}
      {showOtpPopup && (
        <SubmitOtpForm
          page={'tyre'}
          translation={translation}
          name={form.name}
          selectedModel={form.model}
          // otp={otp}
          mobile={form.mobile}
          primaryId={primaryId}
          product_id={otpResponseProductId} // Ensure this is correctly handled for different enquiry types
          bradn_name={form.brand} // Ensure this is correctly handled
          state={form.state}
          district={form.district}
          tehsil={form.tehsil}
          onClose={() => setShowOtpPopup(false)}
          closeEnquryPopup={() => {
            setShowEnquiry(false);
            setShowOtpPopup(false);
          }}
          existVerified={existVerified}
          // Pass product names for OTP form generalization (Part 2 preview)
          productNameSingular={enquiryConfigs[defaultEnquiryType]?.productNameSingular}
          productNamePlural={enquiryConfigs[defaultEnquiryType]?.productNamePlural}
          enquiryType={defaultEnquiryType} // Pass defaultEnquiryType for OTP form logic (Part 2 preview)
        />
      )}
    </>
  );
};

export default WhatsAppTopButton;
