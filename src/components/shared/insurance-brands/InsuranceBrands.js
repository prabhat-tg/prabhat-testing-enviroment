"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";

const InsuranceBrands = ({ isMobile, translation, brands, sectionClasses }) => {
  const groupIntoPairs = (list) => {
    const pairs = [];
    for (let i = 0; i < list.length; i += 2) {
      pairs.push(list.slice(i, i + 2));
    }
    return pairs;
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 2.1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
  };

  const Card = ({ imgUrl, name, url }) => {
    return (
      <Link
        href={url}
        title={name + " image"}
        className="w-full"
      >
        <div className="p-4 mb-2 flex h-[80px] md:h-[120px] items-center justify-center rounded-xl border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter md:mb-4">
          <Image
            src={imgUrl}
            height={300}
            width={300}
            alt={name}
            title={name}
            className="w-full h-auto max-h-full object-contain"
            unoptimized // Remove this when using images from API
          />
        </div>
        <p className="mb-2 text-center text-xs md:text-sm font-medium">
          {name}
        </p>
      </Link>
    );
  };

  return (
    <section className={`${sectionClasses} updates-section bg-section-gray`}>
      <div className="container">
        <MainHeadings text="Insurance Brands" />
        {isMobile ? (
          <Slider {...sliderSettings} className="custom-slider h-full py-2">
            {groupIntoPairs(brands).map((pair, index) => (
              <div key={index} className="flex flex-col gap-4 px-2">
                {pair.map((item, i) => (
                  <Card
                    key={i}
                    imgUrl={item.image}
                    name={item.name}
                    url={item.url}
                  />
                ))}
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-6">
            {brands.map((item, index) => (
              <div key={index} className="col-span-1">
                <Card
                  imgUrl={item.image}
                  name={item.name}
                  url={item.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsuranceBrands;
