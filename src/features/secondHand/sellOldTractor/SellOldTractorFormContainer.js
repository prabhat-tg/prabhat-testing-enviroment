'use client';
import React, { useState, useEffect } from 'react';
import { isMobileView } from '@/src/utils';

import PersonalDetailsForm from './PersonalDetailsForm';
import TractorDetailsForm from './TractorDetailsForm';
import TractorImagesForm from './TractorImagesForm';
import SuccessPopup from '../../tyreComponents/components/tyreRatingAndReviews/SuccessPopup';

const SellOldTractorFormContainer = ({ currentLang, translation }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formId, setFormId] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Details
    name: '',
    mobile: '',
    state: '',
    district: '',
    tahsil: '',

    // Step 2 - Tractor Details
    manufacture: '',
    model: '',
    manufacture_year: '',
    year_of_purchase: '',
    condition: '',
    rto_number: '',
    engine_number: '',
    tyre_condition: '',
    rc_available: '',
    hour: '',
    price: '',
  });

  useEffect(() => {
    const initializeMobile = async () => {
      try {
        const mobile = await isMobileView();
        setIsMobile(mobile);
      } catch (error) {
        console.error('Error getting mobile view:', error);
      }
    };

    initializeMobile();
  }, []);

  const handleStepComplete = (stepData, id = null) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (id) setFormId(id);

    if (currentStep === 3) {
      // Final step completed - show success popup
      setShowSuccessPopup(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    // Reset form to step 1
    setCurrentStep(1);
    setFormData({
      // Step 1 - Personal Details
      name: '',
      mobile: '',
      state: '',
      district: '',
      tahsil: '',

      // Step 2 - Tractor Details
      manufacture: '',
      model: '',
      manufacture_year: '',
      year_of_purchase: '',
      condition: '',
      rto_number: '',
      engine_number: '',
      tyre_condition: '',
      rc_available: '',
      hour: '',
      price: '',
    });
    setFormId(null);
  };

  const handleStepBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsForm
            isMobile={isMobile}
            translation={translation}
            currentLang={currentLang}
            formData={formData}
            onStepComplete={handleStepComplete}
          />
        );
      case 2:
        return (
          <TractorDetailsForm
            isMobile={isMobile}
            translation={translation}
            currentLang={currentLang}
            formData={formData}
            formId={formId}
            onStepComplete={handleStepComplete}
            onStepBack={handleStepBack}
          />
        );
      case 3:
        return (
          <TractorImagesForm
            isMobile={isMobile}
            translation={translation}
            currentLang={currentLang}
            formData={formData}
            formId={formId}
            onStepComplete={handleStepComplete}
            onStepBack={handleStepBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-main lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
      {renderCurrentStep()}

      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup
          translation={translation}

          message={
            translation?.secondHandTractors?.sellOldTractor?.formSuccessMessage ||
            (currentLang === 'hi'
              ? 'आपका ट्रैक्टर बेचने का फॉर्म सफलतापूर्वक जमा हो गया है। हमारी टीम जल्दी ही आपसे संपर्क करेगी।'
              : 'Your tractor selling form has been submitted successfully. Our team will contact you soon.')
          }
          onClose={handleCloseSuccessPopup}
        />
      )}
    </div>
  );
};

export default SellOldTractorFormContainer;
