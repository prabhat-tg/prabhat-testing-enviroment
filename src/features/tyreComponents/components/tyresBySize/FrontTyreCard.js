import Image from "next/image";
import Link from "next/link";
import React from "react";

const FrontTyreCard = ({ url, data }) => {
  return (
    <Link
      href={url}
      title={`${data} front tyre image`}
      aria-label={`${data} front tyre in india`}
      className="relative w-[30%] overflow-hidden rounded-lg border-[1px] border-transparent shadow-card hover:border-secondary hover:bg-green-mid md:w-full md:max-w-[116px]"
    >
      <Image
        src={
          "https://images.tractorgyan.com/uploads/116911/6752f11b8f3a0-front-tyre-size.webp"
        }
        height={200}
        width={200}
        alt={`${data} front tyre image`}
        title={`${data} front tyre image`}
        className="h-auto w-full"
      />
      <span className="absolute left-0 right-0 top-[40%] text-center font-bold text-black">
        {data}
      </span>
    </Link>
  );
};

export default FrontTyreCard;
