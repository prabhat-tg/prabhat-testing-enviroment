'use client';
import React from 'react';
import HomePageBannerSearchClient from './HomePageBannerSearchClient';

const HomePageBanner = ({ isMobile = false, currentLang }) => {
  return (
    // TODO:: Update banner image for mobile and implement slider
    <section
      className={`${
        isMobile
          ? "bg-[url('https://images.tractorgyan.com/uploads/118314/67d960a5c5a4f-drone-banner-desktop-tractorgyan.jpg')]"
          : "bg-[url('https://images.tractorgyan.com/uploads/118314/67d960a5c5a4f-drone-banner-desktop-tractorgyan.jpg')]"
      } m-0 h-full max-h-[202px] min-h-[200px] w-full bg-cover bg-center md:max-h-[352px]`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(217, 217, 217, 0) 66.09%, rgba(119, 119, 119, 0.59) 79.69%, #4D4D4D 85.62%, #212020 91.9%, #1B1B1B 100%), url('https://images.tractorgyan.com/uploads/118314/67d960a5c5a4f-drone-banner-desktop-tractorgyan.jpg')`,
      }}
    >
      {!isMobile && (
        <div className="container relative">
          <HomePageBannerSearchClient currentLang={currentLang} />
        </div>
      )}
    </section>
  );
};

export default HomePageBanner;
