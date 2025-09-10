import TractorVideosDetailPage from "@/src/features/social/videos/TractorVideosDetailPage";

export const dynamic = "force-dynamic";

export default async function page({ params }) {
  const param = await params;
  return (
    <>
      <TractorVideosDetailPage params={param} />
    </>
  );
}
