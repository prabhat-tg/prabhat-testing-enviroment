import Image from 'next/image';
import TractorGyanFeaturesUI from './TractorGyanFeaturesUI';

const HelpingMechaniseSection = () => {
  const statsData = [
    { number: '245.8 Million+', title: 'Yearly Web Impressions' },
    { number: '25.4 Million+', title: 'Yearly Page Views' },
    { number: '2,10,304+', title: 'Tractors Leads Generated' },
    { number: '10,545+', title: 'Tractor Dealers Listed PAN India' },
    { number: '34+', title: 'Tractor Brand Listed' },
    { number: '868+', title: 'Tractor Models Listed' },
  ];

  const tractorBrands = [
    {
      name: 'Mahindra',
      url: 'https://images.tractorgyan.com/uploads/120120/687f916aec05f-mahindra-(1).webp',
    },
    {
      name: 'Sonalika',
      url: 'https://images.tractorgyan.com/uploads/120111/687f90851d178-sonalika.webp',
    },
    {
      name: 'Solis',
      url: 'https://images.tractorgyan.com/uploads/120113/687f90b568690-solis.webp',
    },
    {
      name: 'Powertrac',
      url: 'https://images.tractorgyan.com/uploads/120117/687f9111c6b0a-powertrac.webp',
    },
    {
      name: 'Farmtrac',
      url: 'https://images.tractorgyan.com/uploads/120123/687f919b19d46-farmtrac.webp',
    },
    {
      name: 'Escorts Kubota',
      url: 'https://images.tractorgyan.com/uploads/120125/687f91c2e53b5-escorts-kubota.webp',
    },
    {
      name: 'Massey Ferguson',
      url: 'https://images.tractorgyan.com/uploads/120119/687f915750d74-mf.webp',
    },
    {
      name: 'Eicher',
      url: 'https://images.tractorgyan.com/uploads/120126/687f91d0d1ad4-eicher-(1).webp',
    },
    {
      name: 'New Holland',
      url: 'https://images.tractorgyan.com/uploads/120118/687f9123f1fb6-new-holland.webp',
    },
  ];

  return (
    <TractorGyanFeaturesUI
      statsData={statsData}
      brandLogos={tractorBrands}
      brandHeading={'Tractor brands that trust our expertise'}
      title="TractorGyan: Helping India Mechanise"
      description="TractorGyan is a genuine one-stop website where you can know about Tractor Features and Specification, tractor price, compare, buy and sell old tractors for your agricultural land from various leading brands."
      leftImageSrc="https://images.tractorgyan.com/uploads/120079/687f61ceb323a-Tractor-01.webp"
      leftImageAlt="tracttor image"
      rightImageSrc="https://images.tractorgyan.com/uploads/120080/687f622b72bb2-Tractor-02.webp"
      rightImageAlt="tractor image"
    />
  );
};

export default HelpingMechaniseSection;
