import Image from "next/image";
import Link from "next/link";
import React from "react";

const RearTyreCard = ({ url, data }) => {
  return (
    <Link
      href={url}
      title={`${data} rear tyre image`}
      aria-label={`${data} rear tyre in india`}
      className="relative w-[30%] overflow-hidden rounded-lg border-[1px] border-transparent shadow-card hover:border-secondary hover:bg-green-mid md:w-full md:max-w-[116px]"
    >
      <Image
        src={
          "https://images.tractorgyan.com/uploads/116912/6752f18320dab-rear-tyre-size.webp"
        }
        height={200}
        width={200}
        alt={`${data} rear tyre image`}
        title={`${data} rear tyre image`}
        className="h-auto w-full"
      />
      <span className="absolute left-0 right-0 top-[40%] text-center font-bold text-black">
        {data}
      </span>
    </Link>
  );
};

export default RearTyreCard;
