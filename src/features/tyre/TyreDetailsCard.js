import { tgi_arrow_right } from '@/src/utils/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/**
 * TyreDetailsCard component for displaying product details in a card format
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the product
 * @param {string} props.type - Type of the product
 * @param {string} props.title - Product title
 * @param {string} props.brandName - Brand name
 * @param {string} props.pageUrl - URL for product details page
 * @param {string} props.imgUrl - Image URL
 * @param {string} props.popularTyre - Whether tyre is popular ('Yes'/'No')
 * @param {number} props.reviews - Number of reviews
 * @param {number} props.rating - Product rating
 * @param {boolean} props.isLast - Whether this is the last card (for styling)
 * @param {string} props.mode - Display mode ('tyre', 'tractor', 'implement')
 * @param {function} props.translation - Translation function that takes a key and returns translated text
 */
const TyreDetailsCard = ({
  size,
  type,
  title,
  brandName,
  pageUrl,
  imgUrl,
  popularTyre,
  reviews,
  rating,
  isLast,
  mode = 'tyre', // 'tyre', 'tractor', 'implement'
  translation
}) => {
  // Function to round rating to nearest 0.5 for available star images
  const roundToNearestHalf = (num) => {
    return Math.round(num * 2) / 2;
  };

  const roundedRating = roundToNearestHalf(rating);

  // Mapping ratings to star image URLs - corrected mapping
  const starImages = {
    0.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    1: 'https://images.tractorgyan.com/uploads/117230/6773d16b0a195-star-yellow-icon_small.webp',
    1.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    2: 'https://images.tractorgyan.com/uploads/117230/6773d16b0a195-star-yellow-icon_small.webp',
    2.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    3: 'https://images.tractorgyan.com/uploads/117230/6773d16b0a195-star-yellow-icon_small.webp',
    3.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    4: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
    4.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
    5: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
  };
  const starImage = starImages[roundedRating] || ''; // Fallback if rating is invalid

  const featureItem = (label, value) => {
    return (
      <span className="flex items-center gap-1.5 text-xs font-normal text-gray-main capitalize">
        {/* <Image
            src={"https://images.tractorgyan.com/uploads/117228/677395f732537-filled-gray-star.webp"}
            height={100}
            width={100}
            alt={`${label} icon`}
            title={`${label} icon`}
            className="w-4"
          /> */}
        {label}:{value}
      </span>
    );
  };

  // Get feature labels and button text based on mode
  const getModeSpecificContent = () => {

    switch (mode) {
      case 'tractor':
        return {
          feature1Label: translation.tractorSpecs?.hp || 'HP',
          feature2Label: translation.tractorSpecs?.cylinders || 'Cylinders',
          buttonText: translation.buttons?.viewTractorPrice || 'View Tractor Price',
        };
      case 'implement':
        return {
          // feature1Label: translation.headings.type || 'Type',
          feature1Label: translation.headings.power || 'Power',
          // feature2Label: translation.blogs.category || 'Category',
          buttonText: translation.buttons?.viewPrice || 'View Implement Price',
        };
      default: // tyre
        return {
          feature1Label: translation.headings?.size || 'Size',
          feature2Label: translation.headings?.type || 'Type',
          buttonText: translation.buttons?.viewTyrePrice || 'View Tyre Price',
        };
    }
  };

  const { feature1Label, feature2Label, buttonText } = getModeSpecificContent();

  return (
    // <div className="flex w-full justify-center gap-3 border-b-[1px] border-gray-gainsboro py-4 md:block md:max-w-[240px] md:border-b-[0px] md:border-r-[1px] md:p-4 md:pb-2 mb-4 md:mb-0">
    <div
      className={`flex w-full justify-center gap-3 py-4 md:max-w-[240px] md:flex-col md:justify-between md:border-b-[0px] md:border-r-[1px] md:p-4 md:pb-2 ${isLast ? 'mb-0 border-b-0 md:border-r-0' : 'mb-4 border-b-[1px] border-gray-gainsboro md:mb-0'}`}
    >
      {' '}
      <div className="relative flex h-[128px] w-2/5 max-w-[183px] items-center justify-center md:mb-3 md:w-full">
        {popularTyre === 'Yes' && (
          <span className={`${mode === 'implement' ? 'bg-error-main text-white' : 'bg-white text-[#D31A00]'} absolute -top-3 left-0 rounded-full border-[1px] border-[#D31A00] px-3 py-1 text-xs shadow-main`}>
            Popular
          </span>
        )}
        <Link
          href={pageUrl || '/'}
          title={`${brandName} ${title} image`}
          aria-label={`read more about ${brandName} ${title} tyre in india`}
        >
          <Image
            src={`https://images.tractorgyan.com/uploads/${imgUrl}`}
            height={500}
            width={500}
            alt={`${brandName} ${title} image`}
            title={`${brandName} ${title} image`}
            className="h-auto max-h-[120px] w-auto"
          />
        </Link>
      </div>
      <div className="w-3/5 md:flex md:min-h-[140px] md:w-full md:flex-col md:justify-end">
        <div className="mb-3">
          <Link
            href={pageUrl || '/'}
            title={`${brandName} ${title}`}
            aria-label={`read more aboute ${brandName} ${title} tyre in india`}
          >
            <h6 className="text-sm font-medium text-gray-dark">
              {brandName} {title}
            </h6>
          </Link>
        </div>
        {rating > 0 && (
          <div className="mb-3 flex items-center gap-2">
            <div className="text-xs font-medium text-gray-main">{rating}</div>
            <div className="min-w-[17px] max-w-[17px]">
              {/* <Image src="https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp" height={50} width={50} alt="star-icon" title="star-icon" className="w-full" /> */}
              {starImage ? (
                <Image
                  src={starImage}
                  height={100}
                  width={100}
                  alt={`Rating: ${roundedRating}`}
                  title={`Rating: ${roundedRating}`}
                  className="w-4"
                />
              ) : (
                <Image
                  src={
                    'https://images.tractorgyan.com/uploads/117228/677395f732537-filled-gray-star.webp'
                  }
                  height={100}
                  width={100}
                  alt={`Rating: ${rating}`}
                  title={`Rating: ${rating}`}
                  className="w-4"
                />
              )}
            </div>
            <div className="text-xs font-medium text-gray-main">({reviews} reviews)</div>
          </div>
        )}
        <div className="mb-3 flex items-center gap-1.5">
          {/* TODO:: Update and Replace Icon Images below */}
          {featureItem(feature1Label, size)}
          {feature2Label ? (
            featureItem(feature2Label, type)
          ) : null}
        </div>

        <Link
          href={pageUrl || '/'}
          title={`${brandName} ${title} price`}
          aria-label={`read more about ${brandName} ${title} ${mode} in india`}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1 text-[13px] md:text-sm text-white text-nowrap md:w-full"
        >
          ₹ {buttonText}{' '}
          <Image
            src={tgi_arrow_right}
            height={50}
            width={50}
            alt="arrow-icon"
            title="arrow-icon"
            className="h-2.5 w-2.5"
          />
        </Link>
      </div>
    </div>
  );
};

export default TyreDetailsCard;
