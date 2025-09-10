import TractorTyreDealersPage from '@/src/features/tyre/TractorTyreDealersPage';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParamsObj = await searchParams;
  return (
    <>
      <TractorTyreDealersPage params={param} searchParams={searchParamsObj} />
    </>
  );
}
