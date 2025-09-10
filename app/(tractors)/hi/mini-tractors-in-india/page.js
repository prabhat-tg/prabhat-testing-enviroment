import MiniTractorsPage from '@/src/features/tractors/MiniTractorsPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const MiniTractors = ({ params, searchParams }) => {
  return <MiniTractorsPage params={params} searchParams={searchParams} />;
};

export default MiniTractors;
