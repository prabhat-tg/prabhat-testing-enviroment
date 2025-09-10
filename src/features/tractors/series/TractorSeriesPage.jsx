import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../../tyre/NavComponents';
import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import FooterComponents from '../../tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import Image from 'next/image';
import TractorSeriesCard from '@/src/components/ui/cards/TractorSeriesCard';
import { getAllBrandSeries } from '@/src/services/tractor/get-tractor-series';
// Removed menuItems import, using API-provided logos
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import WhatsAppTopButton from '../../tyreComponents/commonComponents/WhatsAppTopButton';

export const dynamic = 'force-dynamic';

// Removed static/menu-based logo helper, will use API-provided logos

export default async function TractorSeriesPage({ params }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);
  const seoData = await getSEOByPage(
    (currentLang == 'hi' ? 'hi/' : '') + 'tractor-series-in-india'
  );

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = 'tractor/mahindra-575-di-xp-plus/440';
  const pageSlugTemp = 'tyres'; // Temporary as data is not fetched for above slug

  // Fetch all brand series data
  let allBrandSeriesData = null;
  let allBrands = [];
  let allBrandSeries = {};
  let allBrandLogos = {};

  try {
    allBrandSeriesData = await getAllBrandSeries({ lang: currentLang });
    if (allBrandSeriesData && allBrandSeriesData.success) {
      allBrands = allBrandSeriesData.all_brands || [];
      allBrandSeries = allBrandSeriesData.all_brand_series || {};
      allBrandLogos = allBrandSeriesData.all_brand_logo || {};
    }
  } catch (error) {
    console.error('Error fetching brand series data:', error);
  }

  const headingTitle = translation?.tractorPages?.allTractorSeries || 'All Tractor Series';
  const seriesInIndiaText =
    translation?.tractorPages?.tractorSeriesInIndia || 'Tractor Series in India';

  return (
    <main className="mx-auto pt-4 md:mt-[180px] md:pt-0">
      {/* TODO:: Setup Common Layout Class */}
      <SeoHead seo={seoData} paginationLinks={{
        canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${currentLang == 'hi' ? '/hi' : ''}/tractor-series-in-india`,
      }} />
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      <div className="container">
        <TittleAndCrumbs
          title={headingTitle}
          breadcrumbs={[
            {
              label: translation?.breadcrubm?.tractorGyanHome,
              href: currentLang == 'hi' ? '/hi' : '/',
              title: translation?.breadcrubm?.tractorGyanHome,
            },
            {
              label: headingTitle,
              title: headingTitle,
              isCurrent: true,
            },
          ]}
        />
        <div className="mt-4 md:mt-10">
          {Object.keys(allBrandSeries).length > 0 ? (
            Object.entries(allBrandSeries).map(([brandName, seriesArray], index) => {
              // Find brand info from all_brands array
              const brandInfo = allBrands.find(
                brand =>
                  brand.name_en.toLowerCase() === brandName.toLowerCase() ||
                  brand.name.toLowerCase() === brandName.toLowerCase()
              );

              // Get brand display name based on current language
              const brandDisplayName =
                currentLang === 'hi' && brandInfo?.name_hi ? brandInfo.name_hi : brandName;

              // Get brand logo from API all_brand_logo, fallback to pattern-based URL
              let brandLogo = allBrandLogos[brandName];
              if (brandLogo && !brandLogo.startsWith('http')) {
                // If API returns a relative path, prepend the domain
                brandLogo = `https://images.tractorgyan.com/uploads${brandLogo}`;
              }
              if (!brandLogo) {
                brandLogo = `https://images.tractorgyan.com/uploads/brands/${brandName.toLowerCase().replace(/\s+/g, '-')}-logo.webp`;
              }

              return (
                <div
                  key={index}
                  className="mb-6 rounded-xl border border-gray-light p-4 md:mb-10 md:p-6"
                >
                  <div className="flex justify-between">
                    <h2 className="border-b-3 mb-4 border-secondary pb-1 text-xl font-semibold md:text-2xl">
                      {`${brandDisplayName} ${seriesInIndiaText}`}
                    </h2>
                    <Image
                      src={brandLogo}
                      height={100}
                      width={100}
                      alt={`${brandDisplayName} Logo`}
                      title={`${brandDisplayName} Logo`}
                      className="h-auto max-h-[72px] w-[72px] object-contain px-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2 md:grid-cols-6">
                    {seriesArray.map((series, seriesIndex) => (
                      <TractorSeriesCard
                        key={`${series.series_id}-${seriesIndex}`}
                        title={currentLang === 'hi' ? series.series : series.series_en}
                        imgSrc={series.image}
                        href={(currentLang === 'hi' ? ' /hi' : '') + series.page_url}
                        className="border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter transition-colors duration-200"
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mb-6 rounded-xl border border-gray-light p-4 text-center md:mb-10 md:p-6">
              <p className="text-gray-600">
                {currentLang === 'hi'
                  ? 'कोई ट्रैक्टर सीरीज उपलब्ध नहीं है।'
                  : 'No tractor series available.'}
              </p>
            </div>
          )}
        </div>
      </div>
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer
        slug={(currentLang == 'hi' ? 'hi/' : '') + 'tractor-series-in-india'}
        translation={translation}
      />
      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
      />
      <FooterComponents translation={translation} />
    </main>
  );
}
