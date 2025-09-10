import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../../tyre/NavComponents';
import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import WhatsAppTopButton from '../../tyreComponents/commonComponents/WhatsAppTopButton';
import FooterComponents from '../../tyre/FooterComponents';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import TractorComparisonDisplay from '@/src/components/tractor/TractorComparisonDisplay';
import EnhancedCompareTractorsSection from '@/src/components/tractor/EnhancedCompareTractorsSection';
import SocialMediaLinksShare from '@/src/components/shared/social-media/SocialMediaShare';

export default async function CompareResultPage({ params }) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const allTractorBrands = await getAllTractorBrands();
  const popularTractors = await getTractorPopularDetails(currentLang);

  // Extract the comparison URL from params
  const compareSlug = params.slug; // This would be something like ["brand1-model1-vs-brand2-model2"]
  const compareUrl = compareSlug ? compareSlug.join('/') : '';

  // Generate page title from compare URL
  const generatePageTitle = url => {
    if (!url) return translation?.headerNavbar?.compareTractor || 'Compare Tractors';

    const parts = url.split('-vs-');
    const tractorNames = parts.map(part =>
      part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );

    return `${tractorNames.join(' vs ')} - ${translation?.headerNavbar?.compareTractor || 'Compare Tractors'}`;
  };

  const pageTitle = generatePageTitle(compareUrl);

  return (
    <main className="mt-4 md:mt-[164px]">
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />

      <div className="container mx-auto">
        <TittleAndCrumbs
          title={pageTitle}
          breadcrumbs={[
            {
              label: translation?.breadcrumbs?.home || 'Home',
              href: '/',
              title: translation?.breadcrumbs?.home || 'Home',
            },
            {
              label: translation?.headerNavbar?.compareTractor || 'Compare Tractors',
              href: '/compare-tractors',
              title: translation?.headerNavbar?.compareTractor || 'Compare Tractors',
            },
            {
              label: pageTitle,
              title: pageTitle,
              isCurrent: true,
            },
          ]}
        />
      </div>

      {/* Main Comparison Display */}
      <section className="bg-white py-8">
        <div className="container">
          {compareUrl ? (
            <TractorComparisonDisplay compareUrl={compareUrl} translation={translation} />
          ) : (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <h2 className="text-gray-600 mb-4 text-xl font-semibold">
                  {translation?.headerNavbar?.noTractorsSelected ||
                    'No tractors selected for comparison'}
                </h2>
                <p className="text-gray-500">
                  {translation?.headerNavbar?.pleaseSelectTractors ||
                    'Please select tractors from the compare section below'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Social Share */}
      <section className="bg-section-gray py-4">
        <div className="container">
          <div className="flex items-center justify-center gap-4">
            <span className="font-medium">
              {translation?.headerNavbar?.shareThisComparison || 'Share this comparison:'}:
            </span>
            <SocialMediaLinksShare direction="flex-row" />
          </div>
        </div>
      </section>

      {/* Compare More Tractors */}
      <section className="bg-section-gray py-8">
        <div className="container">
          <EnhancedCompareTractorsSection
            heading={translation?.headerNavbar?.compareMoreTractors || 'Compare More Tractors'}
            cta={translation?.headerNavbar?.compareTractor || 'Compare Tractors'}
            bgColor="bg-white"
            translation={translation}
          />
        </div>
      </section>

      {/* Popular Tractors */}
      <PopularSection
        langPrefix={currentLang}
        popularData={popularTractors}
        isMobile={isMobile}
        translation={translation}
        bgColor={'bg-white'}
        redirectRoute="/tractors"
      />

      {/* Tractor Brands */}
      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={allTractorBrands}
      />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={'tractors'} translation={translation} />
      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        defaultEnquiryType={'Tractor'}
        isMobile={isMobile}
      />
    </main>
  );
}
