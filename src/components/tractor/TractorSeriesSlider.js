'use client';
import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import TractorSeriesCard from '../ui/cards/TractorSeriesCard';
import Image from 'next/image';

const TractorSeriesSlider = ({ tractors, itemsShown = 4, isMobile, currentLang }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate if we need slider controls based on content and screen size
  const getSlidesToShow = screenWidth => {
    if (screenWidth <= 480) return 2;
    if (screenWidth <= 600) return 2;
    if (screenWidth <= 1200) return 3;
    return itemsShown;
  };

  // Determine if we need slider controls
  const needsSlider = () => {
    const currentSlidesToShow = getSlidesToShow(windowWidth);
    return tractors && tractors.length > currentSlidesToShow;
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
    slidesToShow: itemsShown,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: showControls ? <NextArrow /> : null,
    prevArrow: showControls ? <PrevArrow /> : null,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: tractors && tractors.length > 3,
          arrows: tractors && tractors.length > 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: tractors && tractors.length > 2,
          arrows: tractors && tractors.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: tractors && tractors.length > 2,
          arrows: tractors && tractors.length > 2,
        },
      },
    ],
  };

  return (
    <div className={`relative w-full ${showControls ? 'mb-6' : ''}`}>
      <Slider {...settings} className="custom-gap-slider">
        {tractors?.map((tractor, index) => (
          <TractorSeriesCard
            key={index}
            title={tractor.title}
            imgSrc={tractor.img}
            href={(currentLang == 'hi' ? '/hi' : '') + tractor.url}
            className={showControls ? 'mb-6' : 'mb-2'}
          />
        ))}
      </Slider>
    </div>
  );
};

export default TractorSeriesSlider;
