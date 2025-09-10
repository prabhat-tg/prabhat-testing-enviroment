'use client';

import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import React, { useState, useEffect } from 'react';
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import StoryContainer from '@/src/features/tyreComponents/commonComponents/reelsWebStoryVideos/webStories/StoryContainer';
import Reels from '@/src/features/tyreComponents/commonComponents/reelsWebStoryVideos/reels/Reels';
import VideosContainer from '@/src/features/tyreComponents/commonComponents/reelsWebStoryVideos/videos/VideosContainer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UpdatesSection = ({
  videos,
  reels,
  webstories,
  translation,
  brandName,
  bgColor,
  showFilters = true,
  linkUrls,
  moduleType = 'tyre', // 'tyre', 'tractor', 'implement'
}) => {
  // Function to get the first available content type
  const getInitialSelection = () => {
    if (videos?.length > 0) return 'videos';
    if (webstories?.length > 0) return 'webstories';
    if (reels?.length > 0) return 'reels';
    return 'videos'; // fallback
  };

  const [isSelected, setIsSelected] = useState(getInitialSelection());

  // Update selection when data changes
  useEffect(() => {
    if (isSelected === 'videos' && (!videos || videos.length === 0)) {
      setIsSelected(getInitialSelection());
    }
    if (isSelected === 'webstories' && (!webstories || webstories.length === 0)) {
      setIsSelected(getInitialSelection());
    }
    if (isSelected === 'reels' && (!reels || reels.length === 0)) {
      setIsSelected(getInitialSelection());
    }
  }, [videos, webstories, reels]);

  // Get dynamic heading based on module type
  const getHeadingKey = () => {
    switch (moduleType) {
      case 'tractor':
        return translation.headings.updatesAboutTractor || translation.headings.updatesAboutTyre;
      case 'implement':
        return translation.headings.updatesAboutImplement || translation.headings.updatesAboutTyre;
      default:
        return translation.headings.updatesAboutTyre;
    }
  };

  const headingTitle = getHeadingKey().replace('{brand}', brandName);

  // Get dynamic button labels based on module type
  const getButtonLabels = () => {
    const baseLabels = {
      videos: translation.buttons.tyreVideos,
      webstories: translation.buttons.tyreWebstories,
      reels: translation.buttons.tyreReels,
      viewAllVideos: translation.buttons.viewAllVideos,
      viewAllWebstory: translation.buttons.viewAllWebstory,
      viewAllReels: translation.buttons.viewAllReels,
    };

    if (moduleType === 'tractor') {
      // Use brand-specific labels if brand name is provided
      const tractorLabels = {
        videos: translation.buttons.tractorVideos || baseLabels.videos,
        webstories: translation.buttons.tractorWebstories || baseLabels.webstories,
        reels: translation.buttons.tractorReels || baseLabels.reels,
        viewAllVideos: brandName
          ? (
            translation.buttons.viewAllTractorVideoBrand ||
            translation.buttons.viewAllTractorVideos ||
            baseLabels.viewAllVideos
          ).replace('{brandName}', brandName)
          : translation.buttons.viewAllTractorVideos || baseLabels.viewAllVideos,
        viewAllWebstory: brandName
          ? (
            translation.buttons.viewAllTractorWebstoryBrand ||
            translation.buttons.viewAllTractorWebstory ||
            baseLabels.viewAllWebstory
          ).replace('{brandName}', brandName)
          : translation.buttons.viewAllTractorWebstory || baseLabels.viewAllWebstory,
        viewAllReels: brandName
          ? (
            translation.buttons.viewAllTractorReelsBrand ||
            translation.buttons.viewAllTractorReels ||
            baseLabels.viewAllReels
          ).replace('{brandName}', brandName)
          : translation.buttons.viewAllTractorReels || baseLabels.viewAllReels,
      };
      return tractorLabels;
    } else if (moduleType === 'implement') {
      return {
        videos: translation.buttons.implementVideos || baseLabels.videos,
        webstories: translation.buttons.implementWebstories || baseLabels.webstories,
        reels: translation.buttons.implementReels || baseLabels.reels,
        viewAllVideos: translation.buttons.viewAllImplementVideos || baseLabels.viewAllVideos,
        viewAllWebstory: translation.buttons.viewAllImplementWebstory || baseLabels.viewAllWebstory,
        viewAllReels: translation.buttons.viewAllImplementReels || baseLabels.viewAllReels,
      };
    }

    return baseLabels;
  };

  const buttonLabels = getButtonLabels();

  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [popupVideoUrl, setPopupVideoUrl] = useState('');
  const [popupContentType, setPopupContentType] = useState('');

  const openVideoPopup = (videoUrl, type) => {
    setPopupVideoUrl(videoUrl);
    setShowVideoPopup(true);
    setPopupContentType(type);
  };
  const closeVideoPopup = () => {
    setShowVideoPopup(false);
    setPopupVideoUrl('');
    setPopupContentType('');
  };

  if (videos.length == 0 && reels.length == 0 && webstories.length == 0) {
    return null; // Return null if no content is available
  }

  return (
    <section className={`${bgColor ? bgColor : ''}`}>
      <div className="container">
        <MainHeadings text={`${headingTitle}`} />
        {showFilters && (
          <div className="no-scrollbar mb-4 flex gap-2 overflow-auto md:gap-8">
            {videos?.length > 0 && (
              <button
                onClick={() => setIsSelected('videos')}
                className={`${isSelected === 'videos' ? 'bg-primary text-white' : 'border-gray-main text-black'
                  } text-nowrap rounded-full border-[1px] px-8 py-2 text-sm font-medium md:px-[42px] md:text-lg`}
              >
                {buttonLabels.videos}
              </button>
            )}
            {webstories?.length > 0 && (
              <button
                onClick={() => setIsSelected('webstories')}
                className={`${isSelected === 'webstories'
                  ? 'bg-primary text-white'
                  : 'border-gray-main text-black'
                  } text-nowrap rounded-full border-[1px] px-8 py-2 text-sm font-medium md:px-[42px] md:text-lg`}
              >
                {buttonLabels.webstories}
              </button>
            )}

            {reels?.length > 0 && (
              <button
                onClick={() => setIsSelected('reels')}
                className={`${isSelected === 'reels' ? 'bg-primary text-white' : 'border-gray-main text-black'
                  } text-nowrap rounded-full border-[1px] px-8 py-2 text-sm font-medium md:px-[42px] md:text-lg`}
              >
                {buttonLabels.reels}
              </button>
            )}
          </div>
        )}
        <div className="updates-section">
          {videos?.length > 0 && isSelected === 'videos' && (
            <>
              <div className="section">
                <VideosContainer videos={videos} openVideoPopup={openVideoPopup} />
                <div className="pt-4 md:pt-4">
                  <MainButton text={buttonLabels.viewAllVideos} linkUrl={linkUrls.videos} />
                </div>
              </div>
            </>
          )}
          {webstories?.length > 0 && isSelected === 'webstories' && (
            <div>
              <StoryContainer webstories={webstories} />
              <div className="pt-12 md:pt-4">
                <MainButton text={buttonLabels.viewAllWebstory} linkUrl={linkUrls.webstories} />
              </div>
            </div>
          )}
          {reels?.length > 0 && isSelected === 'reels' && (
            <div>
              <Reels reels={reels} />
              <div className="pt-12 md:pt-4">
                <MainButton text={buttonLabels.viewAllReels} linkUrl={linkUrls.reels} />
              </div>
            </div>
          )}
        </div>
        {showVideoPopup && (
          <div
            className={`videoPopupOverlay ${popupContentType === 'video' ? 'videoMainPopup' : 'reelMainPopup'
              }`}
          >
            <div className="videoPopup">
              <span className="videoPopupCloseBtn" onClick={closeVideoPopup}>
                ×
              </span>
              <iframe
                title="Video Popup"
                src={popupVideoUrl}
                width="560"
                height="315"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdatesSection;
