// ============ Used At ============
// 1. /tyre/mrf-shakti-3-rib-6-x-16/13
// 2.
// =================================

'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';

const TyreDetailMainSlider = ({ imgUrl, brandLogo, popularTyre, title }) => {
  const isMobile = useIsMobile();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  // Parse imgUrl - handle both string and comma-separated string
  const imageUrls = imgUrl
    ? imgUrl
        .split(',')
        .map(url => url.trim())
        .filter(url => url)
    : [];

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="slider-container hello">
          {/* Main Slider for tyre detail mobile */}
          <div className="relative w-full">
            <div className="flex w-full items-start justify-between">
              <Image
                src={brandLogo}
                height={100}
                width={100}
                className="w-full min-w-[44px] max-w-[44px]"
                alt={'icon-' + title}
                title={title}
              />
              {popularTyre === 'Yes' && (
                <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
                  Popular
                </span>
              )}
            </div>
            <Slider
              infinite={imageUrls.length > 1}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              dots={imageUrls.length > 1}
              autoplay={imageUrls.length > 1}
              autoplaySpeed={2000}
              className="max-h-[260px]"
            >
              {imageUrls.map((image, index) => (
                <Image
                  key={index}
                  src={`https://images.tractorgyan.com/uploads/${image}`}
                  height={500}
                  width={500}
                  alt={`${title} image ${index + 1}`}
                  title={`${title} image ${index + 1}`}
                  className="h-auto w-auto object-contain"
                />
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="slider-container">
          {/* Main Slider for tyre detail page*/}
          <Slider
            asNavFor={nav2}
            ref={sliderRef1}
            dots={imageUrls.length > 1}
            arrows={imageUrls.length > 1}
            infinite={imageUrls.length > 1}
            autoplay={imageUrls.length > 1}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplaySpeed={3000}
            focusOnSelect={true}
          >
            {imageUrls.map((image, index) => (
              <div key={index} className="relative max-h-[300px] w-full">
                <div className="relative flex w-full items-start justify-between">
                  <div className="h-auto w-full min-w-[44px] max-w-[65px]">
                    {brandLogo && (
                      <Image
                        src={brandLogo}
                        height={50}
                        width={50}
                        alt={'brand-icon'}
                        title={'brand-icon'}
                        className="h-full w-full"
                      />
                    )}
                  </div>
                  {popularTyre === 'Yes' && (
                    <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
                      Popular
                    </span>
                  )}
                </div>
                <Image
                  src={`https://images.tractorgyan.com/uploads/${image}`}
                  height={500}
                  width={500}
                  alt={`${title} ${index + 1}`}
                  title={`${title} ${index + 1}`}
                  className="mx-auto h-[200px] w-auto"
                />
              </div>
            ))}
          </Slider>

          {/* Thumbnail Slider */}
          {imageUrls.length > 1 && (
            <Slider
              asNavFor={nav1}
              ref={sliderRef2}
              slidesToShow={Math.min(3, imageUrls.length)}
              swipeToSlide={true}
              focusOnSelect={true}
              autoplaySpeed={3000}
              className="thumbnail-slider py-5"
            >
              {imageUrls.map((image, index) => (
                <div
                  key={index}
                  className="hover:shadow-lg mx-auto mt-4 h-[60px] w-full max-w-[90px] transform cursor-pointer overflow-hidden rounded-xl border-[1px] border-gray-secondary bg-white shadow-[0px_4px_37px_0px_#0f461021] transition-transform hover:scale-105 hover:border-green-main hover:bg-green-lighter"
                >
                  <Image
                    src={`https://images.tractorgyan.com/uploads/${image}`}
                    height={200}
                    width={200}
                    alt={`${title} thumbnail ${index + 1}`}
                    title={`${title} thumbnail ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}
    </>
  );
};

export default TyreDetailMainSlider;
