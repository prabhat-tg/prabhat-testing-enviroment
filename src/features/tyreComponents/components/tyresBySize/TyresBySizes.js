// "use client";
import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";
import FrontTyreCard from "@/src/features/tyreComponents/components/tyresBySize/FrontTyreCard";
import RearTyreCard from "@/src/features/tyreComponents/components/tyresBySize/RearTyreCard";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import { tg_getTittleFromNestedKey } from "@/src/utils";
// import { useTranslation } from "react-i18next";
// import '../../i18n'

const TyresBySizes = ({ bgColor, translation, langPrefix }) => {
  const getURLPrefixByLang = (lang) => {
    switch (lang) {
      case "en":
        return "";
      case "hi":
        return "/hi";
      default:
        return "";
    }
  };

  const frontTyres = [
    { size: "6.00x16", url: "/tyre/front/6-x-16-size/456" },
    { size: "6.50x16", url: "/tyre/front/6-50-x-16-size/443" },
    { size: "7.50x16", url: "/tyre/front/7-50-x-16-size/477" },
    { size: "6.50x20", url: "/tyre/front/6-50-x-20-size/192" },
  ];

  const rearTyres = [
    { size: "12.4x28", url: "/tyre/rear/12-4-x-28-size/400" },
    { size: "13.6x28", url: "/tyre/rear/13-6-x-28-size/209" },
    { size: "14.9x28", url: "/tyre/rear/14-9-x-28-size/341" },
    { size: "12.4x24", url: "/tyre/rear/12-4-x-24-size/208" },
    { size: "16.9x28", url: "/tyre/rear/16-9-x-28-size/211" },
  ];

  return (
    <section className={`${bgColor ? bgColor : ""}`}>
      <div className="container">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div className="rounded-2xl bg-white p-6 shadow-card md:w-[45%]">
            <MainHeadings text={translation.headings.tractorFrontTyreBySize} />
            <div className="mb-8 flex flex-wrap gap-3 md:gap-4 lg:flex-nowrap">
              {frontTyres.map((tyre) => (
                <FrontTyreCard
                  key={tyre.size}
                  url={`${getURLPrefixByLang(langPrefix)}${tyre.url}`}
                  data={tyre.size}
                />
              ))}
            </div>
            <MainButton
              text={tg_getTittleFromNestedKey(
                translation,
                "buttons.viewAllFrontTyres",
              )}
              linkUrl={`${getURLPrefixByLang(langPrefix)}/tyre/front`}
            />
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-card md:w-[55%]">
            <MainHeadings text={translation.headings.tractorRearTyreBySize} />
            <div className="mb-8 flex flex-wrap gap-3 md:gap-4 lg:flex-nowrap">
              {rearTyres.map((tyre) => (
                <RearTyreCard
                  key={tyre.size}
                  url={`${getURLPrefixByLang(langPrefix)}${tyre.url}`}
                  data={tyre.size}
                />
              ))}
            </div>
            <MainButton
              text={tg_getTittleFromNestedKey(
                translation,
                "buttons.viewAllRearTyres",
              )}
              linkUrl={`${getURLPrefixByLang(langPrefix)}/tyre/rear`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TyresBySizes;
