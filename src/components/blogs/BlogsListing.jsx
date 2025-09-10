'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '@/src/styles/blogs/blogsListing.module.css';
import SocialMediaLinks from '../shared/social-media/SocialMedia';
import BlogCardLinkWrapper from './BlogCardLinkWrapper';
import SocialMediaLinksShare from '../shared/social-media/SocialMediaShare';
import Link from 'next/link';
import BlogCardItem from './BlogCardItem'; // Import the new component
import TG_BlogCardUnified from '../ui/cards/BlogsCard';
import TG_Button from '../ui/buttons/MainButtons';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

// Utility function needed for rendering the first post directly in this component
function stripAndLimit(htmlString, wordLimit) {
  if (!htmlString) return '';
  const plainText = htmlString.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');
  const words = plainText.trim().split(/\s+/).slice(0, wordLimit);
  return words.join(' ');
}

export default function BlogsListing({
  categorySlug,
  isMobile,
  allBlogPosts,
  currentPage,
  blogTags,
  tagId,
  subsidyID,
  parent,
  params,
  blogCategory,
  blogListCount,
  prefLang,
  translation,
  blogListError, // New prop
}) {
  const router = useRouter();
  const page = currentPage || 1;
  const langPrefix = prefLang === 'hi' ? '/hi' : '';
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const { useCallback } = require('react'); // Ensure React is imported if not already

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, searchParams]);

  const handlePagination = useCallback(
    (newPage, direction) => {
      setIsLoading(true);
      setLoadingButton(direction);

      let url = '';

      if (parent === 'categry') {
        url = `${langPrefix}/tractor-industry-news-blogs/category/${categorySlug}?page=${newPage}`;
      } else if (parent === 'blogTagIndia') {
        url = `${langPrefix}/tractorblogtag/${categorySlug}?page=${newPage}`;
      } else if (parent === 'tractorSubsidyIndia') {
        url = `${langPrefix}/tractors-subsidy-in-india/${params}/${subsidyID}/?page=${newPage}`;
      } else {
        url = `${langPrefix}/tractor-industry-news-blogs?page=${newPage}`;
      }

      router.push(url, { scroll: false });

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // It's generally not recommended to have side effects like setTimeout directly
      // change state without cleanup in a way that could lead to memory leaks if the
      // component unmounts, but for this specific case of resetting loading state,
      // it's often acceptable. A more robust solution might involve clearing the
      // timeout in a useEffect cleanup function if isLoading or loadingButton were props.
      setTimeout(() => {
        setIsLoading(false);
        setLoadingButton(null);
      }, 3000);
    },
    [router, langPrefix, blogCategory, categorySlug, blogTags, setIsLoading, setLoadingButton]
  );

  const POSTS_PER_PAGE = 11;
  const totalPages = Math.ceil(blogListCount / POSTS_PER_PAGE);

  if (blogListError) {
    return (
      <div className="py-10 text-center">
        <p>
          {translation?.error_messages?.blogs_load_error ||
            'Could not load blogs at the moment. Please try again later.'}
        </p>
      </div>
    );
  }

  if (!allBlogPosts || allBlogPosts.length === 0) {
    return (
      <div className="py-10 text-center">
        <p>{translation?.no_blogs_found || 'No blogs found.'}</p>
      </div>
    );
  }

  return (
    <div className={styles.blogs_listing_container_main}>
      <div className={styles.blogs_listing_wrapper}>
        <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2`}>
          {page === 1 &&
            allBlogPosts?.slice(0, 1).map(post => {
              if (post?.id && post?.url) {
                return (
                  <TG_BlogCardUnified
                    key={post.id}
                    title={post.title}
                    excerpt={stripAndLimit(post.page_text, 50)}
                    imageSrc={`https://images.tractorgyan.com/uploads/${post.featured_image}`}
                    blogUrl={`/tractor-industry-news-blogs/${post.id}/${post.url}`}
                    date={post.created_at}
                    author={translation?.headings?.byTeamTractorGyan}
                    readMoreText={translation?.buttons?.readMore}
                    showSocial={true}
                    variant="featured"
                  />
                );
              }
              return null; // if id or url is missing, skip rendering
            })}
        </div>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mt-6">
          {allBlogPosts?.slice(page === 1 ? 1 : 0)?.map(post => (
            // <BlogCardItem
            //   key={post.id}
            //   post={post}
            //   isMobile={isMobile}
            //   translation={translation}
            // />
            <TG_BlogCardUnified
              key={post.id}
              title={post.title}
              excerpt={stripAndLimit(post.page_text, 42)}
              imageSrc={`https://images.tractorgyan.com/uploads/${post.featured_image}`}
              blogUrl={`/tractor-industry-news-blogs/${post.id}/${post.url}`}
              date={post.created_at}
              author={translation?.headings?.byTeamTractorGyan}
              readMoreText={translation?.buttons?.readMore}
              showSocial={true}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <TG_Button
              onClick={() => handlePagination(page - 1, 'prev')}
              disabled={page <= 1 || isLoading}
              icon={tgi_arrow_right_white}
              iconPosition="left"
              iconAlt={translation?.buttons?.prev || 'Previous'}
              className="px-6 py-2"
              iconClass="rotate-180"
            >
              {isLoading && loadingButton === 'prev'
                ? `${translation?.buttons?.loading || 'Loading'} ...`
                : translation?.buttons?.prev || 'Previous'}
            </TG_Button>

            <TG_Button
              onClick={() => handlePagination(page + 1, 'next')}
              disabled={page >= totalPages || isLoading}
              icon={tgi_arrow_right_white}
              iconPosition="right"
              iconAlt={translation?.buttons?.next || 'Next'}
              className="px-6 py-2"
            >
              {isLoading && loadingButton === 'next'
                ? `${translation?.buttons?.loading || 'Loading'} ...`
                : translation?.buttons?.next || 'Next'}
            </TG_Button>
          </div>
        )}
      </div>
    </div>
  );
}
