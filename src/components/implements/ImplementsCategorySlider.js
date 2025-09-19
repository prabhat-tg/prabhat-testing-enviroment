"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TG_Button from "../ui/buttons/MainButtons";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import Link from "next/link";

const ImplementsCategorySlider = ({ heading, categories, cta, isMobile, itemsShown = 5, bgColor = 'bg-white', currentLang }) => {
  const ImplementCategoryCard = ({
    title,
    url,
    className
  }) => {
    return (
      <Link href={`/${url}`}>
        <div className={`${className} p-3 flex flex-col items-center justify-center rounded-lg shadow-bottom border border-gray-light hover:border-secondary hover:bg-green-lighter`}>
          <h2 className="text-sm md:text-md font-semibold text-center text-nowrap">{title}</h2>
        </div>
      </Link>
    );
  };

  const ArrowButton = ({ onClick, position, rotate = false, alt }) => {
    return (
      <div
        className={`absolute bottom-[-1.5rem] ${position} h-7 w-7 transform translate-x-1/2 cursor-pointer overflow-hidden rounded-full z-10`}
        onClick={onClick}
      >
        <Image
          src="https://images.tractorgyan.com/uploads/113917/6699f70b8b797-carousleRightArrow.webp"
          alt={alt}
          title={alt}
          height={50}
          width={50}
          className={`h-full w-full ${rotate ? 'rotate-180' : ''}`}
        />
      </div>
    );
  };

  const NextArrow = ({ onClick }) => (
    <ArrowButton onClick={onClick} position="right-[20%] md:right-[40%]" alt="next-button-icon" />
  );

  const PrevArrow = ({ onClick }) => (
    <ArrowButton onClick={onClick} position="left-[15%] md:left-[40%]" rotate alt="previous-button-icon" />
  );

  const settings = {
    // dots: true,
    dots: isMobile,
    speed: 500,
    slidesToShow: itemsShown,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: isMobile ? <NextArrow /> : false,
    prevArrow: isMobile ? <PrevArrow /> : false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={bgColor}>
      <div className="container relative w-full">
        {heading && (
          <MainHeadings text={heading} />
        )}
        <Slider {...settings} className="custom-gap-slider pb-4">
          {categories?.map((category, index) => (
            index % 2 === 0 && (
              <div key={index}>
                <ImplementCategoryCard
                  title={currentLang == 'hi' ? category.name_hi : category.name}
                  url={category.url}
                  className="mb-6"
                />
                {categories[index + 1] && (
                  <ImplementCategoryCard
                    title={currentLang == 'hi' ? categories[index + 1].name_hi : categories[index + 1].name}
                    url={categories[index + 1].url}
                    className="mb-6"
                  />
                )}
              </div>
            )
          ))}
        </Slider>
        {cta && (
          <div className="mt-10 md:mt-0 flex justify-center w-full">
            <TG_Button>{cta}</TG_Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImplementsCategorySlider;
