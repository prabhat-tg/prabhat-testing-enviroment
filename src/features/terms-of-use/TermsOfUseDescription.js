import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import termsData from '@/src/data/terms-of-use/termsOfUseContent.json';

const TermsOfUseDescription = ({ translation }) => {
  function convertTextToLinks(text) {
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    return parts.map((part, i) => {
      if (part.match(/https?:\/\/[^\s]+/)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 text-black underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  }

  return (
    <>
      <TittleAndCrumbs
        title={translation?.breadcrubm?.termsOfUse}
        breadcrumbs={[
          {
            label: translation?.breadcrubm?.home,
            href: '/',
            title: translation?.breadcrubm?.home,
          },
          {
            label: translation?.breadcrubm?.termsOfUse,
            title: translation?.breadcrubm?.termsOfUse,
            isCurrent: true,
          },
        ]}
      />

      {termsData.map((section, index) => (
        <div key={index}>
          {section.title && (
            <h2 className="mb-2 mt-4 w-fit pb-1 text-[18px] font-bold leading-[31px] text-secondary">
              {`${index}.) ${section.title}`}
            </h2>
          )}

          {section.content.map((item, idx) => {
            if (item.type === 'paragraph') {
              return (
                <p
                  key={idx}
                  className="mb-2 text-justify text-[16px] leading-[1.6] text-gray-description"
                >
                  {item?.bold && <span className="font-bold underline">{item.bold}</span>}{' '}
                  {Array.isArray(item.text)
                    ? item.text.map((line, i) => (
                        <span key={i}>
                          {convertTextToLinks(line)}
                          <br />
                        </span>
                      ))
                    : convertTextToLinks(item.text)}
                  {item?.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="hover:text-blue-800 text-black underline"
                    >
                      {item.email}
                    </a>
                  )}
                </p>
              );
            }

            if (item.type === 'ul') {
              return (
                <ul key={idx} className="mb-4 ms-4 list-disc">
                  {item.items.map((li, liIdx) => (
                    <li
                      key={liIdx}
                      className="mb-1 text-justify text-[16px] leading-[1.6] text-gray-description"
                    >
                      {typeof li === 'string' ? li : li.text}
                      {typeof li === 'object' && li.sublist && renderNestedList(li.sublist)}
                    </li>
                  ))}
                </ul>
              );
            }

            if (item.type === 'ol') {
              return (
                <ol key={idx} className="mb-4 ms-4 list-decimal">
                  {item.items.map((li, liIdx) => (
                    <li key={liIdx} className="mb-2 text-justify text-gray-description">
                      {li.text}
                      {li.sublist && (
                        <ul className="ms-5 mt-1 list-disc">
                          {li.sublist.map((subItem, subIdx) => (
                            <li key={subIdx} className="mt-1 text-justify text-sm">
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              );
            }

            return null;
          })}
        </div>
      ))}

      {/* <div className="w-auto mt-24 bg-gray-50">
                <div className="bg-[#F7FAF7] rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-black mb-2">
                        Disclaimer
                    </h2>

                    <div className="text-gray-description leading-relaxed">
                        <p>
                            The information provided by TractorGyan on (the "Site") is for general informational purposes only. All the information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, or completeness of any information on the Site. Third party logos and marks are registered trademarks of their respective owners. All rights reserved.
                        </p>

                        <p className="text-gray-description pt-1">
                            * Prices on our website are based on our internal research and may vary across locations.
                        </p>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default TermsOfUseDescription;
