import ReadMoreToggle from '@/src/components/shared/read-more/ReadMoreToggle';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import React from 'react';

const AboutDealerSection = ({ translation }) => {
  const aboutContent = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  ];

  return (
    <section className="py-8">
      <div className="container">
        <div className="grid  gap-8 sm:gap-10 lg:gap-12">
          {/* Left Content Block */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <TittleAndCrumbs title="About Shree Ji Motors" />

            <div id="read-more" className="space-y-4 text-gray-description">
              {aboutContent.map((text, index) => (
                <p key={index} className="read-more text-[15px] sm:text-[16px] leading-[150%] font-inter text-[#595959]">
                  {text}
                </p>
              ))}
            </div>

            {/* Read More Toggle */}
            <div className="mt-4 flex items-start">
              <ReadMoreToggle
                selector="#read-more .read-more"
                collapsedLabel={translation.buttons.readMore}
                expandedLabel={translation.buttons.readLess}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDealerSection;
