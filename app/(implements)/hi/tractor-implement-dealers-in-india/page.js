import TractorImplementDealersPage from "@/src/features/implements/TractorImplementDealersPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <TractorImplementDealersPage searchParams={searchParamsPage} />
  );
}
