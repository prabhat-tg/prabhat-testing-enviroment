import React from "react";
import styles from "@/src/styles/blogs/blogsCategory.module.css";
import BlogsCategoryClient from "./BlogsCategoryClient";

const BlogsCategory = async ({
  categorySlug,
  prefLang,
  translation,
  categories,
  categoriesError, // New prop
}) => {
  const langPrefix = prefLang === "hi" ? "/hi" : "";

  return (
    <div className={`${styles.blog_category_container}`}>
      <div className={styles.blog_category_header}>
        <h2 className={styles.blog_category_title}>
          {translation?.blogs?.category || "Category"}
        </h2>
      </div>

      <BlogsCategoryClient
        categories={categories}
        categorySlug={categorySlug}
        prefLang={langPrefix}
        categoriesError={categoriesError} // Pass down
        translation={translation} // Pass down for error message
      />
    </div>
  );
};

export default BlogsCategory;
