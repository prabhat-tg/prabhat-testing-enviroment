import React from "react";
import Link from "next/link";
import Image from "next/image";

const TG_PopularBlogCard = ({ blog }) => {
  const { id, url, title, featured_image } = blog;

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-gray-light bg-green-lighter p-4">
      {/* Blog Image */}
      <div className="h-[170px] overflow-hidden rounded-[10px]">
        <Link
          href={`/tractor-industry-news-blogs/${id}/${url}`}
          title={title}
          aria-label={title}
        >
          <Image
            src={`https://images.tractorgyan.com/uploads/${featured_image}`}
            alt={`${title} image`}
            title={title}
            width={230}
            height={250}
            className="h-full w-full cursor-pointer rounded-[10px] object-fill"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Blog Title */}
      <div className="pt-2">
        <Link
          href={`/tractor-industry-news-blogs/${id}/${url}`}
          title={title}
          aria-label={title}
          className="line-clamp-2 text-sm font-semibold leading-snug text-black hover:underline max-md:min-h-10 md:text-base"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

export default TG_PopularBlogCard;
