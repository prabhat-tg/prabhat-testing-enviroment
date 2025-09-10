import TractorBrandsPage from "@/src/features/tractors/brands/TractorBrandsPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <>
      <TractorBrandsPage searchParams={searchParamsPage} />
    </>
  );
}
