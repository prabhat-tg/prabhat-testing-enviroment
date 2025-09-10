import SellUsedImplementPage from "@/src/features/secondHand/SellUsedImplementPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <SellUsedImplementPage searchParams={searchParamsPage} />
  );
}
