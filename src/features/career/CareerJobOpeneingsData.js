import React from 'react';
import { isMobileView } from '@/src/utils';
import CareerJobOpenings from './CareerJobOpeneings';
import { getAllCareerJobListing } from '@/src/services/career/careerJobOpeneingsListing';

export default async function CareerJobOpeneingsData({ translation }) {
  const isMobile = await isMobileView();

  let jobListError = false;
  let techData = [];
  let socialMediaData = [];
  let seoData = [];
  let customerExperience = [];
  let othersData = [];
  let jobsData = [];

  try {
    const response = await getAllCareerJobListing();
    if (response.code === 200 && response.success) {
      jobsData = response?.jobs_data;

      techData = response?.tech_data;
      socialMediaData = response?.social_media_data;
      seoData = response?.seo_data;
      customerExperience = response?.customer_data;
      othersData = response?.other_data;
    } else {
      jobListError = true;
    }
  } catch (err) {
    console.error('Failed to fetch blog list:', err);
    jobListError = true;
  }

  return (
    <CareerJobOpenings
      techData={techData}
      socialMediaData={socialMediaData}
      seoData={seoData}
      customerExperience={customerExperience}
      othersData={othersData}
      jobsData={jobsData}
      isMobile={isMobile}
      translation={translation}
      jobListError={jobListError}
    />
  );
}
