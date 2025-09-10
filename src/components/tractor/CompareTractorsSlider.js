'use client';
import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Image from 'next/image';
import CompareTractorsSection from './CompareTractorsSection';

const CompareTractorsSlider = ({ cta, currentTractor, compareTractors, isMobile, currentLang, isComparisonPage = false }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Calculate if we need slider controls based on content and screen size
  const getSlidesToShow = screenWidth => {
    if (screenWidth <= 480) return 1;
    return 2;
  };

  // Determine if we need slider controls
  const needsSlider = () => {
    const currentSlidesToShow = getSlidesToShow(windowWidth);
    return compareTractors && compareTractors.length > currentSlidesToShow;
  };

  const showControls = needsSlider();

  const ArrowButton = ({ onClick, position, rotate = false, alt }) => {
    return (
      <div
        className={`absolute ${showControls ? 'bottom-[-1.5rem]' : 'bottom-0'} ${position} z-10 h-7 w-7 translate-x-1/2 transform cursor-pointer overflow-hidden rounded-full`}
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
    <ArrowButton onClick={onClick} position="right-[30%] md:right-[40%]" alt="next-button-icon" />
  );

  // TODO:: Refactor
  const PrevArrow = ({ onClick }) => (
    <ArrowButton
      onClick={onClick}
      position="left-[calc(30%_-_20px)] md:left-[calc(40%_-_16px)]"
      rotate
      alt="previous-button-icon"
    />
  );

  const settings = {
    dots: showControls,
    arrows: showControls,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: showControls ? <NextArrow /> : null,
    prevArrow: showControls ? <PrevArrow /> : null,
  };

  return (
    <div className='relative w-full'>
      <Slider {...settings} className="custom-gap-slider compare-tractors-slider">
        {compareTractors?.map((compareTractor, index) => (
          <div className="w-full flex gap-4 mb-4">
            <CompareTractorsSection
              cta={cta}
              viewMode={true}
              itemsToShow={2}
              // currentTractor={currentTractor}
              // compareTractor={compareTractor || null}
              currentTractor={isComparisonPage ? compareTractor?.tractor1 : currentTractor}
              compareTractor={isComparisonPage ? compareTractor?.tractor2 : compareTractor || null}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompareTractorsSlider;
