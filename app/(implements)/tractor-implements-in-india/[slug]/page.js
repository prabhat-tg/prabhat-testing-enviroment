import TractorImplementTypePage from "@/src/features/implements/TractorImplementTypePage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
  return (
    <TractorImplementTypePage params={params} searchParams={searchParams} />
  );
}
