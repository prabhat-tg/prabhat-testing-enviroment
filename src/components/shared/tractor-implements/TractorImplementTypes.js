"use client";
import React from "react";
import Image from "next/image";
import Link from 'next/link';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';


const ImplementTypeCard = ({ title, imgSrc, url, placedInFilter }) => {
  return (
    <Link
      href={url}
      title={title + " image"}
      className={`${placedInFilter ? 'md:col-span-3 xl:col-span-3' : 'md:col-span-2 xl:col-span-1'} col-span-3 md:col-span-2 xl:col-span-1`}
    >
      {/* TODO: Refactor Shadow and Setup Global Classes */}
      <div className="mb-2 md:mb-4 p-2 flex flex-col items-center justify-center min-h-[124px] rounded-xl border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter">
        <Image
          src={imgSrc}
          height={300}
          width={300}
          alt={title + " image"}
          title={title + " image"}
          className="h-auto min-w-[40px] max-w-[72px] max-h-[72px] md:max-w-[80px]"
        />
        <p className="text-center text-sm font-medium min-h-10">
          {title}
        </p>
      </div>
    </Link>
  )
}

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
  <ArrowButton onClick={onClick} position="right-[20%] md:right-[40%]" alt="next-button-icon" />
);

const PrevArrow = ({ onClick }) => (
  <ArrowButton onClick={onClick} position="left-[15%] md:left-[40%]" rotate alt="previous-button-icon" />
);

const settings = {
  dots: true,
  // dots: isMobile,
  speed: 500,
  slidesToShow: 9,
  slidesToScroll: 9,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 2000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const TractorImplementTypes = ({
  heading,
  cta,
  allImplementTypes,
  itemsShown = 9,
  bgColor = 'bg-white',
  isMobile,
  floatingBg = false,
  slider = false,
  placedInFilter = false,
  currentLang
}) => {
  return (
    <section className={`${bgColor} relative`}>
      {floatingBg && (
        <div className="bg-primary h-[140px] md:h-[164px] absolute top-0 left-0 right-0 rounded-b-2xl"></div>
      )}
      <div className={`${floatingBg ? 'relative z-2' : ''} container`}>
        {heading && (
          <MainHeadings text={heading} extraCss={floatingBg ? 'text-white border-white' : 'text-black'} />
        )}

        {/* For Normal UI */}
        {!slider && (
          <div className={`${placedInFilter ? 'mb-4 md:gap-4' : 'mb-8 md:gap-8'} grid grid-cols-9 md:grid-cols-9 gap-4`}>
            {allImplementTypes?.slice(0, itemsShown).map((item, index) => (
              <ImplementTypeCard
                key={index}
                title={currentLang == 'hi' ? item.name_hi : item.name}
                imgSrc={`https://images.tractorgyan.com/uploads/${item.image}`}
                url={(currentLang == 'hi' ? '/hi/' : '/') + item.url}
                placedInFilter={placedInFilter}
              />
            ))}
          </div>
        )}

        {/* For Slider UI */}
        {slider && (
          <Slider {...settings} className="custom-gap-slider pb-4 mb-4 md:mb-6">
            {isMobile ? (
              // Mobile: Show items in pairs
              // allImplementTypes?.reduce((acc, _, i) => {
              //   if (i % 2 === 0) {
              //     const pair = allImplementTypes.slice(i, i + 2);
              //     acc.push(pair);
              //   }
              //   return acc;
              // }, []).map((pair, index) => (
              //   <div key={index}>
              //     {pair.map((item, subIndex) => (
              //       <ImplementTypeCard
              //         key={`${index}-${subIndex}`}
              //         title={currentLang == 'hi' ? item.name_hi : item.name}
              //         imgSrc={`https://images.tractorgyan.com/uploads/${item.image}`}
              //         url={item.url}
              //       />
              //     ))}
              //   </div>
              // ))
              // Mobile: Show items in triplets
              allImplementTypes?.reduce((acc, _, i) => {
                if (i % 3 === 0) {
                  const triplet = allImplementTypes.slice(i, i + 3); // take 3 items
                  acc.push(triplet);
                }
                return acc;
              }, [])
                .map((triplet, index) => (
                  <div key={index} className="flex gap-4">
                    {triplet.map((item, subIndex) => (
                      <ImplementTypeCard
                        key={`${index}-${subIndex}`}
                        title={currentLang == 'hi' ? item.name_hi : item.name}
                        imgSrc={`https://images.tractorgyan.com/uploads/${item.image}`}
                        url={(currentLang == 'hi' ? '/hi/' : '/') + item.url}
                      />
                    ))}
                  </div>
                ))
            ) : (
              // Desktop: show one item per slide
              allImplementTypes?.map((item, index) => (
                <div key={index}>
                  <ImplementTypeCard
                    title={currentLang == 'hi' ? item.name_hi : item.name}
                    imgSrc={`https://images.tractorgyan.com/uploads/${item.image}`}
                    url={(currentLang == 'hi' ? '/hi/' : '/') + item.url}
                  />
                </div>
              ))
            )}
          </Slider>
        )}

        {cta && (
          <MainButton
            text={cta}
            linkUrl={`${currentLang == "hi" ? "/hi" : "/"}/tractor-implements-in-india`}
          />
        )}
      </div>
    </section>
  );
};

export default TractorImplementTypes;
