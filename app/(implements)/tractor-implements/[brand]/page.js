import TractorImplementByBrandPage from "@/src/features/implements/TractorImplementByBrandPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
  return (
    <TractorImplementByBrandPage params={params} searchParams={searchParams} />
  );
}
