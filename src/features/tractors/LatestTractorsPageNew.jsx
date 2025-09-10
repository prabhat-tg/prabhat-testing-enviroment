// Latest Tractors Page
import TractorPageLayout from './TractorPageLayout';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function LatestTractorsPage({ params, searchParams }) {
  const config = {
    sectionName: 'latest_tractor',
    basePath: '/latest-tractors-in-india',
    headingTitleKey: 'headerNavbar.latestTractors', // You may need to add this to your translation files
    faqTag: 'latest-tractors',
    seoPageKey: 'latest-tractors',
  };

  return TractorPageLayout(config, { params, searchParams });
}
