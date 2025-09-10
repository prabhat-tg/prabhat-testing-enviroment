'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import SubmitOtpForm from '@/src/features/tyreComponents/commonComponents/submitOtpForm/SubmitOtpForm';
import { fetchData, postData } from '@/src/services/apiMethods';
import React, { useEffect, useState } from 'react';
import { getTyreModal } from '@/src/services/tyre/tyre-modal';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import TG_SelectField from '@/src/components/ui/inputs/TG_SelectField';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import Image from 'next/image';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const SecondHandForm = ({ heading, tyreBrands, currentLang, translation, brandName }) => {
  currentLang = currentLang === 'hi' ? '/hi' : '';
  let headingTitle = tg_getTittleFromNestedKey(translation, heading);
  headingTitle = headingTitle.replace('{brand}', brandName);
  const isMobile = useIsMobile();
  const [tyreModels, setTyreModels] = useState([]);
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
  const [offerPrice, setOfferPrice] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [primaryId, setPrimaryId] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [formErrors, setFormErrors] = useState({}); // State for form errors

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getTyreModal(selectedBrand);
      setTyreModels(data);
    };
    fetchModels();
  }, [selectedBrand]);

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

  const handleSubmit = async e => {
    e.preventDefault();
    setFormErrors({}); // Reset errors

    // Validation
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!mobile) errors.mobile = 'Mobile number is required';
    if (!selectedBrand) errors.selectedBrand = 'Tractor brand is required';
    if (!selectedModel) errors.selectedModel = 'Tractor model is required';
    if (!selectedState) errors.selectedState = 'State is required';
    if (!selectedDistrict) errors.selectedDistrict = 'District is required';
    if (!selectedTehsil) errors.selectedTehsil = 'Tehsil is required';
    if (!offerPrice) errors.offerPrice = 'Offer price is required';
    if (!isChecked) errors.isChecked = 'You must agree to the terms and conditions';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Stop submission if there are errors
    }

    setIsSubmitting(true);
    const payload = {
      name,
      mobile_name: mobile,
      manufacture_id: selectedBrand,
      first: selectedModel,
      state: selectedState,
      district: selectedDistrict,
      tehsil: selectedTehsil,
      type_id: isMobile ? 16 : 17,
      user_message: 'Enquiry',
      otp_type: 'form_submit_otp_send',
      form_name: 'tyre price',
      offer_price: offerPrice, // Include offer price in payload
    };

    try {
      const result = await postData('api/price_show_enquiry_form', payload);
      if (result.status === 'success') {
        setOtp(result.otp);
        setShowOtpPopup(true);
        setPrimaryId(result.primary_id);
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

  return (
    <>
      <div id="inquire-section">
        <MainHeadings text="Inquire About Second Hand Swaraj 744 XT" />
        <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
          <div className="w-full overflow-hidden rounded-2xl shadow-main lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
            <div className="h-full max-h-[143px] w-full xl:max-h-[200px]">
              <Image
                src={`${isMobile ? 'https://images.tractorgyan.com/uploads/119980/6877417edc63d-Second-hand-Tractor-Enquiry-Banner---Mobile.webp' : 'https://images.tractorgyan.com/uploads/119981/687741ce5470b-Second-hand-Tractor-Enquiry-Banner---Desktop.webp'}`}
                // src={tyreImage(isMobile)}
                height={500}
                width={500}
                alt="tyre price banner"
                className="h-auto w-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <div className="my-2 text-center text-sm font-normal text-black">
                <span>
                  {
                    'Kindly verify your mobile number with the provided OTP to access owner`s name and mobile number'
                  }
                </span>
              </div>
              <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-12 gap-x-4 gap-y-2">
                {/* First Row: Two Input Fields */}
                <div className="col-span-12 md:col-span-6">
                  <TG_InputField
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={translation.enquiryForm.enterName}
                    label={translation.enquiryForm.name}
                    required
                    error={formErrors.name} // Display error if exists
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TG_InputField
                    name="phone"
                    id="userMobile"
                    type="tel"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    placeholder="xxxxxxxxxx"
                    required
                    maxLength={10}
                    label={translation.enquiryForm.mobile}
                    prefix="+91"
                    error={formErrors.mobile} // Display error if exists
                  />
                </div>

                {/* Second Row: Two Select Fields */}
                <div className="col-span-6 md:col-span-6">
                  <TG_SelectField
                    id="tyreBrand"
                    label={'Tractor Brand'}
                    value={selectedBrand}
                    onChange={e => setSelectedBrand(e.target.value)}
                    options={tyreBrands.map(brand => ({
                      label: currentLang === 'hi' ? brand.name_hi : brand.name,
                      value: brand.name,
                    }))}
                    placeholder={translation.enquiryForm.selectBrand}
                    error={formErrors.selectedBrand} // Display error if exists
                  />
                </div>
                <div className="col-span-6 md:col-span-6">
                  <TG_SelectField
                    id="tyreModel"
                    label={'Tractor Model'}
                    value={selectedModel}
                    onChange={e => {
                      const selectedIndex = e.target.selectedIndex - 1;
                      if (selectedIndex >= 0) {
                        const selectedModelItem = tyreModels[selectedIndex];
                        setSelectedModel(selectedModelItem.modal_name);
                        setProductId(selectedModelItem.id);
                      }
                    }}
                    options={tyreModels.map(modelItem => ({
                      label: modelItem.modal_name,
                      value: modelItem.modal_name,
                    }))}
                    placeholder={translation.enquiryForm.selectModel}
                    required
                    disabled={!selectedBrand}
                    error={formErrors.selectedModel} // Display error if exists
                  />
                </div>

                <div className="col-span-12">
                  <TG_InputField
                    name="offerPrice"
                    id="offerPrice"
                    type="tel"
                    value={offerPrice}
                    onChange={e => setOfferPrice(e.target.value)}
                    placeholder="₹ 000000.00"
                    required
                    maxLength={10}
                    label={'Offer Price'}
                    error={formErrors.offerPrice} // Display error if exists
                  />
                </div>

                {/* Third Row: Three Select Fields */}
                <div className="col-span-12 md:col-span-4">
                  <TG_SelectField
                    id="selectState"
                    label={translation.enquiryForm.selectState}
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    options={states.map(state => ({ label: state.state, value: state.state }))}
                    placeholder={translation.enquiryForm.selectState}
                    required
                    error={formErrors.selectedState} // Display error if exists
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <TG_SelectField
                    id="selectDistrict"
                    label={translation.enquiryForm.selectDistrict}
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    options={districts.map(district => ({
                      label: district.district,
                      value: district.district,
                    }))}
                    placeholder={translation.enquiryForm.selectDistrict}
                    required
                    disabled={!selectedState}
                    error={formErrors.selectedDistrict} // Display error if exists
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <TG_SelectField
                    id="selectTehsil"
                    label={translation.enquiryForm.selectTehsil}
                    value={selectedTehsil}
                    onChange={e => setSelectedTehsil(e.target.value)}
                    options={tehsils.map(tehsil => ({
                      label: tehsil.tehsil,
                      value: tehsil.tehsil,
                    }))}
                    placeholder={translation.enquiryForm.selectTehsil}
                    required
                    disabled={!selectedDistrict}
                    error={formErrors.selectedTehsil} // Display error if exists
                  />
                </div>

                {/* Checkbox Row */}
                <div className="col-span-12 my-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      className="form-checkbox text-blue-600 h-5 w-5"
                    />
                    <span className="ml-2 text-sm text-gray-dark">
                      By proceeding ahead you expressly agree to the TractorGyan Terms and
                      Condition
                    </span>
                  </label>
                  {formErrors.isChecked && (
                    <p className="text-xs text-error-main">{formErrors.isChecked}</p>
                  )}{' '}
                  {/* Display error if exists */}
                </div>

                {/* Submit Button */}
                <div className="col-span-12 my-1 flex justify-center">
                  <TG_Button
                    type="submit"
                    icon={tgi_arrow_right_white}
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
                  </TG_Button>
                </div>

                {error && <p className="error">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
      {showOtpPopup && (
        <SubmitOtpForm
          page={'tyre'}
          name={name}
          selectedModel={selectedModel}
          otp={otp}
          mobile={mobile}
          primaryId={primaryId}
          product_id={product_id}
          bradn_name={selectedBrand}
          state={selectedState}
          district={selectedDistrict}
          tehsil={selectedTehsil}
          onClose={() => setShowOtpPopup(false)}
        />
      )}
    </>
  );
};

export default SecondHandForm;
