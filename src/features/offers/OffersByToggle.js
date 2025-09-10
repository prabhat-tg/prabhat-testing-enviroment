'use client';

import { useState } from 'react';

export default function OffersByToggle() {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="bg-gray-50 h-fit">
      <div className="shadow-sm flex rounded-lg bg-section-gray p-0">
        <button
          onClick={() => setActiveTab('company')}
          className={`md:text-md w-full rounded-md px-1 py-1 text-xs font-medium transition-all duration-200 md:whitespace-nowrap md:px-8 md:py-2 ${
            activeTab === 'company'
              ? 'shadow-sm border border-primary bg-green-mid text-secondary'
              : 'border border-transparent text-gray-description'
          }`}
        >
          Offers by Company
        </button>
        <button
          onClick={() => setActiveTab('dealers')}
          className={`md:text-md w-full rounded-md px-1 py-1 text-xs font-medium transition-all duration-200 md:whitespace-nowrap md:px-8 md:py-2 ${
            activeTab === 'dealers'
              ? 'shadow-sm border border-primary bg-green-mid text-secondary'
              : 'border border-transparent text-gray-description'
          }`}
        >
          Offers by Dealers
        </button>
      </div>
    </div>
  );
}
