import React from "react";
import BlogsMobileCategoryClient from "./BlogsMobileCategoryClient";
import SocialMobileCategoryClient from "../../../features/social/category/mobileView/SocialMobileCategoryClient";

const BlogsMobileCategory = ({
  categorySlug,
  title,
  isWebListing,
  translation,
  data,
  prefLang,
  categoriesError, // New prop
}) => {
  return (
    <div>
      {isWebListing ? (
        <SocialMobileCategoryClient
          categories={data}
          categorySlug={categorySlug}
          title={title}
          translation={translation}
          prefLang={prefLang}
          categoriesError={categoriesError}
        />
      ) : (
        <BlogsMobileCategoryClient
          categories={data}
          categorySlug={categorySlug}
          translation={translation}
          prefLang={prefLang}
          categoriesError={categoriesError}
        />
      )}
    </div>
  );
};

export default BlogsMobileCategory;
