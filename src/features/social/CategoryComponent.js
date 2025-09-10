import React from "react";
import styles from "@/src/styles/blogs/blogsCategory.module.css";
import BlogsCategoryClient from "../../components/shared/blogs-category/BlogsCategoryClient";
import GoogleAdVertical from "./GoogleAdVertical/GoogleAdVertical";
import { getAllSocialStoryCategory } from "@/src/services/social/WebstoryCategory";

const SocialCategory = async ({
  categorySlug,
  title,
  isShowCategory,
  translation,
  categoriesError,
}) => {
  const res = await getAllSocialStoryCategory();
  const data = await res;
  const categories = data?.data || [];

  return (
    <>
      {isShowCategory ? (
        <div className={`h-fit ${styles.blog_category_container}`}>
          <div className={styles.blog_category_header}>
            <h2 className={styles.blog_category_title}>
              {translation?.blogs?.category || "Categories"}
            </h2>
          </div>

          <BlogsCategoryClient
            categories={categories}
            categorySlug={categorySlug}
            title={title}
            categoriesError={categoriesError}
          />
        </div>
      ) : (
        <GoogleAdVertical />
      )}
    </>
  );
};

export default SocialCategory;
