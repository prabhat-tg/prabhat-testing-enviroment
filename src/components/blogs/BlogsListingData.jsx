// src/components/blogs/BlogsListingData.js

import React from "react";
import { getDictionary } from "@/src/lib/dictonaries";
import { isMobileView } from "@/src/utils";
import { getSelectedLanguage } from "@/src/services/locale";
import BlogsListing from "@/src/components/blogs/BlogsListing";
import { getAllBlogList } from "@/src/services/blogs/BlogListTag";

export default async function BlogsListingData({
  searchParams,
  prefLangs,
  params,
  parent,
  subsidyID,
  categorySlug
}) {
  const searchParam = await searchParams;
  const prefLang = prefLangs ? "hi" : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  const page = parseInt(searchParam.page || "1", 10);
  let start = (page - 1) * (page === 1 ? 11 : 10);
  let end = page === 1 ? page * 11 : (page * 10);
  if (page !== 1) {
    start = start + 1;
    end = end + 1;
  }
  let blogPosts = [];
  let blogListCount = 0;
  let blogListError = false;


  try {
    const blogListPayload = {
      start_limit: start,
      end_limit: end,
    };
    const SubsidyIndiaPayload = {
      tag_slug: params,
      subsidy_page: "yes",
      start_limit: start,
      end_limit: end,
    };
    const BlogsTagPayload = {
      tag_slug: params,
      start_limit: start,
      end_limit: end,
    };
    const categoryPayload = {
      blog_slug: params,
      start_limit: start,
      end_limit: end,
    };
    const response = await getAllBlogList(
      parent === "blogTagIndia"
        ? BlogsTagPayload
        : parent === "tractorSubsidyIndia"
          ? SubsidyIndiaPayload
          : parent === "categry"
            ? categoryPayload
            : blogListPayload,
    );

    console.log("---response", response);

    if (response.code === 200 && response.data) {
      blogPosts = response.data;
      blogListCount = response.count || 0;
    } else {
      blogListError = true;
    }
  } catch (err) {
    console.error("Failed to fetch blog list:", err);
    blogListError = true;
  }

  return (
    <BlogsListing
      isMobile={isMobile}
      allBlogPosts={blogPosts}
      currentPage={page}
      translation={translation}
      blogListCount={blogListCount}
      prefLang={prefLang}
      blogListError={blogListError}
      parent={parent}
      params={params ? params : ""}
      subsidyID={subsidyID ? subsidyID : null}
      categorySlug={categorySlug}
    />
  );
}
