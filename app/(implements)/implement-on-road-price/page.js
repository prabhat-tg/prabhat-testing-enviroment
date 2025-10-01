import ImplementOnRoadPricePage from "@/src/features/implements/ImplementOnRoadPricePage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <ImplementOnRoadPricePage params={{}} searchParams={searchParamsPage} />
  );
}
