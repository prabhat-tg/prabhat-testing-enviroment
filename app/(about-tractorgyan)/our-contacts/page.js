import OurContactPage from "@/src/features/our-contacts/OurContactPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <OurContactPage searchParams={searchParamsPage} />
  );
}
