import WebStoryDetailsPage from "@/src/features/social/webstory/WebStoryInIndiaDetail";

export const dynamic = "force-dynamic";

export default async function page({ params }) {
  const slug = await params;
  return (
    <>
      <WebStoryDetailsPage params={slug} />
    </>
  );
}
