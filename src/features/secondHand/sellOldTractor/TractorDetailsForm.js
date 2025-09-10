'use client';
import React, { useEffect, useState } from 'react';

import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import TG_SelectField from '@/src/components/ui/inputs/TG_SelectField';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import StepperHeader from '@/src/components/second-hand/StepperHeader';

import { submitSellOldTractorForm } from '@/src/services/second-hand-tractors/sell-old-tractor';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorModelsByBrand } from '@/src/services/tractor/get-tractor-models-by-brand';

import { tgi_arrow_right_green, tgi_arrow_right_white } from '@/src/utils/assets/icons';

const TractorDetailsForm = ({
  isMobile,
  translation,
  currentLang,
  formData,
  formId,
  onStepComplete,
  onStepBack,
}) => {
  // Form state
  const [tractorBrands, setTractorBrands] = useState([]);
  const [tractorModels, setTractorModels] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form fields
  const [selectedBrand, setSelectedBrand] = useState(formData.manufacture || '');
  const [selectedModel, setSelectedModel] = useState(formData.model || '');
  const [manufactureYear, setManufactureYear] = useState(formData.manufacture_year || '');
  const [yearOfPurchase, setYearOfPurchase] = useState(formData.year_of_purchase || '');
  const [condition, setCondition] = useState(formData.condition || '');
  const [rtoNumber, setRtoNumber] = useState(formData.rto_number || '');
  const [engineNumber, setEngineNumber] = useState(formData.engine_number || '');
  const [tyreCondition, setTyreCondition] = useState(formData.tyre_condition || '');
  const [rcAvailable, setRcAvailable] = useState(formData.rc_available || '');
  const [hour, setHour] = useState(formData.hour || '');
  const [price, setPrice] = useState(formData.price || '');

  // Generate year options (last 50 years)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 50; year--) {
      years.push({ label: year.toString(), value: year.toString() });
    }
    return years;
  };

  // Condition options
  const conditionOptions = [
    { label: currentLang === 'hi' ? 'उत्कृष्ट' : 'Excellent', value: 'Excellent' },
    { label: currentLang === 'hi' ? 'अच्छा' : 'Good', value: 'Good' },
    { label: currentLang === 'hi' ? 'औसत' : 'Average', value: 'Average' },
    { label: currentLang === 'hi' ? 'खराब' : 'Poor', value: 'Poor' },
  ];

  // Tyre condition options
  const tyreConditionOptions = [
    { label: currentLang === 'hi' ? 'बेहतर' : 'Better', value: 'Better' },
    { label: currentLang === 'hi' ? 'अच्छा' : 'Good', value: 'Good' },
    { label: currentLang === 'hi' ? 'औसत' : 'Average', value: 'Average' },
    { label: currentLang === 'hi' ? 'खराब' : 'Poor', value: 'Poor' },
  ];

  // RC availability options
  const rcOptions = [
    { label: currentLang === 'hi' ? 'हाँ' : 'Yes', value: 'yes' },
    { label: currentLang === 'hi' ? 'नहीं' : 'No', value: 'no' },
  ];

  // Running hours options
  const hourOptions = [
    { label: '0-1000', value: '0-1000' },
    { label: '1000-2000', value: '1000-2000' },
    { label: '2000-3000', value: '2000-3000' },
    { label: '3000-4000', value: '3000-4000' },
    { label: '4000+', value: '4000+' },
  ];

  // Fetch tractor brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getTractorBrands(currentLang);
        setTractorBrands(data || []);
      } catch (error) {
        console.error('Error fetching tractor brands:', error);
        setError(currentLang === 'hi' ? 'ब्रांड लोड करने में समस्या' : 'Error loading brands');
      }
    };
    fetchBrands();
  }, [currentLang]);

  // Fetch tractor models when brand is selected
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) {
        setTractorModels([]);
        return;
      }
      try {
        const data = await getTractorModelsByBrand(selectedBrand);
        setTractorModels(data || []);
      } catch (error) {
        console.error('Error fetching tractor models:', error);
        setError(currentLang === 'hi' ? 'मॉडल लोड करने में समस्या' : 'Error loading models');
      }
    };
    fetchModels();
  }, [selectedBrand, currentLang]);

  const validateForm = () => {
    const errors = {};

    if (!selectedBrand) {
      errors.selectedBrand = currentLang === 'hi' ? 'ब्रांड चुनना आवश्यक है' : 'Brand is required';
    }

    if (!selectedModel) {
      errors.selectedModel = currentLang === 'hi' ? 'मॉडल चुनना आवश्यक है' : 'Model is required';
    }

    if (!manufactureYear) {
      errors.manufactureYear =
        currentLang === 'hi' ? 'निर्माण वर्ष आवश्यक है' : 'Manufacturing year is required';
    }

    if (!yearOfPurchase) {
      errors.yearOfPurchase =
        currentLang === 'hi' ? 'खरीद का वर्ष आवश्यक है' : 'Year of purchase is required';
    }

    if (!condition) {
      errors.condition = currentLang === 'hi' ? 'स्थिति चुनना आवश्यक है' : 'Condition is required';
    }

    if (!rtoNumber.trim()) {
      errors.rtoNumber = currentLang === 'hi' ? 'आरटीओ नंबर आवश्यक है' : 'RTO number is required';
    }

    if (!tyreCondition) {
      errors.tyreCondition =
        currentLang === 'hi' ? 'टायर की स्थिति आवश्यक है' : 'Tyre condition is required';
    }

    if (!rcAvailable) {
      errors.rcAvailable =
        currentLang === 'hi' ? 'आरसी उपलब्धता आवश्यक है' : 'RC availability is required';
    }

    if (!hour) {
      errors.hour = currentLang === 'hi' ? 'चालन घंटे आवश्यक है' : 'Running hours is required';
    }

    if (!price.trim()) {
      errors.price = currentLang === 'hi' ? 'कीमत आवश्यक है' : 'Price is required';
    } else if (!/^\d+$/.test(price)) {
      errors.price = currentLang === 'hi' ? 'वैध कीमत दर्ज करें' : 'Enter valid price';
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
      id: formId,
      manufacture: selectedBrand,
      model: selectedModel,
      manufacture_year: manufactureYear,
      year_of_purchase: yearOfPurchase,
      condition: condition,
      rto_number: rtoNumber.trim(),
      engine_number: engineNumber.trim() || 'none',
      tyre_condition: tyreCondition,
      rc_available: rcAvailable,
      hour: hour,
      price: price.trim(),
      form_step: 2,
    };

    try {
      const result = await submitSellOldTractorForm(payload);

      if (result.success) {
        const stepData = {
          manufacture: selectedBrand,
          model: selectedModel,
          manufacture_year: manufactureYear,
          year_of_purchase: yearOfPurchase,
          condition: condition,
          rto_number: rtoNumber.trim(),
          engine_number: engineNumber.trim(),
          tyre_condition: tyreCondition,
          rc_available: rcAvailable,
          hour: hour,
          price: price.trim(),
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
          currentStep={2}
          totalSteps={3}
          heading={currentLang === 'hi' ? 'ट्रैक्टर विवरण' : 'Tractor Details'}
          description={
            currentLang === 'hi'
              ? 'कृपया अपने पुराने ट्रैक्टर का विवरण भरें ताकि हम आपको संभावित खरीदार खोजने में मदद कर सकें।'
              : 'Please enter your second hand tractor details to help us find you potential buyers'
          }
        />
        <div className="p-4">
          {error && (
            <div className="bg-red-100 border-red-300 text-red-700 mb-4 rounded border p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-12 gap-x-4 gap-y-2">
            {/* Tractor Brand */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectBrand"
                label={currentLang === 'hi' ? 'निर्माता चुनें' : 'Select Manufacturer'}
                value={selectedBrand}
                onChange={e => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel('');
                  setFormErrors({ ...formErrors, selectedBrand: '', selectedModel: '' });
                }}
                options={tractorBrands.map(brand => ({
                  label: brand.name,
                  value: brand.name,
                }))}
                placeholder={currentLang === 'hi' ? 'निर्माता चुनें' : 'Select Manufacturer'}
                required
                error={formErrors.selectedBrand}
              />
            </div>

            {/* Tractor Model */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectModel"
                label={currentLang === 'hi' ? 'मॉडल चुनें' : 'Select Model'}
                value={selectedModel}
                onChange={e => {
                  setSelectedModel(e.target.value);
                  setFormErrors({ ...formErrors, selectedModel: '' });
                }}
                options={tractorModels.map(model => ({
                  label: model.model,
                  value: model.model,
                }))}
                placeholder={currentLang === 'hi' ? 'मॉडल चुनें' : 'Select Model'}
                required
                disabled={!selectedBrand}
                error={formErrors.selectedModel}
              />
            </div>

            {/* Manufacturing Year */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectManufactureYear"
                label={currentLang === 'hi' ? 'निर्माण वर्ष' : 'Manufacturing Year'}
                value={manufactureYear}
                onChange={e => {
                  setManufactureYear(e.target.value);
                  setFormErrors({ ...formErrors, manufactureYear: '' });
                }}
                options={generateYearOptions()}
                placeholder={currentLang === 'hi' ? 'वर्ष चुनें' : 'Select Year'}
                required
                error={formErrors.manufactureYear}
              />
            </div>

            {/* Year of Purchase */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectPurchaseYear"
                label={currentLang === 'hi' ? 'खरीद का वर्ष' : 'Purchasing Year'}
                value={yearOfPurchase}
                onChange={e => {
                  setYearOfPurchase(e.target.value);
                  setFormErrors({ ...formErrors, yearOfPurchase: '' });
                }}
                options={generateYearOptions()}
                placeholder={currentLang === 'hi' ? 'वर्ष चुनें' : 'Select Year'}
                required
                error={formErrors.yearOfPurchase}
              />
            </div>

            {/* Tractor Condition */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectCondition"
                label={currentLang === 'hi' ? 'ट्रैक्टर की स्थिति' : 'Tractor Condition'}
                value={condition}
                onChange={e => {
                  setCondition(e.target.value);
                  setFormErrors({ ...formErrors, condition: '' });
                }}
                options={conditionOptions}
                placeholder={currentLang === 'hi' ? 'स्थिति चुनें' : 'Select Condition'}
                required
                error={formErrors.condition}
              />
            </div>

            {/* Tyre Condition */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectTyreCondition"
                label={currentLang === 'hi' ? 'टायर की स्थिति' : 'Tyre Condition'}
                value={tyreCondition}
                onChange={e => {
                  setTyreCondition(e.target.value);
                  setFormErrors({ ...formErrors, tyreCondition: '' });
                }}
                options={tyreConditionOptions}
                placeholder={currentLang === 'hi' ? 'स्थिति चुनें' : 'Select Condition'}
                required
                error={formErrors.tyreCondition}
              />
            </div>

            {/* Running Hours */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectHours"
                label={currentLang === 'hi' ? 'चालन घंटे' : 'Running Hours'}
                value={hour}
                onChange={e => {
                  setHour(e.target.value);
                  setFormErrors({ ...formErrors, hour: '' });
                }}
                options={hourOptions}
                placeholder={currentLang === 'hi' ? 'घंटे चुनें' : 'Select Hours'}
                required
                error={formErrors.hour}
              />
            </div>

            {/* RC Available */}
            <div className="col-span-6">
              <TG_SelectField
                id="selectRc"
                label={currentLang === 'hi' ? 'आरसी उपलब्ध है?' : 'Is RC Available?'}
                value={rcAvailable}
                onChange={e => {
                  setRcAvailable(e.target.value);
                  setFormErrors({ ...formErrors, rcAvailable: '' });
                }}
                options={rcOptions}
                placeholder={
                  currentLang === 'hi' ? 'आरसी उपलब्धता चुनें' : 'Select RC Availability'
                }
                required
                error={formErrors.rcAvailable}
              />
            </div>

            {/* RTO Number */}
            <div className="col-span-12 md:col-span-6">
              <TG_InputField
                id="rtoNumber"
                type="text"
                value={rtoNumber}
                onChange={e => {
                  setRtoNumber(e.target.value);
                  setFormErrors({ ...formErrors, rtoNumber: '' });
                }}
                placeholder={
                  currentLang === 'hi'
                    ? 'आरटीओ नंबर दर्ज करें (MP04A**07)'
                    : 'Please enter your RTO number (MP04A**07)'
                }
                label={currentLang === 'hi' ? 'आरटीओ नंबर' : 'RTO Number'}
                required
                error={formErrors.rtoNumber}
              />
            </div>

            {/* Expected Price */}
            <div className="col-span-12 md:col-span-6">
              <TG_InputField
                id="expectedPrice"
                type="text"
                value={price}
                onChange={e => {
                  setPrice(e.target.value);
                  setFormErrors({ ...formErrors, price: '' });
                }}
                placeholder="350000"
                required
                label={currentLang === 'hi' ? 'अपेक्षित मूल्य' : 'Asking Price'}
                prefix="₹"
                error={formErrors.price}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-12 my-1 flex justify-center gap-8">
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
                    ? 'आगे'
                    : 'Next'}
              </TG_Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TractorDetailsForm;
