import HpGroupPage from '@/src/features/tractors/HpGroupPage';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      params={params}
      searchParams={searchParams}
      hpRange="31hp-to-35hp-tractors-in-india"
      hpTitle="31 HP to 35 HP"
    />
  );
};

export default Page;
