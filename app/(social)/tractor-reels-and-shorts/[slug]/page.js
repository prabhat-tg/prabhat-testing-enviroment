import TractorReelShortsDetailPage from "@/src/features/social/reelsAndSorts/TractorReelShortsDetailPage";

export const dynamic = "force-dynamic";

export default async function page({ params }) {
  const param = await params;

  return (
    <>
      <TractorReelShortsDetailPage params={param} />
    </>
  );
}
