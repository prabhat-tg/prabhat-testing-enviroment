import HpGroupPage from '@/src/features/tractors/HpGroupPage';

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="41hp-to-45hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="41 HP to 45 HP"
    />
  );
};

export default Page;
