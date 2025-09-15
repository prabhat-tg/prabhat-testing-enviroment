import TractorImplementCategoryPage from "@/src/features/implements/TractorImplementCategoryPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
  return (
    <TractorImplementCategoryPage params={params} searchParams={searchParams} />
  );
}
