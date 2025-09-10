import TractorVideosPage from "@/src/features/social/videos/TractorVideosPage";

export const dynamic = "force-dynamic";
export default async function page({ searchParams }) {
  const slug = await searchParams;
  const currentLang = "hi";
  return (
    <>
      <TractorVideosPage searchParams={slug} porpsCurrentLang={currentLang} />
    </>
  );
}
