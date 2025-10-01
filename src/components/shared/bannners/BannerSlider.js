'use client';
import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BannerFormModal from './BannerFormModal';

const BannerSlider = ({
  banners,
  additionalClasses = '',
  translation = {},
  currentLang = 'en',
  isMobile = false,
  skipVerifyOTP = false,
  showOutline = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bannerContainerRef = useRef(null);

  // Handle clicks on banner content to detect enquiry_form links
  useEffect(() => {
    const handleBannerClick = (event) => {
      // Check if the clicked element or any parent has class "enquiry_form"
      let target = event.target;
      while (target && target !== bannerContainerRef.current) {
        if (target.classList && target.classList.contains('enquiry_form')) {
          event.preventDefault();
          event.stopPropagation();
          setIsModalOpen(new Date());
          return;
        }
        target = target.parentElement;
      }
    };

    const container = bannerContainerRef.current;
    if (container) {
      container.addEventListener('click', handleBannerClick);
      return () => {
        container.removeEventListener('click', handleBannerClick);
      };
    }
  }, []);

  // If no banners or only one banner, don't show slider
  if (!banners || banners.length === 0) {
    return null;
  }

  // If only one banner, show it without slider
  if (banners.length === 1) {
    return (
      <>
        <div
          ref={bannerContainerRef}
          className={`${additionalClasses} mb-8 overflow-hidden rounded-xl ${showOutline ? 'border-2 border-gray-300' : ''}`}
        >
          <div dangerouslySetInnerHTML={{ __html: banners[0].image }} className="banner-content" />
        </div>
        <BannerFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          translation={translation}
          currentLang={currentLang}
          isMobile={isMobile}
          skipVerifyOTP={skipVerifyOTP}
        />
      </>
    );
  }

  // Slider settings for multiple banners
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <div
        ref={bannerContainerRef}
        className={`${additionalClasses} banner-slider-container mb-8 overflow-hidden rounded-xl ${showOutline ? 'border-2 border-gray-300' : ''}`}
      >
        <Slider {...sliderSettings} className="banner-slider">
          {banners.map((banner, index) => (
            <div key={banner.sno || index} className="banner-slide">
              <div dangerouslySetInnerHTML={{ __html: banner.image }} className="banner-content" />
            </div>
          ))}
        </Slider>

        <style jsx>{`
          .banner-slider-container :global(.slick-dots) {
            bottom: 10px;
          }

          .banner-slider-container :global(.slick-dots li button:before) {
            color: white;
            font-size: 12px;
          }

          .banner-slider-container :global(.slick-dots li.slick-active button:before) {
            color: #007bff;
          }

          .banner-slider-container :global(.slick-prev),
          .banner-slider-container :global(.slick-next) {
            z-index: 10;
            width: 40px;
            height: 40px;
          }

          .banner-slider-container :global(.slick-prev) {
            left: 10px;
          }

          .banner-slider-container :global(.slick-next) {
            right: 10px;
          }

          .banner-slider-container :global(.slick-prev:before),
          .banner-slider-container :global(.slick-next:before) {
            font-size: 20px;
            color: white;
          }

          .banner-content img {
            width: 100%;
            height: auto;
            max-height: 240px;
            object-fit: cover;
          }

          @media (max-width: 768px) {
            .banner-content img {
              max-height: 132px;
            }
          }
        `}</style>
      </div>

      <BannerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
        skipVerifyOTP={skipVerifyOTP}
      />
    </>
  );
};

export default BannerSlider;
