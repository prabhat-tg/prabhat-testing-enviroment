import HpGroupPage from '@/src/features/tractors/HpGroupPage';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="above-65hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="Above 65 HP"
    />
  );
};

export default Page;
