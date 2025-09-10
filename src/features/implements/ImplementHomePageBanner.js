'use client';
import React from 'react';
import ImplementHomePageBannerSearchClient from './ImplementHomePageBannerSearchClient';

const ImplementHomePageBanner = ({ banner, isMobile = false, currentLang }) => {

  const bgImg = banner[0]?.slider_image;
  const gradientOverlay = "linear-gradient(180deg, rgba(217, 217, 217, 0) 66.09%, rgba(119, 119, 119, 0.59) 79.69%, #4D4D4D 85.62%, #212020 91.9%, #1B1B1B 100%)";

  return (
    // TODO:: Update banner images and implement slider
    <section
      className="m-0 h-full min-h-[200px] max-h-[202px] w-full bg-cover bg-center md:max-h-[352px]"
      style={{ backgroundImage: `${gradientOverlay}, url(${bgImg})` }}
    >
      {!isMobile && (
        <div className="container relative">
          <ImplementHomePageBannerSearchClient currentLang={currentLang} />
        </div>
      )}
    </section>
  );
};

export default ImplementHomePageBanner;
