import CNGTractorsPage from '@/src/features/tractors/CNGTractorsPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const CNGTractors = ({ params, searchParams }) => {
  return <CNGTractorsPage params={params} searchParams={searchParams} />;
};

export default CNGTractors;
