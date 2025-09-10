import React from "react";
import Link from "next/link";
import Image from "next/image";
import TG_Heading from "../headings/Heading";

const TG_ReadMoreBlogCard = ({
  blog,
  btnText,
  translation = { blogs: { continueReading: "Continue Reading" } },
  className = "",
  stripAndLimit = (text, words) =>
    text?.split(" ").slice(0, words).join(" ") || "",
}) => {
  const { id, url, title, featured_image, page_text } = blog;

  return (
    <div
      className={`relative h-full w-full rounded-2xl border border-gray-light p-4 ${className}`}
    >
      {/* Title */}
      <div className="pb-6">
        <Link
          href={`/tractor-industry-news-blogs/${id}/${url}`}
          title={title}
          aria-label={""}
        >
          <TG_Heading
            level={3}
            styleOverride="font-bold text-xl md:text-2xl border-b-3 border-secondary pb-1 leading-7 inline-block text-black md:line-clamp-2 md:max-w-lg md:overflow-hidden md:text-ellipsis pt-2 max-md:text-lg"
          >
            {title}
          </TG_Heading>
        </Link>
      </div>

      {/* Image */}
      <div className="mb-6">
        <Link
          href={`/tractor-industry-news-blogs/${id}/${url}`}
          title={title}
          aria-label={title}
          className="block h-[190px] min-h-[190px] lg:h-[250px]"
        >
          <Image
            src={`https://images.tractorgyan.com/uploads/${featured_image}`}
            alt={`${title} image`}
            title={title}
            width={600}
            height={300}
            className="h-full w-full cursor-pointer rounded-[10px] object-fill"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Description */}
      <div>
        <div
          className="line-clamp-4 text-base leading-snug text-gray-main"
          dangerouslySetInnerHTML={{
            __html: `<p>${stripAndLimit(page_text, 42)}...</p>`,
          }}
        />
        <div className="pt-2">
          <Link
            href={`/tractor-industry-news-blogs/${id}/${url}`}
            title={btnText}
            aria-label={btnText}
          >
            <b className="cursor-pointer font-bold text-gray-main">
              {btnText} &gt;
            </b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TG_ReadMoreBlogCard;

// example

{
  /* <TG_ReadMoreBlogCard
      key={index}
      blog={value}
      btnText={translation.blogs.continueReading}
      translation={{ blogs: { continueReading: translation.blogs.continueReading } }} // or "Read More"
      className="yourCustomStyleIfNeeded"
  /> */
}
