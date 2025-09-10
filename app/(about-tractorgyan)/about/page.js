import AboutPage  from "@/src/features/about/AboutPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <AboutPage searchParams={searchParamsPage} />
  );
}
