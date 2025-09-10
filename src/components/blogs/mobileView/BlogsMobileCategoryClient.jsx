'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '@/src/styles/blogs/blogsCategory.module.css';
import style from '../blogsCSS/viewModel.module.css';
import { fetchData } from '@/src/services/apiMethods';

const BlogsMobileCategoryClient = ({
  categories,
  categorySlug,
  prefLang,
  categoriesError, // New prop
  translation, // New prop - assuming translation is passed for messages
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || '');
  const [selectedTag, setSelectedTag] = useState('');
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState();
  const [tagsFetched, setTagsFetched] = useState(false); // Track if tags have been fetched

  // const fetchTagsIfNeeded = async () => {
  //   if (!tagsFetched) {
  //     try {
  //       const tagResponse = await fetchData("api/all_blog_tag");
  //       if (tagResponse?.data) {
  //         setTags(tagResponse.data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch tags:", error);
  //       // Optionally, set an error state here to inform the user
  //     } finally {
  //       setTagsFetched(true); // Mark as fetched even if error, to prevent refetching
  //     }
  //   }
  // };

  const handleCategorySelect = categorySlug => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(categorySlug);
      setSelectedTag('');
    }
  };

  const handleTagSelect = tagName => {
    if (selectedTag === tagName) {
      setSelectedTag('');
    } else {
      setSelectedTag(tagName);
      setSelectedCategory('');
    }
  };

  const handleApplyFilter = () => {
    if (selectedCategory) {
      router.push(
        `${prefLang === 'hi' ? '/hi' : ''}/tractor-industry-news-blogs/category/${selectedCategory}`
      );
    } else if (selectedTag) {
      router.push(`${selectedTag}`);
    }
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
  };

  const toTitleCase = str => {
    return str
      ?.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const displayedCategories = showMoreCategories ? categories : categories?.slice(0, 4);
  const displayedTags = showMoreTags ? tags : tags.slice(0, 4);

  // Early return for error or no data state for categories
  if (categoriesError) {
    return (
      <div className={styles.blog_category_container_mobile}>
        <div className={`${styles.blog_category_header_mobile} text-red-600`}>
          {translation?.error_messages?.categories_load_error || 'Failed to load categories'}
        </div>
      </div>
    );
  }

  // If categories are empty (but no error), show a message or render minimal UI
  // For now, let's allow the filter button to show, but the modal will be empty or show "no categories"
  // const noCategoriesAvailable = !categories || categories.length === 0;

  return (
    <>
      <div className={styles.blog_category_container_mobile}>
        <div
          onClick={() => {
            if (!categoriesError) {
              setIsOpen(true);
              // fetchTagsIfNeeded(); // Fetch tags when modal is opened
            }
          }}
          className={styles.blog_category_header_mobile}
          style={{
            cursor: categoriesError ? 'not-allowed' : 'pointer', // Change cursor if error
            zIndex: 100,
            position: 'unset',
          }}
        >
          <Image
            src="https://images.tractorgyan.com/uploads/119234/6832ed4d27d93-filterIconGray.webp"
            width={16}
            height={16}
            alt="icon"
            className="h-4 w-4"
          />
          <span className="text-xs font-semibold text-gray-dark">
            {translation.blogs.category || 'Category'}
          </span>
        </div>

        {isOpen && (
          <div className={style.overlay}>
            <div className={style.modal}>
              <div className={style.header}>
                <h2 className={style.title}>{translation?.filter_by || 'Filter By'}</h2>
                <button
                  className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
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
                    {translation?.blogs?.category || 'Category'}
                  </h3>
                  {(!categories || categories.length === 0) && !categoriesError && (
                    <p className="text-gray-600 px-2 py-2 text-sm">
                      {translation?.no_categories_found || 'No categories available.'}
                    </p>
                  )}
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
                        {toTitleCase(category?.title) || `Category ${index + 1}`}
                      </button>
                    ))}
                  </div>

                  {categories && categories.length > 4 && (
                    <button
                      onClick={() => setShowMoreCategories(!showMoreCategories)}
                      className={style.showMoreButton}
                    >
                      {showMoreCategories
                        ? translation?.show_less_categories || 'Show less categories'
                        : translation?.show_more_categories || 'Show more categories'}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`${style.showMoreIcon} ${
                          showMoreCategories ? style.showMoreIconRotated : ''
                        }`}
                      >
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </button>
                  )}
                </div>
                {/* Tags section remains commented out as per original code */}
              </div>

              <div className={style.actionButtons}>
                <button
                  onClick={handleApplyFilter}
                  className={`${style.actionButton} ${style.applyButton}`}
                  disabled={!selectedCategory && !selectedTag} // Disable if nothing selected
                >
                  {translation?.apply_filter || 'Apply Filter'}
                </button>
                <button
                  onClick={handleClearFilters}
                  className={`${style.actionButton} ${style.clearButton}`}
                >
                  {translation?.clear_filters || 'Clear Filters'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogsMobileCategoryClient;
