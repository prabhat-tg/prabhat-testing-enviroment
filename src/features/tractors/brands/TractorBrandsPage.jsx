import React, { Suspense } from 'react';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import { getSelectedLanguage } from '@/src/services/locale';
import ScrollToTopOnNavigation from '@/src/components/shared/ScrollToTopOnNavigation/ScrollToTopOnNavigation';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import BrandCards from '../../tyreComponents/components/tractorsByBrands/BrandCards';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';
import NewsSection from '../../tyre/tyreNews/NewsSection';
import { getTyreNewsByBrand } from '@/src/services/tyre/tyre-news-by-brand';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import SelectHP from '@/src/components/shared/selectHp/SelectHP';
import LeadingTractorGroup from '@/src/components/tractor/LeadingTractorGroup';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getLeadingTractorGroup } from '@/src/services/tractor/leading-tractor-group';
import apiUrl from '@/src/services/apiUrl';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';

export default async function TractorBrandsPage({ searchParams, isHindi = false }) {
  const prefLang = isHindi ? 'hi' : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  const allTractorBrandsData = await getTractorBrands(prefLang);
  const allTractorBrandsDataFiltered = allTractorBrandsData.map(brand => ({ ...brand, image: "https://images.tractorgyan.com/uploads" + brand.image || '/default-image.png' }));
  const seoData = await getSEOByPage((prefLang == 'hi' ? 'hi/' : '') + 'tractor-brands');

  // TODO:: Update this to fetch Tractor Brand News
  const news = [];

  const popularTractors = (await getTractorPopularDetails(prefLang)) || [];

  // Fetch leading tractor groups from API
  let leadingTractorGroups = [];
  try {
    leadingTractorGroups = await getLeadingTractorGroup(prefLang);
  } catch (error) {
    console.error('Error fetching leading tractor groups:', error);
  }

  const headingTitle = translation.headings.allTractorbrands;

  return (
    <>
      <ScrollToTopOnNavigation />
      <SeoHead seo={seoData} paginationLinks={{
        canonical: `${apiUrl}/${prefLang === 'hi' ? 'hi/' : ''}tractor-brands`,

      }} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      <main className="pt-4 lg:mt-[164px]">
        <div className="container relative">
          <TittleAndCrumbs
            title={headingTitle}
            breadcrumbs={[
              { label: translation.breadcrubm.tractorGyanHome, href: `${prefLang === 'hi' ? '/hi' : ''}/`, title: translation.breadcrubm.tractorGyanHome },
              {
                label: `${translation.headings.allTractorbrands}`,
                title: `${translation.headings.allTractorbrands}`,
                isCurrent: true,
              },
            ]}
          />
          {/* <Suspense fallback={<ListingSkeleton />}> */}
          <div className="justify-left -mx-2 mb-4 flex flex-wrap md:-mx-4 md:mb-8">
            {allTractorBrandsDataFiltered?.map((item, index) => (
              <div className="basis-1/3 px-2 md:px-4 md:[flex-basis:calc(100%/9)]">
                <BrandCards
                  imgUrl={item.image}
                  name={item.name}
                  key={index}
                  url={(prefLang == 'hi' ? '/hi' : '') + item.url}
                />
              </div>
            ))}
          </div>
          {/* </Suspense> */}
        </div>

        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          isMobile={isMobile}
        // tyreBrands={tyreBrands}
        />

        {leadingTractorGroups && leadingTractorGroups.length > 0 && (
          <LeadingTractorGroup
            langPrefix={prefLang}
            isMobile={isMobile}
            leadingTractorGroups={leadingTractorGroups}
            title={translation.headings.leadingTractorGroup}
          />
        )}

        <SelectHP
          langPrefix={prefLang}
          isMobile={isMobile}
          translation={translation}
          sectionClasses="bg-white pb-12 md:pb-6"
        />

        {/* TODO:: WIP */}
        <PopularSection
          langPrefix={prefLang}
          popularData={popularTractors}
          isMobile={isMobile}
          translation={translation}
          bgColor={'bg-section-gray'}
          redirectRoute="/tractors"
        />
        {/* <PopularTyres
          langPrefix={prefLang}
          popularTyres={popularTyres}
          isMobile={isMobile}
          translation={translation}
          bgColor={"bg-section-gray"}
        /> */}
        {/* <NewsSection
          translation={translation}
          langPrefix={prefLang}
          news={news}
          bgColor={'bg-section-gray'}
        /> */}
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'tractor-brands'} translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
