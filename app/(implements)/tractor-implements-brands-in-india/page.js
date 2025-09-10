import TractorImplementBrandsPage from "@/src/features/implements/TractorImplementBrandsPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <TractorImplementBrandsPage searchParams={searchParamsPage} />
  );
}
