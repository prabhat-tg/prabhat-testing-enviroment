import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import TyresPriceList from './ListingMainSection';

export default async function TyrePriceData() {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const pageSlug = 'tyres';

  const priceList = await getAllPriceList({
    lang: currentLang,
    tyre_slug: pageSlug,
  });

  const tyreTopContent = await getTyreTopContent({
    ad_title: pageSlug,
    currentLang: currentLang,
    device_type: isMobile ? 'mobile' : 'desktop',
  });

  // Breadcrumbs for All Tyres Page (home/tractorTyres)
  const breadcrumbs = [
    {
      label: translation.breadcrubm.home,
      href: currentLang === 'hi' ? '/hi' : '/',
      title: translation.breadcrubm.home,
    },
    {
      label: translation.headerNavbar.tyreHome,
      href: currentLang === 'hi' ? '/hi' : '/tractor-tyre-in-india',
      title: translation.headerNavbar.tyreHome,
    },
    {
      label: translation.breadcrubm.tractorTyres,
      title: translation.breadcrubm.tractorTyres,
      isCurrent: true,
    },
  ];

  return (
    <TyresPriceList
      headingKey={'headings.allTractorTyres'}
      currentLang={currentLang}
      translation={translation}
      priceList={priceList}
      tyreTopContent={tyreTopContent}
      deviceType={isMobile ? 'mobile' : 'desktop'}
      breadcrumbs={breadcrumbs}
    />
  );
}
