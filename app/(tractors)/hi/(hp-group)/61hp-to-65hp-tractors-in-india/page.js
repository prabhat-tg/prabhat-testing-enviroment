import HpGroupPage from '@/src/features/tractors/HpGroupPage';

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="61hp-to-65hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="61 HP to 65 HP"
    />
  );
};

export default Page;
