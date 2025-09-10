import Image from "next/image";
import React from "react";

const LoanEligibilityAndDocuments = ({ data, currentLang }) => {
  const translatedData = data?.[currentLang] || [];

  return (
    <section className="bg-section-gray">
      <div className="container">
        <div className="grid grid-cols-5 gap-6">
          {translatedData.map((section, index) => (
            <div
              key={index}
              className={`col-span-5 ${
                index === 0 ? "lg:col-span-2" : "lg:col-span-3"
              } rounded-2xl border-[1px] border-gray-light p-4`}
            >
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center gap-2.5">
                  <Image
                    src="https://images.tractorgyan.com/uploads/119318/683857c813933-shield-icon.webp"
                    height={30}
                    width={30}
                    alt="Eligibility Icon"
                    title="Eligibility Icon"
                    className="h-6 w-6"
                  />
                  <h2 className="text-lg font-bold text-black md:text-2xl">
                    {section.section}
                  </h2>
                </div>
                <span className="text-sm font-normal text-gray-dark md:text-base">
                  {section.description}
                </span>
              </div>

              <div
                className={`grid grid-cols-6 ${
                  index === 0 ? "md:grid-cols-3" : "md:grid-cols-5"
                } gap-2 md:gap-2`}
              >
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="col-span-2 flex h-full min-h-[100px] flex-col items-center rounded-xl bg-green-lighter p-2.5 text-center shadow-bottom md:col-span-1 md:min-h-[140px] md:p-2"
                  >
                    <span className="text-sm font-semibold text-black md:text-lg">
                      {item.title}
                    </span>
                    <span className="text-xs font-normal text-gray-dark md:text-sm">
                      {item.subtext}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanEligibilityAndDocuments;
