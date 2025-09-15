import '../../tyreGlobals.css';
import TractorSeriesPage from '@/src/features/tractors/series/TractorSeriesPage';
export const dynamic = "force-dynamic";

const TractorSeries = ({ params, searchParams }) => {
  return <TractorSeriesPage params={params} searchParams={searchParams} />;
};

export default TractorSeries;
