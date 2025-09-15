import React from 'react';
import DealerCard from './DealerCard';
import dynamic from 'next/dynamic';
import RegistrationBanner from './RegistrationBanner';
const DealerListingClient = dynamic(() => import('./DealerListingClient'));

const DealerListing = ({
  dealerDetails,
  searchKeyword,
  loadMoreShown,
  translation,
  suggestedDealers,
  dealerType,
}) => {

  const capitalizeWords = str => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const maskMobile = mobile => {
    if (!mobile || mobile?.length < 6) return mobile;
    return mobile.slice(0, 2) + ' ***** ' + mobile.slice(-2);
  };

  return (
    <section>
      <div className="container">
        <DealerListingClient
          searchKeyword={searchKeyword}
          translation={translation}
          loadMoreShown={loadMoreShown}
          dealerDetails={dealerDetails}
          dealerType={dealerType}
        />
        <div>
          <div className="grid grid-cols-6 gap-4 gap-y-6 sm:grid-cols-8">
            {dealerDetails && dealerDetails?.length > 0 && (
              <>
                {dealerDetails?.slice(0, 3)?.map((dealer, index) => (
                  <DealerCard
                    key={index}
                    dealer={dealer}
                    translation={translation}
                    capitalizeWords={capitalizeWords}
                    maskMobile={maskMobile}
                  />
                ))}
                <RegistrationBanner />
                {dealerDetails?.length >= 2 &&
                  dealerDetails
                    .slice(3, dealerDetails?.length)
                    .map((dealer, index) => (
                      <DealerCard
                        key={index}
                        dealer={dealer}
                        translation={translation}
                        capitalizeWords={capitalizeWords}
                        maskMobile={maskMobile}
                      />
                    ))}
              </>
            )}
          </div>
          {dealerDetails?.length < 1 && (
            <div>
              <div className="grid w-full">
                <div className="col-span-6 py-10 text-center">
                  <h2
                    className="border-gray-400 text-red-500 inline-block rounded-[20px] border-2 px-8 py-2.5 text-[25px] font-extrabold tracking-wide"
                    style={{ color: 'red' }}
                  >
                    {translation?.dealer?.noResultFound || 'No Result Found'}
                  </h2>
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-center">
                  <h4
                    className={`border-b-3 border-secondary pb-1 text-sm font-bold md:text-xl ${'mb-8'} inline-block leading-6`}
                  >
                    {dealerType == 'tractor' ? translation?.dealer?.suggestedTractorDealer : translation?.dealer?.suggestedTractorTyreDealer ||
                      'Suggested Tractor Tyre Dealer'}
                  </h4>
                </div>
                <div className="grid grid-cols-6 gap-4 gap-y-6 sm:grid-cols-8">
                  {suggestedDealers &&
                    suggestedDealers.map((dealer, index) => (
                      <DealerCard
                        key={index}
                        dealer={dealer}
                        translation={translation}
                        capitalizeWords={capitalizeWords}
                        maskMobile={maskMobile}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default DealerListing;
