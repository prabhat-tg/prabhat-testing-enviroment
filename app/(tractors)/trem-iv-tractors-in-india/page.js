import TremIVTractorsPage from '@/src/features/tractors/TremIVTractorsPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically
const TremIVTractors = ({ params, searchParams }) => {
  return <TremIVTractorsPage params={params} searchParams={searchParams} />;
};

export default TremIVTractors;
