import React, { Suspense } from 'react';
import { getApiUrl } from '@/src/utils/utils';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import SeoHead from '@/src/components/shared/header/SeoHead';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import BlogSearchInput from '@/src/components/blogs/BlogSearchInput';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import nextDynamic from 'next/dynamic';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import BlogListingFilters from '@/src/components/blogs/BlogListingFilters';
import GoogleAdVertical from '@/src/features/social/GoogleAdVertical/GoogleAdVertical';
import ListingSkeleton from '../ui/listingSkeleton/listingSkeleton';
import MobileFooter from '../shared/footer/MobileFooter';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getAllBlogCategory } from '@/src/services/blogs/BlogCategory';
import BlogsListingData from './BlogsListingData';

// Dynamically imported components
const BlogsCategoryData = nextDynamic(() => import('@/src/components/blogs/BlogsCategoryData'), {
  ssr: true,
});

const PopularBlogsData = nextDynamic(() => import('@/src/components/blogs/PopularBlogsData'), {
  ssr: true,
});

const JoinOurCommunityServer = nextDynamic(
  () => import('@/src/components/shared/community/JoinOurCommunityServer'),
  { ssr: true }
);

const TractorGyanOfferings = nextDynamic(
  () => import('@/src/components/shared/offerings/TractorGyanOfferings'),
  { ssr: true }
);

const FooterServer = nextDynamic(() => import('@/src/components/shared/footer/FooterServer'), {
  ssr: true,
});

export const dynamic = 'force-dynamic';

// Helper function to create default SEO data
const createDefaultSeoData = () => ({
  title: 'TractorGyan Blogs',
  description: 'Find the latest news and articles on TractorGyan.',
  openGraph: {
    title: 'TractorGyan Blogs',
    description: 'Find the latest news and articles on TractorGyan.',
    url: 'https://tractorgyan.com/tractor-industry-news-blogs',
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
});

export default async function BlogListingPage({ searchParams, prefLangs }) {
  let prefLang = await getSelectedLanguage(); // Default language
  let translation = {};
  let isMobile = false;
  let seoData = createDefaultSeoData();
  let categories = [];
  let hasNextPage = false;

  const apiUrl = getApiUrl();
  const queryParams = searchParams || {};
  const page = parseInt(queryParams?.page || '1', 10);

  try {
    // prefLang = prefLangs ? "hi" : (await getSelectedLanguage()) || "en";
    translation = await getDictionary(prefLang);
    isMobile = await isMobileView();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const seoSlug = `${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs`;
  try {
    const fetchedSeoData = await getSEOByPage(seoSlug);
    if (fetchedSeoData) {
      seoData = fetchedSeoData;
    }
  } catch (error) {
    console.error('Error fetching SEO data:', error);
  }

  try {
    const categoryData = await getAllBlogCategory();
    categories = categoryData?.data || [];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
  }

  return (
    <>
      <SeoHead
        seo={seoData}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs`,
          prev:
            page > 1
              ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs?page=${page - 1}`
              : null,
          next: hasNextPage
            ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractor-industry-news-blogs?page=${page + 1}`
            : null,
        }}
      />

      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      <main className="lg:mt-[159px]">
        <ScrollToTopNavigate />
        <section className="max-md:pt-3">
          <div className={`container`}>
            <TittleAndCrumbs
              title={translation?.tractor_gyan_blogs || `Tractor Gyan Blogs`}
              breadcrumbs={[
                {
                  label: translation?.home || 'Home',
                  href: '/',
                  title: translation?.home || 'Home',
                },
                { label: 'All Blogs', title: 'All Blogs', isCurrent: true },
              ]}
            />
            {isMobile ? (
              <div className="w-full items-center gap-4">
                <BlogListingFilters
                  translation={translation}
                  isMobile={isMobile}
                  prefLang={prefLang}
                  categories={categories}
                />
                <div className="mt-3 w-full">
                  <BlogsListingData
                    searchParams={searchParams}
                    prefLangs={prefLangs}
                    params={'blogListing'}
                  />
                  <PopularBlogsData prefLangs={prefLangs} />
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-start gap-12">
                <div className="relative grid h-fit w-auto gap-4">
                  <BlogsCategoryData prefLang={prefLang} />
                  <PopularBlogsData prefLangs={prefLangs} />
                  <div>
                    <GoogleAdVertical />
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-0 flex w-full justify-end">
                    <BlogSearchInput translation={translation} prefLang={prefLang} />
                  </div>
                  <BlogsListingData
                    searchParams={searchParams}
                    prefLangs={prefLangs}
                    params={'blogListing'}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          defaultEnquiryType={'Tractor'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
