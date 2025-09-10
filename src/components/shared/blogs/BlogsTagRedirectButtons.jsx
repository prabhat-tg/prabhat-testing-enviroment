"use client";
import { useRouter } from "next/navigation";

export default function BlogsTagRedirectButtons({ url, children }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${url?.url}?tag_id=${url?.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}
