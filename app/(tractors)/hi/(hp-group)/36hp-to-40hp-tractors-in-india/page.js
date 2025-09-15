import HpGroupPage from '@/src/features/tractors/HpGroupPage';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="36hp-to-40hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="36 HP to 40 HP"
    />
  );
};

export default Page;
