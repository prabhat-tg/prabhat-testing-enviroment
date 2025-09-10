import ConstructionMachineryPage from '@/src/features/construction-machinery/ConstructionMachineryPage';

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
  return (
    <ConstructionMachineryPage params={params} searchParams={searchParams} />
  );
}
