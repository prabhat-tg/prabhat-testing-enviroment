import SecondHandTractorsPage from '@/src/features/secondHand/SecondHandTractorsPage';

export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }) {
  return <SecondHandTractorsPage params={params} searchParams={searchParams} />;
}
