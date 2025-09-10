import LatestTractorsPage from '@/src/features/tractors/LatestTractorsPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const LatestTractors = ({ params, searchParams }) => {
  return <LatestTractorsPage params={params} searchParams={searchParams} />;
};

export default LatestTractors;
