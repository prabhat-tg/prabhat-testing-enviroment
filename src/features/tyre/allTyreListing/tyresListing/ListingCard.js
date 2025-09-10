import { tgi_arrow_right } from "@/src/utils/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { useTranslation } from "react-i18next";
const ListingCard = ({
  popularTyre,
  brandName,
  modelName,
  imgUrl,
  tyreSize,
  tyreType,
  tyreUrl,
  pageUrl,
  currentLang,
  translation,
}) => {
  // const { t, i18n } = useTranslation()
  // const currentLang = i18n.language;
  currentLang = currentLang === "hi" ? "/hi" : "";
  return (
    <div className="relative flex h-auto w-full gap-3 overflow-hidden rounded-2xl border-[1px] border-gray-light bg-white p-4 hover:border-secondary hover:bg-green-lighter lg:w-[49%] lg:gap-3 xl:w-[49%]">
      <div className="relative flex h-full w-[35%] md:w-[40%] max-w-[140px] items-center justify-center md:min-w-[140px] md:max-w-[150px]">
        {popularTyre === "Yes" && (
          <div className="absolute min-w-[160px] left-[-70px] md:left-[-60px] -top-0.5 md:top-0.5 flex h-5 w-full -rotate-45 items-center justify-center bg-green-dark-gradient py-4">
            <span className="text-xs font-bold text-white">Popular</span>
          </div>
        )}
        <Link
          href={currentLang + pageUrl}
          title={brandName + " " + modelName + " image"}
          aria-label={`know more about ${brandName} in india`}
        >
          <Image
            src={
              `https://images.tractorgyan.com/uploads/${imgUrl}` ||
              "/MRF-Shakti-Super.png"
            }
            height={500}
            width={500}
            alt={brandName + " " + modelName + " image"}
            title={brandName + " " + modelName + " image"}
            className="minh-[90px] h-auto max-h-[100px] w-auto"
          />
        </Link>
      </div>
      <div className="h-full w-[65%] md:w-[60%] sm:w-1/2 md:w-full">
        <div>
          <Link
            href={currentLang + pageUrl}
            title={brandName + " " + modelName}
            aria-label={`know more about ${brandName} in india`}
          >
            <h5 className="mb-1.5 text-sm font-semibold text-gray-dark sm:mb-3 md:text-lg">
              {brandName} {modelName}
            </h5>
          </Link>
          <div className="mb-1.5 flex items-center gap-4 sm:mb-3">
            <span className="text-xs font-normal text-gray-main">
              <span className="text-black">{translation.headings.size} </span>:{" "}
              {tyreSize}
            </span>
            <span className="text-xs font-normal text-gray-main">
              <span className="text-black">{translation.headings.type} </span> :{" "}
              {tyreType}
            </span>
          </div>
        </div>
        <Link
          href={currentLang + pageUrl}
          title={brandName + " " + modelName + " price"}
          aria-label={`know more about ${brandName} in india`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
        >
          ₹ {translation.buttons.viewTyrePrice}
          <Image
            src={tgi_arrow_right}
            height={50}
            width={50}
            alt="arrow-icon"
            title="arrow-icon"
            className="h-2.5 w-2.5"
          />
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
