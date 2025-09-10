"use client";
import { useRouter } from "next/navigation";

export default function BlogRedirectButtons({ url, children }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tractor-industry-news-blogs${url}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}
