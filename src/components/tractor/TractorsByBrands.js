import BrandCards from '@/src/features/tyreComponents/components/tractorsByBrands/BrandCards';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import React from 'react';
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import TractorBrandToggle from './TractorBrandToggle';
import "@/src/features/tractors/models/globals.css"

const TractorsByBrands = ({
  heading,
  allTractorBrands,
  translation,
  langPrefix,
  cta,
  bgColor = 'bg-white',
  toggleView = false,
  isDealerPage = false
}) => {
  return (
    <section className={bgColor}>
      <div className="container">
        {heading ? (
          <MainHeadings text={heading} />
        ) : (
          <MainHeadings text={translation.headings.tractorsbyBrands} />
        )}

        {toggleView ? (
          <>
            <div id="tractor-brands-grid">
              <div className="tractor-brands-grid grid grid-cols-3 gap-4 md:grid-cols-9 md:gap-8 mb-4">
                {allTractorBrands?.map((item, index) => {
                  // Generate URL based on page type
                  const brandUrl = isDealerPage
                    ? (langPrefix === 'hi' ? '/hi' : '') + `/tractor-dealers/${item.name.toLowerCase().replace(/\s+/g, '-')}`
                    : (langPrefix == 'hi' ? '/hi' : '') + item.url;

                  return (
                    <div
                      key={index}
                      className={`${index >= 9 ? 'tractor-brand-hidden' : ''}`}
                    >
                      <BrandCards
                        imgUrl={item.image}
                        name={item.name}
                        url={brandUrl}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {allTractorBrands?.length > 9 && (
              <div className="mb-4 flex justify-center">
                <TractorBrandToggle
                  translation={translation}
                  buttonText={cta || translation?.buttons?.viewAllBrands || 'View All Brands'}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="-mx-2 mb-4 flex flex-wrap justify-between md:-mx-4 md:mb-8 md:flex-nowrap">
              {allTractorBrands?.slice(0, 9).map((item, index) => (
                <div key={index} className="md:basis-1/9 basis-1/3 px-2 md:px-4">
                  <BrandCards
                    imgUrl={item.image}
                    name={item.name}
                    url={(langPrefix == 'hi' ? '/hi' : '') + item.url}
                  />
                </div>
              ))}
            </div>
            <MainButton
              text={cta ? cta : translation.buttons.viewAllTractorbrands}
              linkUrl={`${langPrefix == 'en' ? '/' : '/' + langPrefix + '/'}tractor-brands`}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default TractorsByBrands;