import Image from "next/image";
import Link from "next/link";
import React from "react";
import TG_Button from "../../buttons/MainButtons";
import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";
import { tgi_arrow_right_white } from "@/src/utils/assets/icons";

const SecondHandTractorMobileCard = ({
  brandName,
  modelName,
  pageUrl,
  currentLang,
  buttonText,
}) => {
  currentLang = currentLang === "hi" ? "/hi" : "";

  return (
    <>
      <div className="w-full h-auto bg-white hover:bg-green-lighter rounded-2xl border border-gray-light hover:border-secondary flex flex-col overflow-hidden">
        {/* Image Section on Top */}
        <div className="relative w-full h-[180px] sm:h-[200px] rounded-t-2xl overflow-hidden">
          <Link
            href={currentLang + pageUrl}
            title={`${brandName} ${modelName} image`}
            aria-label={`know more about ${brandName} in India`}
          >
            <Image
              src={"/assets/images/buy-used-tractor.svg"}
              fill
              alt={`${brandName} ${modelName} image`}
              title={`${brandName} ${modelName} image`}
              className="object-cover"
            />
          </Link>
        </div>

        {/* Details Section Below */}
        <div className="p-4 flex flex-col gap-3">
          {/* Location & Views */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-[#4CAF50] text-[14px] font-medium">
              <Image
                src="/assets/images/address-icon.svg"
                height={20}
                width={20}
                alt="Location icon"
                className="h-5 w-5"
              />
              <span className="text-gray-dark">Faridabad, Haryana</span>
            </div>
            <div className="flex items-center gap-1 bg-red-viewsBG text-white font-medium px-2 py-1 rounded-full">
              <Image
                src="https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp"
                height={16}
                width={16}
                alt="views-icon"
                className="w-4 h-4 object-contain"
              />
              <span className="text-xs">250+ Views</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-black text-[16px] font-bold leading-snug line-clamp-2">
            Second Hand Swaraj 744 XT Tractor
          </h3>

          {/* Info Stats */}
          <div className="bg-green-lighter rounded-lg border border-green-mint flex text-center text-xs font-medium overflow-hidden">
            <div className="w-1/3 py-2">
              <div className="text-gray-dark">Purchase</div>
              <div className="text-black text-sm font-semibold">2016</div>
            </div>
            <div className="w-1/3 py-2 border-x border-green-mint">
              <div className="text-gray-dark">Running</div>
              <div className="text-black text-sm font-semibold">0-1000 Hrs</div>
            </div>
            <div className="w-1/3 py-2">
              <div className="text-gray-dark">Condition</div>
              <div className="text-black text-sm font-semibold">Very Good</div>
            </div>
          </div>

          {/* Price and EMI */}
          <div className="flex justify-between items-center">
            <div className="text-[18px] text-green-lightest font-bold">
              ₹ 8.90 Lakh
            </div>
            <div className="text-[12px] text-green-dark">
              <span className="text-gray-dark text-sm">EMI Starts:</span>
              <span className="text-black text-sm font-semibold">
                {" "}
                ₹ 19,251*
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <TG_Button
              variant="outline"
              icon="https://images.tractorgyan.com/uploads/119912/68467f5fec55b-green-arrow.webp"
            >
              Share
            </TG_Button>
            <TG_Button
              icon={tgi_arrow_right_white}
              iconPosition="right"
            >
              View Tractor
            </TG_Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-3">
        <span className="text-gray-dark">
          Data Last Updated On : 13 May, 2024
        </span>
      </div>
      {buttonText && (
        <div className="flex justify-center my-3">
          <MainButton text={buttonText} />
        </div>
      )}
    </>
  );
};

export default SecondHandTractorMobileCard;
