'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TractorMainSlider from '../secondHand/secondHandDetails/TractorMainSlider';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import Tooltip from '@/src/features/tyreComponents/commonComponents/Tooltip';
import SocialMediaLinksShare from '@/src/components/shared/social-media/SocialMediaShare';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import { tgi_arrow_right_white, tgi_star } from '@/src/utils/assets/icons';
import Image from 'next/image';

const TractorDetailsCard = ({
  tractorId,
  tractorDetail,
  primaryBtnText,
  secondaryBtnText,
  translation,
  currentLang,
  isMobile,
}) => {
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const router = useRouter();

  const tooltipContent = `${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.priceRange || 'Price range is between Rs'} ${tractorDetail.price_range || 'NA'}*. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.horsepower || 'horsepower is'} ${tractorDetail.hp} ${translation?.tractorSpecs?.hp || 'hp'}. ${translation?.tractorDetails?.tooltipContent?.fuelTank || 'Its Fuel tank capacity is'} ${tractorDetail.fuel_tank_capacity || 'NA'}. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.hasCylinders || 'has'} ${tractorDetail.cylinder} ${translation?.tractorDetails?.tooltipContent?.cylinders || 'cylinders'}, ${tractorDetail.displacement_cc} ${translation?.tractorDetails?.tooltipContent?.engine || 'engine'}. ${translation?.tractorDetails?.tooltipContent?.otherSpecs || 'Other key specifications include'} ${tractorDetail.pto_hp || 'NA'} PTO ${translation?.tractorSpecs?.hp || 'hp'}, ${tractorDetail.lifting_capacity} ${translation?.tractorDetails?.tooltipContent?.liftingCap || 'lifting capacity'}, ${tractorDetail.number_of_gears} ${translation?.tractorDetails?.tooltipContent?.gears || 'gears'}.`;

  // Rating and review data - could come from API or props
  const rawRating = tractorDetail.avg_review || 0;
  const reviews = tractorDetail.total_review || 0;

  // Function to round rating to nearest 0.5
  const roundToNearestHalf = num => {
    return Math.round(num * 2) / 2;
  };

  const rating = roundToNearestHalf(rawRating);

  // Mapping ratings to star image URLs (same as TyreDetailsCard)
  const starImages = {
    1: 'https://images.tractorgyan.com/uploads/117230/6773d16b0a195-star-yellow-icon_small.webp',
    1.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    2: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    2.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    3: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    3.5: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
    4: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
    4.5: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
    5: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
  };
  const starImage = starImages[rating] || '';

  const productHighlight = [
    { label: translation?.tractorSpecs?.hp || 'HP', value: tractorDetail.hp || 'NA' },
    {
      label: translation?.tractorSpecs?.cylinders || 'Cylinder',
      value: tractorDetail.cylinder || 'NA',
    },
    {
      label: translation?.tractorSpecs?.coolingSystem || 'Cooling System',
      value: tractorDetail.cooling_system || 'NA',
    },
    {
      label: translation?.tractorSpecs?.wheelBase || 'Wheel Base',
      value: tractorDetail.wheel_base || 'NA',
    },
    {
      label: translation?.tractorSpecs?.liftingCapacity || 'Lifting Capacity',
      value: tractorDetail.lifting_capacity || 'NA',
    },
    {
      label: translation?.tractorDetails?.specCategories?.warranty || 'Warranty',
      value: tractorDetail.warrenty || 'NA',
    },
  ];

  const renderHighlightItem = (label, value) => (
    <div className="flex flex-col items-center justify-center rounded-lg bg-green-lighter shadow-card p-2">
      <span className="text-center text-xs font-normal text-gray-dark">{label}</span>
      <span className="text-center text-base font-semibold text-black">{value}</span>
    </div>
  );

  console.log('tractorDetail render', tractorDetail.status);

  return (
    <div className="justify-around rounded-2xl md:flex md:p-4 md:shadow-main">
      {/* <div className="relative h-full w-full flex justify-center px-4 pt-3 md:justify-start md:max-h-[480px] md:max-w-[350px] lg:max-w-[335px] xl:max-w-[350px]"> */}
      <div className="relative h-full w-full px-0 pt-0 md:pt-3 md:max-h-[480px] md:max-w-[350px] md:px-4 lg:max-w-[335px] xl:max-w-[350px]">
        <TractorMainSlider
          title={`${tractorDetail.brand} ${tractorDetail.model} image`}
          imgUrl={tractorDetail.images}
          brandLogo={tractorDetail.brand_logo || ''}
          showThumbnails={true}
          isPopular={tractorDetail?.popular_tractor === '1' ? true : false}
          translation={translation}
          status={tractorDetail?.status}
        />
      </div>
      <div className="mt-8 w-full rounded-2xl p-4 shadow-main md:mt-2 md:max-w-[370px] md:p-0 md:p-2 md:shadow-none lg:max-w-[335px] xl:max-w-[450px]">
        {/* Heading moved inside the card */}
        {!isMobile ? <Tooltip content={tooltipContent}>
          <h1 className="mb-4 cursor-pointer text-lg font-bold text-black md:text-2xl">
            {`${tractorDetail.brand} ${tractorDetail.model}`}
          </h1>
        </Tooltip> : null}
        <div className="flex flex-row-reverse md:flex-row justify-between items-start">
          <div>
            {rawRating > 0 ? (
              <div
                className="flex justify-end md:justify-start items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  const reviewSection = document.getElementById('review-section');
                  if (reviewSection) {
                    reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <div className="text-xs font-medium text-gray-main">{rawRating}</div>
                <div className="min-w-[17px] max-w-[17px]">
                  {starImage ? (
                    <Image
                      src={starImage}
                      height={100}
                      width={100}
                      alt={`Rating: ${rawRating}`}
                      title={`Rating: ${rawRating}`}
                      className="w-4"
                    />
                  ) : (
                    <Image
                      src="https://images.tractorgyan.com/uploads/117228/677395f732537-filled-gray-star.webp"
                      height={100}
                      width={100}
                      alt={`Rating: ${rawRating}`}
                      title={`Rating: ${rawRating}`}
                      className="w-4"
                    />
                  )}
                </div>
                <div className="text-xs font-medium text-gray-main">
                  ({reviews} {translation?.tractorDetails?.reviews || 'reviews'})
                </div>
              </div>
            ) : (
              <div className="text-xs font-medium text-gray-main">
                {translation?.tractorDetails?.noReviews || 'No reviews yet'}
              </div>
            )}

            <button
              className="flex md:hidden items-center justify-center gap-1.5 rounded-full border-[1px] border-gray-light px-3 py-1.5 md:px-4 mt-2"
              onClick={() => {
                const reviewSection = document.getElementById('review-section');
                if (reviewSection) {
                  reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <span className="w-3">
                <Image
                  src={tgi_star}
                  height={20}
                  width={20}
                  alt="star-icon"
                  title="star-icon"
                  className="w-full"
                />
              </span>
              <span className="text-xs font-medium text-gray-dark md:text-sm text-nowrap">
                Review Tractor
              </span>
            </button>
          </div>

          <div>
            <span className='block md:hidden text-sm'>Share</span>
            <SocialMediaLinksShare
              title={
                translation?.tractorDetails?.shareTitle || 'Check out this tractor on TractorGyan!'
              }
              url={'https://tractorgyan.com' + tractorDetail.page_url}
            />
          </div>
        </div>
        {isMobile ? (
          <div className="mb-6 mt-4 grid min-h-[62px] grid-cols-3 gap-2 md:gap-4 bg-green-lighter shadow-card">
            {productHighlight
              .filter(({ value }) => value && value !== 'NA')
              .splice(0, 3)
              .map(({ label, value }, index) => (
                <div key={`${label}-${index}`} className="flex flex-col items-center justify-center rounded-lg p-2">
                  <span className="text-center text-xs font-normal text-gray-dark">{label}</span>
                  <span className="text-center text-base font-semibold text-black">{value}</span>
                </div>
              ))}
          </div>
        ) : (
          <div className="mb-6 mt-4 grid min-h-[62px] grid-cols-3 gap-2 md:gap-4">
            {productHighlight
              .filter(({ value }) => value && value !== 'NA')
              .map(({ label, value }, index) => (
                <div key={`${label}-${index}`} className="flex flex-col items-center justify-center rounded-lg bg-green-lighter shadow-card p-2">
                  <span className="text-center text-xs font-normal text-gray-dark">{label}</span>
                  <span className="text-center text-base font-semibold text-black">{value}</span>
                </div>
              ))}
          </div>
        )}
        <div className="mt-6 flex w-full gap-2 md:flex-col md:gap-4">
          <TG_Button
            className={`${secondaryBtnText ? 'w-1/2' : 'w-full'} md:w-full md:flex-1`}
            icon={tgi_arrow_right_white}
            iconPosition="right"
            onClick={() => setShowWhatsAppForm(true)}
          >
            ₹ {translation?.buttons?.checkPrice || 'Get Tractor Price'}
          </TG_Button>
          {secondaryBtnText && (
            <TG_Button
              className="w-1/2 md:w-full md:flex-1"
              variant="outline"
              onClick={() => router.push(`${currentLang == 'hi' ? '/hi' : ''}/compare-tractors`)}
            >
              {isMobile ? translation?.buttons?.compare || 'Compare Tractors' : secondaryBtnText}
            </TG_Button>
          )}
        </div>
      </div>

      {/* WhatsApp Form Component */}
      {showWhatsAppForm && (
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          isMobile={isMobile}
          defaultEnquiryType="Tractor"
          openEnquiryForm={showWhatsAppForm}
          preFilledTractorBrand={tractorDetail.brand}
          preFilledTractorModelId={tractorDetail.id}
          onClose={() => setShowWhatsAppForm(false)}

        />
      )}
    </div>
  );
};

export default TractorDetailsCard;
