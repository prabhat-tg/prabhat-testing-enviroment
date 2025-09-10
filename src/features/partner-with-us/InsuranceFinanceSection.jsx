import Image from 'next/image';
import TractorGyanFeaturesUI from './TractorGyanFeaturesUI';

const InsuranceFinanceSection = () => {
  const statsData = [
    {
      number: '9,06,351+',
      title: 'Yearly Impression',
    },
    {
      number: '6,52,703+',
      title: 'Yearly Page Views',
    },
    {
      number: '13,345+',
      title: 'Leads generated yearly',
    },
    {
      number: '12+',
      title: 'Tractor Loan Brand Listed',
    },
  ];

  const financeBrands = [
    { name: 'RBL', url: 'https://images.tractorgyan.com/uploads/120115/687f90dd11661-rbl.webp' },
    { name: 'TVS', url: 'https://images.tractorgyan.com/uploads/120110/687f904fe435b-tvs.webp' }, // TVS Credit
    {
      name: 'Shriram',
      url: 'https://images.tractorgyan.com/uploads/120114/687f90c489109-shriram.webp',
    },
    {
      name: 'Finance',
      url: 'https://images.tractorgyan.com/uploads/120122/687f91885a2fb-finance.webp',
    }, // Assuming ITI Finance
  ];

  return (
    <TractorGyanFeaturesUI
      statsData={statsData}
      brandLogos={financeBrands}
      bgGray={true}
      brandHeading={'Our collaboration with leading finance providers'}
      title="Tractor Insurance and Finance by TractorGyan"
      description="On TractorGyan website farmers can know about various tractor insurance and finance providers in India and generate leads for the same."
      leftImageSrc="https://images.tractorgyan.com/uploads/120104/687f7daf454fe-Finance---01.webp"
      leftImageAlt="Leverage financial instruments"
      rightImageSrc="https://images.tractorgyan.com/uploads/120105/687f7e380f1b1-Finance---02.webp"
      rightImageAlt="Higher conversions with better leads"
    />
  );
};

export default InsuranceFinanceSection;
