import TractorImplementsPage from "@/src/features/implements/TractorImplementsPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <TractorImplementsPage searchParams={searchParamsPage} />
  );
}
