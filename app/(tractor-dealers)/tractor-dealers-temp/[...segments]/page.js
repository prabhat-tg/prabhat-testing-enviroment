import DealershipPage from '@/src/features/dealership/DealershipPage';

export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }) {
  return <DealershipPage params={params} searchParams={searchParams} />;
}
