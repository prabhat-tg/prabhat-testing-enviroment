import MiniTractorsPage from '@/src/features/tractors/MiniTractorsPage';
export const dynamic = 'force-dynamic';
// TODO need to make this functional using TractorPageLayout component
const MiniTractors = ({ params, searchParams }) => {
  console.log('MiniTractors Params and Search Params:', params, searchParams);

  return <MiniTractorsPage params={params} searchParams={searchParams} isBrandPage={true} />;
};

export default MiniTractors;
