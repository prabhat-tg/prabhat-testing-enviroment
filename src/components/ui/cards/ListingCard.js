import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tgi_arrow_right, tgi_star } from '@/src/utils/assets/icons';

import { memo } from 'react';

const TG_HorizontalCardComponent = ({
  title,
  imageSrc,
  imageAlt,
  detailUrl,
  specs = {}, // { label: value }
  buttonText = 'View Details',
  buttonPrefix = '₹ ', // optional ₹ or empty
  showButton = true,
  isPopular = false,
  showRatingOnTop = false,
  total_reviews = 0, // Total reviews for the rating
  avg_review = 0, // Average rating value
  translation
  // Removed position and tractorId props since schema is now handled at parent level
}) => {
  // Function to round rating to nearest 0.5
  const roundToNearestHalf = num => {
    return Math.round(num * 2) / 2;
  };

  const rating = roundToNearestHalf(avg_review);

  // Determine star image based on rating logic
  const getStarImage = (ratingValue) => {
    if (ratingValue > 4) {
      // Use 5-star image for ratings greater than 4
      return 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp';
    } else {
      // Use half-star image for ratings 4 and below
      return 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp';
    }
  };

  const starImage = rating > 0 ? getStarImage(rating) : 'https://images.tractorgyan.com/uploads/117228/677395f732537-filled-gray-star.webp';

  return (
    <div className="relative flex h-auto w-full max-w-[420px] gap-3 overflow-hidden rounded-2xl border border-gray-light bg-white px-3 py-4 transition-all duration-300 hover:border-secondary hover:bg-green-lighter md:gap-4 md:px-4 md:py-4 lg:gap-3">
      {/* Popular Tag */}
      {isPopular && (
        <div className="absolute left-0 top-5 w-[200px]">
          <div className="absolute -left-12 -top-1 z-10 flex h-6 w-44 rotate-[-45deg] items-center justify-center bg-green-dark-gradient text-center text-sm font-bold text-white shadow-forSell md:h-8">
            Popular
          </div>
        </div>
      )}
      {/* Image Block */}
      <div className="flex h-full min-w-[112px] max-w-[140px] items-center justify-center md:min-w-[140px] md:max-w-[150px]">
        <Link href={detailUrl} title={`${title} image`} aria-label={`Image of ${title}`}>
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            title={title}
            width={500}
            height={500}
            className="h-auto max-h-[100px] min-h-[90px] w-auto object-contain"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Content Block */}
      <div className="flex h-full w-[75%] flex-col justify-between md:w-full">
        <div className="relative">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-start justify-between">
              <Link
                href={detailUrl}
                title={title}
                aria-label={`Know more about ${title}`}
                className="flex-1 pr-2"
              >
                <h5 className="mb-1.5 line-clamp-2 text-sm font-semibold text-gray-dark sm:mb-3 md:text-lg">
                  {title}
                </h5>
              </Link>
              {/* Rating positioned in top-right corner */}
              {showRatingOnTop && avg_review > 0 && (
                <div className="flex flex-col items-end gap-0 font-medium text-gray-dark">
                  <span className="flex items-center gap-1 text-sm">
                    {avg_review}
                    <Image
                      src={starImage}
                      height={20}
                      width={20}
                      alt={`Rating: ${avg_review}`}
                      title={`Rating: ${avg_review}`}
                      className="h-[14px] w-[14px]"
                    />
                  </span>
                  <span className="text-nowrap text-xs">
                    {total_reviews > 0 ? `${total_reviews} ${translation.tractorDetails.reviews}` : 'No Reviews'}
                  </span>
                </div>
              )}
            </div>
            {/* Rating below title when not on top */}
            {!showRatingOnTop && avg_review > 0 && (
              <div className="-mt-1 mb-3 flex flex-row items-center gap-1 font-medium text-gray-dark">
                <span className="mt-0.5 flex justify-center gap-1 text-sm">
                  {avg_review}
                  <Image
                    src={starImage}
                    height={20}
                    width={20}
                    alt={`Rating: ${avg_review}`}
                    title={`Rating: ${avg_review}`}
                    className="mt-0.5 h-[14px] w-[14px]"
                  />
                </span>
                <span className="mt-0.5 text-nowrap text-xs">
                  {total_reviews > 0 ? `${total_reviews} ${translation.tractorDetails.reviews}` : 'No Reviews'}
                </span>
              </div>
            )}
          </div>

          {/* TODO:: To be used in case of implements */}
          {Object.entries(specs).length && Object.entries(specs).length < 2 ? (
            <div className="mb-1.5 flex flex-wrap items-center gap-4 text-xs text-gray-main sm:mb-3">
              {Object.entries(specs).map(([label, value]) => (
                <div key={label} className="flex items-center gap-1">
                  <span className="text-sm text-black">{label}:</span>
                  <span className="text-sm font-semibold text-black">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            // TODO:: To be used in case of tractors
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2.5 text-gray-main sm:mb-3 md:gap-4">
              {Object.entries(specs).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-xs text-black">{label}</span>
                  <span className="text-sm font-semibold text-black">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {showButton && (
          <Link
            href={detailUrl}
            title={buttonText}
            aria-label={buttonText}
            className="-ml-1 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
          >
            {buttonPrefix}
            {buttonText}
            <Image
              src={tgi_arrow_right}
              alt="arrow-icon"
              width={10}
              height={10}
              className="h-2.5 w-2.5"
              loading="lazy"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

const TG_HorizontalCard = memo(TG_HorizontalCardComponent);
export default TG_HorizontalCard;

//  How to Use for All Types

//   Tyre Example
// <TG_HorizontalCard
//   title="MRF Shakti 3-Rib 6.00x16 - Front Tyre"
//   imageSrc="https://images.tractorgyan.com/uploads/112280/65f2f9b577f04-MRF-Shakti-3-Rib-6-16.webp"
//   detailUrl="/tyre/mrf-shakti-3-rib-6-x-16/13"
//   specs={{ Size: "6.00x16", Type: "Front" }}
//   buttonText="View Tyre Price"
//   buttonPrefix="₹ "
// />

// Tractor Example:
// <TG_HorizontalCard
//   title="Mahindra 575 DI XP Plus"
//   imageSrc="https://images.tractorgyan.com/uploads/2835/6136239820b0a_mahindra-575-DI-XP-Plus-tractorgyan.jpg"
//   detailUrl="/tractor/mahindra-575-di-xp-plus/440"
//   specs={{ HP: "46.9", Cylinder: "4", "Lifting Capacity": "1500 Kg" }}
//   buttonText="View Tractor"
//   buttonPrefix=""
//   avg_review={4.2}
//   total_reviews={15}
//   showRatingOnTop={true}
// />

// Note: SEO schema (ItemList/ListItem) is now handled at the parent component level,
// not within individual cards. This ensures proper Google Rich Results detection.
