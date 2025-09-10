import Image from "next/image";
import Link from "next/link";
import React from "react";

const StoryRing = ({
  numDashes,
  size = 144,
  gap = 8,
  strokeWidth = 4,
  imgSrc,
  altText,
  fullUrl,
}) => {
  // Calculate circle properties
  const radius = size / 2 - strokeWidth; // Adjust for stroke width
  const circumference = 2 * Math.PI * radius; // Circle's circumference
  const dashLength = (circumference - gap * numDashes) / numDashes; // Calculate dash length
  const strokeDashArray = `${dashLength} ${gap}`; // Dash and gap pattern
  const contentSize = size / 4;

  console.log("webstory count ", dashLength);
  return (
    <Link href={`https://tractorgyan.com${fullUrl}`}>
      <div
        className={`relative h-32 w-32 cursor-pointer p-2.5 md:h-36 md:w-36 md:p-3`}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size} ${size}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#25D366" // WhatsApp green color
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDashArray}
            strokeLinecap="round"
          />
        </svg>
        {/* Profile Picture */}
        <Image
          src={imgSrc}
          alt={altText}
          title={altText}
          width={500}
          height={500}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </Link>
  );
};

export default StoryRing;
