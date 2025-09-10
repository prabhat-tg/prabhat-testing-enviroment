'use client';

// import { useIsMobile } from "@/src/utils/useIsMobile";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { tgi_arrow_right } from '@/src/utils/assets/icons';
// import { useTranslation } from "react-i18next";
// import '../../i18n'
const PopularTyreCard = ({
  popularTyres,
  title,
  size,
  type,
  brand,
  imgUrl,
  pageUrl,
  langPrefix,
  isMobile,
  translation,
  popularData,
}) => {
  // const { t, i18n } = useTranslation();
  // const currentLang = i18n.language;
  const currentLang = langPrefix === 'hi' ? '/hi' : '';
  // const isMobile = useIsMobile();
  const sliderRef1 = useRef(null); // Main slider ref
  const sliderRef2 = useRef(null); // Thumbnail slider ref
  const [nav1, setNav1] = useState(null); // State for main slider
  const [nav2, setNav2] = useState(null); // State for thumbnail slider
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
  }, []);
  return (
    <>
      {isMobile ? (
        <div className="slider-container">
          {/* Main Slider */}
          <Slider
            asNavFor={nav2}
            ref={sliderRef1} // Main slider reference
            infinite={true}
            speed={500} // Matching speed
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            beforeChange={(oldIndex, newIndex) => setActiveIndex(newIndex)}
            className="max-h-[420px]"
          >
            {popularTyres?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl border-[1px] border-gray-gainsboro bg-white p-5 hover:border-secondary hover:bg-green-lighter"
              >
                <div>
                  <h5 className="mb-2.5 line-clamp-2 text-lg font-semibold leading-6 text-black">
                    <Link
                      href={`${currentLang}${item.page_url}`}
                      title={`${item.brand_name} ${item.title}`}
                      aria-label={`read more aboute $${item.brand_name} ${item.title} tyre in india`}
                    >
                      {item.brand_name} {item.title}
                    </Link>
                  </h5>
                  <Link
                    href={`${currentLang}${item.page_url}`}
                    title={`${item.brand_name} ${item.title}`}
                    aria-label={`read more aboute ${item.brand_name} ${item.title} tyre in india`}
                    className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
                  >
                    {translation.buttons.viewDetails}
                    <Image
                      src={tgi_arrow_right}
                      height={50}
                      width={50}
                      alt="view details arrow"
                      title="view details"
                      className="h-2.5 w-2.5"
                    />
                  </Link>
                </div>
                <Link
                  href={`${currentLang}${item.page_url}`}
                  title={`${item.brand_name} ${item.title} tyre image`}
                  aria-label={`read more aboute ${item.brand_name} ${item.title} tyre in india`}
                  className="mb-4"
                >
                  <Image
                    src={
                      `https://images.tractorgyan.com/uploads/${item.image_url}` ||
                      '/MRF-Shakti-Super.png'
                    }
                    height={500}
                    width={500}
                    alt={`${item.brand_name} ${item.title}`}
                    title={`${item.brand_name} ${item.title}`}
                    className="m-auto"
                  />
                </Link>

                <div className="flex justify-between rounded-lg bg-green-mint px-4 py-1.5">
                  <div className="text-center">
                    <span className="text-xs font-normal text-gray-dark">
                      {translation.headings.type}
                    </span>
                    <p className="text-sm font-bold">
                      {item.tyre_type
                        ? translation.buttons[item.tyre_type.toLowerCase()] || item.tyre_type
                        : ''}
                    </p>
                  </div>
                  <div className="mx-1 border-x-[1px] border-primary px-4 text-center sm:px-10">
                    <span className="text-xs font-normal text-gray-dark">
                      {translation.headings.size}
                    </span>
                    <p className="text-sm font-bold">{item.size}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-normal text-gray-dark">
                      {translation.headings.brand}
                    </span>
                    <p className="text-sm font-bold">{item.brand_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Thumbnail Slider */}
          <Slider
            asNavFor={nav1}
            ref={sliderRef2}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
            autoplay={true}
            autoplaySpeed={3000}
            className="thumbnail-slider py-5"
          >
            {popularTyres?.map((item, index) => (
              <div className="group px-2" key={`thumbnail-${index}`}>
                <div
                  className={`${activeIndex === index ? 'border-primary' : 'border-gray-light'} w-full overflow-hidden rounded-xl border-[1px] group-[.slick-active]:border-primary`}
                >
                  {/* <div className="w-full overflow-hidden rounded-xl border-[1px] border-gray-light group-[.slick-active]:border-primary"> */}
                  <Image
                    src={
                      `https://images.tractorgyan.com/uploads/${item.image_url}` ||
                      '/MRF-Shakti-Super.png'
                    }
                    height={200}
                    width={200}
                    alt={`${item.brand_name} ${item.title}`}
                    title={`${item.brand_name} ${item.title}`}
                    className="aspect-square h-full max-w-full"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="col-span-4 md:col-span-2 xl:col-span-1">
          <div className="flex h-full flex-col justify-between rounded-2xl border-[1px] border-gray-gainsboro bg-white p-5 hover:border-secondary hover:bg-green-lighter">
            <div>
              <h5 className="mb-2.5 line-clamp-2 text-lg font-semibold leading-6 text-black">
                <Link
                  href={`${currentLang}${pageUrl}`}
                  title={`${brand} ${title}`}
                  aria-label={`read more aboute ${brand} ${title} in india`}
                >
                  {brand} {title}
                </Link>
              </h5>
              <Link
                href={`${currentLang}${pageUrl}`}
                title={`${brand} ${title}`}
                aria-label={`read more aboute ${brand} ${title} in india`}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
              >
                {translation.buttons.viewDetails}
                <Image
                  src={tgi_arrow_right}
                  height={50}
                  width={50}
                  alt="view details arrow"
                  title="view details"
                  className="h-2.5 w-2.5"
                />
              </Link>
            </div>
            <Link
              href={`${currentLang}${pageUrl}`}
              title={`${brand} ${title}`}
              aria-label={`read more aboute ${brand} ${title} india`}
              className="mb-4"
            >
              <Image
                src={`https://images.tractorgyan.com/uploads/${imgUrl}` || '/MRF-Shakti-Super.png'}
                height={500}
                width={500}
                alt={`${brand} ${title}`}
                title={`${brand} ${title}`}
                className="m-auto"
              />
            </Link>
            <div className="flex justify-between rounded-lg bg-green-mint px-4 py-1.5">
              <div className="text-center">
                <h6 className="text-xs font-normal text-gray-dark">{translation.headings.type}</h6>
                <p className="text-sm font-bold">
                  {type ? translation.buttons[type.toLowerCase()] : null}
                </p>
              </div>
              <div className="mx-1 border-x-[1px] border-primary px-2 text-center">
                <h6 className="text-xs font-normal text-gray-dark">{translation.headings.size}</h6>
                <p className="text-sm font-bold">{size}</p>
              </div>
              <div className="text-center">
                <h6 className="text-xs font-normal text-gray-dark">{translation.headings.brand}</h6>
                <p className="text-sm font-bold">{brand}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopularTyreCard;
