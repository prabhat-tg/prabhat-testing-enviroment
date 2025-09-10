"use client";

import React from "react";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
// import tractorsByHp from "@/src/data/tractorsByHP.json";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTractorHPs } from "@/src/services/tractor/get-tractor-hps";

const tractorHPs = await getTractorHPs();

const SelectHP = ({ langPrefix, isMobile, translation, sectionClasses }) => {
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

  const Card = ({ item }) => (
    <Link
      href={langPrefix == 'hi' ? '/hi' + item.page_url : item.page_url}
      // href={item.url}
      className="flex w-full flex-col items-center justify-center rounded-lg border-[1px] border-transparent bg-white p-2 py-4 shadow-bottom hover:border-secondary hover:bg-green-lighter max-md:mb-2 lg:p-4 lg:py-6"
    >
      <span className="text-gray-dark">HP</span>
      <h6 className="text-center text-base font-semibold text-black lg:text-xl">
        {item.title}
        {/* {item.text} */}
      </h6>
    </Link>
  );

  return (
    <section className={`${sectionClasses} updates-section bg-section-gray`}>
      <div className="container">
        <MainHeadings text={translation.headings.selectHP} />
        {isMobile ? (
          <Slider {...sliderSettings} className="custom-slider h-full py-2">
            {groupIntoPairs(tractorHPs).map((pair, index) => (
              // {groupIntoPairs(tractorsByHp).map((pair, index) => (
              <div key={index} className="flex flex-col gap-4 px-2">
                {pair.map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex flex-wrap gap-2 md:gap-6">
            {tractorHPs.map((item, index) => (
              // {tractorsByHp.map((item, index) => (
              <div key={index} className="w-[30%] md:w-[15%]">
                <Card item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectHP;
