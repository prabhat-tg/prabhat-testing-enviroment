import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Reels = ({ reels }) => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0); // Track current video index
  const videoRefs = useRef([]); // Array of refs for the iframes
  const sliderRef = useRef(null); // Ref for the slider

  const settings = {
    dots: false, // Enable navigation dots
    arrows: false, // Enable arrows
    infinite: true, // Infinite loop
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 5, // Number of items to show
    slidesToScroll: 1, // Number of items to scroll at a time
    centerPadding: '0px', // Adjust padding to control the partial slide visibility
    infinite: false,
    swipeToSlide: true, // Allow swiping to any slide
    touchThreshold: 10, // Lower threshold for touch sensitivity
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
          arrows: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          dots: true,
          arrows: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 986,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          arrows: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2.8,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          centerMode: true, // Enable center mode
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          centerMode: true, // Enable center mode
          swipeToSlide: true,
        },
      },
    ],
  };

  // Handle touch events for better swipe control
  const handleTouchStart = e => {
    // Allow click events but prevent default touch behavior for swipe
    if (e.touches.length === 1) {
      e.preventDefault();
    }
  };

  const handleTouchMove = e => {
    // Prevent default to enable custom swipe handling
    e.preventDefault();
  };

  const handleClick = e => {
    // Allow clicks to pass through to iframe
    e.stopPropagation();
  };

  useEffect(() => {
    // Auto-play the next reel after 4 seconds
    const timer = setTimeout(() => {
      setCurrentReelIndex(prevIndex => (prevIndex + 1) % reels?.length);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer on unmount or when index changes
  }, [currentReelIndex, reels?.length]);

  useEffect(() => {
    // Pause all videos except the current one
    videoRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.contentWindow?.postMessage(
          index === currentReelIndex
            ? '{"event":"command","func":"playVideo","args":""}'
            : '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      }
    });
  }, [currentReelIndex]);

  return (
    <div>
      {' '}
      {/* Adjust margin-left */}
      <Slider {...settings} ref={sliderRef} className="custom-slider sm:p-0 md:p-0">
        {reels.slice(0, 5).map((reel, index) => (
          <div
            key={index}
            className={`reel-content relative ms-auto h-full min-h-[152px] w-full max-w-[219px] overflow-hidden rounded-xl border-[1px] border-gray-main sm:min-h-[150px] sm:min-w-[200px] sm:max-w-[228px] md:mx-auto md:max-h-[400px] ${
              currentReelIndex === index ? 'border-blue-500' : ''
            }`}
          >
            <iframe
              ref={el => (videoRefs.current[index] = el)} // Attach each iframe to the refs array
              src={`${reel.url_of_video}?autoplay=1&mute=1&enablejsapi=1`}
              title={`${reel.title}`}
              frameBorder="0"
              allow="autoplay; encrypted-media; gyroscope;"
              allowFullScreen
              width="270"
              height="395"
              className="reel-content h-full min-h-[390px] w-full max-w-[250px] sm:max-h-[410px] sm:min-h-[400px] sm:max-w-[270px] lg:min-w-[200px]"
              onClick={handleClick}
            ></iframe>
            {/* Invisible overlay for swipe detection only */}
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-transparent"
              style={{ pointerEvents: 'none' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Reels;
