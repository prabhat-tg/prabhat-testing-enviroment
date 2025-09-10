'use client';
import Image from 'next/image';

export default function RegistrationBanner() {
  const scrollToSection = scrollTarget => {
    if (typeof window !== 'undefined') {
      document.getElementById(scrollTarget).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="col-span-6 hidden sm:col-span-4 md:block xl:col-span-2">
      <div className="relative h-full min-h-[150px] overflow-hidden rounded-2xl bg-white shadow-bottom">
        <Image
          src={
            'https://images.tractorgyan.com/uploads/117765/67a06fa357feb-register-as-a-dealer-desktop-banner.webp'
          }
          height={1000}
          width={1000}
          alt="register as a dealer image"
          title="register as a dealer image"
          className='object-cover'
        />
        <div className="absolute bottom-0 left-0 right-0 h-full max-h-[140px] w-full bg-gray-popup bg-opacity-45 px-1 py-5">
          <div className="mx-auto mb-1 text-center text-base font-bold text-white md:text-lg">
            <span>Didn&apos;t find your profile on TractorGyan?</span>
          </div>
          <button
            onClick={() => {
              scrollToSection('dealer-registration');
            }}
            className="mx-auto flex max-w-[220px] items-center gap-1.5 rounded-md bg-white px-3 py-2"
          >
            <Image
              src={
                'https://images.tractorgyan.com/uploads/117681/6798ae3fd39f9-tg-authority-icon.webp'
              }
              height={100}
              width={100}
              alt="register as a dealer icon"
              title="register as a dealer icon"
              className="h-auto max-w-[30px]"
            />
            <span className="text-base font-semibold text-primary">Register as a Dealer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
