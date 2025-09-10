import MiniTractorPage from '@/src/features/secondHand/MiniTractorPage';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParamsObj = await searchParams;
  console.log('MiniTractorPage Params and Search Params:', param, searchParamsObj);

  return <MiniTractorPage searchParams={searchParamsObj} params={param} />;
}
