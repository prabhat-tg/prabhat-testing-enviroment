'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import TG_SelectField from '../inputs/TG_SelectField';
import TG_Button from '../buttons/MainButtons';
import {
  getCompareTractorBrands,
  getCompareTractorModels,
} from '@/src/services/tractor/compare-tractor-brands';

const EnhancedCompareTractorSelectionCard = ({
  className,
  isSelected = false,
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
  const [selectedModelData, setSelectedModelData] = useState(null);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const brandSelectRef = useRef(null);
  const isLoadingModelsRef = useRef(false);

  // Load brands on component mount
  useEffect(() => {
    loadBrands();
  }, []);

  // Handle brand change
  const handleBrandChange = e => {
    const newBrand = e.target.value;
    setSelectedBrand(newBrand);
    setSelectedModel('');
    setSelectedModelData(null);

    if (newBrand) {
      loadModels(newBrand);
    } else {
      setModels([]);
    }
  };

  // Notify parent when tractor is fully selected - memoized to prevent unnecessary re-renders
  const notifyParent = useCallback(
    tractorData => {
      if (onTractorSelect) {
        onTractorSelect(cardIndex, tractorData);
      }
    },
    [cardIndex, onTractorSelect]
  );

  useEffect(() => {
    if (selectedBrand && selectedModel && selectedModelData) {
      const tractorData = {
        ...selectedModelData,
        brand: selectedBrand,
        brand_name: selectedBrand,
        model: selectedModelData.name,
        page_url: `/tractor/${selectedBrand.toLowerCase().replace(/\s+/g, '-')}-${selectedModelData.name.toLowerCase().replace(/\s+/g, '-')}/${selectedModelData.id}`,
      };
      notifyParent(tractorData);
    } else {
      notifyParent(null);
    }
  }, [selectedBrand, selectedModel, selectedModelData, notifyParent]);

  const loadBrands = async () => {
    try {
      setIsLoadingBrands(true);
      const brandsData = await getCompareTractorBrands();
      setBrands(brandsData || []);
    } catch (error) {
      console.error('Error loading brands:', error);
    } finally {
      setIsLoadingBrands(false);
    }
  };

  const loadModels = async brandName => {
    if (isLoadingModelsRef.current) return; // Prevent multiple simultaneous loads

    try {
      isLoadingModelsRef.current = true;
      setIsLoadingModels(true);
      const modelsData = await getCompareTractorModels(brandName, '');
      setModels(modelsData || []);
    } catch (error) {
      console.error('Error loading models:', error);
    } finally {
      setIsLoadingModels(false);
      isLoadingModelsRef.current = false;
    }
  };

  const handleModelChange = e => {
    const selectedModelValue = e.target.value;
    setSelectedModel(selectedModelValue);

    // Directly update model data to prevent useEffect loops
    if (selectedModelValue && models.length > 0) {
      const modelData = models.find(model => model.model === selectedModelValue);
      setSelectedModelData(modelData || null);
    } else {
      setSelectedModelData(null);
    }
  };

  const handlePlaceholderClick = () => {
    openBrandDropdown();
  };

  const handleTractorClick = () => {
    if (!viewMode) {
      openBrandDropdown();
    }
  };

  const openBrandDropdown = () => {
    if (brandSelectRef.current) {
      try {
        if (brandSelectRef.current.showPicker) {
          brandSelectRef.current.showPicker();
        } else {
          brandSelectRef.current.focus();
          const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          brandSelectRef.current.dispatchEvent(event);
        }
      } catch (error) {
        console.log('Error opening dropdown:', error);
        brandSelectRef.current.focus();
      }
    }
  };

  const getImageSrc = () => {
    if (selectedModelData?.image) {
      return `https://images.tractorgyan.com/uploads${selectedModelData.image}`;
    }
    if (selectedTractor?.image) {
      return `https://images.tractorgyan.com/uploads${selectedTractor.image}`;
    }
    return 'https://images.tractorgyan.com/uploads/120278/1753707917Add-Tractor-Icon.webp';
  };

  const getDisplayName = () => {
    if (selectedModelData?.name) {
      return `${selectedBrand} ${selectedModelData.name}`;
    }
    if (selectedTractor?.model) {
      return `${selectedTractor.brand} ${selectedTractor.model}`;
    }
    return 'Add Tractor';
  };

  const hasSelectedTractor =
    (selectedBrand && selectedModel && selectedModelData) || selectedTractor;

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
              title={getDisplayName()}
            >
              {getDisplayName()}
            </span>
            {!viewMode && (
              <div className="md:text-md mb-2 flex gap-1 text-center text-xs">
                <span>HP :</span>
                <span className="font-semibold">
                  {selectedTractor?.hp || selectedModelData?.hp || 'N/A'}
                </span>
              </div>
            )}
            {viewMode && (
              <div className="mt-2 flex">
                <div className="md:text-md mb-2 flex flex-col gap-1 border-r border-primary px-4 text-center text-xs">
                  <span className="text-gray-dark">HP</span>
                  <span className="text-sm font-semibold">
                    {selectedTractor?.hp || selectedModelData?.hp || 'N/A'}
                  </span>
                </div>
                <div className="md:text-md mb-2 flex flex-col gap-1 border-primary px-4 text-center text-xs md:border-r">
                  <span className="text-gray-dark">Cylinder</span>
                  <span className="text-sm font-semibold">
                    {selectedTractor?.cylinder || selectedModelData?.cylinder || 'N/A'}
                  </span>
                </div>
                <div className="md:text-md mb-2 hidden flex-col gap-1 px-4 text-center text-xs md:flex">
                  <span className="text-gray-dark">Capacity</span>
                  <span className="text-sm font-semibold">
                    {selectedTractor?.lifting_capacity ||
                      selectedModelData?.lifting_capacity ||
                      'N/A'}
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
              optionLabelKey="name"
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
      {viewMode && (
        <div className="mt-2 flex w-full justify-center">
          <TG_Button variant="outline">₹ Check Price</TG_Button>
        </div>
      )}
    </div>
  );
};

export default EnhancedCompareTractorSelectionCard;
