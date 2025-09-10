import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import { getSelectedLanguage } from '@/src/services/locale';
import HandleError from '@/src/components/shared/HandleError/HandleError';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import { getAllTractorSubsidyStates } from '@/src/services/geo/get-subsidy-states';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import TyresByBrands from '../tyre/TyresByBrands';
import TyreDealersByStates from '../tyre/TyreDealersByStates/TyreDealersByStates';

export default async function TractorSubsidyData({ searchParams, porpsCurrentLang }) {
  const prefLang = porpsCurrentLang == 'hi' ? 'hi' : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const apiUrl = getApiUrl();
  const page = parseInt(searchParams.page || '1', 10);

  let dealerStates;
  let popularData;
  let tyreBrands;

  let storyError = false;
  let categoryError = false;
  let seoData = null;

  try {
    const payload = {
      pageSlug: 'tractor-dealers',
    };
    const response = await getAllTractorSubsidyStates({ lang: prefLang });
    if (response) {
      dealerStates = response;
      dealerStates = dealerStates.map((state) => ({
        ...state,
        state_name: state.name,
        images: state.image,
      }));
    } else {
      storyError = true;
    }
  } catch (err) {
    console.error('❌ Failed to fetch brand stories:', err);
    storyError = true;
  }

  try {
    const payload = {
      lang: prefLang,
    };
    const response = await getTractorPopularDetails(payload);
    if (response) {
      popularData = response;
    } else {
      storyError = true;
    }
  } catch (err) {
    console.error('❌ Failed to fetch brand stories:', err);
    storyError = true;
  }

  try {
    const response = await getTyreBrands();
    if (response) {
      tyreBrands = response || [];
    } else {
      storyError = true;
    }
  } catch (err) {
    console.error('❌ Failed to fetch brand stories:', err);
    storyError = true;
  }

  try {
    const seoSlug = `${porpsCurrentLang == 'hi' ? 'hi/' : ''}tractors-subsidy-in-india`;
    seoData = await getSEOByPage(seoSlug);
  } catch (err) {
    console.error('⚠️ Failed to fetch SEO:', err);
  }

  const currentSlug = `${porpsCurrentLang == 'hi' ? 'hi/' : ''}tractors-subsidy-in-india`;
  const baseUrl = `${apiUrl}${porpsCurrentLang == 'hi' ? '/hi' : ''}/tractors-subsidy-in-india`;

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        currentSlug={currentSlug}
        fullUrl={baseUrl}
        paginationLinks={{
          canonical: baseUrl,
        }}
      />

      {storyError && categoryError ? (
        <HandleError
          isNoData={BrandStoryData.length === 0}
          title={translation?.error_messages?.UnablefetchData}
          description={translation?.error_messages?.tryAgainLater}
        />
      ) : (
        <>
          {/* TODO replace this with tyredealers by state */}
          <TyreDealersByStates
            title={translation.headings.selectTractorSubsidyStates}
            translation={translation}
            isMobile={isMobile}
            dealerStates={dealerStates}
            categoriesError={categoryError}
            porpsCurrentLang={porpsCurrentLang}
            showHeading={false}
          />
          {/* <DealersByStates
            title={translation.headings.searchTractordealersByStates}
            translation={translation}
            isMobile={isMobile}
            dealerStates={dealerStates}
            categoriesError={categoryError}
            porpsCurrentLang={porpsCurrentLang}
          /> */}
          <PopularSection
            langPrefix={prefLang}
            popularData={popularData}
            isMobile={isMobile}
            translation={translation}
            bgColor={'bg-section-gray'}
            redirectRoute="/tractors"
            categoriesError={categoryError}
          />
          <TyresByBrands
            title={translation.headings.popularTyreBrands}
            isMobile={isMobile}
            translation={translation}
            tyreBrands={tyreBrands}
            categoriesError={categoryError}
            prefLang={prefLang}
          />
        </>
      )}
    </>
  );
}
