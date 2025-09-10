import React, { Suspense } from 'react';
import TittleAndCrumbs from '../shared/TittleAndCrumbs/TittleAndCrumbs';
import BlogSearchInput from './BlogSearchInput';
import DesktopHeader from '../shared/header/DesktopHeader';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import SeoHead from '@/src/components/shared/header/SeoHead';
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
import { getSEOByPage } from '@/src/services/seo/get-page-seo';

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
const TractorsSubsidyIndiaPage = async ({ params, searchParams, subsidyID, prefLangs }) => {
  const pageParams = await params;
  const pageSearchParams = await searchParams;
  const apiUrl = getApiUrl();
  const page = parseInt(pageSearchParams?.page || '1', 10);
  const slug = pageParams;
  let seoData;

  let prefLang;
  if (prefLangs) {
    prefLang = 'hi';
  } else {
    prefLang = await getSelectedLanguage();
  }

  let hasNextPage = false;

  const langPrefix = prefLang === 'hi' ? 'hi' : '';

  const currentLang = prefLangs ? 'hi' : await getSelectedLanguage();
  const isMobile = await isMobileView();
  const translation = await getDictionary(currentLang);

  try {
    const seoSlug = `${prefLang == 'hi' ? 'hi/' : ''
      }tractors-subsidy-in-india/${slug}/${subsidyID}`;
    seoData = await getSEOByPage(seoSlug);
  } catch (err) {
    console.error('Failed to fetch SEO:', err);
  }

  const modernisedCategorySlug = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractors-subsidy-in-india/${slug}/${subsidyID}`,
          prev:
            page > 1
              ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractors-subsidy-in-india/${slug}/${subsidyID}?page=${page - 1}`
              : null,
          next: hasNextPage
            ? `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractors-subsidy-in-india/${slug}/${subsidyID}?page=${page + 1}`
            : null,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />
      <ScrollToTopNavigate />
      <div className="container mx-auto mt-0 lg:mt-[11.5rem]">
        <div className={isMobile ? `m-auto mb-0 pt-4` : ``}>
          <TittleAndCrumbs
            title={`${modernisedCategorySlug} in india`}
            breadcrumbs={[
              {
                label: translation?.breadcrubm.home || 'Home',
                href: '/',
                title: translation?.breadcrubm.home || 'Home',
              },
              {
                label: 'Tractors Subsidy in India',
                href: `${langPrefix}/tractors-subsidy-in-india`,
                title: 'Tractors Subsidy in India',
              },
              {
                label: modernisedCategorySlug,
                title: modernisedCategorySlug,
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
                params={pageParams}
                prefLangs={prefLangs}
                parent={'tractorSubsidyIndia'}
                subsidyID={subsidyID}
              />
              <PopularBlogsData prefLangs={prefLangs} />
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-start gap-12">
            <div className="grid h-fit w-auto gap-4">
              <BlogsCategoryData prefLang={prefLang} />
              <PopularBlogsData prefLangs={prefLangs} />
            </div>
            <div className="w-full">
              <div className="mb-5 flex w-full justify-end">
                <BlogSearchInput translation={translation} />
              </div>

              <BlogsListingData
                searchParams={pageSearchParams}
                params={pageParams}
                prefLangs={prefLangs}
                parent={'tractorSubsidyIndia'}
                subsidyID={subsidyID}
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

export default TractorsSubsidyIndiaPage;
