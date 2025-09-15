import "../../../tyreGlobals.css";
import TractorOnRoadPricePage from "@/src/features/tractors/TractorOnRoadPricePage";
export const dynamic = "force-dynamic";

const TractorOnRoadPrice = ({ params, searchParams }) => {
  return <TractorOnRoadPricePage params={params} searchParams={searchParams} />;
};

export default TractorOnRoadPrice;
