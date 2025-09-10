import TyreDetailsCard from '@/src/features/tyre/TyreDetailsCard';
import TyreModelSlider from '@/src/features/tyre/relatedTyres/TyreModelSlider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RelatedTyres = ({
  tyreId,
  tyres,
  isMobile,
  tyreDetail,
  translation,
  currentLang,
  mode = 'tyre', // 'tyre', 'tractor', 'implement'
  customHeading, // New prop for custom heading
}) => {
  // Get the appropriate detail object and heading based on mode
  const getItemDetail = () => {
    switch (mode) {
      case 'tractor':
        return {
          detail: tyreDetail,
          heading: customHeading || `${tyreDetail.brand} ${tyreDetail.model}`,
          linkType: 'tractor-loan',
        };
      case 'implement':
        return {
          detail: tyreDetail,
          heading:
            customHeading ||
            `${tyreDetail.brand_name || tyreDetail.brand} ${tyreDetail.model_name || tyreDetail.model}`,
          linkType: 'tractor-loan',
        };
      default: // tyre
        return {
          detail: tyreDetail,
          heading: customHeading || `${tyreDetail.brand_name} ${tyreDetail.model_name}`,
          linkType: 'tractor-loan',
        };
    }
  };

  const { detail, heading, linkType } = getItemDetail();

  if (tyres.length === 0) {
    return null; // Don't render the section if there are no related tyres
  }
  return (
    <section className="m-0 bg-section-gray">
      <div className="container">
        <div className="items-center gap-4 lg:flex">
          {tyres.length > 0 ? <div className="w-full lg:max-w-[calc(100%_-_254px)] xl:max-w-[1000px]">
            <div className="border-b-3 mb-7 inline-block border-secondary pb-1 text-xl font-semibold leading-7 md:text-2xl">
              <h2>{customHeading || `${translation?.tyreDetail?.related} ${heading}`}</h2>
            </div>
            <div className="model-slider mb-4 min-h-[280px] w-full gap-2 rounded-2xl border-[1px] border-gray-gainsboro bg-white p-3 md:mb-16 md:flex md:px-0">
              {!isMobile ? (
                <TyreModelSlider tyres={tyres} currentLang={currentLang} mode={mode} translation={translation} />
              ) : (
                <>
                  {tyres?.map((tyre, index) => (
                    <TyreDetailsCard
                      key={index}
                      reviews={tyre.reviews || tyre.review_count}
                      rating={tyre.rating || tyre.avg_rating}
                      size={tyre.tyre_size || tyre.hp}
                      type={tyre.tyre_type || tyre.cylinder}
                      title={tyre.title}
                      brandName={tyre.brandName || tyre.brand_name}
                      imgUrl={tyre.imgUrl || tyre.images}
                      pageUrl={
                        (currentLang === 'hi' ? '/hi' : '') + (tyre.pageUrl || tyre.page_url)
                      }
                      popularTyre={tyre.popularTyre || tyre.popular_tyre}
                      isLast={index === tyres.length - 1}
                      mode={mode}
                      translation={translation}
                    />
                  ))}
                </>
              )}
            </div>
          </div> : null}
          <div className="flex items-center overflow-hidden rounded-2xl lg:w-[259px] xl:block xl:h-[400px] xl:w-[calc(100%_-_1000px)]">
            <Link
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}${linkType}`}
              className="block h-full max-h-[220px] w-full overflow-hidden rounded-2xl lg:hidden"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/120266/68874ee7518ab-Frame-1000006006.webp"
                height={900}
                width={700}
                alt="add-img"
                title="Loan Image"
                className="h-full w-full object-contain object-center"
              />
            </Link>
            <Link
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}${linkType}`}
              className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/120244/6884911094708-Frame-1000005862.webp"
                height={5000}
                width={5000}
                alt="loan-img"
                title="Loan Image"
                className="h-full w-full object-contain object-center"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedTyres;
