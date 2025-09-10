'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import StepperHeader from '@/src/components/second-hand/StepperHeader';
import TG_Button from '@/src/components/ui/buttons/MainButtons';

import { submitSellOldTractorFormWithImages } from '@/src/services/second-hand-tractors/sell-old-tractor';

import {
  tgi_arrow_right_green,
  tgi_arrow_right_white,
  tgi_close_rounded,
  tgi_upload_tractor_back_img,
  tgi_upload_tractor_front_img,
  tgi_upload_tractor_left_img,
  tgi_upload_tractor_right_img,
} from '@/src/utils/assets/icons';

const TractorImagesForm = ({
  isMobile,
  translation,
  currentLang,
  formData,
  formId,
  onStepComplete,
  onStepBack,
}) => {
  const icons = {
    front: tgi_upload_tractor_front_img,
    back: tgi_upload_tractor_back_img,
    left: tgi_upload_tractor_left_img,
    right: tgi_upload_tractor_right_img,
  };

  // Form state
  const [images, setImages] = useState({
    front: formData.tractor_front_image || null,
    back: formData.tractor_back_image || null,
    left: formData.tractor_left_image || null,
    right: formData.tractor_right_image || null,
  });
  const [imageFiles, setImageFiles] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleImageUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          [side]:
            currentLang === 'hi'
              ? 'फाइल का आकार 5MB से कम होना चाहिए'
              : 'File size should be less than 5MB',
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormErrors({
          ...formErrors,
          [side]:
            currentLang === 'hi' ? 'केवल इमेज फाइल स्वीकार्य है' : 'Only image files are accepted',
        });
        return;
      }

      setImages(prev => ({ ...prev, [side]: URL.createObjectURL(file) }));
      setImageFiles(prev => ({ ...prev, [side]: file }));
      setFormErrors({ ...formErrors, [side]: '' });
    }
  };

  const removeImage = side => {
    setImages(prev => ({ ...prev, [side]: null }));
    setImageFiles(prev => ({ ...prev, [side]: null }));
  };

  const validateForm = () => {
    const errors = {};

    // At least one image is required
    const hasImages = Object.values(images).some(image => image !== null);
    if (!hasImages) {
      errors.images =
        currentLang === 'hi'
          ? 'कम से कम एक तस्वीर अपलोड करना आवश्यक है'
          : 'At least one image is required';
    }

    if (!isTermsAccepted) {
      errors.terms =
        currentLang === 'hi'
          ? 'नियम और शर्तों को स्वीकार करना आवश्यक है'
          : 'You must accept terms and conditions';
    }

    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Create FormData for file uploads
    const formDataObj = new FormData();
    formDataObj.append('id', formId);
    formDataObj.append('form_step', '3');

    // Add image files if they exist
    let i = 1;
    Object.entries(imageFiles).forEach(([key, file]) => {
      if (file) {
        const fieldName = `image_${i}`;
        formDataObj.append(fieldName, file);
        i++;
      }
    });

    try {
      const result = await submitSellOldTractorFormWithImages(formDataObj);

      if (result.code === 200) {
        const stepData = {
          tractor_front_image: imageFiles.front,
          tractor_back_image: imageFiles.back,
          tractor_left_image: imageFiles.left,
          tractor_right_image: imageFiles.right,
        };

        onStepComplete(stepData);
      } else {
        setError(result.message || (currentLang === 'hi' ? 'सबमिशन विफल' : 'Submission failed'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
      <div className="rounded-xl border border-gray-light bg-white">
        <StepperHeader
          currentStep={3}
          totalSteps={3}
          heading={currentLang === 'hi' ? 'ट्रैक्टर की तस्वीरें' : 'Tractor Images'}
          description={
            currentLang === 'hi'
              ? 'कृपया अपने पुराने ट्रैक्टर की विभिन्न दिशाओं से अच्छी गुणवत्ता की तस्वीरें अपलोड करें।'
              : 'Please upload good quality images of your second hand tractor from different sides'
          }
        />
        <div className="p-4">
          {error && (
            <div className="bg-red-100 border-red-300 text-red-700 mb-4 rounded border p-3">
              {error}
            </div>
          )}

          {formErrors.images && (
            <div className="bg-red-100 border-red-300 text-red-700 mb-4 rounded border p-3">
              {formErrors.images}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {['front', 'back', 'left', 'right'].map(side => (
                <div key={side} className="flex flex-col gap-2">
                  <span className="mt-2 text-sm font-medium capitalize">
                    {currentLang === 'hi'
                      ? { front: 'आगे से', back: 'पीछे से', left: 'बाएं से', right: 'दाएं से' }[
                          side
                        ]
                      : `Tractor ${side}`}
                  </span>
                  <label className="relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-light bg-section-gray hover:shadow-main md:h-48 md:w-48">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageUpload(e, side)}
                      className="hidden"
                    />
                    {images[side] ? (
                      <>
                        <Image
                          width={120}
                          height={120}
                          src={images[side]}
                          alt={`${side} tractor`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(side)}
                          className="hover:bg-red-50 absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full bg-white"
                        >
                          <Image
                            src={tgi_close_rounded}
                            height={16}
                            width={16}
                            alt="Remove image"
                            title="Remove image"
                          />
                        </button>
                      </>
                    ) : (
                      <>
                        <Image
                          width={120}
                          height={120}
                          src={icons[side]}
                          alt={`Upload ${side} tractor icon`}
                          className="z-0 h-full w-full object-cover"
                        />
                        <span className="absolute bottom-2 text-xs text-white">
                          {currentLang === 'hi'
                            ? 'अपलोड करने के लिए क्लिक करें'
                            : 'Click to Upload'}
                        </span>
                      </>
                    )}
                  </label>
                  {formErrors[side] && (
                    <span className="text-red-500 text-xs">{formErrors[side]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6 flex items-start">
              <label className="flex cursor-pointer items-start">
                <input
                  type="checkbox"
                  className="mr-2 mt-1"
                  checked={isTermsAccepted}
                  onChange={e => {
                    setIsTermsAccepted(e.target.checked);
                    setFormErrors({ ...formErrors, terms: '' });
                  }}
                />
                <span className="text-xs text-gray-dark">
                  {currentLang === 'hi' ? 'मैं ट्रैक्टरज्ञान के' : "I agree to TractorGyan's"}
                  <Link
                    href={'https://tractorgyan.com/terms-of-use'}
                    className="ms-1 font-bold text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentLang === 'hi' ? 'नियम और शर्तों' : 'Terms and Conditions'}
                  </Link>
                  {currentLang === 'hi' ? ' से सहमत हूं' : ''}
                </span>
              </label>
            </div>
            {formErrors.terms && (
              <div className="text-red-500 mb-4 text-xs">{formErrors.terms}</div>
            )}

            {/* Navigation Buttons */}
            <div className="col-span-12 mt-4 flex justify-between md:justify-center md:gap-8">
              <TG_Button
                variant="outline"
                type="button"
                onClick={onStepBack}
                icon={tgi_arrow_right_green}
                iconPosition="left"
                className="min-w-[132px] md:min-w-[140px]"
              >
                {currentLang === 'hi' ? 'पिछला' : 'Previous'}
              </TG_Button>
              <TG_Button
                type="submit"
                icon={tgi_arrow_right_white}
                iconPosition="right"
                className="min-w-[132px] md:min-w-[140px]"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? currentLang === 'hi'
                    ? 'भेज रहे हैं...'
                    : 'Submitting...'
                  : currentLang === 'hi'
                    ? 'जमा करें'
                    : 'Submit'}
              </TG_Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TractorImagesForm;
