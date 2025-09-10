import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { tractorgyan_share } from '@/src/utils';

const VideosContainer = ({ videos, openVideoPopup }) => {
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
    if (windowWidth <= 440) return 1.1;
    if (windowWidth <= 600) return 1.5;
    if (windowWidth <= 768) return 1.8;
    if (windowWidth <= 970) return 2.2;
    if (windowWidth <= 1150) return 3.1;
    if (windowWidth <= 1280) return 3.5;
    return 4;
  };

  const slidesToShow = getSlidesToShow();
  const shouldShowArrows = videos.length > slidesToShow;

  let totalDots = 1;
  if (windowWidth <= 768) totalDots = videos.length;
  else if (windowWidth <= 970) totalDots = videos.length - 1;
  else totalDots = videos.length - 2;

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: shouldShowArrows,
    centerPadding: '0px',
    infinite: false,
    afterChange: index => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          // dots: true,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1,
          // dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          // dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          // dots: true,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          // dots: true,
        },
      },
    ],
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings} className="custom-slider h-full py-2">
        {/* <Slider {...settings} className="custom-slider h-full py-2"> */}
        {videos.map((video, index) => (
          <div key={index} className="w-full px-2">
            <div className="relative mx-2 my-2 h-full min-h-[150px] w-full max-w-[350px] rounded-xl bg-white p-4 text-center shadow-card sm:min-w-[200px] md:mx-auto md:ms-2 md:max-h-[350px] md:min-h-[320px] xl:max-w-[300px]">
              {/* Clickable image block */}
              <div
                className="relative mb-2.5 h-[160px] w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openVideoPopup(video.url_of_video, 'video')}
              >
                <Image
                  src={`https://images.tractorgyan.com/uploads/${video.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`}
                  height={500}
                  width={500}
                  alt={video.title}
                  title={video.title}
                  className="h-full max-h-[180px] w-full object-cover"
                />
                <Image
                  src="https://images.tractorgyan.com/uploads/113818/669109a809c8d-playButton.webp"
                  height={50}
                  width={50}
                  alt="play-button-icon"
                  title="play-button-icon"
                  className="absolute left-[42%] top-[30%] h-auto max-w-[50px] rounded-3xl"
                />
              </div>

              {/* Clickable title */}
              <h5
                className="mb-2.5 line-clamp-3 h-[84px] cursor-pointer text-left text-lg"
                onClick={() => openVideoPopup(video.url_of_video, 'video')}
                title={video.title}
              >
                {video.title}
              </h5>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-main">
                  <Image
                    src="https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp"
                    height={100}
                    width={100}
                    alt="views-icon"
                    title="views-icon"
                    className="h-5 w-6"
                  />
                  <div>
                    <span className="text-xs">{video.total_view}</span>
                  </div>
                </div>
                <div
                  onClick={e => {
                    e.stopPropagation(); // Prevent triggering popup when share clicked
                    tractorgyan_share({
                      title: video.title,
                      url: video.url_of_video,
                      message: 'Check out this video!',
                    });
                  }}
                >
                  <Image
                    src="https://images.tractorgyan.com/uploads/117330/677cd38eb3508-forward-icon_small.webp"
                    height={50}
                    width={50}
                    alt="share-icon"
                    title="share-icon"
                    className="h-4 w-5"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {shouldShowArrows && (
        <div className="dots-wrapper my-4 flex justify-center">
          {Array.from({ length: totalDots }).map((_, i) => (
            <>
              <button
                key={i}
                className={`mx-1 h-3 w-3 rounded-full ${
                  Math.ceil(currentSlide) === i ? 'bg-primary' : 'bg-section-gray'
                }`}
                onClick={() => sliderRef.current.slickGoTo(i)}
              />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default VideosContainer;
