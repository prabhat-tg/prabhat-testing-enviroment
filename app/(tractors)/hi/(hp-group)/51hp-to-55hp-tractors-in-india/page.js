import HpGroupPage from '@/src/features/tractors/HpGroupPage';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="51hp-to-55hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="51 HP to 55 HP"
    />
  );
};

export default Page;
