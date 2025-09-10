import TractorReelShortsPage from "@/src/features/social/reelsAndSorts/TractorReelsShortsPage";

export const dynamic = "force-dynamic";

export default async function TractorTyrePage({ searchParams }) {
  const currentLang = "hi";
  return (
    <>
      <TractorReelShortsPage
        searchParams={searchParams}
        porpsCurrentLang={currentLang}
      />
    </>
  );
}
