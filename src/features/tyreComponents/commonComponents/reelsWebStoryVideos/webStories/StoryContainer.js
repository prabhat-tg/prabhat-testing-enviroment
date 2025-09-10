import React, { useState } from "react";
import StoryRing from "./StoryRing";
import Slider from "react-slick";
import Link from "next/link";

const StoryContainer = ({ webstories }) => {
  const settings = {
    dots: false, // Enable navigation dots
    arrows: false, // Enable arrows
    speed: 500, // Transition speed in milliseconds
    infinite: false, // Infinite loop
    slidesToShow: 8, // Number of items to show
    slidesToScroll: 1, // Number of items to scroll at a time
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 4,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 4,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 4,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  const handleWebstoryClick = (index) => {
    setViewedWebstories((prevViewed) => new Set(prevViewed).add(index));
  };
  return (
    <Slider {...settings}>
      {webstories.slice(0, 7).map((webstory, index) => (
        <Link href={webstory.full_url} key={index}>
          <StoryRing
            key={index}
            numDashes={webstory.story_count}
            size={144} // Fixed size for all rings
            gap={8} // Fixed gap for all rings
            strokeWidth={4}
            fullUrl={webstory.full_url}
            imgSrc={`https://images.tractorgyan.com/uploads/${webstory.image.replace(
              /\.(jpg|jpeg|png)$/i,
              ".webp",
            )}`}
            // storyCount={webstory.story_count}
            altText={`${webstory.title}`}
            onClick={() => handleWebstoryClick(index)}
          />
        </Link>
      ))}
    </Slider>
  );
};

export default StoryContainer;
