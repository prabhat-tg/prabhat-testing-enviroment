// ============ Used At ============
// 1. /
// 2. /compare-tractors
// =================================
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TG_Banner = ({
  imgUrl,
  mobileImgUrl,
  pageUrl,
  title,
  additionalClasses,
  imageClasses,
  unoptimized = false,
}) => {
  const BannerContent = (
    <div className={`${additionalClasses} mb-8 overflow-hidden rounded-xl`}>
      <Image
        src={imgUrl}
        height={166}
        width={964}
        alt={title}
        title={title}
        className={`${imageClasses} hidden h-auto max-h-[240px] w-full object-cover md:block`}
        unoptimized={unoptimized}
      />
      <Image
        src={mobileImgUrl ? mobileImgUrl : imgUrl}
        height={132}
        width={382}
        alt={title}
        title={title}
        className={`${imageClasses} block h-auto max-h-[132px] w-full object-cover md:hidden`}
        unoptimized={unoptimized}
      />
    </div>
  );

  return pageUrl ? (
    <Link href={pageUrl} title={title} aria-label={title}>
      {BannerContent}
    </Link>
  ) : (
    BannerContent
  );
};

export default TG_Banner;

// Usage:
// With Redirection =>
{
  /* <TG_Banner 
  imgUrl={"https://images.tractorgyan.com/uploads/120275/1753706468Compare-Tractors-Desktop.webp"}
  title={"Compare Tractors"}
  additionalClasses={"mb-10"}
  pageUrl={'/'}
/> */
}

// Without Redirection =>
{
  /* <TG_Banner 
  imgUrl={"https://images.tractorgyan.com/uploads/120275/1753706468Compare-Tractors-Desktop.webp"}
  title={"Compare Tractors"}
  additionalClasses={"mb-10"}
/> */
}
