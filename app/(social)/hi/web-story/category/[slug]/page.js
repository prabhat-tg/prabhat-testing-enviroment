import WebStoryCategoryPage from "@/src/features/social/webstory/WebStoryCategoryPage";

export const dynamic = "force-dynamic";

export default async function Page({ params, searchParams }) {
  const slug = await params;
  const searchParamsPage = await searchParams;

  const currentLang = "hi";

  return (
    <>
      <WebStoryCategoryPage
        params={slug}
        searchParams={searchParamsPage}
        porpsCurrentLang={currentLang}
      />
    </>
  );
}
