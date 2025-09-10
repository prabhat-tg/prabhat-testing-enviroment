import SecondHandTractorsDetailsPage from "@/src/features/secondHand/SecondHandTractorsDetailsPage";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
 
  return <SecondHandTractorsDetailsPage searchParams={searchParams} />;
}
