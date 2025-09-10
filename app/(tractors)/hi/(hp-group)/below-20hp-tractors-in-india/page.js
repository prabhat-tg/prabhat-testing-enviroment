import HpGroupPage from '@/src/features/tractors/HpGroupPage';

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="below-20hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="Below 20 HP"
    />
  );
};

export default Page;
