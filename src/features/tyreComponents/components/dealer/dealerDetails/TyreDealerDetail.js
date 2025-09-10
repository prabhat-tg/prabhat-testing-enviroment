'use client';
import Image from 'next/image';
import DealerInquiryForm from '@/src/components/shared/dealer-inquiry-form/DealerInquiryForm';
import { useState } from 'react';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';

export default function TyreDealerDetail({ dealerDetail, translation, currentLang = 'en' }) {
  const dealerData = dealerDetail?.data[0];
  const [handleDealerShown, setHandleDealerShown] = useState(false);
  const [isCloseAfterSubmit, setIsCloseAfterSubmit] = useState(false);

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

  const handleDealerForm = () => {
    setHandleDealerShown(!handleDealerShown);
    setIsCloseAfterSubmit(true);
  };

  return (
    <>
      <section className="pt-4 lg:mt-[159px]">
        <div className="container relative">
          <TittleAndCrumbs
            title={`${capitalizeWords(
              dealerData.dealership_name
            )} ${translation.dealer.tractorTyreDealerIn} ${capitalizeWords(dealerData.city)}`}
            breadcrumbs={[
              {
                label: translation.dealer.home,
                href: currentLang === 'hi' ? '/hi' : '/',
                title: translation.dealer.home,
              },
              {
                label: translation.headerNavbar.tyreHome,
                href: currentLang === 'hi' ? '/hi/tractor-tyre-in-india' : '/tractor-tyre-in-india',
                title: translation.headerNavbar.tyreHome,
              },
              {
                label: translation.dealer.tyreDealers,
                href:
                  currentLang === 'hi'
                    ? '/hi/tractor-tyre-dealers-in-india'
                    : '/tractor-tyre-dealers-in-india',
                title: translation.dealer.tyreDealers,
              },
              {
                label: `${dealerData.city} ${dealerData.state}`,
                href:
                  currentLang === 'hi'
                    ? `/hi/tyre-dealers/${dealerData.city.toLowerCase()}/${dealerData.state.toLowerCase()}`
                    : `/tyre-dealers/${dealerData.city.toLowerCase()}/${dealerData.state.toLowerCase()}`,
                title: `${dealerData.city} ${dealerData.state}`,
              },
              {
                label: dealerData.brand_name,
                href:
                  currentLang === 'hi'
                    ? `/hi/tyre-dealers/${dealerData.brand_name
                        .replace(/([a-z])([A-Z])/g, '$1 $2')
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`
                    : `/tyre-dealers/${dealerData.brand_name
                        .replace(/([a-z])([A-Z])/g, '$1 $2')
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`,
                title: dealerData.brand_name,
              },
              {
                label: capitalizeWords(dealerData.dealership_name),
                title: capitalizeWords(dealerData.dealership_name),
                isCurrent: true,
              },
            ]}
          />
          <div className="container">
            <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
              <div className="flex w-full justify-start rounded-2xl">
                <div className="flex h-full w-full flex-col justify-between gap-2 rounded-2xl bg-white p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                  <div className="relative">
                    <div className="mb-4 flex justify-between pb-4 pt-2 md:mb-2">
                      <Image
                        src={`${dealerData.images}`}
                        height={500}
                        width={500}
                        alt="brand-logo"
                        title="brand-logo"
                        className="max-h-18 m-auto h-auto w-auto"
                      />
                      {dealerData.verified_status === 'Verified' && (
                        <Image
                          src={
                            'https://images.tractorgyan.com/uploads/116793/674d478769820-VerifiedByBadgeBlackText.webp'
                          }
                          height={300}
                          width={300}
                          alt="brand-logo"
                          title="brand-logo"
                          className="absolute right-0 top-0 h-auto max-h-11 w-auto max-w-14"
                        />
                      )}
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold underline">
                      {capitalizeWords(dealerData.dealership_name)}
                    </h3>
                    <div className="flex flex-col gap-1 md:gap-0">
                      {dealerData.contact_name && (
                        <div className="flex gap-2 pb-1">
                          <div className="w-[100px]">
                            <span className="text-md sm:text:sm font-semibold text-gray-dark">
                              {translation.dealer.contactName}:
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className="text-md sm:text:sm font-normal text-gray-dark">
                              {capitalizeWords(dealerData.contact_name)}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 pb-1">
                        <div className="w-[100px]">
                          <span className="text-md sm:text:sm font-semibold text-gray-dark">
                            {translation.dealer.state}:
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-md sm:text:sm font-normal text-gray-dark">
                            {capitalizeWords(dealerData.state)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 pb-1">
                        <div className="w-[100px]">
                          <span className="text-md sm:text:sm font-semibold text-gray-dark">
                            {translation.dealer.city}:
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-md sm:text:sm font-normal text-gray-dark">
                            {capitalizeWords(dealerData.city)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 pb-1">
                        <div className="w-[100px]">
                          <span className="text-md sm:text:sm font-semibold text-gray-dark">
                            {translation.dealer.address}:
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-md sm:text:sm left-1 font-normal text-gray-dark">
                            {capitalizeWords(dealerData.address)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pb-1">
                        <div className="w-[100px]">
                          <span className="text-md sm:text:sm font-semibold text-gray-dark">
                            {translation.dealer.mobile}:
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-md sm:text:sm font-normal text-gray-dark">
                            {maskMobile(dealerData.mobile)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex pb-2 pt-4">
                    <button
                      onClick={handleDealerForm}
                      className="mx-auto rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white"
                    >
                      {translation.dealer.connectWithDealer}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {handleDealerShown && (
        <DealerInquiryForm
          translation={translation}
          onClose={() => setHandleDealerShown(false)}
          dealerMobile={dealerData?.mobile}
          dealerContactName={dealerData?.dealership_name}
          isCloseAfterSubmit={isCloseAfterSubmit}
          setIsCloseAfterSubmit={setIsCloseAfterSubmit}
        />
      )}
    </>
  );
}
