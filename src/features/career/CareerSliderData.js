import React from 'react';
import { isMobileView } from '@/src/utils';
import { getAllCareerSliderImages } from '@/src/services/career/careerSliderImage';
import CareerMainSlider from './CareerMainSlider';

export default async function CareerSliderData({ translation }) {
  const isMobile = await isMobileView();

  let imagesListError = false;
  let desktopImages = [];
  let mobileImages = [];

  try {
    const response = await getAllCareerSliderImages();

    if (response.code === 200 && response.success) {
      desktopImages = response?.desktop_images;
      mobileImages = response?.mobile_images;
    } else {
      imagesListError = true;
    }
  } catch (err) {
    console.error('Failed to fetch blog list:', err);
    imagesListError = true;
  }

  return (
    <CareerMainSlider
      isMobile={isMobile}
      desktopImages={desktopImages}
      mobileImages={mobileImages}
      translation={translation}
      imageListError={imagesListError}
    />
  );
}
