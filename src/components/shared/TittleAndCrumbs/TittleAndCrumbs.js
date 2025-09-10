import Link from 'next/link';
import BackButton from './BackButton';
import Tooltip from '@/src/features/tyreComponents/commonComponents/Tooltip';

export default function TittleAndCrumbs({
  isMobile,
  hideTitle = false,
  title,
  breadcrumbs = [],
  showBack = false,
  tooltipContent = null,
  customClass
}) {

  return (
    <div className="w-full text-xs text-gray-dark sm:w-auto sm:text-sm md:text-base">
      <div className="mb-2 flex flex-col-reverse items-start justify-start gap-2 md:mb-6 md:flex-row md:items-start md:justify-between md:gap-8">
        {/* Left side - Either title or back button */}
        <div className={tooltipContent ? "w-full" : "md:w-[60%]"}>
          {/* Show back button if showBack is true */}
          {showBack ? (
            <BackButton />
          ) : null}
          {
            /* Otherwise show title if not hidden and not empty */
            !hideTitle &&
            title !== '' && (
              <h1 className={`${customClass ? customClass : ''} border-b-3 mg:leading-[32px] mb-2 inline-block w-fit border-secondary pb-1 text-[18px] font-bold leading-[29px] text-black sm:text-[16px] md:text-[26px] lg:mb-0`}>
                {title}
              </h1>
            )
          }
          {tooltipContent ? <Tooltip content={tooltipContent}>
            <h1 className="mb-4 cursor-pointer text-lg font-bold text-black md:text-2xl">
              {title}
            </h1>
          </Tooltip> : null}
        </div>

        {/* Right side - Breadcrumbs */}
        <div className="relative w-full text-xs text-gray-dark sm:w-auto sm:text-sm md:max-w-[40%] md:text-base lg:w-fit lg:px-8">
          <div className="breadcrumbsWrapper">
            <ul
              className="breadcrumbs scrollbar-thin scrollbar-track-gray-200 scroll scrollbar-thumb-gray-400 lg:hover:scrollbar-thumb-gray-500 no-scrollbar flex overflow-auto whitespace-nowrap rounded-md"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              {breadcrumbs?.map((item, index) => (
                <li
                  key={index}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className={item.isCurrent ? 'font-semibold' : ''}
                >
                  {item.href ? (
                    <Link href={item.href} title={item.title} itemProp="item">
                      <span itemProp="name">{item.label}</span>
                    </Link>
                  ) : (
                    <span itemProp="name" title={item.title}>
                      {item.label}
                    </span>
                  )}
                  <meta itemProp="position" content={index + 1} />
                  {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
