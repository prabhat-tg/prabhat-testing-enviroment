import Image from "next/image";
import Link from "next/link";
import React from "react";

const StateCard = ({ title, imgUrl, pageUrl, porpsCurrentLang }) => {
  return (
    <Link
      href={`${porpsCurrentLang == "hi" ? "/hi" : ""}${pageUrl}`}
      title={title + " image"}
      className="col-span-3 md:col-span-2 xl:col-span-1"
    >
      <div className="mb-2 flex h-[65px] items-center justify-center overflow-hidden rounded-xl border-[2px] border-transparent bg-white shadow-main hover:border-secondary hover:bg-green-lighter md:mb-4 md:h-[99px]">
        <Image
          src={imgUrl}
          height={300}
          width={300}
          alt={title + " image"}
          title={title + " image"}
          className="h-auto w-full"
        />
      </div>
      <p className="mb-2 text-center text-xs font-semibold md:text-base">
        {title}
      </p>
    </Link>
  );
};

export default StateCard;
