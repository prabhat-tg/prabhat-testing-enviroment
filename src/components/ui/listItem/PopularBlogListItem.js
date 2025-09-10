import Link from "next/link";
import Image from "next/image";
import React from "react";

const PopularBlogItem = ({ item, isLast, index }) => {
  const showMobileBorder = !isLast;
  const showDesktopBorder = index === 0 || index === 1;

  const baseClasses =
    "grid gap-4 lg:flex md:justify-between items-start p-4 pl-0 md:gap-8 pb-4";
  const mobileBorder = showMobileBorder ? "border-b-2 border-[#ACACAC]" : "";
  const desktopBorder = showDesktopBorder
    ? "md:border-b-2 md:border-[#ACACAC]"
    : "md:border-0";

  return (
    <div className={`${baseClasses} ${mobileBorder} ${desktopBorder}`}>
      {/* Content Section */}
      <div className="grid h-full w-full justify-between lg:w-[50%]">
        <div>
          <Link
            href={`/tractor-industry-news-blogs/${item.id}/${item.url}`}
            title={item.title}
            aria-label={item.title}
          >
            <b className="text-[14px] text-[#182C3D] hover:underline md:text-[18px]">
              {item.title}
            </b>
          </Link>
        </div>
        <div className="text-sm text-[#595959]">{/* View count or meta */}</div>
      </div>

      {/* Image Section */}
      <div className="relative h-[165px] w-full min-w-[130px] max-w-[300px] overflow-hidden rounded-2xl">
        <Link
          href={`/tractor-industry-news-blogs/${item.id}/${item.url}`}
          title={item.title}
          aria-label={item.title}
        >
          <Image
            src={`https://images.tractorgyan.com/uploads/${item.featured_image}`}
            width={320}
            height={200}
            alt={`${item.title} image`}
            title={item.title}
            className="h-full w-full object-fill"
          />
        </Link>
      </div>
    </div>
  );
};

export default PopularBlogItem;
