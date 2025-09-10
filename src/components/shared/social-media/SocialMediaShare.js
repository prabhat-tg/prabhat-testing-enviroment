'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/src/styles/blogs/blogsListing.module.css';
import { usePathname, useSearchParams } from 'next/navigation';

const SOCIAL_ICONS = [
  {
    name: 'Facebook',
    icon: 'https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp',
    getUrl: url => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: 'https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp',
    getUrl: url => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Twitter',
    icon: 'https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp',
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: 'WhatsApp',
    icon: 'https://images.tractorgyan.com/uploads/119512/684680d3eba8f-wahtsapp.webp',
    getUrl: (url, title) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(title)} ${url}`,
  },
  {
    name: 'Email',
    icon: 'https://images.tractorgyan.com/uploads/119751/685cd8730ec2a-email-icon.webp',
    getUrl: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}:\n${url}`)}`,
  },
];

const SocialMediaLinksShare = props => {
  const {
    direction = 'flex-row', // "flex-row" or "flex-col"
    url = '',
    title = 'Check out this blog from TractorGyan!',
  } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [shareURL, setShareURL] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = searchParams?.toString();
      const fullURL = url
        ? url
        : `${window.location.origin}${pathname}${params ? `?${params}` : ''}`;
      setShareURL(fullURL);
    }
  }, [pathname, searchParams, url]);

  return (
    <div
      className={`flex ${direction} gap-1 lg:gap-3 ${styles.Social_Media_LinksShare_section_container}`}
    >
      {SOCIAL_ICONS.map(({ name, icon, getUrl }) => (
        <a
          key={name}
          href={getUrl(shareURL, title)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center rounded-full bg-white ${styles.Social_Media_LinksShare_section_a}`}
          title={`Share on ${name}`}
        >
          <Image
            src={icon}
            height={100}
            width={100}
            alt={`${name}-icon`}
            className="object-contain"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinksShare;

// example of usage:
// <SocialMediaLinksShare url="https://example.com/blog" title="Interesting Blog Post" direction="flex-col" />

{
  /* prevvious code of this File

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/src/styles/blogs/blogsListing.module.css";
import { usePathname, useSearchParams } from "next/navigation";

const SocialMediaLinksShare = ({ direction, url }) => {
  const title = "Check out this blog from TractorGyan!";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [shareURL, setShareURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      const params = searchParams?.toString();
      setShareURL(
        `${window.location.origin}${pathname}${params ? `?${params}` : ""}`
      );
    }
  }, [pathname, searchParams]);

  const emailSubject = encodeURIComponent(title);
  const emailBody = encodeURIComponent(
    `I found this blog interesting:\n${shareURL}`
  );

  return (
    <div
      className={`flex ${direction} gap-1 lg:gap-3 ${styles.Social_Media_LinksShare_section_container}`}
    >
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareURL
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={` bg-white rounded-full flex items-center justify-center ${styles.Social_Media_LinksShare_section_a}`}
      >
        <Image
          src="https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp"
          height={100}
          width={100}
          alt="facebook-icon"
          title="facebook-icon"
          className="object-contain"
        />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareURL
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-white rounded-full flex items-center justify-center ${styles.Social_Media_LinksShare_section_a}`}
      >
        <Image
          src="https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp"
          height={100}
          width={100}
          alt="linkedin-icon"
          title="linkedin-icon"
          className="object-contain"
        />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareURL
        )}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={` bg-white rounded-full flex items-center justify-center ${styles.Social_Media_LinksShare_section_a}`}
      >
        <Image
          src="https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp"
          height={100}
          width={100}
          alt="twitter-icon"
          title="twitter-icon"
          className=" object-contain"
        />
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${title} ${shareURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className={` bg-white rounded-full flex items-center justify-center ${styles.Social_Media_LinksShare_section_a}`}
      >
        <Image
          src="https://images.tractorgyan.com/uploads/119512/684680d3eba8f-wahtsapp.webp"
          height={100}
          width={100}
          alt="whatsapp-icon"
          title="whatsapp-icon"
          className={` object-contain rounded-full`}
        />
      </a>

      <a
        href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
        className={`bg-white rounded-full flex items-center justify-center ${styles.Social_Media_LinksShare_section_a}`}
      >
        <Image
          src="https://images.tractorgyan.com/uploads/119751/685cd8730ec2a-email-icon.webp"
          height={100}
          width={100}
          alt="email-icon"
          title="email-icon"
          className="object-contain"
        />
      </a>
    </div>
  );
};

export default SocialMediaLinksShare;  */
}
