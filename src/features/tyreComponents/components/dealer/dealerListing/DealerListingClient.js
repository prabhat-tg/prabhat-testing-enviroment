'use client';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBarClient from '@/src/features/tyre/allTyreListing/tyresListing/SearchBarClient';

const DealerListingClient = ({ searchKeyword, translation, loadMoreShown, dealerDetails, dealerType }) => {
  const scrollToSection = scrollTarget => {
    document.getElementById(scrollTarget).scrollIntoView({ behavior: 'smooth' });
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentPage = Number(params.get('page')) || 1;
    params.set('page', currentPage + 1);
    router.push(`?${params.toString()}`);
  };

  // Get current path for SearchBarClient
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div>
      <div className="relative mb-6 max-h-[150px] w-full overflow-hidden rounded-xl md:hidden">
        <Image
          src={
            'https://images.tractorgyan.com/uploads/117766/67a0704df1ab5-register-as-a-dealer-mobile-banner.webp'
          }
          height={1000}
          width={1000}
          alt="register as a dealer image"
          title="register as a dealer image"
        />
        <button
          onClick={() => {
            scrollToSection('dealer-registration');
          }}
          className="absolute bottom-0 left-4 top-0 mx-auto items-center"
        >
          <span className="my-auto flex gap-1.5 rounded-md bg-white px-3 py-2 text-base font-bold text-black sm:px-6 sm:py-3">
            {translation?.dealer?.registerAsDealer || 'Register as a Dealer'}
          </span>
        </button>
      </div>

      <div className="mb-4 flex flex-col justify-between gap-4 lg:mb-6 lg:flex-row lg:items-center">
        <div>
          <MainHeadings
            text={`${dealerType == 'tractor' ? translation.headings.findTractorDealerNearYou : translation.headings.findTyreDealerNearYou}`}
            marginBottom={'mb-0'}
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="md:min-w-[400px] md:max-w-[485px] lg:min-w-[400px] lg:max-w-[700px]">
            <SearchBarClient
              initialSearchQuery={searchKeyword || ''}
              translation={translation}
              basePath={currentPath}
              searchPlaceholder={
                dealerType == 'tractor'
                  ? translation?.dealer?.searchForTractorDealer || 'Search for Tractor Dealer'
                  : translation?.dealer?.searchForTyreDealer || 'Search for Tyre Dealer'
              }
            />
          </div>
        </div>
      </div>

      {loadMoreShown && dealerDetails?.length > 15 && (
        <button
          className="mx-auto mt-4 flex rounded-lg bg-primary px-4 py-2 text-lg text-white hover:bg-primary-dark transition-colors"
          onClick={handleLoadMore}
        >
          {translation.buttons.loadMore}
        </button>
      )}
    </div>
  );
};

export default DealerListingClient;
