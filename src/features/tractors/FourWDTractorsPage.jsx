// 4WD Tractors Page
import { getSelectedLanguage } from '@/src/services/locale';
import { getTractorPageConfig } from './tractorPageConfigs';
import TractorPageLayout from './TractorPageLayout';
import { getDictionary } from '@/src/lib/dictonaries';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function FourWDTractorsPage({ params, searchParams }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);
  const config = getTractorPageConfig('fourWDTractors', translation);

  return TractorPageLayout(config, { params, searchParams });
}
