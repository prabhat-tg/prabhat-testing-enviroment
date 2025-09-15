import Link from 'next/link';
import Image from 'next/image';
import style from './loanTabs.module.css';

const LoanTabs = ({ activeTab, translation }) => {
  const tabs = [
    {
      id: 'new-tractor-loan',
      href: '/tractor-loan',
      icon: 'https://images.tractorgyan.com/uploads/109219/651ea6d7d45f1-new_tractor_loan_icon.webp',
      title: translation.loan.newTractorLoan,
    },
    {
      id: 'second-hand-tractor-loan',
      href: '/second-hand-tractor-loan',
      icon: 'https://images.tractorgyan.com/uploads/109220/651ea7305ef49-secon_hand_tractor_icon.webp',
      title: translation.loan.secondHandTractorLoan,
    },
    {
      id: 'loan-against-tractor',
      href: '/loan-against-tractor',
      icon: 'https://images.tractorgyan.com/uploads/109221/651ea8e2ac1b9-loan_against_tractor_icon.webp',
      title: translation.loan.loanAgainstTractor,
    },
  ];

  return (
    <div className="relative grid h-full max-h-[160px] w-full grid-cols-3 bg-primary px-2 pt-2.5 md:min-h-[118px] lg:px-7 xl:max-h-[129px]">
      {tabs.map((tab, index) => (
        <div key={tab.id} className="col-span-1 h-full">
          <Link
            href={tab.href}
            aria-label={tab.title}
            className={`flex h-full flex-col rounded-t-lg p-1.5 max-sm:items-center md:flex-row md:p-3 ${
              activeTab === tab.id ? `${style.selected_tabs}` : 'text-white'
            }`}
          >
            <div className="max-w-[50px] md:max-w-[150px]">
              <Image
                src={tab.icon}
                height={300}
                width={300}
                alt={tab.title}
                title={tab.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                decoding="async"
                sizes="(max-width: 768px) 50px, (max-width: 1200px) 100px, 150px"
                className="h-auto w-full object-contain"
              />
            </div>
            <div
              className={`flex flex-col justify-between max-sm:min-h-[70px] max-sm:items-center ${
                activeTab === tab.id ? 'text-black' : 'text-white'
              }`}
            >
              <span className="text-xs font-semibold max-sm:text-center lg:text-base">
                {tab.title}
              </span>
              <span
                className={`max-w-[80px] rounded-full border-[1px] px-2.5 py-1 text-[10px] font-semibold max-sm:mb-4 lg:max-w-[105px] lg:text-sm ${
                  activeTab === tab.id
                    ? 'border-gray-light text-gray-dark'
                    : 'border-white text-white'
                }`}
              >
                {translation.buttons.ApplyHere}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LoanTabs;
