"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SocialMediaLinks = () => {
  return (
    <>
      <div className={`flex gap-3`}>
        <Link
          href={"https://www.facebook.com/TractorsGyan"}
          title="Visit Tractors Gyan Facebook page"
          aria-label="Visit the official Facebook page of Tractors Gyan"
          className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
        >
          <Image
            src="https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp"
            height={100}
            width={100}
            alt="facebook-icon"
            title="facebook-icon"
            className="h-auto w-full min-w-[16px] object-contain"
          />
        </Link>
        <Link
          href={"https://www.linkedin.com/company/tractorgyan"}
          title="Visit Tractors Gyan LinkedIn page"
          aria-label="Visit the official LinkedIn page of Tractors Gyan"
          className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
        >
          <Image
            src="https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp"
            height={100}
            width={100}
            alt="linkedin-icon"
            title="linkedin-icon"
            className="h-auto w-full min-w-[16px] object-contain"
          />
        </Link>
        <Link
          href={"https://www.instagram.com/tractorgyan"}
          title="Visit Tractors Gyan Instagram page"
          aria-label="Visit the official Instagram page of Tractors Gyan"
          className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
        >
          <Image
            src="https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp"
            height={100}
            width={100}
            alt="instagram-icon"
            title="instagram-icon"
            className="h-auto w-full min-w-[16px] object-contain"
          />
        </Link>
        <Link
          href="https://twitter.com/TractorGyan"
          title="Visit Tractors Gyan Twitter profile"
          aria-label="Visit the official Twitter profile of Tractors Gyan"
          className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
        >
          <Image
            src="https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp"
            height={100}
            width={100}
            alt="twitter-icon"
            title="twitter-icon"
            className="h-auto w-full min-w-[16px] object-contain"
          />
        </Link>
        <Link
          href="https://www.youtube.com/@TractorGyan"
          title="Visit Tractors Gyan YouTube channel"
          aria-label="Visit the official YouTube channel of Tractors Gyan"
          className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
        >
          <Image
            src="https://images.tractorgyan.com/uploads/118002/67b46ff35f214-Youtube.webp"
            height={100}
            width={100}
            alt="youtube-icon"
            title="youtube-icon"
            className="h-auto w-full min-w-[16px] object-contain"
          />
        </Link>
      </div>
    </>
  );
};
export default SocialMediaLinks;
