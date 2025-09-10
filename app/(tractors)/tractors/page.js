import "../../tyreGlobals.css";
import TractorsPage from "@/src/features/tractors/TractorsPage";

export const dynamic = "force-dynamic";

export default async function page({ searchParams }) {
  const searchParamsPage = await searchParams;
  return (
    <TractorsPage searchParams={searchParamsPage} />
  );
}
