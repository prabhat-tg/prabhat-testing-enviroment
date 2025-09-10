import Image from "next/image";
import React from "react";

const ConnectUsSection = ({ isMobile }) => {
  const contactData = [
    {
      title: "Talk to Us",
      image: "https://images.tractorgyan.com/uploads/120043/687e01661dca2-contact-mailandcall.webp",
      details: [
        "+91 9425700567",
        "Ankur@tractorgyan.com",
        "10:00 AM - 7:00 PM | Monday to Saturday",
      ],
    },
    {
      title: "Corporate Address",
      image: "https://images.tractorgyan.com/uploads/120044/687e01923841d-contact-corporate-office.webp",
      details: [
        "Rapsa Technologies Pvt. Ltd. (TractorGyan),",
        "A-162, Kanak Avenue, in front of Choitram School (North Campus),",
        "MR-11 Road, Indore 453771",
      ],
    },
    {
      title: "Registered Address",
      image: "https://images.tractorgyan.com/uploads/120044/687e01923841d-contact-corporate-office.webp",
      details: [
        "150-B, Saraswaati Nagar, Govindpuri",
        "Gwalior, 474011",
      ],
    },
  ];

  return (
    <section className="py-8">
      <div className="container ">
        {/* 3-column grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 ${isMobile ? "gap-6 mx-2" : "gap-6 mx-8 md:mx-10"
            }`}
        >
          {contactData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-start bg-blue-lightest p-4 rounded-xl shadow"
            >
              {/* Image */}
              <div className="mb-4 w-[72px] h-[72px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={72}
                  height={72}
                  title={item.title}
                  className="object-contain w-full h-full"
                />
              </div>
              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 text-black">
                {item.title}
              </h3>
              {/* Details */}
              {item.details.map((line, i) => (
                <p
                  key={i}
                  className="text-xs font-medium mb-2 text-black"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConnectUsSection
  ;
