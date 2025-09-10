import TwoWDTractorsPage from '@/src/features/tractors/TwoWDTractorsPage';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically
const TwoWDTractors = ({ params, searchParams }) => {
  return <TwoWDTractorsPage params={params} searchParams={searchParams} />;
};

export default TwoWDTractors;
