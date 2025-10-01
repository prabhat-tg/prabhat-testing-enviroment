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
import { getAllModelByBrand, getTractorModelsByBrand } from '@/src/services/tractor/get-model-by-brand-v2';
import { fetchSecondOptionToCompare } from '@/src/services/tractor/get-compare-tractors-list';
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
  brands,
  showCheckPrice = true,
  onSecondOptionSuggestion, // New callback for second option suggestion
  translation = {}, // Add translation prop
  isCompact = false
}) => {
  // const [brands, setBrands] = useState([]);

  // console.log("selectedTractor::", selectedTractor);

  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isLoadingSecondOption, setIsLoadingSecondOption] = useState(false);
  const [isUpdatingFromParent, setIsUpdatingFromParent] = useState(false);
  const brandSelectRef = useRef(null);

  // Load brands on component mount
  // useEffect(() => {
  //   loadBrands();
  // }, []);

  // Sync local state when selectedTractor prop changes
  useEffect(() => {
    if (selectedTractor && selectedTractor.brand && selectedTractor.model) {
      // Set flag to indicate we're updating from parent
      setIsUpdatingFromParent(true);

      // Update local state when selectedTractor changes (e.g., from parent suggestion)
      setSelectedBrand(selectedTractor.brand);
      setSelectedModel(selectedTractor.model);

      // Load models for the brand if not already loaded
      if (selectedTractor.brand && models.length === 0) {
        console.log("HERE LOAD MODEL");

        loadModels(selectedTractor.brand);
      }

      // Reset flag after a brief delay
      setTimeout(() => setIsUpdatingFromParent(false), 100);
    } else if (!selectedTractor) {
      // Clear local state when selectedTractor is removed
      setSelectedBrand('');
      setSelectedModel('');
      setModels([]);
      setIsUpdatingFromParent(false);
    }
  }, [selectedTractor]); // Add selectedTractor as dependency

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
    // Skip if we're updating from parent to avoid infinite loops
    if (isUpdatingFromParent) return;

    // Only trigger onTractorSelect if user has actively made selections
    if (selectedBrand && selectedModel) {
      const selectedTractorData = models.find(model => model.model === selectedModel);
      if (selectedTractorData && onTractorSelect) {
        onTractorSelect(cardIndex, selectedTractorData);
        console.log('onTractorSelect::', cardIndex, selectedTractorData);

        // If this is the first tractor card and we have a valid tractor ID,
        // fetch second option suggestion
        if (cardIndex === 0 && selectedTractorData.id) {
          fetchAndSuggestSecondOption(selectedTractorData.id);
        }
      }
    } else if (selectedBrand || selectedModel) {
      // Only reset to null if user has started making selections but hasn't completed them
      // Don't interfere if we have a selectedTractor from props and user hasn't started selecting
      if (onTractorSelect && !selectedTractor) {
        onTractorSelect(cardIndex, null);
      }
    }
  }, [selectedBrand, selectedModel, models, cardIndex, selectedTractor, isUpdatingFromParent]);

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
      const modelsData = await getAllModelByBrand({
        brand_name: brandName,
        lang: "en",
      });
      setModels(modelsData || []);
    } catch (error) {
      console.error('Error loading models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const fetchAndSuggestSecondOption = async (tractorId) => {
    if (!onSecondOptionSuggestion) return;

    try {
      setIsLoadingSecondOption(true);
      const response = await fetchSecondOptionToCompare(tractorId);

      if (response && response.success && response.code === 200) {
        // Find matching tractor from models based on the suggestion
        const suggestedModel = response.model;
        const suggestedBrand = response.brand?.[0];

        if (suggestedModel && suggestedBrand) {
          // Load models for the suggested brand to get complete tractor data
          const modelsData = await getAllModelByBrand({
            brand_name: suggestedBrand.name,
            lang: "en",
          });

          // Find the matching model in the models data
          const matchingTractor = modelsData?.find(model =>
            model.id === suggestedModel.product_id ||
            model.model === suggestedModel.model
          );

          if (matchingTractor) {
            // Enhance the matching tractor with additional info from suggestion
            const enhancedTractor = {
              ...matchingTractor,
              brand: suggestedBrand.name,
              brand_name_en: suggestedBrand.name_en || suggestedBrand.name,
              // Use original API data but fallback to suggestion if needed
              hp: matchingTractor.hp || suggestedModel.hp,
              model: matchingTractor.model || suggestedModel.model,
            };

            // Call parent callback with the suggested tractor
            onSecondOptionSuggestion(enhancedTractor, response);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching second option to compare:', error);
    } finally {
      setIsLoadingSecondOption(false);
    }
  };

  const handleBrandChange = e => {
    console.log('brand changed...', e.target.value, brands);
    setSelectedBrand(e.target.value);
  };

  const handleModelChange = e => {
    setSelectedModel(e.target.value);
    console.log('model changed...', e.target.value, selectedTractor);

    // If this is the first tractor (cardIndex === 0) and a model is selected,
    // fetch second option suggestion
    if (cardIndex === 0 && e.target.value) {
      const selectedTractorData = models.find(model => model.model === e.target.value);
      if (selectedTractorData?.id) {
        fetchAndSuggestSecondOption(selectedTractorData.id);
      }
    }
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
      const imagePath = selectedTractor.image.startsWith('/') ? selectedTractor.image : `/${selectedTractor.image}`;
      return `https://images.tractorgyan.com/uploads${imagePath}`;
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
        className={`${isCompact ? 'right-0 px-1 gap-0 md:gap-2' : 'right-1 px-2 gap-2'} absolute top-2 flex w-full flex-row-reverse items-center justify-between md:right-0 md:top-4 md:flex-row md:justify-end md:px-0 md:pr-3`}>
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
          className={`${disabled ? 'text-gray-light' : 'text-gray-main hover:text-black'} ${isCompact ? 'text-[11px]' : 'text-xs'} border-b md:text-sm`}
        >
          <span className='block md:hidden'>{isCompact ? 'Change Tractor' : 'Change Tractor'}</span>
          <span className='hidden md:block'>Change Tractor</span>
        </button>
      </div>
    );
  };

  // const hasSelectedTractor = selectedTractor && selectedBrand && selectedModel;
  const hasSelectedTractor = selectedTractor;
  return (
    <div className={`${isCompact ? 'gap-2 md:gap-4' : 'gap-4'} flex flex-col`}>
      {/* If No Tractor Selected */}
      {!hasSelectedTractor ? (
        <div
          className={`${viewMode ? '' : 'shadow-main'} ${isCompact ? 'p-2 py-2' : 'p-4 py-5'} flex flex-col items-center rounded-xl md:p-20`}
        >
          <div
            className={`${isCompact ? 'p-2 py-4' : 'p-4 py-6'} flex w-full max-w-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-light`}
            onClick={handlePlaceholderClick}
          >
            {/* Tractor Icon with Logo */}
            <div className="relative mb-4">
              <Image
                src="https://images.tractorgyan.com/uploads/120278/1753707917Add-Tractor-Icon.webp"
                height={80}
                width={80}
                alt="Add Tractor Icon"
                title="Add Tractor Icon"
                className="h-auto w-full max-w-[80px]"
              />

            </div>
            <span className="mb-2 text-center text-sm md:text-lg font-semibold">
              {translation?.headerNavbar?.addTractor || 'Add Tractor'}
            </span>

          </div>
        </div>
      ) : (
        /* If Tractor Selected */
        <div
          className={`${viewMode ? '' : 'shadow-main'} flex w-full flex-col items-center justify-center rounded-xl p-2 pb-0 md:px-4  relative`}
        >
          {/* <div className='absolute left-4 top-4'>Change</div> */}
          {allowChange && (
            <ChangeBtnGroup onRemove={() => handleChangeTractor()} />
          )}
          {/* AD Badge */}
          {selectedTractor?.is_tractor_ad === 'yes' && (
            <div className="absolute top-8 md:top-4 left-0 md:left-4 border md:border-2 border-gray-main rounded-lg p-1 z-10 bg-white text-xs md:text-sm text-gray-main">
              AD
            </div>
          )}
          <div
            className={`${viewMode ? '' : 'border'} flex w-full flex-col items-center justify-center rounded-xl border-gray-light p-2 ${!viewMode ? 'cursor-pointer' : ''}`}
            onClick={handleTractorClick}
          >
            <Image
              src={getImageSrc()}
              height={228}
              width={140}
              alt="Compare Tractor Image"
              title="Tractor Image"
              className={`${allowChange ? 'pt-6 md:p-4' : 'md:p-4'} h-auto max-h-[172px] w-full object-contain`}
            />
            <span
              className="md:text-md mb-2 w-full overflow-hidden line-clamp-2 md:line-clamp-1 px-2 text-center text-sm font-semibold"
              title={selectedTractor.brand + ' ' + selectedTractor?.model || 'Tractor Model'}
            >
              {selectedTractor.brand + ' ' + selectedTractor?.model || 'Tractor Model'}
            </span>
            {!viewMode && (
              <div className="md:text-md mb-2 flex gap-1 text-center text-xs">
                <span>HP :</span>
                <span className="font-semibold">{selectedTractor?.hp || 'N/A'}</span>
              </div>
            )}
            {viewMode && (
              <div className="mt-2 flex">
                <div className={`${isCompact ? 'px-2 md:px-4' : 'px-4'} md:text-md mb-2 flex flex-col gap-1 border-r border-primary text-center text-xs`}>
                  <span className="text-gray-dark">HP</span>
                  <span className="text-sm font-semibold">{selectedTractor?.hp || 'N/A'}</span>
                </div>
                <div className={`${isCompact ? 'px-2 md:px-4' : 'px-4'} md:text-md mb-2 flex flex-col gap-1 border-primary text-center text-xs md:border-r`}>
                  <span className="text-gray-dark">Cylinder</span>
                  <span className="text-sm font-semibold">
                    {selectedTractor?.cylinder || 'N/A'}
                  </span>
                </div>
                <div className={`${isCompact ? 'px-2 md:px-4' : 'px-4'} md:text-md mb-2 hidden flex-col gap-1 text-center text-xs md:flex`}>
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
          {/* Show loading indicator for second option when first tractor is being processed */}
          {cardIndex === 0 && isLoadingSecondOption && (
            <div className="mb-2 text-center">
              <span className="text-xs text-gray-main">{translation?.headerNavbar?.findingBestOption || "Finding best comparison option..."}</span>
            </div>
          )}
          <div className="mt-2">
            <TG_SelectField
              ref={brandSelectRef}
              id={`brand-${cardIndex}`}
              value={selectedBrand}
              onChange={handleBrandChange}
              options={brands}
              optionLabelKey="name"
              optionValueKey="name"
              placeholder={translation?.headerNavbar?.selectBrand || "Select Brand"}
              fallback={isLoadingBrands ? (translation?.headerNavbar?.loadingBrands || 'Loading brands...') : (translation?.headerNavbar?.noBrandsAvailable || 'No brands available')}
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
              placeholder={translation?.headerNavbar?.selectModel || "Select Model"}
              fallback={
                isLoadingModels
                  ? (translation?.headerNavbar?.loadingModels || 'Loading models...')
                  : selectedBrand
                    ? (translation?.headerNavbar?.noModelsAvailable || 'No models available')
                    : translation?.headerNavbar?.selectBrandFirst || 'Select brand first'
              }
              additionalClasses="border-green-main"
              disabled={!selectedBrand}
            />
          </div>
        </div>
      )}
      {/* TODO:: When this button is shown, the compare tractor button will not be shown in the section cta */}
      {/* {(showCheckPrice) ? (
        <div className="mb-4 -mt-6 md:-mt-8  flex w-full justify-center">
          {selectedTractor && selectedTractor.brand_name_en && selectedTractor.model ? (
            <TG_LinkButton className={` ${isCompact ? '!px-1' : ''} border-primary text-primary rounded-lg`} href={`${currentLang == 'hi' ? '/hi' : ''}/${((selectedTractor.brand_name_en)?.replaceAll(' ', '-'))?.toLowerCase()}-${((selectedTractor?.model_en || selectedTractor.model_name_en)?.replaceAll(' ', '-'))?.toLowerCase()}/tractor-on-road-price/${selectedTractor.id}`}>
              ₹ {translation?.headerNavbar?.checkPrice || 'Check Price'}
            </TG_LinkButton>
          ) : (
            <TG_LinkButton className={`${isCompact ? '!px-1' : ''} border-primary text-primary rounded-lg`}>
              ₹ {translation?.headerNavbar?.checkPrice || 'Check Price'}
            </TG_LinkButton>
          )}
        </div>
      ) : null} */}
    </div>
  );
};

export default CompareTractorSelectionCard;

// Usage Example