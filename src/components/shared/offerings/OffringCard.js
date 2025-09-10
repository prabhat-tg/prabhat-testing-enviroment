import Image from "next/image";
import Link from "next/link";
import React from "react";

const OffringCard = ({ imgUrl, text, link }) => {
  return (
    <Link
      href={link || "/"}
      title={text}
      aria-label={`Learn more about ${text} in India`}
      className={`${text === "Agriculture News" ? "hidden md:block" : "md:block"} flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-transparent bg-white p-2 shadow-card hover:border-secondary hover:bg-green-lighter md:p-4`}
    >
      <div className="flex max-h-[68px] max-w-[110px] items-center justify-center md:mb-2">
        <Image
          src={imgUrl}
          height={500}
          width={500}
          alt={text + " image"}
          title={text + " image"}
          className="h-auto w-auto"
        />
      </div>
      <div
        className={`text-center text-xs font-semibold leading-[16px] text-black md:text-sm`}
      >
        {text}{" "}
      </div>
    </Link>
  );
};

export default OffringCard;
