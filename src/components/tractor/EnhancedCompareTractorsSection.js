'use client';

import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import TG_Button from '../ui/buttons/MainButtons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EnhancedCompareTractorSelectionCard from '../ui/cards/EnhancedCompareTractorSelectionCard';

const VsIndicator = ({ className, viewMode }) => {
  return (
    <div
      className={`${className} relative flex h-[160px] items-center justify-center md:h-[280px]`}
    >
      <div className="absolute left-1/2 top-0 z-0 h-full w-[2px] -translate-x-1/2 transform bg-section-gray" />
      <div
        className={`${className} ${viewMode ? 'bg-primary text-white' : 'mx-4 bg-white'} relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shadow-main md:h-10 md:w-10 md:text-base`}
      >
        VS
      </div>
    </div>
  );
};

const ChangeBtnGroup = ({ disabled = false, onRemove }) => {
  return (
    <div className="absolute right-1 top-2 flex w-full flex-row-reverse items-center justify-between gap-2 px-2 md:right-0 md:top-4 md:flex-row md:justify-end md:px-0 md:pr-3">
      <button onClick={onRemove}>
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

const EnhancedCompareTractorsSection = ({
  heading,
  bgColor = 'bg-white',
  cta,
  viewMode = false,
  allowChange,
  itemsToShow = 3,
  translation,
}) => {
  const router = useRouter();
  const [selectedTractors, setSelectedTractors] = useState({});

  const handleTractorSelect = useCallback((cardIndex, tractorData) => {
    setSelectedTractors(prev => ({
      ...prev,
      [cardIndex]: tractorData,
    }));
  }, []);

  const handleRemoveTractor = useCallback(cardIndex => {
    setSelectedTractors(prev => {
      const newState = { ...prev };
      delete newState[cardIndex];
      return newState;
    });
  }, []);

  const generateCompareUrl = tractors => {
    if (tractors.length < 2) return '';

    const slugs = tractors.map(tractor => {
      const brand = tractor.brand.toLowerCase().replace(/\s+/g, '-');
      const model = tractor.model.toLowerCase().replace(/\s+/g, '-');
      return `${brand}-${model}`;
    });

    return `/compare/${slugs.join('-vs-')}`;
  };

  const handleCompareClick = () => {
    const selectedTractorsList = Object.values(selectedTractors).filter(Boolean);

    if (selectedTractorsList.length < 2) {
      alert('Please select at least 2 tractors to compare');
      return;
    }

    // Generate comparison URL
    const compareUrl = generateCompareUrl(selectedTractorsList);
    if (compareUrl) {
      router.push(compareUrl);
    }
  };

  const getSelectedTractorsCount = () => {
    return Object.values(selectedTractors).filter(Boolean).length;
  };

  return (
    <div className={`${bgColor} w-full`}>
      <div className={`${viewMode ? '' : 'container'}`}>
        <div className={`${viewMode ? 'rounded-xl bg-white px-2 shadow-main' : ''}`}>
          {heading && <MainHeadings text={heading} />}

          <div className="flex items-center justify-between">
            <div
              className={`${viewMode ? 'w-[calc(50%-1rem)]' : 'w-[calc(50%-2rem)]'} ${
                itemsToShow > 2 ? 'md:w-[calc(33.33%-4rem)]' : ''
              } relative`}
            >
              {allowChange && selectedTractors[0] && (
                <ChangeBtnGroup onRemove={() => handleRemoveTractor(0)} />
              )}
              <EnhancedCompareTractorSelectionCard
                isSelected={!!selectedTractors[0]}
                viewMode={viewMode}
                allowChange={allowChange}
                cardIndex={0}
                onTractorSelect={handleTractorSelect}
                selectedTractor={selectedTractors[0]}
              />
            </div>

            <VsIndicator viewMode={viewMode} />

            <div
              className={`${viewMode ? 'w-[calc(50%-1rem)]' : 'w-[calc(50%-2rem)]'} ${
                itemsToShow > 2 ? 'md:w-[calc(33.33%-4rem)]' : ''
              } relative`}
            >
              {allowChange && selectedTractors[1] && (
                <ChangeBtnGroup onRemove={() => handleRemoveTractor(1)} />
              )}
              <EnhancedCompareTractorSelectionCard
                isSelected={!!selectedTractors[1]}
                viewMode={viewMode}
                allowChange={allowChange}
                cardIndex={1}
                onTractorSelect={handleTractorSelect}
                selectedTractor={selectedTractors[1]}
              />
            </div>

            {itemsToShow > 2 && (
              <>
                <VsIndicator viewMode={viewMode} className="hidden md:flex" />
                <div className="relative hidden w-[calc(33.33%-4rem)] md:block">
                  {allowChange && selectedTractors[2] && (
                    <ChangeBtnGroup onRemove={() => handleRemoveTractor(2)} />
                  )}
                  <EnhancedCompareTractorSelectionCard
                    isSelected={!!selectedTractors[2]}
                    viewMode={viewMode}
                    allowChange={allowChange}
                    cardIndex={2}
                    onTractorSelect={handleTractorSelect}
                    selectedTractor={selectedTractors[2]}
                  />
                </div>
              </>
            )}
          </div>

          {cta && (
            <div className={`${viewMode ? 'pb-4 md:pb-8' : 'pt-8'} flex justify-center`}>
              <TG_Button
                variant={viewMode ? 'outline' : 'primary'}
                onClick={handleCompareClick}
                disabled={getSelectedTractorsCount() < 2}
              >
                {translation?.headerNavbar?.compareTractor || 'Compare Tractors'}
              </TG_Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedCompareTractorsSection;
