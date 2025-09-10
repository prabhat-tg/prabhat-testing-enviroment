import TractorReelShortsPage from "@/src/features/social/reelsAndSorts/TractorReelsShortsPage";

export const dynamic = "force-dynamic";

export default async function TractorTyrePage({ searchParams }) {
  return (
    <>
      <TractorReelShortsPage searchParams={searchParams} />
    </>
  );
}
