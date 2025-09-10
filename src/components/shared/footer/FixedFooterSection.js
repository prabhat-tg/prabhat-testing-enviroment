'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    href: '/',
    title: 'tractors',
    aria: 'learn more aboute tractors in india',
    label: 'Tractor',
    normalImg:
      'https://images.tractorgyan.com/uploads/119925/1752040270Mobile-Menu-Tractor.webp',
    activeImg:
      'https://images.tractorgyan.com/uploads/119924/1752040257Mobile-Menu-Tractor-Active.webp',
    match: pathname => {
      // Home page
      if (pathname === '/' || pathname === '/hi') return true;

      // All tractor-related routes from (tractors) folder
      const tractorRoutes = [
        '/compare-tractors',
        '/latest-tractors-in-india',
        '/mini-tractors-in-india',
        '/2wd-tractors-in-india',
        '/4wd-tractors-in-india',
        '/ac-tractors-in-india',
        '/cng-tractors-in-india',
        '/electric-tractors-in-india',
        '/tractor-series-in-india',
        '/second-hand-tractor',
        '/used-tractors',
      ];

      // Check for exact matches or starts with for tractor routes
      const matchesTractorRoute = tractorRoutes.some(
        route =>
          pathname === route ||
          pathname === `/hi${route}` ||
          pathname.startsWith(`${route}/`) ||
          pathname.startsWith(`/hi${route}/`)
      );

      if (matchesTractorRoute) return true;

      // Tractor brand/model pages (dynamic routes)
      if (pathname.startsWith('/tractor/') || pathname.startsWith('/hi/tractor/'))
        return true;

      // HP group routes
      if (pathname.includes('-hp-tractors') || pathname.includes('-hp-tractor'))
        return true;

      // On-road price routes
      if (
        pathname.includes('tractor-on-road-price') ||
        pathname.includes('tractors-on-road-price')
      )
        return true;

      // Dealer routes from (tractor-dealers) folder
      if (
        pathname.startsWith('/tractor-dealers') ||
        pathname.startsWith('/hi/tractor-dealers')
      )
        return true;

      // Compare routes
      if (pathname.includes('/compare/') && pathname.includes('tractor')) return true;

      return false;
    },
  },
  {
    href: '/tractor-implements-in-india',
    title: 'implements',
    aria: 'learn more aboute implements in india',
    label: 'Implements',
    normalImg:
      'https://images.tractorgyan.com/uploads/119923/1752040238Mobile-Menu-Implements.webp',
    activeImg:
      'https://images.tractorgyan.com/uploads/119922/1752040189Mobile-Menu-Implements-Active.webp',
    match: pathname =>
      pathname.startsWith('/tractor-implements-in-india'),
  },
  {
    href: '/tractor-tyre-in-india',
    title: 'tyres',
    aria: 'learn more aboute tyres in india',
    label: 'Tyres',
    normalImg:
      'https://images.tractorgyan.com/uploads/119929/1752040328Mobile-Menu-Tyres.webp',
    activeImg:
      'https://images.tractorgyan.com/uploads/119928/1752040320Mobile-Menu-Tyres-Active.webp',
    match: pathname => pathname.includes('tyre'),
  },
  {
    href: '/tractor-loan',
    title: 'Tractor-Finance',
    aria: 'learn more aboute Tractor loan in india',
    label: 'Tractor Finance',
    normalImg:
      'https://images.tractorgyan.com/uploads/119927/1752040301Mobile-Menu-TractorFinance.webp',
    activeImg:
      'https://images.tractorgyan.com/uploads/119926/1752040292Mobile-Menu-TractorFinance-Active.webp',
    match: pathname => pathname.startsWith('/tractor-loan'),
  },
];

const FixedFooterSection = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-10 flex h-[68px] w-full justify-between border-t-[1px] border-gray-light bg-white py-2 shadow-main md:hidden">
      <div className="categories flex h-full w-full flex-1 justify-around">
        {menuItems.map((item, idx) => {
          const isActive = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.title}
              aria-label={item.aria}
              className={`flex flex-col items-center justify-evenly ${isActive ? 'rounded-xl bg-primary px-2 pb-1' : ''
                }`}
            >
              <Image
                src={isActive ? item.activeImg : item.normalImg}
                height={100}
                width={100}
                title={`${item.label}-icon`}
                alt={`${item.label}-icon`}
                loading="lazy"
                className={`w-auto object-cover ${isActive ? 'h-[26px]' : 'h-[28px]'
                  }`}
              />
              <span
                className={`text-center text-xs font-semibold ${isActive ? 'text-white' : 'text-[#616161]'
                  }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FixedFooterSection;
