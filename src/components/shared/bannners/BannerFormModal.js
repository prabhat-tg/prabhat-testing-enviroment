'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { postData } from '@/src/services/apiMethods';
import { getAllTractorModels } from '@/src/services/tractor/all-tractor-models';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import SubmitOtpForm from '@/src/features/tyreComponents/commonComponents/submitOtpForm/SubmitOtpForm';
import { tgi_arrow_right } from '@/src/utils/assets/icons';

const BannerFormModal = ({
    isOpen,
    onClose,
    translation,
    currentLang = 'en',
    isMobile = false,
}) => {
    // Form states
    const [brands, setBrands] = useState([]);
    const [tractorModels, setTractorModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [product_id, setProductId] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [village, setVillage] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [existingLoan, setExistingLoan] = useState('yes');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // OTP flow states
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otp, setOtp] = useState('');
    const [primaryId, setPrimaryId] = useState(null);
    const [existVerified, setExistVerified] = useState('');

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Fetch brands on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getAllTractorBrands();
                setBrands(data || []);
            } catch (error) {
                console.error('Error fetching brands:', error);
                setBrands([]);
            }
        };
        fetchBrands();
    }, []);

    // Fetch tractor models when brand is selected
    useEffect(() => {
        const fetchModels = async () => {
            if (selectedBrand !== '') {
                try {
                    const data = await getAllTractorModels(selectedBrand);
                    setTractorModels(data || []);
                } catch (error) {
                    console.error('Error fetching tractor models:', error);
                    setTractorModels([]);
                }
            } else {
                setTractorModels([]);
            }
        };
        fetchModels();
    }, [selectedBrand]);

    // Fetch states on component mount
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const data = await getAllStates();
                setStates(data || []);
            } catch (error) {
                console.error('Error fetching states:', error);
                setStates([]);
            }
        };
        fetchStates();
    }, []);

    // Fetch districts when state is selected
    useEffect(() => {
        if (!selectedState) {
            setDistricts([]);
            return;
        }

        const fetchDistricts = async () => {
            try {
                const data = await getFetchDistricts(selectedState);
                setDistricts(data || []);
            } catch (error) {
                console.error('Error fetching districts:', error);
                setDistricts([]);
            }
        };
        fetchDistricts();
    }, [selectedState]);

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBrand || !selectedModel || !selectedState || !selectedDistrict) {
            setError('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            'user-message': 'Enquiry',
            otp_type: 'form_submit_otp_send',
            name: name,
            mobile_name: mobile,
            manufacture_id: selectedBrand,
            first: product_id,
            district: selectedDistrict,
            tahsil: village || '',
            state: selectedState,
            type_id: isMobile ? 113 : 112,
            existing_loan: existingLoan,
        };

        try {
            const result = await postData('/api/enquiry_data_otp_send', payload);

            if (result.status === 'success') {
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

    // Close modal and reset form
    const handleClose = () => {
        setSelectedBrand('');
        setSelectedModel('');
        setProductId('');
        setSelectedState('');
        setSelectedDistrict('');
        setVillage('');
        setName('');
        setMobile('');
        setExistingLoan('yes');
        setError(null);
        setShowOtpPopup(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Modal Backdrop - Hide when OTP popup is showing */}
            {!showOtpPopup && (
                <div className="fixed left-0 right-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
                    <div className="container">
                        <div className="mx-auto w-full overflow-hidden rounded-2xl bg-green-lighter shadow-main lg:max-w-[540px]">
                            <div className="relative p-4 md:p-8 md:pt-3">
                                {/* Close Button */}
                                <button
                                    className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                                    onClick={handleClose}
                                    aria-label="Close modal"
                                >
                                    <Image
                                        src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                                        height={50}
                                        width={50}
                                        alt="close icon"
                                        title="close icon"
                                    />
                                </button>

                                {/* Modal Header */}
                                <div className="mb-2 text-center text-xl font-bold text-black">
                                    <span>Enquiry Form</span>
                                </div>

                                {/* Form Subtitle */}
                                {/* <div className="mb-2 text-center text-sm font-normal text-black">
                                    <span>
                                        {translation?.enquiryForm?.tractorTextForOtp || 'Get best tractor prices in your area'}
                                    </span>
                                </div> */}

                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.target.type !== 'submit') {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="mb-4 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2"
                                >
                                    {/* Name */}
                                    <div className="col-span-3">
                                        <label htmlFor="banner-name" className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.name || 'Name'}
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="banner-name"
                                                name="name"
                                                placeholder={translation?.enquiryForm?.enterName || 'Enter your name'}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                autoComplete="given-name"
                                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile */}
                                    <div className="col-span-3">
                                        <label htmlFor="banner-mobile" className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.mobile || 'Mobile'}
                                        </label>
                                        <div className="relative mt-1">
                                            <input
                                                type="tel"
                                                id="banner-mobile"
                                                name="mobile"
                                                placeholder=" xxxxxxxxxx"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
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

                                    {/* State */}
                                    <div className="col-span-6">
                                        <label htmlFor="banner-state" className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.selectState || 'Select State'}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="banner-state"
                                                name="state"
                                                value={selectedState}
                                                onChange={(e) => setSelectedState(e.target.value)}
                                                required
                                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                                            >
                                                <option value="">{translation?.enquiryForm?.selectState || 'Select State'}</option>
                                                {states?.length > 0 ? (
                                                    states.map((state) => (
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
                                        <label htmlFor="banner-district" className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.selectDistrict || 'Select District'}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="banner-district"
                                                name="district"
                                                value={selectedDistrict}
                                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                                required
                                                disabled={!selectedState}
                                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                                            >
                                                <option value="">{translation?.enquiryForm?.selectDistrict || 'Select District'}</option>
                                                {districts?.length > 0 ? (
                                                    districts.map((district) => (
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

                                    {/* Village (Optional) */}
                                    <div className="col-span-3">
                                        <label htmlFor="banner-village" className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.selectTehsil || 'Village'}
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="banner-village"
                                                name="village"
                                                placeholder={translation?.enquiryForm?.enterVillage || 'Enter village name'}
                                                value={village}
                                                onChange={(e) => setVillage(e.target.value)}
                                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Tractor Model Details Header */}
                                    <div className="col-span-6 text-center">
                                        <p className="text-sm font-medium text-black">
                                            Please fill your existing tractor model detail
                                        </p>
                                    </div>

                                    {/* Brand */}
                                    <div className="col-span-3">
                                        <label htmlFor="banner-brand" className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.tractorBrand || 'Tractor Brand'}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="banner-brand"
                                                name="brand"
                                                value={selectedBrand}
                                                onChange={(e) => setSelectedBrand(e.target.value)}
                                                required
                                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                                            >
                                                <option value="">{translation?.enquiryForm?.selectBrand || 'Select Brand'}</option>
                                                {brands?.length > 0 ? (
                                                    brands.map((brand, index) => (
                                                        <option key={index} value={brand.name}>
                                                            {brand.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>Loading...</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Model */}
                                    <div className="col-span-3">
                                        <label htmlFor="banner-model" className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.tractorModel || 'Tractor Model'}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="banner-model"
                                                name="model"
                                                value={selectedModel}
                                                onChange={(e) => {
                                                    const selectedIndex = e.target.selectedIndex - 1;
                                                    if (selectedIndex >= 0) {
                                                        const selectedModelItem = tractorModels[selectedIndex];
                                                        setSelectedModel(selectedModelItem.model_en || selectedModelItem.model);
                                                        setProductId(selectedModelItem.id);
                                                    }
                                                }}
                                                required
                                                disabled={!selectedBrand}
                                                className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none"
                                            >
                                                <option value="">{translation?.enquiryForm?.selectModel || 'Select Model'}</option>
                                                {tractorModels?.length > 0 ? (
                                                    tractorModels.map((modelItem, index) => (
                                                        <option key={index} value={modelItem.model_en || modelItem.model}>
                                                            {modelItem.model_en || modelItem.model}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>Loading...</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Existing Loan */}
                                    <div className="col-span-6">
                                        <label className="mb-0 block text-sm font-bold text-black">
                                            {translation?.enquiryForm?.existingLoan || 'Do you have existing loan?'}
                                        </label>
                                        <div className="mt-1 flex gap-6">
                                            <label className="inline-flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="existing_loan"
                                                    value="yes"
                                                    checked={existingLoan === 'yes'}
                                                    onChange={(e) => setExistingLoan(e.target.value)}
                                                    className="form-checkbox text-blue-600 h-3.5 w-3.5"
                                                />
                                                <span className="text-xs text-gray-dark">Yes</span>
                                            </label>
                                            <label className="inline-flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="existing_loan"
                                                    value="no"
                                                    checked={existingLoan === 'no'}
                                                    onChange={(e) => setExistingLoan(e.target.value)}
                                                    className="form-checkbox text-blue-600 h-3.5 w-3.5"
                                                />
                                                <span className="text-xs text-gray-dark">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Terms and Conditions */}
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
                                                {translation?.enquiryForm?.termsConditionText || 'I agree to the'}
                                                <Link
                                                    href="https://tractorgyan.com/terms-of-use"
                                                    className="ms-1 font-bold text-blue-link"
                                                    target="_blank"
                                                >
                                                    {translation?.enquiryForm?.termsConditionLink || 'Terms & Conditions'}
                                                </Link>
                                            </span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-span-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="mx-auto flex w-full max-w-[263px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-lg text-white"
                                        >
                                            <span>
                                                {isSubmitting
                                                    ? 'Submitting...'
                                                    : `₹ ${translation?.enquiryForm?.getBestOffer || 'Get Tractor Price'}`}
                                            </span>
                                            {!isSubmitting && (
                                                <Image
                                                    src={tgi_arrow_right}
                                                    height={50}
                                                    width={50}
                                                    alt="arrow-icon"
                                                    title="arrow-icon"
                                                    className="h-2.5 w-2.5"
                                                />
                                            )}
                                        </button>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="col-span-6 text-center text-xs text-red-600">{error}</div>
                                    )}
                                </form>
                            </div>

                            {/* Bottom Banner Image */}
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
                    translation={translation}
                    otp={otp}
                    primaryId={primaryId}
                    mobile={mobile}
                    bradn_name={selectedBrand}
                    product_id={product_id}
                    existVerified={existVerified}
                    closeEnquryPopup={() => {
                        setShowOtpPopup(false);
                        handleClose();
                    }}
                    enquiryType="BannerAd"
                    productNameSingular="tractor"
                    productNamePlural="tractors"
                    onClose={() => {
                        setShowOtpPopup(false);
                        handleClose(); // Close the main modal as well
                    }}
                    tehsil={village}
                    state={selectedState}
                    district={selectedDistrict}
                    name={name}
                    successDealerFormShow="No"
                    currentLang={currentLang}
                    isMobile={isMobile}
                    showSuggested={false}
                />
            )}
        </>
    );
};

export default BannerFormModal;
