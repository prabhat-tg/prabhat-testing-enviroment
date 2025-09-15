import HpGroupPage from '@/src/features/tractors/HpGroupPage';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="21hp-to-25hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="21 HP to 25 HP"
    />
  );
};

export default Page;
