import '../../tyreGlobals.css';
import TractorDealersPage from '@/src/features/tractors/TractorDealersPage';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const TractorDealersInIndia = ({ params, searchParams }) => {
  return <TractorDealersPage url_slug={"tractor-dealers-in-india"} params={params} searchParams={searchParams} />;
};

export default TractorDealersInIndia;
