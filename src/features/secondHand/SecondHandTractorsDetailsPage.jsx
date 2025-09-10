import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import { getAllTractorSubsidyStates } from '@/src/services/geo/get-subsidy-states';
import SearchUsedModal from '@/src/components/shared/search-used-modal/SearchUsedModal';
import SecondHandMiniTractorCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorCards';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import SecondHandMiniTractorMobileCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorMobileCards';
import { getBrandFromSlug } from '@/src/utils/tyre';
import { getTyreDetail } from '@/src/services/tyre/tyre-detail';
import DetailsAndFeatures from './secondHandDetails/DetailsAndFeatures';
import SecondHandInquiryFormAndEmi from './secondHandDetails/SecondHandInquiryFormAndEmi';
import OtherSecondHandTractor from './secondHandDetails/OtherSecondHandTractor';
import NavComponents from '../tyre/NavComponents';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import TyreDealersByStates from '../tyre/TyreDealersByStates/TyreDealersByStates';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically
const usedTractorModels = [
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Swaraj 744 XT',
    url: '/used-tractors/swaraj-744-xt',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Swaraj 744 XT',
    url: '/used-tractors/swaraj-744-xt',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Swaraj 744 XT',
    url: '/used-tractors/swaraj-744-xt',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
];

// TODO:: WIP
const aboutSectionSlot = (
  <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[468px]">
    <div className="pe-4">
      <h2 className="border-b-3 mb-6 inline-block border-secondary pb-1 text-lg font-semibold lg:text-2xl">
        About Old Swaraj 744 XT in Barddhaman West Bengal
      </h2>
    </div>
    <div className="custom-scroller h-full max-h-[340px] overflow-auto pe-4 text-sm font-normal text-gray-dark">
      <div>
        <p className="mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ad expedita eius ut,
          nihil maiores vitae fugiat ratione, provident sunt cum! Deserunt quibusdam ex labore
          deleniti dolores corrupti nesciunt impedit.
        </p>
        <p className="mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ad expedita eius ut,
          nihil maiores vitae fugiat ratione, provident sunt cum! Deserunt quibusdam ex labore
          deleniti dolores corrupti nesciunt impedit.
        </p>
      </div>
    </div>
  </div>
);

export default async function SecondHandTractorsDetailsPage({ searchParams }) {
  const allTractorBrandsData = await getAllTractorBrands();
  const allTractorBrands = allTractorBrandsData || [];

  // const seoData = await getSEOByPage("tyres");
  const dealerStates = await getAllTractorSubsidyStates({
    pageSlug: 'tractor-dealers',
  });

  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const districts = [
    {
      text: 'Bankura',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bardhaman',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bankura',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bardhaman',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bankura',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bardhaman',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bankura',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bardhaman',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bankura',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bardhaman',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bankura',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
    {
      text: 'Bardhaman',
      url: '/second-hand-tractor/barddhaman/west-bengal',
    },
  ];

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = 'tyres'; // Static for this page

  const params = await searchParams;

  const tyreBrandsData = await getTyreBrands();

  const faqs = await getTyreFAQs({
    langPrefix: currentLang,
    slug: pageSlug,
  });

  const param = await params;
  const tyreId = '13';
  const tyreBrands = await getTyreBrands();

  const brand = getBrandFromSlug(param.brandSlug, tyreBrands);
  const tyreDetail = await getTyreDetail({ tyreId });

  return (
    <main className="lg:mt-[159px]">
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />

      <DetailsAndFeatures
        tyreId={tyreId}
        tyreDetail={tyreDetail}
        currentLang={currentLang}
        isMobile={isMobile}
        translation={translation}
      />

      <SecondHandInquiryFormAndEmi
        currentLang={currentLang}
        searchParams={searchParams}
        isMobile={isMobile}
        translation={translation}
      />

      <OtherSecondHandTractor
        heading="Other Second Hand Tractors in West Bangal"
        currentLang={currentLang}
        isMobile={isMobile}
        translation={translation}
      />

      {isMobile && (
        <section>
          <div className="container">
            {aboutSectionSlot}
            <div className="mt-6">
              {/* TODO:: Upload and Update Banner Image */}
              <TG_Banner
                imgUrl={'/assets/images/placeholder-banner-01.svg'}
                mobileImgUrl={'/assets/images/placeholder-banner-01-mobile.svg'}
                additionalClasses="max-h-auto"
              />
            </div>
          </div>
        </section>
      )}

      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={allTractorBrands}
        heading={translation.secondHandTractors.topSecondHandTractorBrands}
        bgColor={'bg-section-gray'}
      />

      {/* TODO:: Using the same UI component as for model with different data */}
      <SearchUsedModal
        langPrefix={currentLang}
        isMobile={isMobile}
        translation={translation}
        data={districts}
        heading="Search Used Tractor In West Bengal By District"
      />

      {/* TODO replace this with tyredealers by state */}
      <TyreDealersByStates
        title={translation.secondHandTractors.secondHandTractorsByStates}
        translation={translation}
        isMobile={isMobile}
        dealerStates={dealerStates}
      />

      <SearchUsedModal
        langPrefix={currentLang}
        isMobile={isMobile}
        translation={translation}
        data={usedTractorModels}
        heading={translation.secondHandTractors.searchUsedByModels}
        buttonText={'View All Models'}
      />

      {isMobile ? (
        <SecondHandMiniTractorMobileCards
          langPrefix={currentLang}
          isMobile={isMobile}
          translation={translation}
          data={usedTractorModels}
          heading={translation.secondHandTractors.buySecondHandMiniTractors}
          bgColor={'bg-section-gray'}
          buttonText={'View All Second Hand Tractors'}
        />
      ) : (
        <SecondHandMiniTractorCards
          langPrefix={currentLang}
          isMobile={isMobile}
          translation={translation}
          data={usedTractorModels}
          bgColor={'bg-section-gray'}
          buttonText={'View All Second Hand Tractors'}
          heading={translation.secondHandTractors.buySecondHandMiniTractors}
        />
      )}

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <TyreFAQs
        faqs={faqs}
        translation={translation}
        headingKey={'tyrefaqs.allTractorTyres'}
        bgColor={'bg-section-white'}
      />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={'Tyre'}
        isMobile={isMobile}
      />

      <AboutTractorGyanServer slug={'tyres'} translation={translation} />

      <FooterComponents translation={translation} />
    </main>
  );
}
