import Image from 'next/image';
import React from 'react';

const ConnectUsSection = ({ isMobile, bgColor }) => {
  const contactData = [
    {
      title: 'Talk to Us',
      image: 'https://images.tractorgyan.com/uploads/120043/687e01661dca2-contact-mailandcall.webp',
      details: [
        '+91 9425700567',
        'ankur@tractorgyan.com',
        'Monday to Saturday | 10:00 AM - 7:00 PM',
      ],
    },
    {
      title: 'Corporate Address',
      image:
        'https://images.tractorgyan.com/uploads/120044/687e01923841d-contact-corporate-office.webp',
      details: [
        'Rapsa Technologies Pvt. Ltd. (TractorGyan),',
        'A-162, Kanak Avenue, in front of Choitram School (North Campus),',
        'MR-11 Road, Indore 453771',
      ],
    },
    {
      title: 'Registered Address',
      image:
        'https://images.tractorgyan.com/uploads/120044/687e01923841d-contact-corporate-office.webp',
      details: ['150-B, Saraswaati Nagar, Govindpuri', 'Gwalior, 474011'],
    },
  ];

  return (
    <div className={`grid h-full grid-cols-1 ${isMobile ? 'gap-6' : 'ms-8 gap-6'}`}>
      {contactData.map((item, index) => (
        <div
          key={index}
          className={`${bgColor ? bgColor : 'bg-white'} shadow flex flex-col rounded-xl p-4 text-start max-md:items-start md:flex-row md:items-center`}
        >
          <div className="flex flex-col gap-2 md:flex-row">
            {/* Image */}
            <div className="h-[72px] w-[72px]">
              <Image
                src={item.image}
                alt={item.title}
                width={72}
                height={72}
                title={item.title}
                className="h-full w-full object-contain"
              />
            </div>
            {/* Title */}
            <div>
              <h3 className="mb-2 text-2xl font-bold text-black">{item.title}</h3>
              {/* Details */}
              {item.details.map((line, i) => (
                <p key={i} className="mb-2 text-xs font-medium text-black">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectUsSection;
