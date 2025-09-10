"use client";

import { useState } from "react";
import nextDynamic from "next/dynamic";
import BlogSearchInput from "@/src/components/blogs/BlogSearchInput";
const BlogsMobileCategory = nextDynamic(
  () => import("@/src/components/blogs/mobileView/MobileViewCategory"),
  { ssr: true },
  // { ssr: true }
);

export default function BlogListingFilters({
  translation,
  isMobile,
  prefLang,
  categories = [],
}) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="mb-3 flex h-fit w-auto items-center justify-between gap-2">
      <BlogSearchInput
        translation={translation}
        isMobile={isMobile}
        prefLang={prefLang}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      {!isInputFocused && (
        <BlogsMobileCategory
          data={categories}
          prefLang={prefLang}
          translation={translation}
        />
      )}
    </div>
  );
}
