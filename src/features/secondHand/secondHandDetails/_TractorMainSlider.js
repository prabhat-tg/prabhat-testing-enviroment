'use client';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

import { useIsMobile } from '@/src/hooks/useIsMobile';

const settings = {
  autoplay: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  infinite: false,
};

const _TractorMainSlider = ({
  title,
  imgUrl,
  brandLogo,
  isPopular = false,
  isSoldOut = false,
  showThumbnails = false,
}) => {
  const isMobile = useIsMobile();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  // Process imgUrl to handle both string and array formats
  const processImages = () => {
    console.log('Processing images, imgUrl:', imgUrl, typeof imgUrl);

    if (!imgUrl) {
      console.log('No imgUrl provided');
      return [];
    }

    if (Array.isArray(imgUrl)) {
      const filtered = imgUrl.filter(img => img && img.trim());
      console.log('Array imgUrl filtered:', filtered);
      return filtered;
    }

    if (typeof imgUrl === 'string') {
      // Check if it's comma-separated
      if (imgUrl.includes(',')) {
        const split = imgUrl
          .split(',')
          .map(url => url.trim())
          .filter(url => url);
        console.log('String comma-separated imgUrl:', split);
        return split;
      }
      const single = imgUrl.trim() ? [imgUrl.trim()] : [];
      console.log('Single string imgUrl:', single);
      return single;
    }

    console.log('Unknown imgUrl type:', typeof imgUrl);
    return [];
  };

  const imageArray = processImages();
  const hasMultipleImages = imageArray.length > 1;

  console.log('TractorMainSlider - imageArray:', imageArray, 'hasMultipleImages:', hasMultipleImages, 'showThumbnails:', showThumbnails);

  useEffect(() => {
    // Reset nav state when images change
    setNav1(null);
    setNav2(null);

    // Set nav for multiple images when showThumbnails is true
    if (hasMultipleImages && showThumbnails) {
      const timer = setTimeout(() => {
        if (sliderRef1.current && sliderRef2.current) {
          try {
            setNav1(sliderRef1.current);
            setNav2(sliderRef2.current);
          } catch (error) {
            console.warn('Slider sync failed:', error);
          }
        }
      }, 1000); // Increased timeout

      return () => clearTimeout(timer);
    }
  }, [imageArray.length, hasMultipleImages, showThumbnails]);

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
      {imageArray.length === 0 ? (
        // Fallback when no images are available
        <div className="flex items-center justify-center h-[240px] bg-gray-100 rounded-lg">
          <span className="text-gray-500">No image available</span>
        </div>
      ) : (
        <>
          <p>01</p>
          {isMobile ? (
            <div className="slider-container hello">
              {/* Main Slider for mobile */}
              <div className="relative w-full">
                {isSoldOut && <SoldOutStrip />}
                <div className="flex w-full items-start justify-between">
                  {brandLogo && (
                    <Image
                      src={brandLogo}
                      height={100}
                      width={100}
                      className="w-full min-w-[44px] max-w-[44px]"
                      alt={'icon-' + title}
                      title={title}
                    />
                  )}
                  {isPopular && (
                    <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
                      Popular
                    </span>
                  )}
                </div>

                {/* Image rendering with fallbacks */}
                {imageArray.length === 1 ? (
                  <div className="single-image">
                    <Image
                      src={
                        imageArray[0].startsWith('http')
                          ? imageArray[0]
                          : `https://images.tractorgyan.com/uploads${imageArray[0]}`
                      }
                      height={500}
                      width={500}
                      alt={title || 'tractor image'}
                      title={title || 'tractor image'}
                      className="h-auto w-auto"
                    />
                  </div>
                ) : (
                  // <div className="multiple-images" style={{ minHeight: '300px', visibility: 'visible' }}>
                  <div>
                    <Slider
                      // key={`mobile-main-${imageArray.length}`}
                      // asNavFor={showThumbnails && nav2 ? nav2 : undefined}
                      // ref={sliderRef1}
                      // infinite={imageArray.length > 2}
                      speed={500}
                      slidesToShow={1}
                      slidesToScroll={1}
                      // dots={!showThumbnails}
                      autoplay={false}
                    // adaptiveHeight={false}
                    // arrows={false}
                    // fade={false}
                    // cssEase="ease"
                    // useCSS={true}
                    // useTransform={true}
                    >
                      {imageArray.map((image, index) => (
                        // <div key={`mobile-slide-${index}`} style={{ outline: 'none' }}>
                        <div key={index}>
                          <Image
                            src={
                              image.startsWith('http')
                                ? image
                                : `https://images.tractorgyan.com/uploads${image}`
                            }
                            height={500}
                            width={500}
                            alt={title || 'tractor image'}
                            title={title || 'tractor image'}
                            className="h-auto w-auto"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>

              {/* Thumbnail Slider for mobile */}
              {/* {showThumbnails && imageArray.length > 1 && (
                <div className="thumbnails-mobile" style={{ marginTop: '20px' }}>
                  <Slider
                    key={`mobile-thumb-${imageArray.length}`}
                    asNavFor={nav1}
                    ref={sliderRef2}
                    slidesToShow={Math.min(4, imageArray.length)}
                    slidesToScroll={1}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className="thumbnail-slider pt-5"
                    infinite={false}
                    arrows={false}
                    centerMode={false}
                    variableWidth={false}
                  >
                    {imageArray.map((image, index) => (
                      <div
                        key={`mobile-thumb-${index}`}
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
                          alt={title}
                          title={title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              )} */}
            </div>
          ) : (
            <div className="slider-container">
              <p>::D</p>
              {/* Desktop layout */}
              <div className="relative max-h-[300px] w-full py-4">
                <div className="relative -top-4 flex w-full items-start justify-between">
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
                {isSoldOut && <SoldOutStrip />}

                {/* Desktop image rendering */}
                {imageArray.length === 1 ? (
                  <div className="flex justify-center">
                    <p>::D-01</p>
                    <Image
                      src={
                        imageArray[0].startsWith('http')
                          ? imageArray[0]
                          : `https://images.tractorgyan.com/uploads${imageArray[0]}`
                      }
                      height={500}
                      width={500}
                      alt={title}
                      title={title}
                      className="mx-auto h-[240px] w-auto"
                    />
                  </div>
                ) : (
                  <div className='w-full min-h-[240px]'>
                    {/* ======= */}
                    {imageArray?.length > 0 && (
                      <Slider {...settings} className="w-full">
                        {imageArray.map((image, index) => (
                          <div key={index} className="flex justify-center items-center h-[240px] max-w-[400px] bg-error-main">
                            <Image
                              src={image.startsWith('http') ? image : `https://images.tractorgyan.com/uploads${image}`}
                              // height={500}
                              // width={500}
                              alt={title}
                              title={title}
                              fill
                              style={{ objectFit: "contain" }}
                            // className="h-[240px] w-auto"
                            // className="max-h-full max-w-full object-contain"
                            // className="mx-auto h-[240px] w-auto"
                            />
                          </div>
                        ))}
                      </Slider>
                    )}
                    {/* ======= */}
                    <p>::D-02</p>
                    {/* <div className="multiple-images-desktop" style={{ minHeight: '240px', visibility: 'visible' }}> */}
                    <Slider
                      // asNavFor={nav2}
                      // ref={sliderRef1}
                      // dots={false}
                      // infinite={imageArray.length > 2}
                      autoplay={false}
                      speed={500}
                      slidesToShow={1}
                      slidesToScroll={1}
                      arrows={false}
                      className='w-full hidden'
                    >
                      {imageArray.map((image, index) => (
                        <div key={index}>
                          <p>::D-03</p>
                          <Image
                            src={image.startsWith('http') ? image : `https://images.tractorgyan.com/uploads${image}`}
                            height={500}
                            width={500}
                            alt={title}
                            title={title}
                            className="mx-auto h-[240px] w-auto"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>

              {/* Desktop thumbnail slider */}
              {/* {imageArray.length > 1 && (
                <div className="thumbnails-desktop" style={{ marginTop: '40px' }}>
                  <Slider
                    key={`desktop-thumb-${imageArray.length}`}
                    asNavFor={nav1}
                    ref={sliderRef2}
                    slidesToShow={Math.min(4, imageArray.length)}
                    slidesToScroll={1}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className="pt-10"
                    infinite={false}
                    arrows={false}
                    centerMode={false}
                    variableWidth={false}
                  >
                    {imageArray.map((image, index) => (
                      <div key={`desktop-thumb-${index}`} className="w-full p-2">
                        <div className="mx-auto h-[60px] w-full max-w-[90px] transform cursor-pointer overflow-hidden rounded-xl border-[1px] border-gray-secondary bg-white transition-transform hover:scale-105 hover:border-green-main hover:bg-green-lighter hover:shadow-bottom">
                          <Image
                            src={
                              image.startsWith('http')
                                ? image
                                : `https://images.tractorgyan.com/uploads${image}`
                            }
                            height={200}
                            width={200}
                            alt={title}
                            title={title}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              )} */}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default _TractorMainSlider;
