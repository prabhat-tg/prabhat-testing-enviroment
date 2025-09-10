import HpGroupPage from '@/src/features/tractors/HpGroupPage';

const Page = ({ params, searchParams }) => {
  return (
    <HpGroupPage
      hpRange="26hp-to-30hp-tractors-in-india"
      params={params}
      searchParams={searchParams}
      hpTitle="26 HP to 30 HP"
    />
  );
};

export default Page;
