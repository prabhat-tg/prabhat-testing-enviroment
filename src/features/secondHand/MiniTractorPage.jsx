// Mini Tractor Page
import { getTractorPageConfig } from '../tractors/tractorPageConfigs';
import TractorPageLayout from '../tractors/TractorPageLayout';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function MiniTractorPage({ params, searchParams }) {
  // const config = {
  //   sectionName: 'mini_tractor',
  //   basePath: '/mini-tractor',
  //   headingTitleKey: 'headerNavbar.miniTractors', // You may need to add this to your translation files
  //   faqTag: 'mini-tractors',
  //   seoPageKey: 'mini-tractors',
  // };

  const config = getTractorPageConfig('miniTractors', translation);

  return TractorPageLayout(config, { params, searchParams });
}
