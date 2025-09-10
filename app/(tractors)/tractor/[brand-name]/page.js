// TractorByBrandPage
import '../../../tyreGlobals.css';
import TractorByBrandPage from '@/src/features/tractors/byBrand/TractorByBrandPage';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  return <TractorByBrandPage params={params} searchParams={searchParams} />;
}
