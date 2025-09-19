'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { tg_getUrlByLanguage } from '@/src/utils';
import TG_PopularCard from '../../ui/cards/PopularCard';

const PopularCard = ({
  cylinder,
  hp,
  lifting_capacity,
  brand,
  model,
  imgUrl,
  pageUrl,
  langPrefix,
  isMobile,
  translation,
  popularData,
  power,
  width,
  warranty,
  type = "tractor"
}) => {
  const urlPrefix = tg_getUrlByLanguage(pageUrl, langPrefix);
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
            autoplay={false}
            autoplaySpeed={3000}
            className="max-h-[400px] mb-6"
          >
            {popularData?.map((item, index) => (
              <TG_PopularCard
                title={`${item.brand} ${item.model}`}
                detailUrl={`${item.page_url}`}
                imageSrc={item.full_image}
                type={type}
                specs={
                  // HP: item.hp,
                  // Cylinder: item.cylinder,
                  // 'Lifting Capacity': item.lifting_capacity,
                  type === 'tractor'
                    ? {
                      HP: item.hp,
                      Cylinder: item.cylinder,
                      'Lifting Capacity': item.lifting_capacity,
                    }
                    : {
                      Power: `${item.power} HP`,
                      Warranty: item.warranty,
                      Width: item.width,
                    }
                }
                translation={translation}
              />
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
            className="thumbnail-slider py-2"
            beforeChange={(oldIndex, newIndex) => setActiveIndex(newIndex)}
          >
            {popularData?.map((item, index) => (
              <div className="group px-2" key={`thumbnail-${index}`}>
                <div
                  className={`${activeIndex === index ? 'border-primary' : 'border-gray-light'} h-[68px] shadow-card w-full overflow-hidden rounded-xl border-[1px]`}
                >
                  {/* <div className="h-[68px] w-full overflow-hidden rounded-xl border-[1px] border-gray-light group-[.slick-active]:border-primary"> */}
                  <Image
                    src={
                      `https://images.tractorgyan.com/uploads/${item.full_image}` ||
                      '/MRF-Shakti-Super.png'
                    }
                    height={200}
                    width={200}
                    alt={`${item.brand} ${item.title} tyre-thumbnail`}
                    title={`${item.brand} ${item.title} tyre-thumbnail`}
                    className="h-full w-full object-fill"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="col-span-4 md:col-span-2 xl:col-span-1">
          <TG_PopularCard
            title={`${brand} ${model}`}
            detailUrl={`${urlPrefix}`}
            imageSrc={imgUrl}
            type={type}
            // specs={{
            //   HP: hp,
            //   Cylinder: cylinder,
            //   'Lifting Capacity': lifting_capacity,
            // }}
            specs={
              type === 'tractor'
                ? {
                  HP: hp,
                  Cylinder: cylinder,
                  'Lifting Capacity': lifting_capacity,
                }
                : {
                  Power: `${power} HP`,
                  Warranty: warranty,
                  Width: width,
                }
            }
            translation={translation}
          />
        </div>
      )}
    </>
  );
};

export default PopularCard;
