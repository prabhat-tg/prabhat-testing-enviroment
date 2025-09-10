import React, { Suspense } from 'react';
import TittleAndCrumbs from '../shared/TittleAndCrumbs/TittleAndCrumbs';
import BlogSearchInput from './BlogSearchInput';
import DesktopHeader from '../shared/header/DesktopHeader';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import JoinOurCommunityServer from '../shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '../shared/offerings/TractorGyanOfferings';
import FooterServer from '../shared/footer/FooterServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import ScrollToTopNavigate from '../shared/ScrollToTop/ScrollToTopOnNavigation';
import MobileFooter from '../shared/footer/MobileFooter';
import { getApiUrl } from '@/src/utils/utils';
import nextDynamic from 'next/dynamic';
import ListingSkeleton from '../ui/listingSkeleton/listingSkeleton';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';

const BlogsCategoryData = nextDynamic(() => import('@/src/components/blogs/BlogsCategoryData'), {
  ssr: true,
});

const PopularBlogsData = nextDynamic(() => import('@/src/components/blogs/PopularBlogsData'), {
  ssr: true,
});

const BlogsListingData = nextDynamic(
  () => import('@/src/components/blogs/BlogsListingData'),
  { ssr: true } // Ensure this is server-side rendered
);
const BlogsMobileCategoryData = nextDynamic(
  () => import('@/src/components/blogs/BlogsMobileCategoryData'),
  { ssr: true }
);
const TractorBlogTagPage = async ({ params, searchParams, prefLangs }) => {
  const pageParams = await params;
  const pageSearchParams = await searchParams;
  const apiUrl = getApiUrl();
  const page = parseInt(pageSearchParams?.page || '1', 10);
  const slug = pageParams?.slug;

  let prefLang;
  if (prefLangs) {
    prefLang = 'hi';
  } else {
    prefLang = await getSelectedLanguage();
  }

  let hasNextPage = false;

  const currentLang = prefLangs ? 'hi' : await getSelectedLanguage();
  const isMobile = await isMobileView();
  const translation = await getDictionary(currentLang);

  const seoRes = await getDetailPageHeaderSEO({
    page_type: 'tag_detail',
    lang: prefLang,
    tag_url: slug,
  });
  const seoDescription = seoRes.data;

  const capitalizeWords = str =>
    str
      ?.toLowerCase()
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase()) || '';

  return (
    <>
      <SeoHead
        seo={{}}
        staticMetadata={{}}
        preloadUrls={[]}
        seoHTMLDescription={seoDescription}
        paginationLinks={{
          canonical: `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractorblogtag/${slug}`,
          prev:
            page > 1
              ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractorblogtag/${slug}?page=${page - 1}`
              : null,
          next: hasNextPage
            ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractorblogtag/${slug}?page=${page + 1}`
            : null,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />
      <ScrollToTopNavigate />
      <div className="container mx-auto mt-0 lg:mt-[11.5rem]">
        <div className={isMobile ? `m-auto mb-0 pt-4` : ``}>
          <TittleAndCrumbs
            title={capitalizeWords(slug)}
            breadcrumbs={[
              {
                label: translation?.breadcrubm?.home,
                href: '/',
                title: translation?.breadcrubm?.home,
              },
              {
                label: translation.breadcrubm.allBlogs,
                href: '/tractor-industry-news-blogs',
                title: translation.breadcrubm.allBlogs,
              },
              {
                label: capitalizeWords(slug),
                title: capitalizeWords(slug),
                isCurrent: true,
              },
            ]}
          />
        </div>

        {isMobile ? (
          <div className="sm-auto items-center gap-4">
            <div className="mb-4 flex h-fit w-auto items-center justify-between gap-4">
              <BlogSearchInput translation={translation} isMobile={isMobile} />
              <BlogsMobileCategoryData prefLangs={prefLangs} />{' '}
              {/* Use the new BlogsMobileCategoryData component */}
            </div>
            <div className="w-full">
              <BlogsListingData
                searchParams={pageSearchParams}
                params={slug}
                prefLangs={prefLangs}
                parent={'blogTagIndia'}
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
              <div className="mb-5 flex w-full justify-end">
                <BlogSearchInput translation={translation} />
              </div>

              <BlogsListingData
                searchParams={pageSearchParams}
                params={slug}
                prefLangs={prefLangs}
                parent={'blogTagIndia'}
                categorySlug={slug}
              />
            </div>
          </div>
        )}
      </div>
      <main className="lg:mt-[40px]">
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          defaultEnquiryType={'Tractor'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={`${currentLang === 'hi' ? 'hi/' : ''}tractorblogtag/${slug}`}
          translation={translation}
        />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorBlogTagPage;
