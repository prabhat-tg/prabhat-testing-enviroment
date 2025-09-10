// ============ Used At ============
// 1. /
// 2. /compare-tractors
// =================================

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TG_SelectField from '../inputs/TG_SelectField';
// import TG_Button from '../buttons/MainButtons';
// import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorModelsByBrand } from '@/src/services/tractor/get-model-by-brand-v2';
import TG_LinkButton from '../buttons/TgLinkButton';

const CompareTractorSelectionCard = ({
  isSelected = false, // TODO:: This seleection will be based on user inputs
  viewMode = false,
  allowChange = false,
  cardIndex = 0,
  onTractorSelect,
  selectedTractor = null,
  onPlaceholderClick,
  currentLang,
  brands
}) => {
  // const [brands, setBrands] = useState([]);
  console.log("selectedTractor::", selectedTractor);

  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const brandSelectRef = useRef(null);

  // Load brands on component mount
  // useEffect(() => {
  //   loadBrands();
  // }, []);

  // Sync local state when selectedTractor prop changes
  useEffect(() => {
    if (selectedTractor && selectedTractor.brand && selectedTractor.model) {
      // Don't update local state if user has made their own selections
      if (!selectedBrand && !selectedModel) {
        setSelectedBrand(selectedTractor.brand);
        setSelectedModel(selectedTractor.model);
        // Load models for the brand if not already loaded
        if (selectedTractor.brand && models.length === 0) {
          loadModels(selectedTractor.brand);
        }
      }
    } else if (!selectedTractor) {
      // Clear local state when selectedTractor is removed
      setSelectedBrand('');
      setSelectedModel('');
      setModels([]);
    }
  }, [selectedTractor, selectedBrand, selectedModel, models.length]);

  // Reset models when brand changes
  useEffect(() => {
    if (selectedBrand) {
      loadModels(selectedBrand);
      setSelectedModel('');
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedBrand]);

  // Notify parent when tractor is fully selected
  useEffect(() => {
    // Only trigger onTractorSelect if user has actively made selections
    // Don't interfere with prop-based selectedTractor
    if (selectedBrand && selectedModel) {
      const selectedTractorData = models.find(model => model.model === selectedModel);
      if (selectedTractorData && onTractorSelect) {
        onTractorSelect(cardIndex, selectedTractorData);
        console.log('onTractorSelect::', cardIndex, selectedTractorData);
      }
    } else if (selectedBrand || selectedModel) {
      // Only reset to null if user has started making selections but hasn't completed them
      // Don't interfere if we have a selectedTractor from props and user hasn't started selecting
      if (onTractorSelect && !selectedTractor) {
        onTractorSelect(cardIndex, null);
      }
    }
  }, [selectedBrand, selectedModel, models, cardIndex, selectedTractor]);

  // const loadBrands = async () => {
  //   try {
  //     setIsLoadingBrands(true);
  //     const brandsData = await getTractorBrands();
  //     setBrands(brandsData || []);
  //   } catch (error) {
  //     console.error('Error loading brands:', error);
  //   } finally {
  //     setIsLoadingBrands(false);
  //   }
  // };

  const loadModels = async brandName => {
    try {
      setIsLoadingModels(true);
      const modelsData = await getTractorModelsByBrand(brandName);
      setModels(modelsData || []);
    } catch (error) {
      console.error('Error loading models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleBrandChange = e => {
    setSelectedBrand(e.target.value);
  };

  const handleModelChange = e => {
    setSelectedModel(e.target.value);
    console.log('model changed...', selectedTractor);
  };

  const handlePlaceholderClick = () => {
    openBrandDropdown();
  };

  const handleTractorClick = () => {
    // Open brand dropdown when tractor is clicked
    openBrandDropdown();
  };

  const openBrandDropdown = () => {
    if (brandSelectRef.current) {
      // Try different methods to open the dropdown
      try {
        // Method 1: Use showPicker if available (modern browsers)
        if (brandSelectRef.current.showPicker) {
          brandSelectRef.current.showPicker();
        } else {
          // Method 2: Focus and simulate user interaction
          brandSelectRef.current.focus();

          // Method 3: Create and dispatch a mouse event
          const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          brandSelectRef.current.dispatchEvent(event);
        }
      } catch (error) {
        console.log('Error opening dropdown:', error);
        // Fallback: just focus
        brandSelectRef.current.focus();
      }
    }
  };

  const getImageSrc = () => {
    if (selectedTractor?.image) {
      return `https://images.tractorgyan.com/uploads${selectedTractor.image}`;
    }
    return 'https://images.tractorgyan.com/uploads/120278/1753707917Add-Tractor-Icon.webp';
  };

  // ====
  // :: Hanlde card selected value when clicking on Change Tractor button
  const handleChangeTractor = () => {
    console.log('clicked...');
    onTractorSelect(cardIndex, null);
    setSelectedBrand('');
    setSelectedModel('');
    setModels([]);
  };

  const ChangeBtnGroup = ({ disabled = false, onRemove }) => {
    return (
      <div
        onClick={onRemove}
        className="absolute right-1 top-2 flex w-full flex-row-reverse items-center justify-between gap-2 px-2 md:right-0 md:top-4 md:flex-row md:justify-end md:px-0 md:pr-3">
        <button>
          <Image
            src="https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp"
            height={40}
            width={40}
            alt="Remove Tractor Icon"
            title="Remove Tractor Icon"
            className="h-4 w-4 md:h-5 md:w-5"
          />
        </button>
        <button
          className={`${disabled ? 'text-gray-light' : 'text-gray-main hover:text-black'} border-b text-xs md:text-sm`}
        >
          Change Tractor
        </button>
      </div>
    );
  };

  // const hasSelectedTractor = selectedTractor && selectedBrand && selectedModel;
  const hasSelectedTractor = selectedTractor;
  return (
    <div className="flex flex-col gap-4">
      {/* If No Tractor Selected */}
      {!hasSelectedTractor ? (
        <div
          className={`${viewMode ? '' : 'shadow-main'} flex flex-col items-center rounded-xl p-4 py-5 md:p-20`}
        >
          <div
            className="flex w-full max-w-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-light p-2"
            onClick={handlePlaceholderClick}
          >
            {/* TODO:: Replace Icon */}
            <Image
              src="https://images.tractorgyan.com/uploads/120278/1753707917Add-Tractor-Icon.webp"
              height={40}
              width={40}
              alt="Add Tractor Icon"
              title="Add Tractor Icon"
              className="h-auto w-full max-w-[72px] p-4"
            />
            <span className="md:text-md mb-2 text-center text-xs font-semibold">Add Tractor</span>
          </div>
        </div>
      ) : (
        /* If Tractor Selected */
        <div
          className={`${viewMode ? '' : 'shadow-main'} flex w-full flex-col items-center justify-center rounded-xl p-2 md:p-4`}
        >
          {/* <div className='absolute left-4 top-4'>Change</div> */}
          {allowChange && (
            <ChangeBtnGroup onRemove={() => handleChangeTractor()} />
          )}
          <div
            className={`${viewMode ? '' : 'border'} flex w-full flex-col items-center justify-center rounded-xl border-gray-light p-2 ${!viewMode ? 'cursor-pointer' : ''}`}
            onClick={handleTractorClick}
          >
            <Image
              src={getImageSrc()}
              height={228}
              width={140}
              alt="Tractor Image"
              title="Tractor Image"
              className={`${allowChange ? 'pt-6 md:p-4' : 'md:p-4'} h-auto max-h-[172px] w-full object-contain`}
            />
            <span
              className="md:text-md mb-2 w-full overflow-hidden text-ellipsis text-nowrap px-2 text-center text-sm font-semibold"
              title={selectedTractor?.model || 'Tractor Model'}
            >
              {selectedTractor?.model || 'Tractor Model'}
            </span>
            {!viewMode && (
              <div className="md:text-md mb-2 flex gap-1 text-center text-xs">
                <span>HP :</span>
                <span className="font-semibold">{selectedTractor?.hp || 'N/A'}</span>
              </div>
            )}
            {viewMode && (
              <div className="mt-2 flex">
                <div className="md:text-md mb-2 flex flex-col gap-1 border-r border-primary px-4 text-center text-xs">
                  <span className="text-gray-dark">HP</span>
                  <span className="text-sm font-semibold">{selectedTractor?.hp || 'N/A'}</span>
                </div>
                <div className="md:text-md mb-2 flex flex-col gap-1 border-primary px-4 text-center text-xs md:border-r">
                  <span className="text-gray-dark">Cylinder</span>
                  <span className="text-sm font-semibold">
                    {selectedTractor?.cylinder || 'N/A'}
                  </span>
                </div>
                <div className="md:text-md mb-2 hidden flex-col gap-1 px-4 text-center text-xs md:flex">
                  <span className="text-gray-dark">Capacity</span>
                  <span className="text-sm font-semibold">
                    {selectedTractor?.lifting_capacity || 'N/A'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {(!viewMode || !selectedTractor) && (
        // {!viewMode && (
        <div className='min-w-[80px] md:min-w-[280px] max-w-[300px] mx-auto mb-4'>
          <div className="mt-2">
            <TG_SelectField
              ref={brandSelectRef}
              id={`brand-${cardIndex}`}
              value={selectedBrand}
              onChange={handleBrandChange}
              options={brands}
              optionLabelKey="name"
              optionValueKey="name"
              placeholder="Select Brand"
              fallback={isLoadingBrands ? 'Loading brands...' : 'No brands available'}
              additionalClasses="border-green-main"
            />
          </div>
          <div className="mt-2">
            <TG_SelectField
              id={`model-${cardIndex}`}
              value={selectedModel}
              onChange={handleModelChange}
              options={models}
              optionLabelKey="model"
              optionValueKey="model"
              placeholder="Select Model"
              fallback={
                isLoadingModels
                  ? 'Loading models...'
                  : selectedBrand
                    ? 'No models available'
                    : 'Select brand first'
              }
              additionalClasses="border-green-main"
              disabled={!selectedBrand}
            />
          </div>
        </div>
      )}
      {/* TODO:: When this button is shown, the compare tractor button will not be shown in the section cta */}
      {viewMode && selectedTractor && (
        <div className="mb-4 flex w-full justify-center">
          {selectedTractor.brand_name_en && selectedTractor.model ? (
            <TG_LinkButton className='border-primary text-primary rounded-lg' href={`${currentLang == 'hi' ? '/hi' : ''}/${((selectedTractor.brand_name_en).replaceAll(' ', '-')).toLowerCase()}-${((selectedTractor.model).replaceAll(' ', '-')).toLowerCase()}/tractor-on-road-price/${selectedTractor.id}`}>
              ₹ Check Price
            </TG_LinkButton>
          ) : (
            <TG_LinkButton className='border-primary text-primary rounded-lg'>
              ₹ Check Price
            </TG_LinkButton>
          )}
        </div>
      )}
    </div>
  );
};

export default CompareTractorSelectionCard;

// Usage Example
