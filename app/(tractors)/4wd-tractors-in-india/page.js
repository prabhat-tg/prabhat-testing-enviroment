import FourWDTractorsPage from '@/src/features/tractors/FourWDTractorsPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const FourWDTractors = ({ params, searchParams }) => {
  return <FourWDTractorsPage params={params} searchParams={searchParams} />;
};

export default FourWDTractors;
