import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import React from 'react';
import FooterComponents from '../tyre/FooterComponents';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import NavComponents from '../tyre/NavComponents';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import SellOldTractorFormContainer from './sellOldTractor/SellOldTractorFormContainer';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import GoogleAdHorizontalClientWrapper from '../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper';
import GoogleAdVerticalClientWrapper from '../social/GoogleAdVertical/GoogleAdVerticalClientWrapper';
import { isMobileView } from '@/src/utils';

export default async function SellOldTractorPage({ searchParams }) {
  // Server-side data fetching
  let currentLang = 'en';
  let translation = {};
  let faqs = [];
  let seoData;
  const isMobile = await isMobileView();

  try {
    currentLang = await getSelectedLanguage();
    translation = await getDictionary(currentLang);
    seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + 'sell-old-tractor');
    const pageSlug = 'second-hand-tractor';
    try {
      faqs = await getUsedTractorFAQs({
        langPrefix: currentLang,
        slug: pageSlug,
      });
    } catch (error) {
      console.error('Error fetching data for Used Tractor FAQs:', error);
    }
  } catch (error) {
    console.error('Error initializing page data:', error);
  }
  return (
    <main className="lg:mt-[159px]">
      <SeoHead seo={seoData} />
      <NavComponents translation={translation} prefLang={currentLang} />

      <section>
        <div className="container">
          <TittleAndCrumbs
            title={
              translation?.secondHandTractors?.sellOldTractor?.pageTitle || 'Sell Your Old Tractor'
            }
            breadcrumbs={[
              {
                label: translation?.secondHandTractors?.sellOldTractor?.breadcrumbHome || 'Home',
                href: '/',
                title: translation?.secondHandTractors?.sellOldTractor?.breadcrumbHome || 'Home',
              },
              {
                label:
                  translation?.secondHandTractors?.sellOldTractor?.breadcrumbSellTractor ||
                  'Sell Your Tractor',
                href: '/sell-old-tractor',
                title:
                  translation?.secondHandTractors?.sellOldTractor?.breadcrumbSellTractor ||
                  'Sell Your Tractor',
                isCurrent: true,
              },
            ]}
          />

          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <SellOldTractorFormContainer currentLang={currentLang} translation={translation} />
            <div>
              {isMobile ? <GoogleAdHorizontalClientWrapper /> : <GoogleAdVerticalClientWrapper />}
            </div>
          </div>
        </div>
      </section>

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <TyreFAQs
        faqs={faqs}
        translation={translation}
        headingKey={'tyrefaqs.allTractorTyres'}
        bgColor={'bg-section-white'}
      />

      <WhatsAppTopButton translation={translation} currentLang={currentLang} isMobile={isMobile} />
      <FooterComponents translation={translation} />
    </main>
  );
}
