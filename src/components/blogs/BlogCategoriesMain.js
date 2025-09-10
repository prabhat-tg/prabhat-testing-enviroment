import React, { Suspense } from 'react';
import TittleAndCrumbs from '../shared/TittleAndCrumbs/TittleAndCrumbs';
import BlogSearchInput from './BlogSearchInput';
import DesktopHeader from '../shared/header/DesktopHeader';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { postData } from '@/src/services/apiMethods';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import ScrollToTopNavigate from '../shared/ScrollToTop/ScrollToTopOnNavigation';
import JoinOurCommunityServer from '../shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '../shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getApiUrl } from '@/src/utils/utils';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import ListingSkeleton from '../ui/listingSkeleton/listingSkeleton';
import nextDynamic from 'next/dynamic';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import BlogListingFilters from './BlogListingFilters';
import { getAllBlogCategory } from '@/src/services/blogs/BlogCategory';

const BlogsCategoryData = nextDynamic(() => import('@/src/components/blogs/BlogsCategoryData'), {
  ssr: true,
});
const BlogsListingData = nextDynamic(
  () => import('@/src/components/blogs/BlogsListingData'),
  { ssr: true } // Ensure this is server-side rendered
);
const PopularBlogsData = nextDynamic(() => import('@/src/components/blogs/PopularBlogsData'), {
  ssr: true,
});

const BlogsCategoriesPage = async ({ placeholder, params, searchParams, prefLangs }) => {
  const apiUrl = getApiUrl();
  const queryParams = await searchParams;
  const routeParams = await params;
  const page = parseInt(queryParams.page || '1', 10);
  const slug = routeParams.slug;
  const start = (page - 1) * 11;
  const end = page * 11;
  let blogListCount = 0;

  const url = `api/blog_list?blog_slug=${slug}`;
  const payload = { start_limit: start, end_limit: end };

  const response = await postData(url, payload);
  const blogPosts = response?.data || [];
  blogListCount = response?.count || 0;
  const hasNextPage = blogPosts?.length === end - start;
  let categories = [];

  // const prefLang = await getSelectedLanguage();

  let prefLang;
  if (prefLangs) {
    prefLang = 'hi';
  } else {
    prefLang = await getSelectedLanguage();
  }

  const isMobile = await isMobileView();
  const translation = await getDictionary(prefLang);

  const seoSlug = `${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs/category/${slug}`;
  const langPrefix = prefLang === 'hi' ? '/hi' : '';

  const modernisedCategorySlug = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  const seoData = await getSEOByPage(seoSlug);

  const capitalizeWords = str => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(/[-\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  try {
    const categoryData = await getAllBlogCategory();
    categories = categoryData?.data || [];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
  }

  const staticMetadata = {
    title: `${seoSlug}`,
    description:
      'Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan',
    openGraph: {
      title:
        'Latest Tractor News, Agriculture News, Article  in India | Tractor Blog | Tractorgyan',
      description:
        'Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan',
      url: `https://tractorgyan.com/tractor-industry-news-blogs/category/${seoSlug}`,
      type: 'website',
      images: [
        {
          url: 'https://tractorgyan.com/images/tractor-tyres-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Tractor Gyan Blogs',
        },
      ],
    },
  };

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={staticMetadata}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs/category/${slug}`,
          prev:
            page > 1
              ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs/category/${slug}?page=${page - 1}`
              : null,
          next: hasNextPage
            ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs/category/${slug}?page=${page + 1}`
            : null,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      <ScrollToTopNavigate />
      <main className="mx-auto mt-0 lg:mt-[159px]">
        <section>
          <div className={`container`}>
            <div className={isMobile ? `m-auto` : ``}>
              <TittleAndCrumbs
                title={`${modernisedCategorySlug} Blogs`}
                breadcrumbs={[
                  {
                    label: translation?.breadcrubm.home || 'Home',
                    href: '/',
                    title: translation?.breadcrubm.home || 'Home',
                  },
                  {
                    label: capitalizeWords(translation?.breadcrubm.allBlogs || 'All Blogs'),
                    href: `${langPrefix}/tractor-industry-news-blogs`,
                    title: capitalizeWords(translation?.breadcrubm.allBlogs || 'All Blogs'),
                  },
                  {
                    label: capitalizeWords(`${slug}`),
                    title: capitalizeWords(`${slug}`),
                    isCurrent: true,
                  },
                ]}
              />
            </div>

            {isMobile ? (
              <div className="m-auto items-center gap-4">
                <BlogListingFilters
                  translation={translation}
                  isMobile={isMobile}
                  prefLang={prefLang}
                  categories={categories}
                />
                {/* <div className="mb-4 flex h-fit w-auto items-center justify-between gap-4"> */}
                {/* <BlogSearchInput
                    isMobile={isMobile}
                    prefLang={prefLang}
                    translation={translation}
                  /> */}

                {/* <Suspense fallback={<ListingSkeleton />}>
                    <BlogsCategoryData prefLang={prefLang} categorySlug={slug} />
                  </Suspense> */}
                {/* </div> */}
                <div className="w-full">
                  <BlogsListingData
                    searchParams={searchParams}
                    prefLangs={prefLangs}
                    params={slug}
                    parent={'categry'}
                    categorySlug={slug}
                  />

                  <PopularBlogsData prefLangs={prefLangs} />
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-start gap-12">
                <div className="grid h-fit w-auto gap-4">
                  <BlogsCategoryData prefLang={prefLang} categorySlug={slug} />

                  <PopularBlogsData prefLangs={prefLangs} />
                </div>
                <div className="w-full">
                  <div className="mb-3 flex w-full justify-end">
                    <BlogSearchInput prefLang={prefLang} translation={translation} />
                  </div>

                  <BlogsListingData
                    searchParams={searchParams}
                    prefLangs={prefLangs}
                    params={slug}
                    parent={'categry'}
                    categorySlug={slug}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
        <div>
          {/* <ClientComponentsWithoutAbout
            pageName={"tractor-industry-news-blogs"}
            translation={translation}
            prefLang={prefLang}
          /> */}
          <WhatsAppTopButton isMobile={isMobile} translation={translation} currentLang={prefLang} />
          <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
          <TractorGyanOfferings translation={translation} />
          <AboutTractorGyanServer
            slug={`${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs/category/${slug}`}
            translation={translation}
          />
          <FooterComponents translation={translation} />
        </div>
      </main>
    </>
  );
};

export default BlogsCategoriesPage;
