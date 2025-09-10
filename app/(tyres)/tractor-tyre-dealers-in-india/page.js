import TractorTyreDealersPage from '@/src/features/tyre/TractorTyreDealersPage';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  return (
    <>
      <TractorTyreDealersPage params={params} searchParams={searchParams} />
    </>
  );
}
