import MiniTractorsPage from '@/src/features/tractors/MiniTractorsPage';
export const dynamic = 'force-dynamic';
const MiniTractors = ({ params, searchParams }) => {
  console.log('MiniTractors Params and Search Params:', params, searchParams);

  return <MiniTractorsPage params={params} searchParams={searchParams} />;
};

export default MiniTractors;
