import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import Link from 'next/link';
import Image from 'next/image';
import './TyreDealersByState.css';
import TyreDealersByStateToggle from './TyreDealersByStateToggle';

const TyreDealersByStates = ({
  translation,
  dealerStates,
  prefLang,
  heading,
  title,
  buttonText,
  isMobile,
  showHeading = true, // Used at '/tractors-subsidy-in-india'
  toggleMode = true
}) => {
  // Use title prop if provided, otherwise fallback to heading, then to default translation
  const displayHeading = title || heading || translation.headings.TyreDealersByStates;

  return (
    <section className={`container ${!showHeading && isMobile ? 'pt-0' : ''} `}>
      <div id="tyre-states-grid" className={toggleMode ? 'expanded' : ''}>
        {!isMobile ? (
          <MainHeadings text={displayHeading} />
        ) :
          showHeading ? (
            <MainHeadings text={displayHeading} />
          ) : null
        }
        <div
          className={`tyre-states-grid mb-8 grid grid-cols-9 gap-4 md:grid-cols-8 md:gap-8 xl:grid-cols-9`}
        >
          {dealerStates.map((item, index) => (
            <Link
              key={index}
              href={(prefLang == 'hi' ? '/hi' : '') + item.page_url}
              title={item.state_name + ' image'}
              className="col-span-3 md:col-span-2 xl:col-span-1"
            >
              <div className={"mb-2 flex h-[65px] items-center justify-center rounded-xl border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter md:mb-4 md:h-[99px] overflow-hidden" + (toggleMode ? ' expanded' : '')}>
                <Image
                  src={item.images}
                  height={300}
                  width={300}
                  alt={item.state_name + 'image'}
                  title={item.state_name + ' image'}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mb-2 text-center text-xs font-semibold md:text-base">
                {item.state_name}
              </p>
            </Link>
          ))}
        </div>
        {toggleMode ? <TyreDealersByStateToggle translation={translation} buttonText={buttonText} />
          : null}      </div>
    </section>
  );
};

export default TyreDealersByStates;
