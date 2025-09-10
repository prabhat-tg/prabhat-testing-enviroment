import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, tg_getUrlByLanguage } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import { getAllTractorReviews } from '@/src/services/tractor/get-all-tractor-reviews';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import TyreRatingForm from '../tyreComponents/components/tyreRatingAndReviews/TyreRatingForm';
import ReviewsCard from '../tyreComponents/components/tyreRatingAndReviews/ReviewsCard';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import Link from 'next/link';
import Image from 'next/image';
import MainHeadings from '../tyreComponents/commonComponents/MainHeadings';
import CustomerReviews from '@/src/components/shared/customer-reviews/CustomerReviews';

const TractorReviewPage = async () => {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + 'tractor-review');
  const tyreBrands = await getTyreBrands();

  // Fetch dynamic tractor reviews from API
  let customerReviews = [];
  try {
    const reviewsResponse = await getAllTractorReviews();
    if (reviewsResponse?.success && reviewsResponse?.data) {
      // Transform API response to match CustomerReviews component format
      customerReviews = reviewsResponse.data.map(review => ({
        name: review.name,
        message: review.message,
        rating: parseInt(review.rating) || 5,
        date: review.date,
        brand: review.brand,
        model: review.model,
      }));
    }
  } catch (error) {
    console.error('Error fetching tractor reviews:', error);
    // Fallback to empty array if API fails
    customerReviews = [];
  }

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title={translation?.tractorReview?.title || 'Write Tractor Review'}
            breadcrumbs={[
              {
                label: translation?.breadcrubm?.tractorGyanHome || 'Home',
                href: '/',
                title: translation?.breadcrubm?.tractorGyanHome || 'Home',
              },
              {
                label: translation?.breadcrubm?.tractorReview || 'Tractor Review',
                title: translation?.breadcrubm?.tractorReview || 'Tractor Review',
                isCurrent: true,
              },
            ]}
          />
          {/* TODO:: Upload and Update Banner */}
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/120705/68a990cbef529-Tractor-Review---Desktop.webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/120706/68a990d89cd48-Tractor-Review---Mobile.webp'
            }
            title={translation?.tractorReview?.bannerTitle || 'Share Your Tractor Experience'}
            pageUrl={'/'}
          />
        </div>

        <section className="container">
          <div >
            <div >
              <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
                <div className="w-full rounded-2xl border-gray-light md:border-[1px] md:p-6 lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
                  {/* <h2 className="mb-7 inline-block border-b-[3px] border-secondary pb-1 text-lg font-semibold leading-5 md:text-2xl md:leading-7">
                    {translation?.tractorReview?.writeTractorReview || 'Write Tractor Review'}
                  </h2> */}
                  <TyreRatingForm
                    translation={translation}

                    form_page_name={'tractor_review'}
                  />
                </div>

                <Link
                  href={tg_getUrlByLanguage('tractors', currentLang)}
                  className="h-full w-full overflow-hidden rounded-2xl lg:hidden"
                >
                  <Image
                    src="https://images.tractorgyan.com/uploads/118100/67c190c6d514b-Implement-Listing-Banner-Mob.webp"
                    height={500}
                    width={500}
                    alt={
                      translation?.tractorReview?.allTractorPageBanner || 'All Tractor Page Banner'
                    }
                    title={
                      translation?.tractorReview?.allTractorPageBanner || 'All Tractor Page Banner'
                    }
                    className="h-full object-cover"
                  />
                </Link>
                <Link
                  href={tg_getUrlByLanguage('tractors', currentLang)}
                  className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
                >
                  <Image
                    src={
                      'https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp'
                    }
                    height={200}
                    width={200}
                    alt={
                      translation?.tractorReview?.allTractorPageBanner || 'All Tractor Page Banner'
                    }
                    title={
                      translation?.tractorReview?.allTractorPageBanner || 'All Tractor Page Banner'
                    }
                    className="h-full w-full object-contain object-center"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CustomerReviews
          reviews={customerReviews}
          isMobile={isMobile}
          itemsCount={8}
          translation={translation}
          title={
            translation?.tractorReview?.allTractorsCustomerReview ||
            "All Tractors's Customer Review"
          }
        />

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={(currentLang == 'hi' ? 'hi/' : '') + 'tractor-review'}
          translation={translation}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={translation?.tractorReview?.title || 'Tractor Review'}
          isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorReviewPage;
