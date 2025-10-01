// ============ Used At ============
// 1. /tractor/massey-ferguson-241-r/965
// 2.
// =================================

'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';

const TractorMainSlider = ({
  title,
  imgUrl,
  brandLogo,
  isPopular = false,
  isSoldOut = false,
  showThumbnails = false,
  translation,
  status
}) => {
  const isMobile = useIsMobile();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  // Parse imgUrl - handle both string and comma-separated string
  const imageUrls = imgUrl && typeof (imgUrl) == 'string'
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

  const SoldOutStrip = () => {
    return (
      <div className="absolute bottom-0 z-10 flex w-full items-center justify-center gap-3 bg-[#D31A00] py-1">
        <Image
          src="https://img.icons8.com/emoji/48/000000/warning-emoji.png"
          height={50}
          width={50}
          alt={'brand-icon'}
          title={'brand-icon'}
          className="h-4 w-4"
          unoptimized // TODO:: Only for UI, remove later
        />
        <span className="text-medium text-sm text-white">Sold Out</span>
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        <div className="slider-container">
          <div className="relative w-full">
            {isSoldOut && <SoldOutStrip />}
            <div className="h-auto w-full min-w-[44px] max-w-[65px] pb-2">
              {status === "Discontinue" && (
                <button className='rounded-[5px] border border-error-report px-3 py-1 text-sm text-error-report'>
                  {translation?.headings?.discontinued || 'Discontinued'}
                </button>
              )}
            </div>
            <div className="flex w-full items-start justify-between">
              {brandLogo && <Image
                src={brandLogo}
                height={100}
                width={100}
                className="w-full min-w-[44px] max-w-[44px]"
                alt={'icon-' + title}
                title={title}
              />}
              {isPopular && (
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
                  src={
                    image.startsWith('http')
                      ? image
                      : `https://images.tractorgyan.com/uploads${image}`
                  }
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
            {isPopular && (
              <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
                Popular
              </span>
            )}
          </div>
          <Slider
            asNavFor={nav2}
            ref={sliderRef1}
            dots={!showThumbnails}
            arrows={false}
            infinite={imageUrls.length > 2}
            autoplay={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplaySpeed={3000}
            focusOnSelect={true}
          >
            {imageUrls.map((image, index) => (
              <div key={index} className="relative max-h-[300px] w-full">
                {/* <div className="relative flex w-full items-start justify-between">
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
                  {isPopular && (
                    <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
                      Popular
                    </span>
                  )}
                </div> */}
                <Image
                  src={
                    image.startsWith('http')
                      ? image
                      : `https://images.tractorgyan.com/uploads${image}`
                  }
                  height={500}
                  width={500}
                  alt={`${title} ${index + 1}`}
                  title={`${title} ${index + 1}`}
                  className="mx-auto h-[200px] w-auto"
                />
              </div>
            ))}
          </Slider>

          {status === "Discontinue" && (
            <div className="absolute top-7 right-[10px] h-auto w-full min-w-[44px] max-w-[65px]">
              <button className='rounded-[5px] border border-error-report px-3 py-1 text-sm text-error-report'>
                {translation?.headings?.discontinued || 'Discontinued'}
              </button>
            </div>
          )}

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
                    src={
                      image.startsWith('http')
                        ? image
                        : `https://images.tractorgyan.com/uploads${image}`
                    }
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

export default TractorMainSlider;
