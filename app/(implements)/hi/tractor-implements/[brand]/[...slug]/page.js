import TractorImplementDetailPage from "@/src/features/implements/TractorImplementDetailPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
  return (
    <TractorImplementDetailPage params={params} searchParams={searchParams} />
  );
}
