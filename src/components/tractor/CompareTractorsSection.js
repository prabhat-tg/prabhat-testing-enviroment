'use client';

// ============ Used At ============
// 1. /
// 2. /compare-tractors
// =================================
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import React, { useState, useCallback, useEffect } from 'react';
import CompareTractorSelectionCard from '../ui/cards/CompareTractorSelectionCard';
import TG_Button from '../ui/buttons/MainButtons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { postData } from '@/src/services/apiMethods';

const VsIndicator = ({ className, viewMode, itemsToShow }) => {
  return (
    <div
      className={`${className} relative flex h-[160px] items-center justify-center md:h-[280px]`}
    >
      <div className="absolute left-1/2 top-0 z-0 h-full w-[2px] -translate-x-1/2 transform bg-section-gray" />

      <div
        className={
          `${className} ${viewMode ? 'bg-primary text-white' : 'mx-4 bg-white'} 
          relative z-10 flex 
          ${itemsToShow > 2 ? 'h-5 w-5 md:h-8 md:w-8 text-[10px]' : 'h-8 w-8 text-sm'} 
          items-center justify-center rounded-full font-semibold shadow-main md:h-10 md:w-10 md:text-base`
        }
      >
        VS
      </div>
    </div>
  );
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

const CompareTractorsSection = ({
  heading,
  bgColor = 'bg-white',
  cta,
  viewMode = false,
  allowChange,
  itemsToShow = 3,
  productId,
  hp,
  currentTractor,
  compareTractor,
  compareTractor2,
  currentLang,
  tractorbrands

}) => {
  const router = useRouter();
  // const [selectedTractors, setSelectedTractors] = useState({});
  const [selectedTractors, setSelectedTractors] = useState(() => ({
    0: currentTractor || null,
    1: compareTractor || null,
    2: compareTractor2 || null,
  }));
  // :: Using this to handle Change Tractor button on the card, check if we can utlize the the above selectedTractors instead
  // const [showTractorRemoveBtn, setShowTractorRemoveBtn] = useState([true, true, true]);

  const [compareTractors, setCompareTractors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Legacy effect for backward compatibility (when productId and hp are provided)
  useEffect(() => {
    if (productId && hp && !currentTractor && !compareTractor) {
      fetchCompareTractors();
    }
  }, [productId, hp, currentTractor, compareTractor]);

  // New effect for when tractors are provided directly
  useEffect(() => {
    console.log('::01::');
    if (currentTractor && compareTractor && compareTractor2) {
      const tractorsToShow = [currentTractor, compareTractor, compareTractor2];
      setCompareTractors(tractorsToShow);

      const autoSelected = {};
      tractorsToShow.forEach((tractor, index) => {
        autoSelected[index] = tractor;
      });
      setSelectedTractors(autoSelected);
    } else if (currentTractor && compareTractor) {
      const tractorsToShow = [currentTractor, compareTractor];
      setCompareTractors(tractorsToShow);

      const autoSelected = {};
      tractorsToShow.forEach((tractor, index) => {
        autoSelected[index] = tractor;
      });
      setSelectedTractors(autoSelected);
    } else if (currentTractor && !compareTractor) {
      // Only current tractor, no compare tractor
      setCompareTractors([currentTractor]);
      setSelectedTractors({ 0: currentTractor });
    }
  }, [currentTractor, compareTractor]);

  // Helper function to format current tractor data to match compare tractor structure
  const formatCurrentTractorForDisplay = tractor => {
    if (!tractor) return null;

    return {
      id: tractor.id,
      brand: tractor.brand,
      model: tractor.model,
      hp: tractor.hp,
      cylinder: tractor.cylinder || 'N/A',
      image: tractor.image,
      lifting_capacity: tractor.lifting_capacity || 'N/A',
      page_url: `/tractor/${tractor.brand?.toLowerCase().replace(/\s+/g, '-')}/${tractor.id}`,
      popular_tractor: '1', // Current tractor is always popular in this context
    };
  };

  const fetchCompareTractors = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching compare tractors with payload:', { product_id: productId, hp: hp });

      const response = await postData('/api/compare_tractor_hp_wise', {
        product_id: productId,
        hp: hp,
      });

      console.log('API Response:', response);

      if (response.success && response.data) {
        const tractorsToShow = response.data.slice(0, itemsToShow);
        setCompareTractors(tractorsToShow);

        // Auto-populate selectedTractors with fetched data
        const autoSelected = {};
        tractorsToShow.forEach((tractor, index) => {
          autoSelected[index] = tractor;
        });
        setSelectedTractors(autoSelected);

        console.log('Compare tractors set:', tractorsToShow);
      } else {
        console.error('API call failed or no data returned:', response);
      }
    } catch (error) {
      console.error('Error fetching compare tractors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTractorSelect = useCallback((cardIndex, tractorData) => {
    setSelectedTractors(prev => ({
      ...prev,
      [cardIndex]: tractorData,
    }));
    // TODO:: if user explicitly changes tractor, then stop showing prefilled
    if (tractorData === null) {
      setCompareTractors(null);   // clear prefilled tractor
    }
  }, []);

  // useEffect(() => {
  //   console.log("selectedTractors changed:", selectedTractors);
  // }, [selectedTractors]);

  const handlePlaceholderClick = useCallback(cardIndex => {
    // This function is no longer needed as we handle it directly in the child component
    console.log('Placeholder clicked for card index:', cardIndex);
  }, []);

  const handleRemoveTractor = useCallback(cardIndex => {
    setSelectedTractors(prev => {
      const newState = { ...prev };
      delete newState[cardIndex];
      return newState;
    });
  }, []);

  const extractSlugFromUrl = pageUrl => {
    // Extract middle slug from page_url like "/tractor/mahindra-575-di-xp-plus/440"
    const parts = pageUrl.split('/');
    if (parts.length >= 3) {
      return parts[2]; // Returns "mahindra-575-di-xp-plus"
    }
    return '';
  };

  const handleCompareClick = () => {
    let selectedTractorsList;

    console.log('=====currentTractor=====', currentTractor);
    console.log('=====selectedTractors=====', selectedTractors);

    // TODO:: Checking if user has made any changes, then use selection based data, else continue as old logic
    if (currentTractor?.id != selectedTractors[0]?.id || compareTractor?.id != selectedTractors[1]?.id || compareTractor2?.id != selectedTractors[2]?.id) {
      selectedTractorsList = Object.values(selectedTractors).filter(Boolean);
    }
    else
      if (currentTractor && compareTractor) {
        // New mode: use current and compare tractors directly
        selectedTractorsList = [currentTractor, compareTractor].filter(Boolean);
      } else {
        // Legacy mode: use selected tractors
        selectedTractorsList = Object.values(selectedTractors).filter(Boolean);
      }

    if (selectedTractorsList.length < 2) {
      alert('Please select at least 2 tractors to compare');
      return;
    }

    // Generate comparison URL
    const slugs = selectedTractorsList.map(tractor => {
      // Handle different URL formats
      if (tractor.page_url) {
        return extractSlugFromUrl(tractor.page_url);
      }
      // Fallback: generate slug from brand and model
      const brand = tractor.brand || '';
      const model = tractor.model || '';
      return `${brand.toLowerCase().replace(/\s+/g, '-')}-${model.toLowerCase().replace(/\s+/g, '-')}`;
    });

    const compareUrl = `/compare/${slugs.join('-vs-')}`;

    router.push(compareUrl);
  };

  const getSelectedTractorsCount = () => {
    if (currentTractor && compareTractor && compareTractor2) {
      return 3;
    } else if (currentTractor && compareTractor) {
      return 2;
    } else if (currentTractor && !compareTractor) {
      return 1;
    }
    return Object.values(selectedTractors).filter(Boolean).length;
  };

  // Simple tractor display card for API fetched data
  const TractorCompareCard = ({ tractor, viewMode = false, isCurrentTractor = false }) => {
    if (!tractor) {
      return (
        <div className="bg-gray-50 flex h-[160px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-light md:h-[280px]">
          <span className="text-gray-main">No tractor data</span>
        </div>
      );
    }

    return (
      <div
        className={`${viewMode ? 'rounded-lg' : 'rounded-lg border border-gray-light'
          } ${isCurrentTractor ? 'bg-blue-50 border-primary' : ''
          } relative h-[280px] w-full overflow-hidden bg-white md:h-[220px] mb-4`}
      >
        {/* {isCurrentTractor && (
          <div className="absolute right-2 top-2 z-10">
            <span className="rounded bg-primary px-2 py-1 text-xs text-white">Current</span>
          </div>
        )} */}

        <div className="flex h-full flex-col">
          {/* Image Section */}
          <div className="flex h-[60%] items-center justify-center p-2">
            <Image
              src={`https://images.tractorgyan.com/uploads/${tractor.image?.replace(/^\/+/, '')}`}
              alt={`${tractor.brand} ${tractor.model}`}
              title={`${tractor.brand} ${tractor.model}`}
              height={200}
              width={200}
              className="h-auto max-h-full w-auto max-w-full object-contain"
              onError={e => {
                e.target.src = 'https://images.tractorgyan.com/uploads/placeholder-tractor.jpg';
              }}
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between p-2 pt-0">
            {/* <div className="flex h-[40%] flex-col justify-between p-2 pt-0"> */}
            <div className="text-center">
              <h3
                className={`text-xs font-semibold md:text-base ${isCurrentTractor ? 'text-primary' : 'text-black'}`}
              >
                {tractor.brand} {tractor.model}
              </h3>
              <div className="mt-2 flex justify-center flex-col md:flex-row">
                <div className="md:text-md mb-2 flex flex-col gap-1 md:border-r border-primary px-4 text-center text-xs">
                  <span className="text-gray-dark">HP</span>
                  <span className="text-xs md:text-base font-semibold">{tractor?.hp || 'N/A'}</span>
                </div>
                <div className="md:text-md mb-2 flex flex-col gap-1 border-primary px-4 text-center text-xs md:border-r">
                  <span className="text-gray-dark">Cylinder</span>
                  <span className="text-xs md:text-base font-semibold">
                    {tractor?.cylinder || 'N/A'}
                  </span>
                </div>
                <div className="md:text-md mb-2 flex flex-col gap-1 px-4 text-center text-xs">
                  <span className="text-gray-dark">Capacity</span>
                  <span className="text-xs md:text-base font-semibold">
                    {tractor?.lifting_capacity || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const compareTractorCardWrapperClx = `
  //   relative
  //   ${viewMode ? 'w-[calc(50%-1rem)]' : 'w-[calc(50%-2rem)]'}
  //   ${itemsToShow > 2 ? 'w-[calc(33.33%-1rem)]' : 'w-[calc(50%-1rem)] text-sm'}
  // `;
  const compareTractorCardWrapperClx = `
    relative
    ${itemsToShow > 2 ? 'w-[calc(33.33%-1rem)]' : 'w-[calc(50%-1rem)] text-sm'}
  `;

  return (
    <div className={`${bgColor} w-full`}>
      <div className={`${viewMode ? '' : 'container'}`}>
        <div className={`${viewMode ? 'rounded-xl bg-white px-0 md:px-2 shadow-main' : ''}`}>
          {heading && <MainHeadings text={heading} />}

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <span className="text-gray-main">Loading compare tractors...</span>
            </div>
          ) : currentTractor ? (
            // ) : currentTractor && !allowChange ? (
            // New mode: show current tractor vs compare tractor
            <div className="flex items-center justify-between">
              <div className={compareTractorCardWrapperClx}>
                {/* <TractorCompareCard
                  tractor={currentTractor}
                  viewMode={viewMode}
                  isCurrentTractor={true}
                  allowChange={allowChange}
                /> */}
                <CompareTractorSelectionCard
                  // isSelected={showTractorRemoveBtn[0] ? false : true}
                  isSelected={false}
                  viewMode={viewMode}
                  allowChange={allowChange}
                  cardIndex={0}
                  onTractorSelect={handleTractorSelect}
                  selectedTractor={selectedTractors[0] ?? null}
                  onPlaceholderClick={handlePlaceholderClick}
                  currentLang={currentLang}
                  brands={tractorbrands}
                />
              </div>
              <VsIndicator viewMode={viewMode} itemsToShow={itemsToShow} />
              <div className={compareTractorCardWrapperClx}>
                {/* <TractorCompareCard
                  tractor={compareTractor}
                  viewMode={viewMode}
                  isCurrentTractor={false}
                /> */}
                <CompareTractorSelectionCard
                  // isSelected={showTractorRemoveBtn[1] ? false : true}
                  isSelected={false}
                  viewMode={viewMode}
                  allowChange={allowChange}
                  cardIndex={1}
                  onTractorSelect={handleTractorSelect}
                  selectedTractor={selectedTractors[1] ?? null}
                  onPlaceholderClick={handlePlaceholderClick}
                  currentLang={currentLang}
                  brands={tractorbrands}
                />
              </div>
              {itemsToShow > 2 && (
                <>
                  <VsIndicator viewMode={viewMode} itemsToShow={itemsToShow} />
                  <div className={compareTractorCardWrapperClx}>
                    {/* <TractorCompareCard
                      tractor={compareTractor2}
                      viewMode={viewMode}
                      isCurrentTractor={false}
                    /> */}
                    <CompareTractorSelectionCard
                      // isSelected={showTractorRemoveBtn[2] ? false : true}
                      isSelected={false}
                      viewMode={viewMode}
                      allowChange={allowChange}
                      cardIndex={2}
                      onTractorSelect={handleTractorSelect}
                      selectedTractor={selectedTractors[2] ?? null}
                      onPlaceholderClick={handlePlaceholderClick}
                      currentLang={currentLang}
                      brands={tractorbrands}

                    />
                  </div>
                </>
              )}
            </div>
          ) : productId && hp ? (
            // Legacy API-driven mode: show fetched tractors
            <div className="flex items-center justify-between">
              <div className={`${viewMode ? 'w-[calc(50%-1rem)]' : 'w-[calc(50%-2rem)]'} relative`}>
                <TractorCompareCard tractor={compareTractors[0]} viewMode={viewMode} />
              </div>
              <VsIndicator viewMode={viewMode} />
              <div className={`${viewMode ? 'w-[calc(50%-1rem)]' : 'w-[calc(50%-2rem)]'} relative`}>
                <TractorCompareCard tractor={compareTractors[1]} viewMode={viewMode} />
              </div>
            </div>
          ) : (
            // Original manual selection mode
            <div className="flex items-center justify-between">
              <div
                className={compareTractorCardWrapperClx}
              >
                {allowChange && selectedTractors[0] && (
                  <ChangeBtnGroup onRemove={() => handleRemoveTractor(0)} />
                )}
                <CompareTractorSelectionCard
                  isSelected={!!selectedTractors[0]}
                  viewMode={viewMode}
                  allowChange={allowChange}
                  cardIndex={0}
                  onTractorSelect={handleTractorSelect}
                  selectedTractor={selectedTractors[0]}
                  onPlaceholderClick={handlePlaceholderClick}
                  currentLang={currentLang}
                  brands={tractorbrands}

                />
              </div>
              <VsIndicator viewMode={viewMode} />
              <div
                className={compareTractorCardWrapperClx}
              >
                {allowChange && selectedTractors[1] && (
                  <ChangeBtnGroup onRemove={() => handleRemoveTractor(1)} />
                )}
                <CompareTractorSelectionCard
                  isSelected={!!selectedTractors[1]}
                  viewMode={viewMode}
                  allowChange={allowChange}
                  cardIndex={1}
                  onTractorSelect={handleTractorSelect}
                  selectedTractor={selectedTractors[1]}
                  onPlaceholderClick={handlePlaceholderClick}
                  currentLang={currentLang}
                  brands={tractorbrands}

                />
              </div>
              {itemsToShow > 2 && (
                <>
                  <VsIndicator viewMode={viewMode} className="hidden md:flex" />
                  <div className={`${compareTractorCardWrapperClx} hidden md:block`}>
                    {/* <div className="relative hidden w-[calc(33.33%-4rem)] md:block"> */}
                    {allowChange && selectedTractors[2] && (
                      <ChangeBtnGroup onRemove={() => handleRemoveTractor(2)} />
                    )}
                    <CompareTractorSelectionCard
                      isSelected={!!selectedTractors[2]}
                      viewMode={viewMode}
                      allowChange={allowChange}
                      cardIndex={2}
                      onTractorSelect={handleTractorSelect}
                      selectedTractor={selectedTractors[2]}
                      onPlaceholderClick={handlePlaceholderClick}
                      currentLang={currentLang}
                      brands={tractorbrands}

                    />
                  </div>
                </>
              )}
            </div>
          )}

          {cta && (
            <div className={`${viewMode ? 'pb-4 md:pb-4' : 'pt-8'} flex justify-center`}>
              <TG_Button
                variant={viewMode ? 'outline' : 'primary'}
                onClick={handleCompareClick}
                disabled={getSelectedTractorsCount() < 2}
              >
                Compare Tractors
              </TG_Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareTractorsSection;
