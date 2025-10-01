'use client';
import React, { useState } from 'react';
import ImplementHomePageBannerSearchClient from './ImplementHomePageBannerSearchClient';
import BannerFormModal from '../../components/shared/bannners/BannerFormModal';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';

const ArrowButton = ({ onClick, position, rotate = false, alt }) => {
  return (
    <div
      className={`absolute bottom-0 ${position} h-7 w-7 transform translate-x-1/2 cursor-pointer overflow-hidden rounded-full z-10`}
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
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 2000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const ImplementHomePageBanner = ({
  banner,
  isMobile = false,
  currentLang,
  translation = {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bgImg = banner[0]?.slider_image;
  console.log('=======', banner);
  const gradientOverlay = "linear-gradient(180deg, rgba(0, 0, 0, 0) 66.09%, rgba(0, 0, 0, 0.75) 100%)";

  const handleBannerClick = (bannerItem) => {
    if (bannerItem.banner_enquiry === 'yes') {
      setIsModalOpen(true);
    }
  };

  return (
    // TODO:: Update banner images and implement slider
    // <section
    //   className="m-0 h-full min-h-[200px] max-h-[202px] w-full bg-cover bg-center md:max-h-[352px]"
    //   style={{ backgroundImage: `${gradientOverlay}, url(${bgImg})` }}
    // >
    //   {!isMobile && (
    //     <div className="container relative">
    //       <ImplementHomePageBannerSearchClient currentLang={currentLang} />
    //     </div>
    //   )}
    // </section>
    <section className='relative p-0 m-0 h-full min-h-[200px] max-h-[202px] w-full bg-cover bg-center md:max-h-[344px] border-2 border-gray-300 rounded-lg overflow-hidden'>
      <Slider {...settings} className="home-banner-slider">
        {banner?.map((bannerItem, index) => (
          <div key={index} className="relative h-full w-full">
            {bannerItem.banner_enquiry === 'yes' ? (
              <div
                className="block h-full w-full relative z-0 cursor-pointer"
                onClick={() => handleBannerClick(bannerItem)}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={bannerItem.slider_image}
                    alt='Implement Banner Image'
                    title={`Implement Banner Image ${index + 1}`}
                    height={300}
                    width={1920}
                    className='h-full w-full object-cover'
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 66.09%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />
                </div>
              </div>
            ) : bannerItem.url ? (
              <Link href={bannerItem.url} className="block h-full w-full relative z-0">
                <div className="relative h-full w-full">
                  <Image
                    src={bannerItem.slider_image}
                    alt='Implement Banner Image'
                    title={`Implement Banner Image ${index + 1}`}
                    height={300}
                    width={1920}
                    className='h-full w-full object-cover'
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 66.09%, rgba(0, 0, 0, 0.75) 100%)'
                    }}
                  />
                </div>
              </Link>
            ) : (
              <div className="relative h-full w-full z-0">
                <Image
                  src={bannerItem.slider_image}
                  alt='Implement Banner Image'
                  title={`Implement Banner Image ${index + 1}`}
                  height={300}
                  width={1920}
                  className='h-full w-full object-cover'
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 66.09%, rgba(0, 0, 0, 0.75) 100%)'
                  }}
                />
              </div>
            )}
          </div>
        ))}
        {/* TODO:: For UI Testing */}
        {/* {banner?.map((bannerItem, index) => (
          <Image
            src={bannerItem.slider_image}
            alt='Implement Banner Image'
            title={`Implement Banner Image ${index + 1}`}
            height={300}
            width={1920}
            className='h-full w-full'
          />
        ))} */}
      </Slider>
      {!isMobile && (
        <div className="absolute top-6 right-6 w-[20%] pointer-events-none">
          <div className="pointer-events-auto">
            <ImplementHomePageBannerSearchClient currentLang={currentLang} />
          </div>
        </div>
      )}
      <BannerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
      />
    </section>
  );
};

export default ImplementHomePageBanner;
