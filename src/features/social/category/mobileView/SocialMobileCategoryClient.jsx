"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/src/styles/blogs/blogsCategory.module.css";
import style from "@/src/components/blogs/blogsCSS/viewModel.module.css";
import { fetchData } from "@/src/services/apiMethods";

const SocialMobileCategoryClient = ({
  categories,
  categorySlug,
  translation,
  prefLang,
  categoriesError,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || "");
  const [selectedTag, setSelectedTag] = useState("");
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState();

  // useEffect(() => {
  //   const fetchTags = async () => {
  //     try {
  //       const tagResponse = await fetchData("api/all_blog_tag");
  //       if (tagResponse?.data) {
  //         setTags(tagResponse.data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch tags:", error);
  //     }
  //   };
  //   fetchTags();
  // }, []);

  const handleCategorySelect = (categorySlug) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(categorySlug);
      setSelectedTag("");
    }
  };

  const handleTagSelect = (tagName) => {
    if (selectedTag === tagName) {
      setSelectedTag("");
    } else {
      setSelectedTag(tagName);
      setSelectedCategory("");
    }
  };

  const handleApplyFilter = () => {
    if (selectedCategory) {
      router.push(
        `${
          prefLang === "hi" ? "/hi" : ""
        }/web-story/category/${selectedCategory}`,
      );
    } else if (selectedTag) {
      router.push(
        `${
          prefLang === "hi" ? "/hi" : ""
        }/web-story${selectedTag}?tag_id=${tagId}`,
      );
    }
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedTag("");
  };

  const displayedCategories = showMoreCategories
    ? categories
    : categories?.slice(0, 4);
  const displayedTags = showMoreTags ? tags : tags.slice(0, 4);

  return (
    <>
      <div className={styles.blog_category_container_mobile}>
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          className={styles.blog_category_header_mobile}
          style={{
            cursor: "pointer",
            zIndex: 100,
            position: "unset",
          }}
        >
          <Image
            src="https://images.tractorgyan.com/uploads/119234/6832ed4d27d93-filterIconGray.webp"
            width={16}
            height={16}
            alt="icon"
            className="h-4 w-4 text-2xl font-bold text-gray-main"
          />
          <h2 className={styles.blog_category_title_mobile}>
            {translation?.blogs?.category}
          </h2>
        </div>

        {isOpen && (
          <div className={style.overlay}>
            <div className={style.modal}>
              <div className={style.header}>
                <h2 className={style.title}>
                  {" "}
                  {translation?.headings?.filterBy}
                </h2>
                <button
                  className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={
                      "https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp"
                    }
                    height={50}
                    width={50}
                    alt="close icon"
                    title="close icon"
                  />
                </button>
              </div>

              <div className={style.content}>
                <div className={style.section}>
                  <h3 className={style.sectionTitle}>
                    {" "}
                    {categoriesError
                      ? translation?.error_messages?.categories_load_error ||
                        "Could not load categories."
                      : translation?.blogs?.category}
                  </h3>
                  <div className={style.grid}>
                    {displayedCategories?.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category?.slug)}
                        className={`${style.filterButton} ${
                          selectedCategory === category?.slug
                            ? style.filterButtonSelected
                            : style.filterButtonDefault
                        }`}
                      >
                        {category?.title || `Category ${index + 1}`}
                      </button>
                    ))}
                  </div>

                  {categories?.length > 4 && (
                    <button
                      onClick={() => setShowMoreCategories(!showMoreCategories)}
                      className={style.showMoreButton}
                    >
                      {showMoreCategories
                        ? translation?.buttons?.ShowLessCategories
                        : translation?.buttons?.ShowMoreCategories}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`${style.showMoreIcon} ${
                          showMoreCategories ? style.showMoreIconRotated : ""
                        }`}
                      >
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </button>
                  )}
                </div>
                {/* 
                <div className={style.section}>
                  <h3 className={style.sectionTitle}>Tags</h3>
                  <div className={style.grid}>
                    {displayedTags?.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => {
                          handleTagSelect(tag.url);
                          setTagId(tag.id);
                        }}
                        className={`${style.filterButton} ${selectedTag === tag.url
                          ? style.filterButtonSelected
                          : style.filterButtonDefault
                          }`}
                      >
                        {tag.title}
                      </button>
                    ))}
                  </div>

                  {tags?.length > 4 && (
                    <button
                      onClick={() => setShowMoreTags(!showMoreTags)}
                      className={style.showMoreButton}
                    >
                      {showMoreTags ? "Show less tags" : "Show more tags"}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`${style.showMoreIcon} ${showMoreTags ? style.showMoreIconRotated : ""
                          }`}
                      >
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </button>
                  )}
                </div> */}
              </div>

              <div className={style.actionButtons}>
                <button
                  onClick={handleApplyFilter}
                  className={`${style.actionButton} ${style.applyButton}`}
                >
                  {translation?.buttons?.applyFilter}
                </button>
                <button
                  onClick={handleClearFilters}
                  className={`${style.actionButton} ${style.clearButton}`}
                >
                  {translation?.buttons?.clearFilter}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SocialMobileCategoryClient;
