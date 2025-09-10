import Image from 'next/image';
import TractorGyanFeaturesUI from './TractorGyanFeaturesUI';
import { number } from 'prop-types';

const ImplementPromotionSection = () => {
  const statsData = [
    { number: '16.5 Million+', title: 'Implement Impression' },
    { number: '1.6 Million+', title: 'Yearly Page Views' },
    { number: '7,440+', title: 'Leads generated yearly' },
    { number: '55+', title: 'Implement Brand Listed' },
    { number: '934+', title: 'Implement Models Listed' },
    { number: '1,780+', title: 'Implement Dealers Listed PAN India' },
  ];

  const implementBrands = [
    { name: 'Punni', url: 'https://images.tractorgyan.com/uploads/120116/1753190652punni.webp' },
    {
      name: 'Sonalika Agro',
      url: 'https://images.tractorgyan.com/uploads/120112/687f90a6d5a5b-sonalika-agro.webp',
    }, // Assuming Agro Solution
    {
      name: 'Agrizone',
      url: 'https://images.tractorgyan.com/uploads/120127/687f91e1136e0-agrizone.webp',
    },
  ];

  return (
    <TractorGyanFeaturesUI
      statsData={statsData}
      brandLogos={implementBrands}
      bgGray={true}
      brandHeading={'Implement brands that trust our expertise'}
      title="Tractor Implement by TractorGyan"
      description="TractorGyan is a one-stop website where farmers can find implements for their Tractor and get implement price from various leading brands."
      leftImageSrc="https://images.tractorgyan.com/uploads/120100/687f7c69c03e9-Implements---01.webp"
      leftImageAlt="Generate more enquiries"
      rightImageSrc="https://images.tractorgyan.com/uploads/120101/687f7c9dbc2fc-Implements---02.webp"
      rightImageAlt="Showcase your products"
    />
  );
};

export default ImplementPromotionSection;
