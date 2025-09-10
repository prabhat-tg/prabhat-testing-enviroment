'use client';
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TG_Button from '../ui/buttons/MainButtons';
import MiniTractorCard from '../ui/cards/MiniTractorCard';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';

const MiniTractorSlider = ({
  heading,
  tractors,
  cta,
  isMobile,
  itemsShown = 4,
  bgColor = 'bg-white',
}) => {
  const ArrowButton = ({ onClick, position, rotate = false, alt }) => {
    return (
      <div
        className={`absolute bottom-[-1.5rem] ${position} z-10 h-7 w-7 translate-x-1/2 transform cursor-pointer overflow-hidden rounded-full`}
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
    <ArrowButton onClick={onClick} position="right-1/4" alt="next-button-icon" />
  );

  const PrevArrow = ({ onClick }) => (
    <ArrowButton onClick={onClick} position="left-[20%]" rotate alt="previous-button-icon" />
  );

  const settings = {
    dots: isMobile,
    speed: 500,
    slidesToShow: itemsShown,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    ...(isMobile && {
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    }),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={bgColor}>
      <div className="container relative w-full">
        {heading && <MainHeadings text={heading} />}
        <Slider {...settings} className="custom-gap-slider pb-4">
          {tractors?.map((tractor, index) => (
            <MiniTractorCard
              key={tractor.id || index}
              title={`${tractor.brand} ${tractor.model}`}
              imgSrc={
                tractor.image
                  ? `https://images.tractorgyan.com/uploads${tractor.image}`
                  : tractor.img
              }
              specs={{
                HP: tractor.hp,
                Cylinder: tractor.cylinder,
                Capacity: tractor.lifting_capacity,
              }}
              className="mb-6"
              pageUrl={tractor.page_url}
            />
          ))}
        </Slider>
        {cta && (
          <div className="mt-10 flex w-full justify-center md:mt-0">
            <TG_Button>{cta}</TG_Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MiniTractorSlider;
