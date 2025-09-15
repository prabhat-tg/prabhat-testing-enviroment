import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TopBrands from './TopBrands';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import { BankDetailsListing } from '@/src/utils/loan/bank-details';
import DesktopTractorsByBrands from '@/src/components/tractor/DesktopTractorsByBrands';
import GoogleAdVertical from '../../social/GoogleAdVertical/GoogleAdVertical';
import { BankDetailsListingHindi } from '@/src/utils/loan/bank-details-hi';

const LoanSchemeDetailPage = ({
  translation,
  langPrefix,
  allTractorBrands,
  isMobile,
  allTractorBrandsError,
  slug,
}) => {
  const filteredData = BankDetailsListing?.filter(val => val.url === slug);
  const filteredDataHi = BankDetailsListingHindi?.filter(val => val.url === slug);
  const data = langPrefix == 'en' ? filteredData[0] : filteredDataHi[0];

  if (!data) {
    return (
      <div className="container py-10 text-center">
        <p>Bank details not found</p>
      </div>
    );
  }

  const banner = {
    imageDesktop: 'https://images.tractorgyan.com/uploads/banner_images/finance_desktop.jpg',
    imageMobile: 'https://images.tractorgyan.com/uploads/banner_images/finance_mobile.jpg',
    text: 'ट्रैक्टर के लिए लोन चाहिए? या अपने पुराने ट्रैक्टर की जानकारी के लिए नीचे क्लिक करें।',
    button: 'अभी आवेदन करें',
  };

  const introductionBlocks = data.content?.['INTRODUCTION:'] || [];
  const introData = introductionBlocks[0]?.content;

  const interestSection = data.content?.['INTEREST RATE & CHARGES FOR TRACTOR FINANCE'];

  const otherSections = Object.entries(data.content).filter(([heading]) => {
    const normalizedHeading = heading.trim().replace(/:$/, '').toLowerCase();
    return (
      normalizedHeading !== 'introduction' &&
      normalizedHeading !== 'interest rate & charges for tractor finance'
    );
  });

  return (
    <section>
      <div className="container">
        <TittleAndCrumbs
          title={translation.loan.tractorLoan}
          breadcrumbs={[
            {
              label: translation?.breadcrubm.home,
              href: '/',
              title: 'Home',
            },
            {
              label: translation.loan.tractorLoan,
              href: '/tractor-loan',
              title: translation.loan.tractorLoan,
            },
            {
              label: data.bankName,
              title: data.bankName,
              isCurrent: true,
            },
          ]}
        />

        <div className="flex h-full w-full flex-col gap-6 lg:flex-row">
          <div className="mx-auto rounded-2xl border border-gray-light p-4 md:space-y-4 md:pb-11 lg:max-w-[75%]">
            <div className="flex items-center space-x-4">
              <Image
                src={data.logoUrl}
                height={96}
                width={96}
                alt={`${data.bankName} Logo`}
                className="h-24 w-24 rounded-lg object-contain"
                priority
              />
              <h1 className="text-2xl font-bold">{data.bankName}</h1>
            </div>

            {introData && (
              <div>
                <h2 className="mb-2 text-lg font-semibold">Introduction</h2>
                <p className="mb-4 text-sm font-normal text-gray-dark md:mb-6">{introData}</p>
              </div>
            )}

            <Link href="/tractor-loan">
              <div className="h-full max-h-[6.25rem] w-full overflow-hidden rounded-lg lg:max-h-[9.375rem]">
                <Image
                  src={banner.imageMobile}
                  height={210}
                  width={380}
                  alt="Tractor Loan Banner"
                  title="Tractor Loan"
                  className="h-full w-full rounded-lg object-cover lg:hidden"
                  priority={isMobile}
                  sizes="(max-width: 768px) 100vw, 0px"
                />
                <Image
                  src={banner.imageDesktop}
                  height={200}
                  width={800}
                  alt="Tractor Loan Banner"
                  title="Tractor Loan"
                  className="hidden h-full w-full rounded-lg object-cover lg:block"
                  priority={!isMobile}
                  sizes="(min-width: 768px) 75vw, 100vw"
                />
              </div>
            </Link>

            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
              {otherSections.map(([heading, blocks], idx) => (
                <div key={idx} className="rounded-lg bg-white p-4 shadow-bottom">
                  <h2 className="mb-2 text-lg font-semibold">{heading}</h2>

                  {Array.isArray(blocks) &&
                    blocks.map((block, i) => {
                      if (block.type === 'paragraph') {
                        return (
                          <p key={i} className="mb-2 text-sm font-medium text-black">
                            {block.content}
                          </p>
                        );
                      }

                      if (block.type === 'list') {
                        return (
                          <ul key={i} className="mb-4 list-disc space-y-1 pl-6">
                            {block.items.map((li, j) => (
                              <li key={j} className="text-sm font-normal text-gray-dark">
                                {li.content}
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return null;
                    })}
                </div>
              ))}
            </div>

            {interestSection && (
              <div className="rounded-2xl p-4 shadow-bottom md:pt-6">
                <h3 className="mb-2 text-center text-lg font-semibold">{interestSection.title}</h3>
                <p className="text-center text-sm font-semibold text-gray-dark lg:text-base">
                  {interestSection.subtitle}
                </p>

                <div className="grid grid-cols-2 px-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-2">
                  {interestSection.sections.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-light py-2 text-center md:border-none md:p-4"
                    >
                      <p className="text-sm font-semibold text-gray-dark lg:text-base">
                        {item.heading}
                      </p>

                      {item.values && (
                        <>
                          <p className="text-xs font-normal text-gray-dark lg:text-sm">
                            Max {item.values.max}
                          </p>
                          <p className="text-xs font-normal text-gray-dark lg:text-sm">
                            Min {item.values.min}
                          </p>
                          <p className="text-xs font-normal text-gray-dark lg:text-sm">
                            Mean {item.values.mean}
                          </p>
                        </>
                      )}

                      {item.description && !item.link && (
                        <p className="mb-2 text-xs font-normal text-black lg:text-sm">
                          {item.description}
                        </p>
                      )}

                      {item.link && (
                        <p className="text-xs font-normal text-gray-dark lg:text-sm">
                          Please{' '}
                          <Link target="_blank" href={item.link}>
                            click here
                          </Link>{' '}
                          for schedule of charges.
                        </p>
                      )}

                      {item.slabs &&
                        item.slabs.map((slab, i) => (
                          <p
                            key={i}
                            className="text-center text-xs font-normal text-gray-dark lg:text-sm"
                          >
                            {slab}
                          </p>
                        ))}

                      {item.note && (
                        <p className="pt-4 text-xs font-normal text-gray-dark lg:text-sm">
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap">
            <DesktopTractorsByBrands
              translation={translation}
              langPrefix={langPrefix}
              allTractorBrands={allTractorBrands}
              heading={translation.headings.TopBrands}
            />
            <GoogleAdVertical />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanSchemeDetailPage;
