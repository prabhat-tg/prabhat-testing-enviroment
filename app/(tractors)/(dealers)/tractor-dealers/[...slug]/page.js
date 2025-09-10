import TractorDealersPage from '@/src/features/tractors/TractorDealersPage';
import '../../../../tyreGlobals.css';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  const param = await params;
  return (
    <TractorDealersPage
      params={params}
      searchParams={searchParams}
      url_slug={param.slug.join('/')}
    />
  );
}
