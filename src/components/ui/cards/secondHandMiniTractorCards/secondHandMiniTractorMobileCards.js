"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import TG_Button from "../../buttons/MainButtons";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";
import { tgi_arrow_right_white } from "@/src/utils/assets/icons";

const tractors = [
  {
    id: 1,
    name: "Massey Ferguson 6028 Mahindra Wide Track Series",
    image: "/assets/images/buy-used-tractor.svg",
    hp: "47",
    year: "2020",
    cylinders: "3",
    weight: "2000kg",
    price: "₹ 2.5 Lacs",
  },
  {
    id: 2,
    name: "Massey Ferguson 6028 Mahindra Wide Track Series",
    image: "/assets/images/buy-used-tractor.svg",
    hp: "52",
    year: "2021",
    cylinders: "3",
    weight: "2100kg",
    price: "₹ 3.5 Lacs",
  },
  {
    id: 3,
    name: "Massey Ferguson 6028 Mahindra Wide Track Series",
    image: "/assets/images/buy-used-tractor.svg",
    hp: "48",
    year: "2022",
    cylinders: "3",
    weight: "2050kg",
    price: "₹ 6.9 Lacs",
  },
  {
    id: 4,
    name: "Massey Ferguson 6028 Mahindra Wide Track Series",
    image: "/assets/images/buy-used-tractor.svg",
    hp: "50",
    cylinders: "3",
    year: "2023",
    weight: "2200kg",
    price: "₹ 7.9 Lacs",
  },
];

const TractorCard = ({ image, name, hp, year, price }) => (
  <div className="bg-white rounded-lg shadow-bottom overflow-hidden hover:shadow-xl transition-shadow border border-[#DDDDDD] flex flex-col h-full relative">
    <div className="absolute top-5 left-0 w-[200px]">
      <div className="absolute -top-1 -left-12 w-[180px] h-[43px] rotate-[-45deg] bg-gradient-to-r from-[#015401] via-[#46AA48] to-[#015401] text-white text-center text-sm font-bold py-3 shadow-md z-10">
        For Sell
      </div>
    </div>

    <div className="flex flex-col justify-between h-full">
      <div className="relative w-full h-52">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="px-3 pt-2">
        <div className="flex items-center gap-1 text-[#4CAF50] text-[14px] font-medium">
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
      </div>

      <h3 className="mb-3 line-clamp-2 text-black text-[18px] font-roboto font-bold px-3 pt-2 min-h-[50px]">
        {name}
      </h3>

      <div className="py-[6px] mt-2 bg-white rounded-[8.15px] grid grid-cols-3 text-center text-[#182C3D] mb-4 mx-auto ml-2">
        <div className="border-r border-[#46AA48] flex flex-col items-center gap-[2px] mr-3">
          <div className="text-[12px] text-[#595959]">HP</div>
          <div className="text-[18px] font-semibold">{hp}</div>
        </div>
        <div className="border-r border-[#46AA48] flex flex-col items-center gap-[2px]">
          <div className="text-[12px] text-[#595959]">Year</div>
          <div className="text-[18px] font-semibold">{year}</div>
        </div>
        <div className="flex flex-col items-center gap-[2px]">
          <div className="text-[12px] text-[#595959]">Price</div>
          <div className="text-[18px] font-semibold ml-2">{price}</div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mb-3 gap-1">
        <TG_Button
          icon={tgi_arrow_right_white}
          iconPosition="right"
        >
          View Tractor Details
        </TG_Button>
        <label className="text-green-lightest text-sm">
          EMI Starts: ₹ 19,251*
        </label>
      </div>
    </div>
  </div>
);

const SecondHandMiniTractorMobileCards = ({
  langPrefix = "",
  data = [],
  isMobile = false,
  heading,
  bgColor,
  buttonText,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === tractors.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? tractors.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isMobile && tractors.length > 1) {
      const interval = setInterval(handleNextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <section className={`${bgColor ? bgColor : ""}`}>
      <div className="container">
        <div className="flex justify-between items-center my-3">
          <MainHeadings text={heading} />
          {!isMobile && <MainButton text={"Sell Your Tractor"} />}
        </div>

        {/* Mobile View: Slider */}
        {isMobile ? (
          <div className="pt-0 w-full relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {tractors.map((tractor) => (
                  <div key={tractor.id} className="w-full flex-shrink-0">
                    <TractorCard {...tractor} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots & Arrows */}
            <div className="flex justify-center items-center gap-8 mt-6">
              <button
                onClick={handlePrevSlide}
                className="bg-white shadow-md text-black w-7 h-7 rounded-full flex items-center justify-center"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex gap-2">
                {tractors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-[10px] h-[10px] rounded-full ${
                      index === currentSlide
                        ? "bg-[#46AA48]"
                        : "border border-[#AFAFAF] bg-white"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="bg-white shadow-md text-black w-7 h-7 rounded-full flex items-center justify-center"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          // Desktop View: Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tractors.map((tractor) => (
              <TractorCard key={tractor.id} {...tractor} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <MainButton text={"View All Second Hand Tractors"} />
        </div>
      </div>
    </section>
  );
};

export default SecondHandMiniTractorMobileCards;
