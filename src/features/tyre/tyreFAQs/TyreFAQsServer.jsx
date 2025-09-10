import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import React from "react";

const TyreFAQsServer = ({
  faqs,
  openIndexes = [],
  headingTitle,
  bgColor = 'bg-section-gray',
  onToggle = () => {},
}) => {
  return (
    <section className={bgColor}>
      <div className="container">
        <MainHeadings text={headingTitle} />
        <div
          className="grid grid-cols-12 gap-4 md:gap-x-6"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {faqs?.map((faq, index) => {
            const isActive = openIndexes.includes(index);
            return (
              <div
                className="col-span-12 md:col-span-6"
                key={index}
                itemProp="mainEntity"
                itemScope
                itemType="https://schema.org/Question"
              >
                <div className="h-full w-full rounded-2xl bg-white p-4 shadow-bottom lg:p-6">
                  <button
                    onClick={() => onToggle(index)}
                    className="flex w-full items-center justify-between"
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${index}`}
                    type="button"
                  >
                    <h3
                      className="text-start text-base font-semibold leading-5 text-gray-dark md:text-lg"
                      itemProp="name"
                    >
                      {faq.question}
                    </h3>
                    <span
                      className={`${
                        isActive ? "bg-gray-aluminium" : "bg-primary"
                      } rounded-lg p-2 text-white transition-transform duration-300`}
                    >
                      {isActive ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isActive ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <h4
                      className="mt-4 text-start text-sm text-gray-main"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <span
                        className="mt-4 text-start text-sm text-gray-main"
                        itemProp="text"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      ></span>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TyreFAQsServer;
