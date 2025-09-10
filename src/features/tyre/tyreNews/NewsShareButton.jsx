"use client";

import Image from "next/image";
import { tractorgyan_share } from "@/src/utils";

export default function NewsShareButton({ title, url }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        tractorgyan_share({ title, url, message: "Check out this news!" });
      }}
      aria-label="Share this news"
    >
      <Image
        src="https://images.tractorgyan.com/uploads/117330/677cd38eb3508-forward-icon_small.webp"
        width={24}
        height={24}
        style={{ width: "24px", height: "24px" }}
        alt="share icon"
        title="share icon"
      />
    </button>
  );
}
