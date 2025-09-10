'use client';
import React, { useEffect, useState } from 'react';

import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import TG_SelectField from '@/src/components/ui/inputs/TG_SelectField';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import StepperHeader from '@/src/components/second-hand/StepperHeader';

import { submitSellOldTractorForm } from '@/src/services/second-hand-tractors/sell-old-tractor';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';

import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const PersonalDetailsForm = ({ isMobile, translation, currentLang, formData, onStepComplete }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form fields
  const [name, setName] = useState(formData.name || '');
  const [mobile, setMobile] = useState(formData.mobile || '');
  const [selectedState, setSelectedState] = useState(formData.state || '');
  const [selectedDistrict, setSelectedDistrict] = useState(formData.district || '');
  const [selectedTehsil, setSelectedTehsil] = useState(formData.tahsil || '');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getAllStates();
        setStates(data || []);
      } catch (error) {
        console.error('Error fetching states:', error);
        setError(currentLang === 'hi' ? 'राज्य लोड करने में समस्या' : 'Error loading states');
      }
    };
    fetchStates();
  }, [currentLang]);

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

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = currentLang === 'hi' ? 'नाम आवश्यक है' : 'Name is required';
    }

    if (!mobile.trim()) {
      errors.mobile = currentLang === 'hi' ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      errors.mobile =
        currentLang === 'hi' ? 'वैध मोबाइल नंबर दर्ज करें' : 'Enter valid mobile number';
    }

    if (!selectedState) {
      errors.selectedState = currentLang === 'hi' ? 'राज्य चुनना आवश्यक है' : 'State is required';
    }

    if (!selectedDistrict) {
      errors.selectedDistrict =
        currentLang === 'hi' ? 'जिला चुनना आवश्यक है' : 'District is required';
    }

    if (!selectedTehsil) {
      errors.selectedTehsil = currentLang === 'hi' ? 'तहसील चुनना आवश्यक है' : 'Tehsil is required';
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

    const payload = {
      name: name.trim(),
      mobile: mobile.trim(),
      state: selectedState,
      district: selectedDistrict,
      tahsil: selectedTehsil,
      form_step: 1,
    };

    try {
      const result = await submitSellOldTractorForm(payload);

      if (result.success && result.id) {
        const stepData = {
          name: name.trim(),
          mobile: mobile.trim(),
          state: selectedState,
          district: selectedDistrict,
          tahsil: selectedTehsil,
        };

        onStepComplete(stepData, result.id);
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
          currentStep={1}
          totalSteps={3}
          heading={currentLang === 'hi' ? 'व्यक्तिगत विवरण' : 'Personal Details'}
          description={
            currentLang === 'hi'
              ? 'कृपया अपना व्यक्तिगत विवरण भरें और आगे बढ़ें।'
              : 'Please fill in your personal details to proceed further.'
          }
        />
        <div className="p-4">
          <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-12 gap-x-4 gap-y-2">
            <div className="col-span-12 md:col-span-6">
              <TG_InputField
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={currentLang === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                label={currentLang === 'hi' ? 'नाम' : 'Name'}
                required
                error={formErrors.name}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <TG_InputField
                name="mobile"
                id="userMobile"
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder="xxxxxxxxxx"
                required
                maxLength={10}
                label={currentLang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                prefix="+91"
                error={formErrors.mobile}
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <TG_SelectField
                id="selectState"
                label={currentLang === 'hi' ? 'राज्य चुनें' : 'Select State'}
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                options={states.map(state => ({
                  label: state.state,
                  value: state.state,
                }))}
                placeholder={currentLang === 'hi' ? 'राज्य चुनें' : 'Select State'}
                required
                error={formErrors.selectedState}
              />
            </div>

            <div className="col-span-6 md:col-span-4">
              <TG_SelectField
                id="selectDistrict"
                label={currentLang === 'hi' ? 'जिला चुनें' : 'Select District'}
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                options={districts.map(district => ({
                  label: district.district,
                  value: district.district,
                }))}
                placeholder={currentLang === 'hi' ? 'जिला चुनें' : 'Select District'}
                required
                disabled={!selectedState}
                error={formErrors.selectedDistrict}
              />
            </div>

            <div className="col-span-6 md:col-span-4">
              <TG_SelectField
                id="selectTehsil"
                label={currentLang === 'hi' ? 'तहसील चुनें' : 'Select Tehsil'}
                value={selectedTehsil}
                onChange={e => setSelectedTehsil(e.target.value)}
                options={tehsils.map(tehsil => ({
                  label: tehsil.tehsil,
                  value: tehsil.tehsil,
                }))}
                placeholder={currentLang === 'hi' ? 'तहसील चुनें' : 'Select Tehsil'}
                required
                disabled={!selectedDistrict}
                error={formErrors.selectedTehsil}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-12 my-1 flex justify-center">
              <TG_Button
                type="submit"
                icon={tgi_arrow_right_white}
                iconPosition="right"
                className="min-w-[132px] md:min-w-[140px]"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? currentLang === 'hi'
                    ? 'भेजा जा रहा है...'
                    : 'Submitting...'
                  : currentLang === 'hi'
                    ? 'अगला'
                    : 'Next'}
              </TG_Button>
            </div>

            {error && (
              <div className="col-span-12">
                <p className="text-red-500 text-center text-sm">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalDetailsForm;
