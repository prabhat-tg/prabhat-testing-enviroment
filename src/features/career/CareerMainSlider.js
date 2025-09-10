'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function CareerMainSlider({
  isMobile,
  desktopImages,
  mobileImages,
  imageListError,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const slides = useMemo(
  //   () => (isMobile ? mobileImages : desktopImages),
  //   [isMobile, mobileImages, desktopImages]
  // );

  const slides = useMemo(() => desktopImages, [isMobile, mobileImages, desktopImages]);

  if (imageListError) {
    return <h1 className="ms-6 pt-8">failed To fetch career images, please try again later</h1>;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = index => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="relative h-screen max-h-[170px] w-full overflow-hidden md:max-h-[500px]">
      {slides?.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Image
            src={`https://images.tractorgyan.com/uploads${slide.image_url}`}
            alt={`Slide ${index + 1}`}
            title={slide.image_url}
            className="h-full w-full object-cover"
            width={1400}
            height={800}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-1/3 w-full bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="absolute bottom-6 text-center">
          <h1 className="mx-auto mb-8 max-w-4xl text-2xl font-bold leading-tight text-white transition-opacity duration-1000 lg:text-4xl">
            Career with Tractorgyan
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 transform space-x-3">
        <button
          onClick={goToPrevious}
          className="absolute left-[-30px] top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-1 transition-all duration-300 hover:bg-opacity-30"
          aria-label="Previous slide"
        >
          <svg
            className="h-3 w-3 text-[#212121]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'scale-125 bg-primary' : 'bg-white hover:bg-opacity-75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <button
          onClick={goToNext}
          className="absolute right-[-40px] top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-1 transition-all duration-300 hover:bg-opacity-30"
          aria-label="Next slide"
        >
          <svg
            className="h-3 w-3 text-[#212121]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute left-0 top-0 z-10 h-64 w-64 opacity-20">
        <div className="bg-green-400 absolute left-0 top-0 h-2 w-full origin-top-left -rotate-45 transform"></div>
        <div className="bg-gray-300 absolute left-0 top-4 h-2 w-full origin-top-left -rotate-45 transform"></div>
        <div className="bg-green-300 absolute left-0 top-8 h-2 w-full origin-top-left -rotate-45 transform"></div>
      </div>

      <div className="bg-green-400 absolute bottom-16 right-8 z-10 h-32 w-32 rounded-full opacity-10"></div>
    </div>
  );
}
