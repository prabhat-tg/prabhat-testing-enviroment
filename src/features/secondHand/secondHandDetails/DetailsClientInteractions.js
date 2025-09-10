
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Tooltip from "@/src/features/tyreComponents/commonComponents/Tooltip"; // Included as it might be used in the JSX
import TG_Button from "@/src/components/ui/buttons/MainButtons";
import TractorMainSlider from "./TractorMainSlider";
import { tgi_arrow_right_white } from "@/src/utils/assets/icons";
import SocialMediaLinksShare from "@/src/components/shared/social-media/SocialMediaShare";
import TG_Banner from "@/src/components/shared/bannners/Banner";

const DetailsClientInteractions = ({
  tyreId,
  tyreDetail,
  translation,
  features,
  aboutSectionSlot,
  currentLang,
  isMobile
}) => {
  // Added aboutSectionSlot
  const router = useRouter();
  const [isOpen1, setIsopen1] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const scrollToSection = (scrollTarget) => {
    const element = document.getElementById(scrollTarget);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(
        `Element with id "${scrollTarget}" not found for scrolling.`,
      );
    }
  };

  const toggleDropdown1 = () => setIsopen1((pre) => !pre);

  // from TyreDetailsAndFeatures.js
  return (
    <>
      <div className="gap-8 lg:flex">
        {/* Left Column */}
        <div className="flex w-full flex-col gap-8 lg:max-w-[700px] xl:max-w-[900px]">
          {/* Main content section including slider, highlights, share buttons */}
          <div className="justify-around rounded-2xl md:flex md:shadow-main xl:p-4">
            <div className="relative h-full w-full px-4 pt-3 md:max-h-[480px] md:max-w-[350px] lg:max-w-[335px] xl:max-w-[350px]">
              <TractorMainSlider
                title={`${tyreDetail.brand_name} ${tyreDetail.model_name} image`}
                imgUrl={tyreDetail.images}
                showThumbnails={true}
                isSoldOut={true}
              />
            </div>
            <div className="mt-8 w-full rounded-2xl p-6 shadow-main md:mt-2 md:max-w-[370px] md:p-0 md:shadow-none lg:max-w-[335px] xl:max-w-[450px]">
              <Tooltip
                content={` ${tyreDetail.brand_name} ${tyreDetail.model_name} gives the perfect traction in uneven and wet areas. This tyre distributes tractor weight evenly and handles heavy loads easily. It maintains soil structure and reduces compaction. This tyre absorbs uneven ground shocks and provides comfort while driving the tractor. The price of ${tyreDetail.brand_name} ${tyreDetail.model_name} is affordable for Indian farmers. ${tyreDetail.brand_name} ${tyreDetail.model_name} is made of high-quality components and can handle tough farming.`}
              >
                <h1 className="mb-4 hidden cursor-pointer text-lg font-bold text-black md:text-2xl xl:block">
                  Second Hand Swaraj 744 XT
                </h1>
              </Tooltip>
              <div>
                <div className="flex items-center gap-1 text-[14px] font-medium text-[#4CAF50]">
                  <Image
                    src="/assets/images/address-icon.svg"
                    height={50}
                    width={50}
                    alt="share-icon"
                    title="share-icon"
                    className="h-5 w-5"
                  />
                  <span className="text-gray-dark">Faridabad, Haryana</span>
                </div>
                <div className="mb-6 mt-4 flex min-h-[62px] rounded-lg  bg-green-lighter ">
                  <div className="flex w-1/3 flex-col items-center justify-center py-2.5">
                    <span className="text-xs font-normal text-gray-dark">
                      HP
                    </span>
                    <span className="text-base font-semibold text-black">
                      45
                    </span>
                  </div>
                  <div className="flex w-1/3 flex-col items-center justify-center  py-2.5">
                    <span className="text-xs font-normal text-gray-dark">
                      Purchase
                    </span>
                    <span className="text-base font-semibold text-black">
                      2016
                    </span>
                  </div>
                  <div className="flex w-1/3 flex-col items-center justify-center  py-2.5">
                    <span className="text-xs font-normal text-gray-dark">
                      Running
                    </span>
                    <span className="text-base font-semibold text-black">
                      0-1000 Hrs
                    </span>
                  </div>
                  <div className="flex w-1/3 flex-col items-center justify-center py-2.5">
                    <span className="text-xs font-normal text-gray-dark">
                      Condition
                    </span>
                    <span className="text-base font-semibold text-black">
                      Very Good
                    </span>
                  </div>
                </div>
                {/* Price and Action */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-[18px] font-bold text-green-lightest">₹ 8.90 Lakh</div>
                  <div className="text-[12px] text-green-dark"
                    onClick={() => scrollToSection('emi-calculator-section')}
                  >
                    <span className="text-sm text-gray-dark">EMI Starts:</span>
                    <span className="text-sm font-semibold text-black">₹ 19,251*, </span>
                    <span className="text-sm font-semibold text-black">Check EMI</span>
                  </div>
                </div>
                <div className="mt-6 w-full flex gap-4">
                  <TG_Button
                    className="flex-1"
                    icon={tgi_arrow_right_white}
                    iconPosition="right"
                  >
                    Contact Seller
                  </TG_Button>
                  <TG_Button className="flex-2" variant="outline">
                    Apply for Loan
                  </TG_Button>
                </div>

                <div className="w-full my-3 h-[0.125rem] bg-[repeating-linear-gradient(to_right,_theme(colors.gray.light)_0,_theme(colors.gray.light)_0.5rem,_transparent_0.5rem,_transparent_1rem)]"></div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm font-semibold">Share</span>
                  <SocialMediaLinksShare />
                </div>
                {/* TODO:: Upload and Update Icons */}
                <div className="flex items-center justify-center gap-4 bg-section-gray mt-3 rounded-xl p-3 shadow">
                  {/* Report as Fraud Button */}
                  <button className="flex items-center gap-2 text-error-report font-semibold hover:font-bold">
                    <img
                      src="https://img.icons8.com/emoji/48/000000/warning-emoji.png"
                      alt="Fraud Icon"
                      className="w-5 h-5 "
                    />
                    Report as Fraud
                  </button>

                  {/* Divider */}
                  <span className="h-4 w-0.5 bg-black"></span>
                  {/* Report Sold Out Button */}
                  <button className="flex items-center gap-2 text-green-soldOut font-semibold hover:font-bold">
                    <img
                      src="https://img.icons8.com/emoji/48/000000/warning-emoji.png"
                      alt="Sold Out Icon"
                      className="w-5 h-5"
                    />
                    Report Sold Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Render the passed-in aboutSectionSlot here */}
          {!isMobile && (
            <>
              {aboutSectionSlot}
            </>
          )}
        </div>
        {/* Rig ht Column (Technical Specifications and Features/Benefits Dropdowns) */}
        <div className="relative mt-4 h-full w-full lg:max-w-[Calc(100%_-_700px)] xl:mt-0 xl:max-w-[Calc(100%_-_932px)]">
          <div className="sticky bottom-0 top-0">
            {!isMobile && (
              <div className="mb-4">
                <TG_Banner
                  imgUrl='https://placehold.co/300x200/00522e/FFF?text=Custom+Ad+Banner+300x200'
                  imageClasses="max-h-[200px]"
                  unoptimized={true}
                />
              </div>
            )}
            <div className="mb-4">
              <div
                className={`${!isOpen1 && "rounded-b-lg"
                  } flex items-center justify-between gap-3 rounded-t-lg bg-primary p-4 text-base font-semibold leading-[18px] text-white shadow-main`}
              >
                <h3>{`Technical Specifications`}</h3>
                <button onClick={toggleDropdown1}>
                  <Image
                    src={`${isOpen1
                        ? "https://images.tractorgyan.com/uploads/114119/66a8b1e63149d-upArrowFeature.png"
                        : "https://images.tractorgyan.com/uploads/114118/66a8b19bd6d66-featureTableDown.png"
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
                        Brand
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
                        Model
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
                        Size
                      </span>
                      <div className="">
                        <Tooltip
                          content={
                            "First no. indicates tractor tyre width, second no. indicates rim diameter."
                          }
                        >
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
                      <span className="text-sm font-medium text-black">
                        {tyreDetail.tyre_size}
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-10 px-2 py-[13px]">
                    <div className="flex w-1/2 items-center justify-between">
                      <span className="text-xs font-normal text-gray-dark">
                        Warranty
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
                      <span className="text-sm font-medium text-black">
                        {tyreDetail.warranty}
                      </span>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsClientInteractions;
