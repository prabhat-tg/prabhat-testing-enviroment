// ============ Used At ============
// 1. /tyre/mrf-shakti-3-rib-6-x-16/13
// 2.
// =================================
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import TyreDetailMainSlider from '@/src/features/tyre/tyreDetailsSection/TyreDetailMainSLider';
import Tooltip from '@/src/features/tyreComponents/commonComponents/Tooltip'; // Included as it might be used in the JSX
import SocialMediaLinksShare from '@/src/components/shared/social-media/SocialMediaShare';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import { tgi_star } from '@/src/utils/assets/icons';

const TyreDetailsClientInteractions = ({
  tyreId,
  tyreDetail,
  features,
  aboutSectionSlot,
  translation,
  isMobile
}) => {
  // Added aboutSectionSlot
  const [isOpen1, setIsopen1] = useState(true);
  const [isOpen2, setIsopen2] = useState(true);

  const tooltipContent = `${tyreDetail.brand_name} ${tyreDetail.model_name} gives the perfect traction in uneven and wet areas. This tyre distributes tractor weight evenly and handles heavy loads easily. It maintains soil structure and reduces compaction. This tyre absorbs uneven ground shocks and provides comfort while driving the tractor. The price of ${tyreDetail.brand_name} ${tyreDetail.model_name} is affordable for Indian farmers. ${tyreDetail.brand_name} ${tyreDetail.model_name} is made of high-quality components and can handle tough farming.`;

  const scrollToSection = scrollTarget => {
    const element = document.getElementById(scrollTarget);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with id "${scrollTarget}" not found for scrolling.`);
    }
  };

  const toggleDropdown1 = () => setIsopen1(pre => !pre);
  const toggleDropdown2 = () => setIsopen2(pre => !pre);

  // from TyreDetailsAndFeatures.js
  return (
    <>
      <div className="gap-8 lg:flex">
        {' '}
        {/* Main two-column layout container */}
        {/* Left Column */}
        <div className="flex w-full flex-col gap-8 lg:max-w-[700px] xl:max-w-[900px]">
          {/* Main content section including slider, highlights, share buttons */}
          <div className="justify-around rounded-2xl md:flex md:shadow-main xl:p-4 xl:pb-0">
            {/* Title and Tooltip for Mobiel UI */}
            {isMobile === true && (<Tooltip content={tooltipContent}>
              <h1 className="block cursor-pointer text-lg font-semibold text-black md:hidden">
                {tyreDetail.brand_name ? (
                  `${tyreDetail.brand_name} ${tyreDetail.model_name}`
                ) : (
                  <p>{translation.tyreDetails.loading}</p>
                )}
              </h1>
            </Tooltip>)}
            <div className="relative h-full w-full px-0 pt-3 md:max-h-[480px] md:max-w-[350px] md:px-4 lg:max-w-[335px] xl:max-w-[350px]">
              <TyreDetailMainSlider
                title={`${tyreDetail.brand_name} ${tyreDetail.model_name} image`}
                imgUrl={tyreDetail.images}
                brandLogo={tyreDetail.brand_logo}
                popularTyre={tyreDetail.popular_tyre}
              />
            </div>
            <div className="mt-8 w-full rounded-2xl p-4 shadow-main md:mt-2 md:max-w-[370px] md:p-0 md:shadow-none lg:max-w-[335px] xl:max-w-[450px]">
              {isMobile === false && (<Tooltip
                content={` ${tyreDetail.brand_name} ${tyreDetail.model_name} gives the perfect traction in uneven and wet areas. This tyre distributes tractor weight evenly and handles heavy loads easily. It maintains soil structure and reduces compaction. This tyre absorbs uneven ground shocks and provides comfort while driving the tractor. The price of ${tyreDetail.brand_name} ${tyreDetail.model_name} is affordable for Indian farmers. ${tyreDetail.brand_name} ${tyreDetail.model_name} is made of high-quality components and can handle tough farming.`}
              >
                <h1 className="mb-4 hidden cursor-pointer text-lg font-semibold text-black md:block md:text-2xl">
                  {tyreDetail.brand_name ? (
                    ` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`
                  ) : (
                    <p>{translation.tyreDetails.loading}</p>
                  )}
                </h1>
              </Tooltip>)}
              <div>
                <h5 className="mb-4 hidden text-lg font-semibold text-black xl:block">
                  {translation.tyreDetails.highlights}
                </h5>
                <div className="mb-4 flex min-h-[62px] rounded-lg border-[1px] border-green-mint bg-green-lighter uppercase md:mb-6">
                  <div className="flex w-1/3 flex-col items-center justify-center py-2.5">
                    <span className="text-xs font-normal text-gray-dark">
                      {translation.headings.type.toUpperCase()}
                    </span>
                    <span className="text-base font-semibold text-black">
                      {tyreDetail.tyre_type}
                    </span>
                  </div>
                  <div className="flex w-1/3 flex-col items-center justify-center border-x-[1px] border-green-mint py-2.5">
                    <span className="text-xs font-normal text-gray-dark">
                      {translation.headings.brand.toUpperCase()}
                    </span>
                    <span className="text-base font-semibold text-black">
                      {tyreDetail.brand_name}
                    </span>
                  </div>
                  <div className="flex w-1/3 flex-col items-center justify-center py-2.5">
                    <span className="text-xs font-normal text-gray-dark">
                      {translation.headings.size.toUpperCase()}
                    </span>
                    <span className="text-base font-semibold text-black">
                      {tyreDetail.tyre_size}
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h5 className="mb-2 font-semibold md:mb-4">{translation.tyreDetails.share}</h5>
                    <SocialMediaLinksShare
                      title={`${translation.tyreDetails.checkOutThisTyre} ${tyreDetail.brand_name} ${tyreDetail.model_name}`}
                    />
                  </div>
                  <div>
                    <button
                      className="flex items-center justify-center gap-1.5 rounded-full border-[1px] border-gray-light px-3 py-1.5 md:px-4"
                      onClick={() => scrollToSection('review-section')}
                    >
                      <span className="min-w-3 max-w-5">
                        <Image
                          src={tgi_star}
                          height={20}
                          width={20}
                          alt="star-icon"
                          title="star-icon"
                          className="w-full"
                        />
                      </span>
                      <span className="text-xs font-medium text-gray-dark md:text-sm">
                        {translation.tyreDetails.reviewThisTyre}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-6 mt-6">
                <TG_Button className="w-full" onClick={() => scrollToSection('inquire-section')}>
                  {translation.tyreDetails.getTyrePrice}
                </TG_Button>
              </div>
            </div>
          </div>

          {/* Render the passed-in aboutSectionSlot here */}
          {aboutSectionSlot}
        </div>
        {/* Right Column (Technical Specifications and Features/Benefits Dropdowns) */}
        <div className="relative mt-4 h-full w-full lg:max-w-[Calc(100%_-_700px)] xl:mt-0 xl:max-w-[Calc(100%_-_932px)]">
          <div className="sticky bottom-0 top-0">
            <h2 className="border-b-3 mb-4 inline-block border-secondary pb-2 text-lg font-semibold leading-6">
              {`${tyreDetail.brand_name} ${tyreDetail.model_name} ${translation.tyreDetails.technicalSpecifications}`}
            </h2>
            <div className="mb-4">
              <div
                className={`${!isOpen1 && 'rounded-b-lg'
                  } flex items-center justify-between gap-3 rounded-t-lg bg-primary p-4 text-base font-semibold leading-[18px] text-white shadow-main`}
              >
                <h3>{`${tyreDetail.brand_name} ${tyreDetail.model_name} ${translation.tyreDetails.specifications}`}</h3>
                <button onClick={toggleDropdown1}>
                  <Image
                    src={`${isOpen1
                      ? 'https://images.tractorgyan.com/uploads/114119/66a8b1e63149d-upArrowFeature.png'
                      : 'https://images.tractorgyan.com/uploads/114118/66a8b19bd6d66-featureTableDown.png'
                      }`}
                    height={20}
                    width={20}
                    alt="toggle-button-image"
                    title="toggle-button-image"
                    className="h-5 w-full min-w-5 max-w-5"
                  />
                </button>
              </div>
              {isOpen1 && (
                <ul className="rounded-b-lg bg-white p-2 shadow-main">
                  <li className="flex gap-10 border-b-[1px] border-gray-light px-2 py-[13px]">
                    <div className="flex w-1/2 items-center justify-between">
                      <span className="text-xs font-normal text-gray-dark">
                        {translation.headings.brand}
                      </span>
                    </div>
                    <div className="w-1/2">
                      <span className="text-sm font-medium text-black">
                        {tyreDetail.brand_name}
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-10 border-b-[1px] border-gray-light px-2 py-[13px]">
                    <div className="flex w-1/2 items-center justify-between">
                      <span className="text-xs font-normal text-gray-dark">
                        {translation.tyreDetails.model}
                      </span>
                    </div>
                    <div className="w-1/2">
                      <span className="text-sm font-medium text-black">
                        {tyreDetail.model_name}
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-10 border-b-[1px] border-gray-light px-2 py-[13px]">
                    <div className="flex w-1/2 items-center justify-between">
                      <span className="text-xs font-normal text-gray-dark">
                        {translation.headings.size}
                      </span>
                      <div className="">
                        <Tooltip content={translation.tyreDetails.sizeTooltip}>
                          <Image
                            src="https://images.tractorgyan.com/uploads/114120/66a8b8690664c-informationTableIcon.png"
                            height={15}
                            width={15}
                            alt="information-icon"
                            title="information-icon"
                            className="h-[15px] w-full min-w-[15px] max-w-[15px]"
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <span className="text-sm font-medium text-black">{tyreDetail.tyre_size}</span>
                    </div>
                  </li>
                  <li className="flex gap-10 px-2 py-[13px]">
                    <div className="flex w-1/2 items-center justify-between">
                      <span className="text-xs font-normal text-gray-dark">
                        {translation.tyreDetails.warranty}
                      </span>
                      {/* Assuming Tooltip for warranty info is not interactive or can be static */}
                      <Image
                        src="https://images.tractorgyan.com/uploads/114120/66a8b8690664c-informationTableIcon.png"
                        height={15}
                        width={15}
                        alt="information-icon"
                        title="information-icon"
                        className="h-[15px] w-full min-w-[15px] max-w-[15px]"
                      />
                    </div>
                    <div className="w-1/2">
                      <span className="text-sm font-medium text-black">{tyreDetail.warranty}</span>
                    </div>
                  </li>
                </ul>
              )}
            </div>
            <div className="mb-4">
              <div
                className={`${!isOpen2 && 'rounded-b-lg'
                  } flex items-center justify-between gap-3 rounded-t-lg bg-primary p-4 text-base font-semibold leading-[18px] text-white shadow-main`}
              >
                <h3>{`${tyreDetail.brand_name} ${tyreDetail.model_name} ${translation.tyreDetails.featuresAndBenefits}`}</h3>
                <button onClick={toggleDropdown2}>
                  <Image
                    src={`${isOpen2
                      ? 'https://images.tractorgyan.com/uploads/114119/66a8b1e63149d-upArrowFeature.png'
                      : 'https://images.tractorgyan.com/uploads/114118/66a8b19bd6d66-featureTableDown.png'
                      }`}
                    height={20}
                    width={20}
                    alt="toggle-button-image"
                    title="toggle-button-image"
                    className="h-5 w-full min-w-5 max-w-5"
                  />
                </button>
              </div>
              {isOpen2 && (
                <ul className="rounded-b-lg bg-white p-2 shadow-main">
                  {features?.map((feature, index) => (
                    <li
                      key={index}
                      className={`w-full px-2 py-[13px] text-xs font-normal leading-[14px] text-gray-dark ${index !== features?.length - 1 ? 'border-b-[1px] border-gray-light' : ''
                        }`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Data Last Updated On can remain in the non-interactive part if it's static */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TyreDetailsClientInteractions;
