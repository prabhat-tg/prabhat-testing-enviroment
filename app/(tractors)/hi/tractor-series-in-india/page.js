import TractorSeriesPage from '@/src/features/tractors/series/TractorSeriesPage';
import '../../../tyreGlobals.css';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const TractorSeriesInIndia = ({ params, searchParams }) => {
  return <TractorSeriesPage params={params} searchParams={searchParams} />;
};

export default TractorSeriesInIndia;
