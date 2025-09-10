import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import SeoHead from '@/src/components/shared/header/SeoHead';
import TyreDetailsAndFeatures from './tyreDetailsSection/TyreDetailsAndFeatures';
import { getTyreDetail } from '@/src/services/tyre/tyre-detail';
import RelatedTyres from './relatedTyres/RelatedTyres';
import { getRelatedTyres } from '@/src/services/tyre/related-tyres';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import TyreRatingAndReviews from '../tyreComponents/components/tyreRatingAndReviews/TyreRatingAndReviews';
import PopularTyres from '../tyreComponents/components/popularTyres/PopularTyres';
import { getTyrePopularDetails } from '@/src/services/tyre/tyre-popular-details';
import TyresByBrands from './TyresByBrands';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';

export default async function TyreDetailPage({ params }) {
  const param = await params;
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const tyreId = param.id;
  const brandSlug = param.brandSlug;
  const tyreBrands = await getTyreBrands();
  const popularTyres = await getTyrePopularDetails(prefLang);
  const tyreDetail = await getTyreDetail({ tyreId, lang: prefLang });
  const relatedTyres = await getRelatedTyres({ tyreId, lang: prefLang });
  const seoRes = await getDetailPageHeaderSEO({
    id: tyreId,
    page_type: 'tyre_detail',
    lang: prefLang,
    page_url: `tyre/${brandSlug}/${tyreId}`,
  });

  const seoHTMLDescription = seoRes?.data;

  return (
    <>
      <SeoHead
        seo={{}}
        staticMetadata={{}}
        preloadUrls={[]}
        // paginationLinks={{

        //   canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang == 'en' ? '' : '/' + prefLang}/tyre/${brandSlug}/${tyreId}`,

        // }}
        seoHTMLDescription={seoHTMLDescription}
      />
      <DesktopHeader currentLang={prefLang} translation={translation} isMobile={isMobile} />
      {/* <NavComponents translation={translation} isMobile={isMobile} prefLang={prefLang} /> */}
      <div className="lg:mt-[159px]">
        <TyreDetailsAndFeatures
          translation={translation}
          isMobile={isMobile}
          tyreId={tyreId}
          tyreDetail={tyreDetail}
          prefLang={prefLang}
          brandSlug={brandSlug}
        />
        <RelatedTyres
          tyreId={tyreId}
          tyres={relatedTyres}
          isMobile={isMobile}
          tyreDetail={tyreDetail}
          translation={translation}
          currentLang={prefLang}
        />
        <TyrePriceInquireForm
          tyreBrands={tyreBrands}
          heading={'headings.inquireforTyrePrice'}
          translation={translation}
          currentLang={prefLang}
          brandName={`${tyreDetail.brand_name} ${tyreDetail.model_name}`}
          isMobile={isMobile}
        />
        <TyreRatingAndReviews
          reviewData={[]}
          modelId={tyreDetail.id}
          brand={tyreDetail.brand_name}
          model={tyreDetail.model_name}
          headingTitleKey={'headings.tyreRatingAndReviews'}
          dynamicTitle={`${tyreDetail.brand_name} ${tyreDetail.model_name}`}
          translation={translation}
          reviewTitleKey={'headings.tyreUserReview'}
          showUserReviewTitle={isMobile}
        />
        <PopularTyres
          langPrefix={prefLang}
          popularTyres={popularTyres}
          isMobile={isMobile}
          translation={translation}
          bgColor={'bg-section-gray'}
        />
        <TyresByBrands
          prefLang={prefLang}
          isMobile={isMobile}
          translation={translation}
          tyreBrands={tyreBrands}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={'Tyre'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
      </div>
      <FooterComponents translation={translation} />
    </>
  );
}
