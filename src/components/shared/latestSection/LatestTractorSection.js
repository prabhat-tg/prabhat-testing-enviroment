"use client";
import React from "react";
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import LatestTractorCard from './LatestTractorCard';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestTractorSection = ({
  heading,
  bgColor,
  translation,
  isMobile,
  popularData,
  langPrefix,
  cta,
  redirectRoute = '/tyres',
  popularDataError,
  type = 'tractor',
  showViewAll = true
}) => {

  console.log("popularData in latest section:", popularData);

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
    <ArrowButton onClick={onClick} position="right-[20%] md:right-[40%]" alt={translation?.buttons?.nextButtonIcon || "Next Button"} />
  );

  const PrevArrow = ({ onClick }) => (
    <ArrowButton onClick={onClick} position="left-[15%] md:left-[40%]" rotate alt={translation?.buttons?.previousButtonIcon || "Previous Button"} />
  );

  const settings = {
    dots: true,
    centerMode: true,
    className: "center",
    centerPadding: "32px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (popularDataError) {
    return (
      <div className="py-5 text-center">
        <p>
          {translation?.error_messages?.popularTractorsUnavailable ||
            translation?.error_messages?.latestImplementsUnavailable ||
            'Content is currently unavailable.'}
        </p>
      </div>
    );
  }

  return (
    <section className={`${bgColor ? bgColor : ''}`}>
      <div className="container">
        <MainHeadings text={heading || translation?.headerNavbar?.latestImplements || 'Latest Tractors'} />
        {!isMobile ? (
          <div className="mb-8 grid grid-cols-4 gap-4 2xl:gap-8">
            {popularData?.slice(0, 4).map((item, index) => {
              return (
                <LatestTractorCard
                  key={index}
                  isMobile={isMobile}
                  langPrefix={langPrefix}
                  brand={item.brand}
                  model={item.model}
                  cylinder={item.cylinder}
                  lifting_capacity={item.lifting_capacity}
                  imgUrl={item.image}
                  hp={item.hp}
                  pageUrl={item.page_url}
                  translation={translation}
                  type={type}
                  power={item.power}
                  width={item.width}
                  warranty={item.warranty}
                />
              );
            })}
          </div>
        ) : (
          <div className="mb-10">
            <Slider {...settings} className="latest-section-slider pb-4 -ml-8">
              {popularData?.slice(0, 4).map((item, index) => (
                <LatestTractorCard
                  key={index}
                  isMobile={isMobile}
                  langPrefix={langPrefix}
                  brand={item.brand}
                  model={item.model}
                  cylinder={item.cylinder}
                  lifting_capacity={item.lifting_capacity}
                  imgUrl={item.image}
                  hp={item.hp}
                  pageUrl={item.page_url}
                  translation={translation}
                  type={type}
                  power={item.power}
                  width={item.width}
                  warranty={item.warranty}
                />
              ))}
            </Slider>
          </div>
        )}
        {showViewAll ? <MainButton
          text={cta ? cta : translation.buttons.viewAllPopularTractor}
          linkUrl={`${langPrefix == 'en' ? '' : langPrefix}${redirectRoute}`}
        /> : null}
      </div>
    </section>
  );
};

export default LatestTractorSection;
