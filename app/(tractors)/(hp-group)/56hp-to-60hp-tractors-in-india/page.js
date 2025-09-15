import HpGroupPage from '@/src/features/tractors/HpGroupPage';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="56hp-to-60hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="56 HP to 60 HP"
    />
  );
};

export default Page;
