import Image from 'next/image';
import React from 'react';

const WhyJoinUsSection = () => {
  const statsData = [
    {
      id: 1,
      img: 'https://images.tractorgyan.com/uploads/120054/687e20a04d00f-search-view.webp',
      alt: 'google search',
      title: 'Google Search',
      value: '269',
      suffix: ' Million+',
      heading: 'Yearly Impressions on Google in 2024 ',
      // desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      img: 'https://images.tractorgyan.com/uploads/120055/687e213195fb7-page-view.webp',
      alt: 'page view',
      title: 'Page View',
      value: '27.8',
      suffix: ' Million+',
      heading: 'Yearly Page Views in 2024 ',
      // desc: "In the year 2024, TractorGyan website generated 3.2 crore page views.",
    },
    {
      id: 3,
      img: 'https://images.tractorgyan.com/uploads/120056/687e2161dd14e-Leads.webp',
      alt: 'leads generation',
      title: 'Leads Generation',
      value: '2,35,170',
      suffix: '+',
      heading: 'Yearly Leads Generated in 2024 ',
      // desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="bg-green-lighter">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-black md:text-4xl">Why Join Us?</h2>
          <p className="text-base font-medium text-black">
            Tractor<span className="text-primary">Gyan</span> is leading the industry with some
            great numbers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:mb-4 md:grid-cols-3">
          {statsData.map(item => (
            <div
              key={item.id}
              className="shadow-md rounded-xl bg-white px-4 py-3 shadow-searchUsed"
            >
              <div className="mb-2">
                <Image
                  src={item.img}
                  alt={item.alt}
                  title={item.title}
                  width={44}
                  height={44}
                  className="h-full max-h-10 w-auto md:max-h-[44px]"
                />
              </div>
              <p className="mb-1 text-2xl font-bold">
                {item.value}
                <span className="text-primary">{item.suffix}</span>
              </p>
              <p className="font-semibold text-black">{item.heading}</p>
              {/* <p className="mt-2 font-medium text-gray-description text-sm">{item.desc}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUsSection;
