// Latest Tractors Page
import { getSelectedLanguage } from '@/src/services/locale';
import TractorPageLayout from './TractorPageLayout';
import { getTractorPageConfig } from './tractorPageConfigs';
import { getDictionary } from '@/src/lib/dictonaries';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function LatestTractorsPage({ params, searchParams }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);
  const config = getTractorPageConfig('latestTractors', translation);
  return TractorPageLayout(config, { params, searchParams });
}
