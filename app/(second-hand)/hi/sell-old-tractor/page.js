import SellOldTractorPage from '@/src/features/secondHand/SellOldTractorPage';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  return <SellOldTractorPage searchParams={searchParams} />;
}
