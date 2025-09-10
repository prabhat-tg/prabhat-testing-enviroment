"use client";
import React, { useState, useEffect } from "react";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";
import SecondHandTractorCard from "@/src/components/ui/cards/secondHandTractorCards/SecondHandTractorCard";
import TG_Button from "@/src/components/ui/buttons/MainButtons";

const OtherSecondHandTractor = ({
  data = [],
  isMobile = false,
  heading,
  bgColor,
  buttonText,
  currentLang,
  translation,
}) => {
  const tractors = [
    {
      id: 1,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "/assets/images/second-hand-tractor.svg",
      hp: "47",
      year: "2020",
      cylinders: "3",
      weight: "2000kg",
      price: "₹ 2.5 Lacs",
    },
    {
      id: 2,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "/assets/images/second-hand-tractor.svg",
      hp: "52",
      year: "2021",
      cylinders: "3",
      weight: "2100kg",
      price: "₹ 3.5 Lacs",
    },
    {
      id: 3,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "/assets/images/second-hand-tractor.svg",
      hp: "48",
      year: "2022",
      cylinders: "3",
      weight: "2050kg",
      price: "₹ 6.9 Lacs",
    },
    {
      id: 4,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "/assets/images/second-hand-tractor.svg",
      hp: "50",
      cylinders: "3",
      year: "2023",
      weight: "2200kg",
      price: "₹ 7.9 Lacs",
    },
  ];

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
    <section className={`${bgColor || ""}`}>
      <div className="container">
        <div className="flex justify-between my-3">
          <MainHeadings text={heading} />
          {!isMobile && 
            <div>
              <TG_Button>Sell Your Tractor</TG_Button>
            </div>
          }
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
                    <SecondHandTractorCard data={tractor} pageUrl="/second-hand-tractor/test-id" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Desktop View: Grid
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tractors.map((tractor) => (
                <div key={tractor.id} className="col-span-1">
                  <SecondHandTractorCard data={tractor} verticalView={true} pageUrl="/second-hand-tractor/test-id" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <TG_Button>View All Second Hand Tractors</TG_Button>
            </div>
          </div>
        )}

        {/* Dots & Arrows */}
        {isMobile && (
          <div className="flex justify-center items-center gap-8 mt-6">
            <button
              onClick={handlePrevSlide}
              className="bg-white shadow-sliderIcon text-black w-7 h-7 rounded-full flex items-center justify-center"
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
              className="bg-white shadow-sliderIcon text-black w-7 h-7 rounded-full flex items-center justify-center"
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
        )}
      </div>
    </section>
  );
};

export default OtherSecondHandTractor;
