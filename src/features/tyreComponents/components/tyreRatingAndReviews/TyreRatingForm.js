'use client';
import React, { useState, useEffect } from 'react';
import StarRatingIcon from '@/src/svgFiles/StarRatingIcon';
import { addTyreRatingReview } from '@/src/services/tyre/ratingReviewService';
import SuccessPopup from './SuccessPopup'; // Will create this component

// Tractor brand/model APIs
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorModelsByBrand } from '@/src/services/tractor/get-model-by-brand-v2';
import { getAllTractorModels } from '@/src/services/tractor/all-tractor-models';

const TyreRatingForm = ({
  brand,
  model,
  form_page_name,
  translation,
  mode = 'tyre',
  implementType,
  implementBrand,
  implementModel
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    user_message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Tractor review specific state
  const [tractorBrands, setTractorBrands] = useState([]);
  const [tractorModels, setTractorModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  // Fetch brands on mount if tractor_review
  useEffect(() => {
    if (form_page_name === 'tractor_review') {
      getTractorBrands()
        .then((brands) => setTractorBrands(brands || []))
        .catch(() => setTractorBrands([]));
    }
  }, [form_page_name]);

  // Fetch models when brand changes
  useEffect(() => {
    if (form_page_name === 'tractor_review' && selectedBrand) {
      setTractorModels([]);
      setSelectedModel('');
      getAllTractorModels(selectedBrand)
        .then((models) => setTractorModels(models || []))
        .catch(() => setTractorModels([]));
    }
  }, [form_page_name, selectedBrand]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = translation.ratingForm.nameRequired;
    }
    if (!formData.mobile) {
      errors.mobile = translation.ratingForm.mobileRequired;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = translation.ratingForm.mobileInvalid;
    }
    if (!formData.user_message.trim()) {
      errors.user_message = translation.ratingForm.reviewRequired;
    }
    if (selectedRating === 0) {
      errors.rating = translation.ratingForm.ratingRequired;
    }
    // Tractor review: require brand/model
    if (form_page_name === 'tractor_review') {
      if (!selectedBrand) {
        errors.brand = 'Please select a brand';
      }
      if (!selectedModel) {
        errors.model = 'Please select a model';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);

    let postData;

    if (mode === 'implement') {
      // Implement-specific payload structure
      postData = {
        name: formData.name,
        mobile: formData.mobile,
        user_message: formData.user_message,
        brand: implementBrand,
        model: implementModel,
        total_rating: selectedRating,
        form_page_name: form_page_name,
        implement_type: implementType,
      };
    } else {
      // Original tyre/tractor payload structure
      postData = {
        ...formData,
        total_rating: selectedRating,
        brand: form_page_name === 'tractor_review' ? selectedBrand : brand,
        model: form_page_name === 'tractor_review' ? selectedModel : model,
        form_page_name,
      };
    }

    try {
      const result = await addTyreRatingReview(postData);
      if (result.success) {
        setShowSuccessPopup(true);
        setFormData({ name: '', mobile: '', user_message: '' });
        setSelectedRating(0);
        setSelectedBrand('');
        setSelectedModel('');
      } else {
        setFormErrors({ submit: result.text || translation.ratingForm.unknownError });
      }
    } catch (error) {
      setFormErrors({ submit: translation.ratingForm.submitError });
    } finally {
      setLoading(false);
    }
  };

  const handleRating = rating => {
    setSelectedRating(rating);
    if (formErrors.rating) {
      setFormErrors({ ...formErrors, rating: '' });
    }
  };



  return (
    <>
      <div className="rounded-2xl p-4 shadow-main md:p-0 md:shadow-none">
        <div className="w-full items-center justify-start gap-8 md:flex">
          <span className="mb-1.5 text-center font-semibold text-black">
            {translation.ratingForm.ratings}
          </span>
          <div className="flex items-center justify-center gap-[18px]">
            {[1, 2, 3, 4, 5].map(rating => (
              <div
                key={rating}
                className="h-[40px] w-[40px] cursor-pointer"
                onClick={() => handleRating(rating)}
              >
                <StarRatingIcon clicked={selectedRating >= rating} />
              </div>
            ))}
          </div>
        </div>
        {formErrors.rating && <p className="text-xs italic text-error-main">{formErrors.rating}</p>}

        {/* Tractor Review: Brand/Model Dropdowns (moved below rating) */}
        {form_page_name === 'tractor_review' && (
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-base font-semibold text-black">{translation.common.brand}</label>
              <select
                className={`w-full rounded-md border ${formErrors.brand ? 'border-error-main' : 'border-gray-light'} bg-transparent px-3 py-2 text-sm`}
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
              >
                <option value="">{translation?.enquiryForm?.selectBrand || "Select Brand"}</option>
                {tractorBrands.map(b => (
                  <option key={b.name} value={b.name}>{b.name}</option>
                ))}
              </select>
              {formErrors.brand && <p className="text-xs italic text-error-main">{formErrors.brand}</p>}
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-base font-semibold text-black">{translation.common.model}</label>
              <select
                className={`w-full rounded-md border ${formErrors.model ? 'border-error-main' : 'border-gray-light'} bg-transparent px-3 py-2 text-sm`}
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                disabled={!selectedBrand || tractorModels.length === 0}
              >
                <option value="">{selectedBrand ? translation?.enquiryForm?.selectModel || 'Select Model' : translation?.secondHandTractors.sellOldTractor.form?.selectBrandFirst || 'Select Brand First'}</option>
                {tractorModels.map(m => (
                  <option key={m.model} value={m.model}>{m.model}</option>
                ))}
              </select>
              {formErrors.model && <p className="text-xs italic text-error-main">{formErrors.model}</p>}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="mb-1 block text-base font-semibold text-black">
              {translation.ratingForm.name}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                className={`ease w-full rounded-md border ${formErrors.name ? 'border-error-main' : 'border-gray-light'
                  } bg-transparent px-3 py-2 text-sm transition duration-300 placeholder:text-gray-main hover:border-gray-main focus:border-gray-main focus:outline-none`}
                placeholder={translation.ratingForm.enterName}
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <p className="text-xs italic text-error-main">{formErrors.name}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="mobileNumber" className="mb-1 block text-base font-semibold text-black">
              {translation.ratingForm.mobile}
            </label>
            <div className="relative">
              <input
                id="mobileNumber"
                name="mobile"
                type="tel"
                className={`ease w-full rounded-md border ${formErrors.mobile ? 'border-error-main' : 'border-gray-light'
                  } bg-transparent px-3 py-2 ps-10 text-sm transition duration-300 placeholder:text-gray-main hover:border-gray-main focus:border-gray-main focus:outline-none`}
                placeholder={translation.ratingForm.mobilePlaceholder}
                maxLength="10"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                <span>+91</span>
              </div>
            </div>
            {formErrors.mobile && (
              <p className="text-xs italic text-error-main">{formErrors.mobile}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="review" className="mb-1 block text-base font-semibold text-black">
              {translation.ratingForm.writeReview}
            </label>
            <textarea
              id="review"
              name="user_message"
              rows="3"
              className={`ease w-full rounded-md border ${formErrors.user_message ? 'border-error-main' : 'border-gray-light'
                } bg-transparent px-3 py-2 text-sm transition duration-300 placeholder:text-gray-main hover:border-gray-main focus:border-gray-main focus:outline-none`}
              placeholder={translation.ratingForm.enterText}
              value={formData.user_message}
              onChange={handleInputChange}
            />
            {formErrors.user_message && (
              <p className="text-xs italic text-error-main">{formErrors.user_message}</p>
            )}
          </div>
          {formErrors.submit && (
            <p className="mb-2 text-center text-xs italic text-error-main">{formErrors.submit}</p>
          )}
          <button
            type="submit"
            className="mx-auto flex rounded-lg bg-primary px-4 py-2 text-lg text-white disabled:opacity-50"
            disabled={loading}
          >
            {loading ? translation.ratingForm.submitting : translation.ratingForm.submitReview}
          </button>
        </form>
      </div>
      {showSuccessPopup &&
        <SuccessPopup
          translation={translation}

          message={translation.ratingForm.successMessage}
          onClose={() => setShowSuccessPopup(false)}
        />
      }
    </>


  );
};

export default TyreRatingForm;
