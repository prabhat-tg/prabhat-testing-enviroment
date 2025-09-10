import BuyUsedImplementPage from "@/src/features/secondHand/BuyUsedImplementPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <BuyUsedImplementPage searchParams={searchParamsPage} />
  );
}
