import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TractorSeriesCard = ({ title, imgSrc, className, href }) => {
  const CardContent = () => (
    <>
      <div className="flex h-16 w-full items-center justify-center md:h-20">
        <Image
          src={imgSrc}
          height={104}
          width={104}
          alt={title}
          title={title}
          className="h-full w-auto max-w-[120px] object-contain"
        />
      </div>
      <span className="mt-2 line-clamp-2 flex h-8 items-center justify-center text-center text-xs font-semibold md:h-10 md:text-base">
        {title}
      </span>
    </>
  );

  const cardClasses = `${className} p-3 max-w-[200px] min-h-[120px] md:min-h-[140px] flex flex-col items-center justify-center rounded-lg shadow-bottom border border-gray-light`;

  if (href) {
    return (
      <Link href={href} className={`${cardClasses} hover:shadow-lg transition-shadow duration-200`}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      <CardContent />
    </div>
  );
};

export default TractorSeriesCard;

// Usage Example
{
  /* <TractorSeriesCard title = {title} imgSrc = {imgSrc}/> */
}
