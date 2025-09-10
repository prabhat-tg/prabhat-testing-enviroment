"use client";
import React from "react";
import Link from "next/link";
import styles from "@/src/styles/blogs/blogsCategory.module.css";

const BlogsCategoryClient = ({
  categories,
  categorySlug,
  title,
  prefLang,
  categoriesError, // New prop
  translation, // New prop
}) => {
  const toCamelCase = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getCategoryHref = (title, slug) => {
    if (title === "tractors-videos") {
      return `web-story/category/${slug}`;
    } else if (title === "Web-Stories") {
      return `${slug}`;
    } else if (title === "Web-stories-in-india") {
      return `web-story/category/${slug}`;
    } else {
      return `${prefLang}/tractor-industry-news-blogs/category/${slug}`;
    }
  };

  if (categoriesError) {
    return (
      <div className="px-2 py-3 text-left">
        <p className="text-red-600 text-sm">
          {translation?.error_messages?.categories_load_error ||
            "Could not load categories."}
        </p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="px-2 py-3 text-left">
        <p className="text-sm">
          {translation?.no_categories_found || "No categories available."}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.blog_category_radioGroup}>
      {categories?.map((category, index) => {
        const isActive = category.slug === categorySlug;

        return (
          <Link
            key={index}
            href={getCategoryHref(title, category.slug)}
            className={`${styles.blog_category_radioLabel} ${
              isActive ? styles.activeCategory : ""
            }`}
          >
            <div className={styles.blog_category_radioInner}>
              <span
                className={`${styles.blog_category_radioInput} ${
                  isActive ? styles.checkedRadio : ""
                }`}
              />
              <span className={styles.blog_category_radioText}>
                {toCamelCase(category.title)}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogsCategoryClient;
