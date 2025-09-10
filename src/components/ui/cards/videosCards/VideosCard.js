import React from "react";
import Link from "next/link";
import Image from "next/image";
import SocialMediaLinksShare from "../../../shared/social-media/SocialMediaShare";
import TG_LinkButton from "../../buttons/TgLinkButton";
import TG_author from "../../authorText/author";

const TG_VideoCardUnified = ({
  variant = "default", // "featured" or "default"
  title,
  image,
  videoUrl,
  views,
  createdAt,
  description,
  showSocial = false,
  playIcon = "https://images.tractorgyan.com/uploads/113818/669109a809c8d-playButton.webp",
  author = "By Team TractorGyan",
  isMobile,
}) => {
  const thumbnail = `https://images.tractorgyan.com/uploads/${image}`;

  if (variant === "featured") {
    return (
      <div className="relative min-h-[150px] w-full rounded-xl border border-gray-light bg-white p-4 text-center md:my-2 md:max-h-[420px] md:min-h-[313px] xl:max-h-[420px] xl:min-h-[300px]">
        <Link href={videoUrl} title={title} aria-label={title}>
          <h2 className="mb-5 hidden text-left text-lg font-semibold leading-9 hover:underline md:block md:text-[32px]">
            {title}
          </h2>
        </Link>

        <div className="justify-between gap-4 md:flex">
          {/* Thumbnail Section */}
          <div className="relative w-full md:w-1/2">
            <Link href={videoUrl}>
              <div className="relative mb-2.5 h-[190px] w-full overflow-hidden rounded-lg md:h-[250px]">
                <Image
                  src={thumbnail}
                  width={472}
                  height={290}
                  alt={title}
                  className="h-full w-full rounded-[10px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={playIcon}
                    width={60}
                    height={60}
                    alt="play"
                    className="h-auto max-w-[50px] rounded-3xl md:max-w-[60px]"
                  />
                </div>
              </div>
            </Link>

            <div className="hidden w-full items-center justify-between text-sm text-gray-main md:flex">
              <TG_author />
              <div className="flex items-center gap-1">
                <Image
                  src="https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp"
                  width={24}
                  height={24}
                  alt="views"
                  className="h-4 w-6"
                />
                <span className="text-sm font-semibold text-gray-dark">
                  {views}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-dark">
                {createdAt}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative mt-3 w-full text-left md:mt-0 md:w-1/2">
            <Link href={videoUrl} title={title} aria-label={title}>
              <h2 className="mb-2 text-lg font-semibold hover:underline md:hidden md:text-2xl">
                {title}
              </h2>
            </Link>

            <p className="mb-2.5 line-clamp-3 hidden text-gray-main md:block">
              {description?.length > 300
                ? `${description.slice(0, 300)}...`
                : description}
            </p>
            {!isMobile && (
              <TG_LinkButton
                href={videoUrl}
                iconSrc="https://images.tractorgyan.com/uploads/119912/68467f5fec55b-green-arrow.webp"
              >
                Read More
              </TG_LinkButton>
            )}

            {showSocial && (
              <div className="absolute bottom-2 right-0 hidden md:block">
                <h5 className="mb-1.5 text-sm font-medium text-black">
                  Share this video
                </h5>
                <SocialMediaLinksShare />
              </div>
            )}

            <div className="mt-2 flex justify-between text-sm text-gray-main md:hidden">
              <div className="flex items-center gap-1">
                <Image
                  src="https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp"
                  width={20}
                  height={20}
                  alt="views"
                  className="h-5 w-6"
                />
                <span>{views}</span>
              </div>
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default compact card
  return (
    <div className="relative my-1 cursor-pointer rounded-xl border border-transparent bg-white p-4 text-center shadow-main hover:border-secondary hover:bg-green-lighter">
      <Link href={videoUrl}>
        <div className="relative mb-2.5 h-[180px] w-full overflow-hidden rounded-lg md:h-[160px]">
          <Image
            src={thumbnail}
            width={500}
            height={500}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={playIcon}
              width={40}
              height={40}
              alt="play"
              className="h-auto max-w-10 rounded-3xl"
            />
          </div>
        </div>
      </Link>

      <Link href={videoUrl} title={title}>
        <h3 className="mb-2.5 text-left text-lg font-semibold text-black hover:underline md:line-clamp-1">
          {title}
        </h3>
      </Link>

      <div className="flex items-center justify-between text-sm text-gray-main">
        <div className="flex items-center gap-1">
          <Image
            src="https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp"
            width={20}
            height={20}
            alt="views"
            className="h-5 w-6"
          />
          <span>{views}</span>
        </div>
        <span>{createdAt}</span>
      </div>
    </div>
  );
};

export default TG_VideoCardUnified;
