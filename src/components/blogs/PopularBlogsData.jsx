// src/components/blogs/PopularBlogsData.js

import React from "react";
import { getDictionary } from "@/src/lib/dictonaries";
import { isMobileView } from "@/src/utils";
import { getSelectedLanguage } from "@/src/services/locale";
import PopularBlogs from "@/src/components/blogs/PopularBlogs";
import { popularBlogList } from "@/src/services/blogs/popularBlogList";

export default async function PopularBlogsData({ prefLangs }) {
  const prefLang = prefLangs ? "hi" : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  let blogsPopular = [];
  let popularBlogsError = false;

  // await new Promise((res) => setTimeout(res, 3000)); // simulate 2s delay

  try {
    const response = await popularBlogList();
    if (response && response.data) {
      blogsPopular = response.data;
    } else {
      popularBlogsError = true;
    }
  } catch (err) {
    console.error("Failed to fetch popular blogs:", err);
    popularBlogsError = true;
  }

  return (
    <PopularBlogs
      isMobile={isMobile}
      blogsPopular={blogsPopular}
      root={"main_container"}
      translation={translation}
      prefLang={prefLang}
      popularBlogsError={popularBlogsError}
    />
  );
}
