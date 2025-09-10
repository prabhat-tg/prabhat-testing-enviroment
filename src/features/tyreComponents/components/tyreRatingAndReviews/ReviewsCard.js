import Image from 'next/image';
import React from 'react';
import StarRatingIcon from '@/src/svgFiles/StarRatingIcon';

const ReviewsCard = ({ review }) => {
  if (!review) {
    return null;
  }

  const { name, message, rating, date } = review;
  const numericRating = parseInt(rating, 10);

  return (
    <div className="mb-2 w-full rounded-2xl bg-white p-4 shadow-main">
      <div className="mb-[9px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.tractorgyan.com/uploads/117226/6773948a530cf-green-profile.webp"
            height={50}
            width={50}
            alt="user-image-icon"
            title="user-image-icon"
            className="h-6 w-6"
          />
          <span className="text-sm font-medium">{name}</span>
        </div>
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} className="h-4 w-4">
              <StarRatingIcon width="14" height="14" clicked={star <= numericRating} />
            </div>
          ))}
          <span className="ps-2 text-base font-medium text-gray-dark">({numericRating}.0)</span>
        </div>
      </div>
      <div className="mb-[2px]">
        <div className="flex items-center">
          <p className="m-0 truncate text-sm font-normal leading-[21px] text-gray-dark">
            {message}
          </p>
          {/* <button className="w-full max-w-[60px] text-xs font-normal text-gray-main underline">
            See more
          </button> */}
        </div>
      </div>
      {date && <span className="text-xs font-medium text-gray-secondary">{date}</span>}
    </div>
  );
};

export default ReviewsCard;
