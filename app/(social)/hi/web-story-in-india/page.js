import WebStoryInIndiaPage from "@/src/features/social/webstory/WebStoryInIndiaPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  const currentLang = "hi";
  return (
    <>
      <WebStoryInIndiaPage
        searchParams={searchParamsPage}
        porpsCurrentLang={currentLang}
      />
    </>
  );
}
