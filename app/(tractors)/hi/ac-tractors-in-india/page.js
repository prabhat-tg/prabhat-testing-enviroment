import ACTractorsPage from '@/src/features/tractors/ACTractorsPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const ACTractors = ({ params, searchParams }) => {
  return <ACTractorsPage params={params} searchParams={searchParams} />;
};

export default ACTractors;
