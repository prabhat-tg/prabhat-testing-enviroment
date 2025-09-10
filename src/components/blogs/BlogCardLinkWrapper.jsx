"use client";

import { useRouter } from "next/navigation";

export default function BlogCardLinkWrapper({ post, children }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tractor-industry-news-blogs/${post.id}/${post.url}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}
