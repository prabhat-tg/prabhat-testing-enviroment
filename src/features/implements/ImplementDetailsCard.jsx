"use client";
import React from "react";

import { tgi_arrow_right_white, tgi_star } from "@/src/utils/assets/icons";

import TractorMainSlider from "../secondHand/secondHandDetails/TractorMainSlider";
import TG_Button from "@/src/components/ui/buttons/MainButtons";
import Tooltip from "@/src/features/tyreComponents/commonComponents/Tooltip";
import SocialMediaLinksShare from "@/src/components/shared/social-media/SocialMediaShare";
import Image from "next/image";
import TG_LinkButton from "@/src/components/ui/buttons/TgLinkButton";

const ImplementDetailsCard = ({
  implementId,
  implementDetail,
  isMobile,
  currentLang = 'en'
}) => {

  const tooltipContent = "Mahindra 575 Di Xp Plus Price range is between Rs 685000 to 732000*. Mahindra 575 Di Xp Plus horsepower is 47 hp. Its Fuel tank capacity is NA. Mahindra 575 Di Xp Plus has 4 cylinders, 2979 CC engine with 2000 engine rpm. Other key specifications of this tractor are 42 Pto hp, 1500 Kg lifting capacity, 8 Forward + 2 Reverse gears, Single (std) / Dual clutch with RCRPTO (Optional) clutch with Oil Immersed Brake.";

  const productHighlight = [
    { label: 'Power', value: implementDetail?.implement_power || 'NA' },
    { label: 'Height', value: implementDetail?.Height || 'NA' },
    { label: 'Length', value: implementDetail?.Length || 'NA' },
    // { label: 'Width', value: implementDetail?.width || 'NA' },
    { label: 'Warranty', value: implementDetail?.warrant || 'NA' },
    { label: 'Wheel Base', value: implementDetail?.wheel || 'NA' },
    { label: 'Capacity', value: implementDetail?.capacity || 'NA' },
  ];

  const scrollToSection = scrollTarget => {
    const element = document.getElementById(scrollTarget);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with id "${scrollTarget}" not found for scrolling.`);
    }
  };

  const renderHighlightItem = (label, value) => (
    <div className="flex basis-[calc(33.333%-0.5rem)] md:basis-[calc(33.333%-.75rem)] w-1/3 flex-col items-center justify-center p-2 rounded-lg bg-green-lighter border border-gray-light">
      <span className="text-xs font-normal text-gray-dark text-center">
        {label}
      </span>
      <span className="text-base font-semibold text-black text-center">
        {value}
      </span>
    </div>
  );

  return (
    <div className="justify-around rounded-2xl md:flex md:shadow-main md:p-6">
      <Tooltip content={tooltipContent}>
        <h1 className="mb-2 block md:hidden cursor-pointer text-lg font-bold text-black md:text-2xl">
          {` ${implementDetail.brand_name}  ${implementDetail.model_name}`}
        </h1>
      </Tooltip>
      <div className="block md:hidden md:block md:pb-4 text-sm text-gray-description">
        Category: Landscaping
      </div>
      <div className="relative h-full w-full pt-3 md:max-h-[480px] md:max-w-[350px] lg:max-w-[335px] xl:max-w-[350px]">
        <TractorMainSlider
          title={` ${implementDetail.brand_name_en}  ${implementDetail.model} image`}
          imgUrl={`/${implementDetail.image}`} // TODO:: API is not returning array of images
          // imgUrl={implementDetail.images}
          brandLogo={implementDetail.brand_logo}
          showThumbnails={false}
          isPopular={implementDetail?.popular_implement === 'Yes'}
        />
      </div>
      <div className="mt-8 w-full rounded-2xl p-4 md:pl-6 md:pr-0 md:py-0 shadow-main md:mt-2 md:max-w-[370px] md:shadow-none lg:max-w-[335px] xl:max-w-[450px]">
        <Tooltip content={tooltipContent}>
          <h1 className="mb-2 hidden cursor-pointer text-lg font-bold text-black md:text-2xl xl:block">
            {currentLang === 'en' ?
              (
                <>
                  {`${implementDetail.brand_name_en}  ${implementDetail.model}`}
                </>
              ) : (
                <>
                  {`${implementDetail.brand_name_hi}  ${implementDetail.model_hi}`}
                </>
              )
            }
          </h1>
        </Tooltip>
        <div className="hidden md:block pb-4 text-sm text-gray-description">
          Category: {implementDetail?.category_name}
        </div>
        <h5 className="mb-4 text-lg font-semibold text-black">
          Highlights
        </h5>
        <div className="mb-6 mt-4 flex flex-wrap justify-between gap-2 md:gap-4 min-h-[62px]">
          {productHighlight.map(({ label, value }) => renderHighlightItem(label, value))}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Share</span>
            <SocialMediaLinksShare />
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="flex text-sm gap-2">
              2.5
              <Image
                src={tgi_star}
                height={20}
                width={20}
                alt="star-icon"
                title="star-icon"
                className="w-4 h-4"
              />
              (25)
            </span>
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
                {isMobile ? 'Review Implement' : 'Review this Implement'}
              </span>
            </button>
          </div>
        </div>
        <div className="mt-6 w-full flex md:flex-col gap-2 md:gap-4">
          {/* <TG_Button
            className='w-full md:flex-1'
            icon={tgi_arrow_right_white}
            iconPosition="right"
          >
            ₹ Get Best Implement Price
          </TG_Button> */}
          <TG_LinkButton
            variant="primary"
            href={implementDetail?.road_price_url}
            iconSrc={tgi_arrow_right_white}
            iconClass="w-3"
            className="rounded-md w-full md:flex-1"
          >
            ₹ Get Best Implement Price
          </TG_LinkButton>
        </div>
      </div>
    </div>
  );
};

export default ImplementDetailsCard;
