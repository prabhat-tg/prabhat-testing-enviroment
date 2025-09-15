import HpGroupPage from '@/src/features/tractors/HpGroupPage';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="46hp-to-50hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="46 HP to 50 HP"
    />
  );
};

export default Page;
