'use client';
import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import TyreDetailsCard from '../TyreDetailsCard';
import { PrevArrow } from '@/src/features/tyreComponents/commonComponents/buttons/PrevArrow';
import { NextArrow } from '@/src/features/tyreComponents/commonComponents/buttons/NextArrow';

const TyreModelSlider = ({ tyres, currentLang, mode = 'tyre', translation }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate how many slides are visible based on window width
  const getSlidesToShow = () => {
    if (windowWidth <= 480) return 1;
    if (windowWidth <= 600) return 2;
    if (windowWidth <= 1200) return 3;
    return 4;
  };

  const slidesToShow = getSlidesToShow();
  const shouldShowArrows = tyres?.length > slidesToShow;

  const settings = {
    dots: shouldShowArrows,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: shouldShowArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {tyres?.map((tyre, index) => (
          <TyreDetailsCard
            key={index}
            reviews={tyre.reviews || tyre.review_count}
            rating={tyre.rating || tyre.avg_rating}
            size={tyre.tyre_size || tyre.hp}
            type={tyre.tyre_type || tyre.cylinder}
            title={tyre.title}
            brandName={tyre.brandName || tyre.brand_name}
            imgUrl={tyre.imgUrl || tyre.images}
            pageUrl={(currentLang === 'hi' ? '/hi' : '') + (tyre.pageUrl || tyre.page_url)}
            popularTyre={tyre.popularTyre || tyre.popular_tyre}
            mode={mode}
            translation={translation}
          />
        ))}
      </Slider>
    </div>
  );
};

export default TyreModelSlider;
