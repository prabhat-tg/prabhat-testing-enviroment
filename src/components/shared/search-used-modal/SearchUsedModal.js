"use client";

import React from "react";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";

const SearchUsedModal = ({
  langPrefix = "",
  data = [],
  isMobile = false,
  heading,
  buttonText,
}) => {
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
    slidesToShow: 2.1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };

  const Card = ({ item }) => (
    <Link
      href={item.url}
      className="p-2 py-4 lg:p-4 lg:py-6 rounded-lg w-full flex flex-col justify-center items-center bg-white shadow-bottom max-md:mb-2 border border-transparent hover:border-secondary hover:bg-green-lighter"
    >
      <h6 className="font-semibold text-xs md:text-sm text-black text-center">
        {item.text}
      </h6>
    </Link>
  );

  return (
    <section className="bg-section-white ">
      <div className="container">
        <MainHeadings text={heading} />
        {/* {isMobile ? (
          <Slider {...sliderSettings} className="custom-slider py-2 h-full">
            {groupIntoPairs(data).map((pair, index) => (
              <div key={index} className="flex flex-col gap-4 px-2">
                {pair.map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </div>
            ))}
          </Slider>
        ) : ( */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 boxShadow-searchUsed">
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>

        {/* )} */}
        {buttonText && (
          <div className="flex justify-center mt-8">
            <MainButton text={buttonText} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchUsedModal;
