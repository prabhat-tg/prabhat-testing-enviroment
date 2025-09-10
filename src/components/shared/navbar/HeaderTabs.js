import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderTabs = ({ linkUrl, imgUrl, tabHeading, altText }) => {
  return (
    <li>
      <Link href={linkUrl} className="group flex flex-col items-center">
        <div className="mb-2 flex h-[70px] w-[70px] items-center justify-center rounded-2xl border-[1px] group-hover:border-green-main">
          <Image
            src={imgUrl}
            height={50}
            width={50}
            alt={altText}
            title={altText}
            className="h-auto w-auto min-w-[40px]"
          />
        </div>
        <span className="mb-2 text-xs font-semibold text-nowrap leading-4 text-green-stone group-hover:text-black">
          {tabHeading}
        </span>
      </Link>
    </li>
  );
};

export default HeaderTabs;
