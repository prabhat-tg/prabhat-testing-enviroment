import ElectricTractorsPage from '@/src/features/tractors/ElectricTractorsPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const ElectricTractors = ({ params, searchParams }) => {
  return <ElectricTractorsPage params={params} searchParams={searchParams} />;
};

export default ElectricTractors;
