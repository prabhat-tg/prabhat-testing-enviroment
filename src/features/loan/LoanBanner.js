import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import Image from 'next/image';
import React from 'react';

const LoanBanner = ({ title, page, translation, isMobile }) => {
  const bannerImages = {
    'second-hand-tractor-loan': {
      desktop:
        'https://images.tractorgyan.com/uploads/119472/68418c0d405f5-Second-hand-tractor-loan.webp',
      mobile:
        'https://images.tractorgyan.com/uploads/119661/6853b167855ef-Second-Hand-Tractor-Loan-Mob.webp',
    },
    'second-hand-tractor-implement-loan': {
      desktop:
        'https://images.tractorgyan.com/uploads/119473/6841923f1ce51-second-hand-implement-loan.webp',
      mobile:
        'https://images.tractorgyan.com/uploads/119660/6853b0c5bd816-Second-Hand-Implement-Loan-Mob.webp',
    },
    'tractor-implement-loan': {
      desktop:
        'https://images.tractorgyan.com/uploads/119474/684192ae3f74b-Implemet-loan-banner.webp',
      mobile: 'https://images.tractorgyan.com/uploads/119659/6853b0403cbe8-Implement-Loan-Mob.webp',
    },
    'tractor-emi-calculator': {
      desktop:
        'https://images.tractorgyan.com/uploads/119475/6841981f37356-EMI-Calc---Desktop.webp',
      mobile: 'https://images.tractorgyan.com/uploads/119476/68419d6f6c35c-EMI-Calc---Mobile.webp',
    },
    'loan-against-tractor': {
      desktop:
        'https://images.tractorgyan.com/uploads/119657/6853ad90dea17-Loan-Against-Tractor.webp',
      mobile:
        'https://images.tractorgyan.com/uploads/119658/6853af128f2b9-Loan-Against-Tractor-Mob.webp',
    },
    default: {
      desktop:
        'https://images.tractorgyan.com/uploads/119312/68382da76fd3c-Tractor-Loan---Desktop.webp',
      mobile:
        'https://images.tractorgyan.com/uploads/119719/6857e22796f57-Tractor-Loan-Mobile.webp',
    },
  };

  const { desktop, mobile } = bannerImages[page] || bannerImages.default;

  return (
    <section className="max-md:pt-3">
      <div className="container relative">
        <TittleAndCrumbs
          title={title}
          breadcrumbs={[
            {
              label: `${translation?.breadcrubm.home}`,
              href: '/',
              title: 'Home',
            },
            {
              label: title,
              title: title,
              isCurrent: true,
            },
          ]}
        />

        <div className="relative h-[125px] w-full overflow-hidden rounded-2xl shadow-bottom md:h-[245px]">
          <Image
            src={isMobile ? mobile : desktop}
            alt={`${page} image`}
            title={`${page} image`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-contain object-center"
            quality={75}
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </div>
      </div>
    </section>
  );
};

export default LoanBanner;
