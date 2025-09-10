// src/components/blogs/BlogsCategoryData.js

import React from "react";
import { getDictionary } from "@/src/lib/dictonaries";
import { isMobileView } from "@/src/utils";
import { getSelectedLanguage } from "@/src/services/locale";
import { getAllBlogCategory } from "@/src/services/blogs/BlogCategory";
import BlogsCategory from "../shared/blogs-category/BlogsCategory";

export default async function BlogsCategoryData({ prefLangs, categorySlug }) {
  const prefLang = prefLangs ? "hi" : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  let categories = [];
  let categoriesError = false;

  // await new Promise((res) => setTimeout(res, 3000)); // simulate 2s delay

  try {
    const categoryData = await getAllBlogCategory();
    categories = categoryData?.data || [];
  } catch (err) {
    console.error("Failed to fetch blog categories:", err);
    categoriesError = true;
  }

  return (
    <BlogsCategory
      categorySlug={categorySlug}
      categories={categories}
      prefLang={prefLang}
      translation={translation}
      categoriesError={categoriesError}
    />
  );
}
