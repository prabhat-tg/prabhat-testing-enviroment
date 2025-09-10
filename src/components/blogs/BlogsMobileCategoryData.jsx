// src/components/blogs/BlogsMobileCategoryData.js

import React from "react";
import { getAllBlogCategory } from "@/src/services/blogs/BlogCategory";
import BlogsMobileCategory from "./mobileView/MobileViewCategory"; // Adjust the import path as necessary
import { getDictionary } from "@/src/lib/dictonaries";
import { getSelectedLanguage } from "@/src/services/locale";
import { isMobileView } from "@/src/utils";

const BlogsMobileCategoryData = async ({ prefLangs }) => {
  const prefLang = prefLangs ? "hi" : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  let categories = [];
  let categoriesError = false;

  try {
    const categoryData = await getAllBlogCategory();
    categories = categoryData?.data || [];
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    categoriesError = true;
  }

  return (
    <BlogsMobileCategory
      data={categories}
      translation={translation}
      isWebListing={!isMobile} // Assuming you want to differentiate between mobile and web
      categoriesError={categoriesError} // Pass the error state
    />
  );
};

export default BlogsMobileCategoryData;
