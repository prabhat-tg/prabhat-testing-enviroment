'use client';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import SubmitOtpForm from '@/src/features/tyreComponents/commonComponents/submitOtpForm/SubmitOtpForm';
import { fetchData, postData } from '@/src/services/apiMethods';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
// import { useTranslation } from "react-i18next";
import { getTyreModal } from '@/src/services/tyre/tyre-modal';
import { getAllTractorModels } from '@/src/services/tractor/all-tractor-models';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import { tgi_arrow_right } from '@/src/utils/assets/icons';
import { getAllImplementBrandListing } from '@/src/services/implement/get-all-implement-brand-listing';

const TyrePriceInquireForm = ({
  hideBanner = false,
  bgColor = 'bg-white',
  formTitle,
  heading,
  tyreBrands,
  currentLang,
  translation,
  brandName,
  banner,
  mobileBanner,
  submitBtnText,
  type = 'TYRE',
  preFilledBrand,
  preFilledModel,
  preFilledModelId,
  imgUrl,
  mobileImgUrl,
  isMobile,
  pageName,
  pageSource,
  implementType
}) => {
  useEffect(() => {
    console.log("TyrePriceInquireForm props:", { pageName, pageSource });
  }, [pageName, pageSource]);
  let headingTitle = brandName ? tg_getTittleFromNestedKey(translation, heading) : heading;
  if (brandName || brandName == '') headingTitle = headingTitle.replace('{brand}', brandName);
  const [tyreModels, setTyreModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  // const [brands, setBrands] = useState([]);
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
  const [error, setError] = useState(null);
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

  useEffect(() => {
    if (!showOtpPopup) {
      // setName('');
      // setMobile('');
      // setSelectedBrand('');
      // setSelectedModel('');
      // setSelectedState('');
      // setSelectedDistrict('');
      // setSelectedTehsil('');
      // setProductId('');
    }
  }, [showOtpPopup]);

  // useEffect(() => {
  //   const fetchModels = async () => {
  //     try {
  //       const result = await postData("/api/tyre_modal", {
  //         brand_name: selectedBrand,
  //       });
  //       setTyreModels(result.data);
  //     } catch (error) {
  //       console.error("Error fetching in tyre models:", error);
  //     }
  //   };
  //   fetchModels();
  // }, [selectedBrand]);

  useEffect(() => {
    const fetchModels = async () => {
      if (type === 'TRACTOR' && selectedBrand !== '') {

        const data = await getAllTractorModels(selectedBrand);
        setTyreModels(data);
        if (preFilledModel) {

          data.forEach(modelItem => {
            if ((+modelItem?.product_id == +preFilledModelId) || (+modelItem.id == +preFilledModelId)) {

              setSelectedModel(modelItem.model_en || modelItem.model);
            }
          })
        }
      } else if (type === 'IMPLEMENT' && selectedBrand !== '') {
        // Handle Implement Case Here
        const data = await getAllImplementBrandListing({
          brand: selectedBrand,
          start_limit: 0,
          end_limit: 100, // TODO:: Refactor | This is a required field, so setting 100 for now
          // lang: currentLang,
        });
        setTyreModels(data.items);
      } else {
        const data = await getTyreModal(selectedBrand);
        setTyreModels(data);
      }

    };
    fetchModels();
  }, [selectedBrand, type]);

  useEffect(() => {
    // const fetchBrands = async () => {
    //   try {
    //     const result = await postData("/api/all_tyre_brands");
    //     setBrands(result.data);
    //   } catch (error) {
    //     console.error("Error fetching in brands:", error);
    //   }
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

  // Effect to set pre-filled brand and model
  useEffect(() => {
    if (preFilledBrand) {
      setSelectedBrand(preFilledBrand);
    }

  }, [preFilledBrand]);

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

  // useEffect(() => {
  //   const fetchTehsils = async () => {
  //     if (!selectedDistrict) return;
  //     try {
  //       const result = await postData("/api/all_tehsil", {
  //         district: selectedDistrict,
  //       });
  //       console.log("tehsil", result);
  //       setTehsils(result.data || []);
  //     } catch (error) {
  //       console.error("Error fetching tehsil:", error);
  //     }
  //   };
  //   fetchTehsils();
  // }, [selectedDistrict]);

  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchModels = async () => {
      const data = await getFetchTehsil(selectedDistrict);
      setTehsils(data || []);
    };
    fetchModels();
  }, [selectedDistrict]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedTehsil) {
      setError('Tehsil is required');
      return;
    }
    setIsSubmitting(true);

    let payload, apiEndpoint;

    if (type === 'TRACTOR') {
      // New API and payload for tractor
      payload = {
        'user-message': 'Enquiry',
        Enquiry: '',
        otp_type: 'form_submit_otp_send',
        name: name,
        mobile_name: mobile,
        manufacture_id: selectedBrand,
        first: selectedModel,
        district: selectedDistrict,
        tahsil: selectedTehsil,
        state: selectedState,
        type_id: isMobile ? 6 : 5,
      };
      apiEndpoint = '/api/enquiry_data_otp_send';
    } if (type === 'IMPLEMENT') {
      // Payload for implement
      payload = {
        // 'user-message': 'Enquiry',
        // Enquiry: '',
        // otp_type: 'form_submit_otp_send',
        name: name,
        mobile: mobile,
        model: selectedModel,
        brand: selectedBrand,
        implement_type: implementType,
        state: selectedState,
        district: selectedDistrict,
        tehsil: selectedTehsil,
        type_id: 34, // TODO:: Confirm and Update the type ID for mobile
        page_name: pageName,
        page_source: pageSource
      };
      apiEndpoint = '/api/all_implement_enquiry';
    } else {
      // Original API and payload for tyre
      payload = {
        name,
        mobile_name: mobile,
        implement_type: '',
        manufacture_id: selectedBrand,
        first: selectedModel,
        state: selectedState,
        district: selectedDistrict,
        tehsil: selectedTehsil,
        type_id: isMobile ? 16 : 17,
        demo_field_4: 'demo_field_4',
        user_message: 'Enquiry',
        otp_type: 'form_submit_otp_send',
        form_name: 'tyre price',
      };
      apiEndpoint = 'api/price_show_enquiry_form';
    }

    console.log('payload', payload);
    try {
      const result = await postData(apiEndpoint, payload);
      console.log('result', result);

      if (result.status === 'success' || result.message == "success") {
        setOtp(result.otp);
        setShowOtpPopup(new Date());
        setPrimaryId(result.primary_id);
        setExistVerified(result.text);
      } else {
        setError(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bannerImage = (isMobile, banner, mobileBanner) => {
    // Check for custom banner images first (for tractor)
    if (imgUrl && mobileImgUrl) {
      return isMobile ? mobileImgUrl : imgUrl;
    }

    if (isMobile) {
      // Return custom mobile banner if provided
      if (mobileBanner) return mobileBanner;

      return currentLang == 'hi'
        ? 'https://images.tractorgyan.com/uploads/118037/67b854179ace3-tyre-price-banner-mobile-hindi.webp'
        : 'https://images.tractorgyan.com/uploads/118035/67b85199eab88-tyre-price-banner.webp';
    } else {
      // Return custom desktop banner if provided
      if (banner) return banner;

      return currentLang == 'hi'
        ? 'https://images.tractorgyan.com/uploads/118038/67b8544f51f8e-Tyre-price-banner-desktop-hindi.webp'
        : 'https://images.tractorgyan.com/uploads/118036/67b851edaf33b-tyre-desktop-banner.webp';
    }
  };
  return (
    <>
      <section className="container" id="inquire-section">
        <div>
          {headingTitle && <MainHeadings text={headingTitle} />}
          <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
            <div className="w-full overflow-hidden rounded-2xl shadow-main lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
              {!hideBanner && (
                <div
                  className={`${banner ? 'xl:max-h-[220px]' : 'xl:max-h-[200px]'} h-full max-h-[143px] w-full overflow-hidden`}
                >
                  <Image
                    src={bannerImage(isMobile, banner, mobileBanner)}
                    height={500}
                    width={500}
                    alt="tyre price banner"
                    title="Tyre Price Banner"
                    className="h-auto max-h-full w-full object-cover object-center"
                  />
                </div>
              )}
              <div className={`${bgColor} p-4 md:p-8`}>
                {formTitle && (
                  <div className="mb-2 text-center text-sm font-normal text-black">
                    <MainHeadings extraCss={'border-0'} marginBottom="mb-0" text={formTitle} />
                  </div>
                )}
                <div className="mb-4 text-center text-sm font-normal text-black md:mb-10">
                  <span>
                    {type === 'TRACTOR'
                      ? translation.enquiryForm.tractorTextForOtp
                      : type === 'IMPLEMENT'
                        ? translation.enquiryForm.implementTextForOtp ||
                        translation.enquiryForm.textForOtp
                        : translation.enquiryForm.tyreTextForOtp ||
                        translation.enquiryForm.textForOtp}
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-6 gap-x-4 gap-y-2">
                  <div className="col-span-6 md:col-span-3">
                    <label htmlFor="name" className="mb-0 block text-sm font-bold text-black">
                      {translation.enquiryForm.name}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        placeholder={translation.enquiryForm.enterName}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        autoComplete="given-name"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label htmlFor="userMobile" className="mb-0 block text-sm font-bold text-black">
                      {translation.enquiryForm.mobile}
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
                  <div className="col-span-3">
                    <label htmlFor="tyreBrand" className="mb-0 block text-sm font-bold text-black">
                      {type === 'TYRE'
                        ? translation.enquiryForm.tyreBrand
                        : type === 'TRACTOR'
                          ? translation.enquiryForm.tractorBrand
                          : type === 'IMPLEMENT'
                            ? translation.enquiryForm.implementBrand
                            : translation.enquiryForm.selectBrand}
                    </label>
                    <div className="mt-2">
                      <select
                        id="tyreBrand"
                        value={selectedBrand}
                        onChange={e => setSelectedBrand(e.target.value)}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option value="">{translation.enquiryForm.selectBrand}</option>
                        {tyreBrands?.length > 0 ? (
                          tyreBrands.map((brand, index) => (
                            <option key={index} value={brand.name}>
                              {brand.name}
                            </option>
                          ))
                        ) : (
                          <option>Loading...</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="tyreModel" className="mb-0 block text-sm font-bold text-black">
                      {type === 'TYRE'
                        ? translation.enquiryForm.tyreModel
                        : type === 'TRACTOR'
                          ? translation.enquiryForm.tractorModel
                          : type === 'IMPLEMENT'
                            ? translation.enquiryForm.implementModel
                            : translation.enquiryForm.selectModel}
                    </label>
                    <div className="mt-2">
                      <select
                        id="tyreModel"
                        value={selectedModel}
                        onChange={e => {
                          const selectedIndex = e.target.selectedIndex - 1;
                          if (selectedIndex >= 0) {
                            const selectedModelItem = tyreModels[selectedIndex];
                            if (type === 'TRACTOR') {
                              setSelectedModel(selectedModelItem.model_en);
                              setProductId(selectedModelItem.product_id);
                            } if (type === 'IMPLEMENT') {
                              setSelectedModel(selectedModelItem.model);
                              setProductId(selectedModelItem.id);
                            } else {
                              setSelectedModel(selectedModelItem.modal_name);
                              setProductId(selectedModelItem.id);
                            }
                          }
                        }}
                        required
                        disabled={!selectedBrand}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option>{translation.enquiryForm.selectModel}</option>
                        {tyreModels?.length > 0 ? (
                          tyreModels.map((modelItem, index) => (
                            <option
                              key={index}
                              value={type === 'TRACTOR' ? modelItem.model : type === 'IMPLEMENT' ? modelItem.model : modelItem.modal_name}
                            >
                              {type === 'TRACTOR' ? modelItem.model : type === 'IMPLEMENT' ? modelItem.model : modelItem.modal_name}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-2">
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
                        onChange={e => setSelectedState(e.target.value)}
                        required
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option defaultValue> {translation.enquiryForm.selectState}</option>
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
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-2">
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
                        onChange={e => setSelectedDistrict(e.target.value)}
                        required
                        disabled={!selectedState}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option defaultValue>{translation.enquiryForm.selectDistrict}</option>
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
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2">
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
                        onChange={e => setSelectedTehsil(e.target.value)}
                        required
                        disabled={!selectedDistrict}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                      >
                        <option defaultValue>{translation.enquiryForm.selectTehsil} </option>
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
                      className="mx-auto flex w-full max-w-[263px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-lg text-white"
                    >
                      <span>
                        {isSubmitting
                          ? 'Submitting...'
                          : submitBtnText
                            ? submitBtnText
                            : type === 'TRACTOR'
                              ? `₹ ${translation.enquiryForm.getTractorPrice || 'Get Tractor Price'}`
                              : `₹ ${translation.enquiryForm.getTyrePrice}`}
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
                  {error && <p className="error">{error}</p>}
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
          otp={otp}
          primaryId={primaryId}
          mobile={mobile}
          bradn_name={selectedBrand}
          product_id={product_id}
          existVerified={existVerified}
          closeEnquryPopup={() => setShowOtpPopup(false)}
          enquiryType={type === 'TRACTOR' ? 'Tractor' : 'Tyre'}
          productNameSingular={type === 'TRACTOR' ? 'tractor' : 'tyre'}
          productNamePlural={type === 'TRACTOR' ? 'tractors' : 'tyres'}
          onClose={() => setShowOtpPopup(false)}
          tehsil={selectedTehsil}
          state={selectedState}
          district={selectedDistrict}
          name={name}
          successDealerFormShow={'No'}
        />
      )}
    </>
  );
};

export default TyrePriceInquireForm;
