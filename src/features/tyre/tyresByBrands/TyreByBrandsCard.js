import Image from "next/image";
import Link from "next/link";
import React from "react";

const TyreByBrandsCard = ({ imgUrl, pageUrl, altText }) => {
  const formattedImgUrl = imgUrl.startsWith("/") ? imgUrl : "/" + imgUrl;

  return (
    <Link
      href={`${pageUrl}`}
      aria-label={`Learn more about ${altText} tractor tyres in India`}
    >
      {/* <div className="h-[117px] w-full max-w-[117px] overflow-hidden rounded-xl border-[2px] border-transparent bg-white shadow-card hover:border-secondary hover:bg-green-lighter"> */}
      <div className="h-full w-full overflow-hidden rounded-xl bg-white shadow-card hover:border-[2px] hover:border-secondary hover:bg-green-lighter">
        <Image
          src={`https://images.tractorgyan.com/uploads/smm/images/tyre_brand_logo${formattedImgUrl}`}
          alt={altText + " tractor tyre image"}
          title={altText + " tractor tyre image"}
          height={500}
          width={500}
          className="h-full aspect-square"
        />
      </div>
    </Link>
  );
};

export default TyreByBrandsCard;
