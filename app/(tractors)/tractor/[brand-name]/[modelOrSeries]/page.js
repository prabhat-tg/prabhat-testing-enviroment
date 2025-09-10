import TractorByBrandPage from '@/src/features/tractors/byBrand/TractorByBrandPage';
import '../../../../tyreGlobals.css';
import TractorModelPage from '@/src/features/tractors/models/TractorModelPage';

export const dynamic = 'force-dynamic';

export default async function ModelOrSeriesPage({ params, searchParams }) {
  let { brandName, modelOrSeries } = await params;
  const isModelPage = /^\d+$/.test(modelOrSeries);

  if (modelOrSeries == ("trem-iv-series")) modelOrSeries = "trem-IV-series"


  return (
    <>
      {isModelPage ? (
        <TractorModelPage params={params} />
      ) : (
        <TractorByBrandPage
          params={params}
          searchParams={searchParams}
          isSeriesListing={true}
          seriesName={modelOrSeries}
        />
      )}
      {/* <TractorSeriesPage params={params}/> */}
    </>
  );
}
