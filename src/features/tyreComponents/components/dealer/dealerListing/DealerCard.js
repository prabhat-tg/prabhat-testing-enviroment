import { getSelectedLanguage } from '@/src/services/locale';
import Image from 'next/image';
import Link from 'next/link';

const DealerCard = async ({
  dealer,
  translation,
  capitalizeWords,
  maskMobile,
  showBrandLogo = true,
}) => {
  const currentlang = await getSelectedLanguage();
  return (
    <div className="col-span-6 border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter transition-colors duration-200 rounded-xl p-4  sm:col-span-4 xl:col-span-2">
      <div className="flex h-full flex-col justify-between gap-2 rounded-2xl  p-2.5 ">
        <div>
          <div className="mb-4 flex justify-between md:mb-2">
            {showBrandLogo ? (
              <div className="flex h-12 w-12 items-center justify-center">
                <Image
                  src={dealer.images}
                  height={48}
                  width={48}
                  alt="brand-logo"
                  title="brand-logo"
                  className="h-auto max-h-12 w-auto max-w-12 object-contain"
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </div>
            ) : null}
            {(dealer.verified_status === 'Verified' ||
              dealer.verified_status !== 'Non_Verified') && (
                <div className="flex h-11 w-14 items-center justify-center">
                  <Image
                    src={
                      'https://images.tractorgyan.com/uploads/116793/674d478769820-VerifiedByBadgeBlackText.webp'
                    }
                    height={44}
                    width={56}
                    alt="verified-badge"
                    title="verified-badge"
                    className="h-auto max-h-11 w-auto max-w-14 object-contain"
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                </div>
              )}
          </div>
          <Link
            href={(currentlang == 'hi' ? '/hi' : '') + dealer.page_url}
            className="mb-2 text-xl font-semibold underline"
          >
            {capitalizeWords(dealer.dealership_name)}
          </Link>
          <div className="flex flex-col gap-1 md:gap-0">
            {dealer.contact_name && (
              <div className="flex gap-2">
                <div className="w-[100px]">
                  <span className="text-sm font-semibold text-gray-dark">
                    {translation?.dealer?.contactName || 'Contact Name'}:
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-normal text-gray-dark">
                    {capitalizeWords(dealer.contact_name)}
                  </span>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <div className="w-[100px]">
                <span className="text-sm font-semibold text-gray-dark">
                  {translation?.dealer?.mobile || 'Mobile'}:
                </span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-normal text-gray-dark">
                  {maskMobile(dealer.mobile)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-[100px]">
                <span className="text-sm font-semibold text-gray-dark">State:</span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-normal text-gray-dark">
                  {capitalizeWords(dealer.state)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-[100px]">
                <span className="text-sm font-semibold text-gray-dark">City:</span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-normal text-gray-dark">
                  {capitalizeWords(dealer.city)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-[100px]">
                <span className="text-sm font-semibold text-gray-dark">Address:</span>
              </div>
              <div className="flex-1">
                <p className="left-1 line-clamp-2 text-sm font-normal text-gray-dark">
                  {capitalizeWords(dealer.address)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <Link
            href={(currentlang == 'hi' ? '/hi' : '') + dealer.page_url}
            className="mx-auto rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white"
          >
            {translation?.buttons?.seeDetails || 'See Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealerCard;
