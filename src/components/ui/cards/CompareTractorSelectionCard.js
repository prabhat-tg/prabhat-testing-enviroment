'use client';

// ============ Used At ============
// 1. /
// 2. /compare-tractors
// =================================
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TG_SelectField from '../inputs/TG_SelectField';
import TG_Button from '../buttons/MainButtons';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorModelsByBrand } from '@/src/services/tractor/get-model-by-brand-v2';

const CompareTractorSelectionCard = ({
  className,
  isSelected = false, // TODO:: This seleection will be based on user inputs
  viewMode = false,
  allowChange = false,
  cardIndex = 0,
  onTractorSelect,
  selectedTractor = null,
  onPlaceholderClick,
}) => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const brandSelectRef = useRef(null);

  // Load brands on component mount
  useEffect(() => {
    loadBrands();
  }, []);

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
    if (selectedBrand && selectedModel) {
      const selectedTractorData = models.find(model => model.model === selectedModel);
      if (selectedTractorData && onTractorSelect) {
        onTractorSelect(cardIndex, selectedTractorData);
      }
    } else if (onTractorSelect) {
      onTractorSelect(cardIndex, null);
    }
  }, [selectedBrand, selectedModel, models, cardIndex]);

  const loadBrands = async () => {
    try {
      setIsLoadingBrands(true);
      const brandsData = await getTractorBrands();
      setBrands(brandsData || []);
    } catch (error) {
      console.error('Error loading brands:', error);
    } finally {
      setIsLoadingBrands(false);
    }
  };

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

  const hasSelectedTractor = selectedTractor && selectedBrand && selectedModel;
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

      {!viewMode && (
        <>
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
          <div>
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
        </>
      )}
      {/* TODO:: When this button is shown, the compare tractor button will not be shown in the section cta */}
      {viewMode && (
        <div className="mt-2 flex w-full justify-center">
          <TG_Button variant="outline">₹ Check Price</TG_Button>
        </div>
      )}
    </div>
  );
};

export default CompareTractorSelectionCard;

// Usage Example
