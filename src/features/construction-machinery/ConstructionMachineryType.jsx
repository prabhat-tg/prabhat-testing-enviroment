import { getSelectedLanguage } from '@/src/services/locale';
import React from 'react';
import ConstructionMachineryCard from './ConstructionMachineryCard';
import MainHeadings from '../tyreComponents/commonComponents/MainHeadings';

const ConstructionMachineryType = async ({ translation, parentHeading }) => {
    const currentLang = await getSelectedLanguage();

    const mahindraData = [
        {
            id: 1,
            name: translation.footer.mahindra,
            image: "https://images.tractorgyan.com/uploads/110907/658bf888bc083-MAHINDRA-09-(1)_small.webp",
            link: "/tractor/Mahindra",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
        {
            id: 2,
            name: translation.footer.swaraj,
            image: "https://images.tractorgyan.com/uploads/109723/653b8500ea8ab-SWARAJ-16_small.webp",
            link: "/tractor/Swaraj",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
        {
            id: 2,
            name: translation.headerNavbar.trakstar,
            image: "https://images.tractorgyan.com/uploads/109722/653b84d1e6d85-TRAKSTAR-11_small.webp",
            link: "/tractor/Trakstar",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
    ];

    const escortsData = [
        {
            id: 2,
            name: translation.headerNavbar.powertrac,
            image: "https://images.tractorgyan.com/uploads/109729/653b87c60d661-POWERTRAC-10_small.webp",
            link: "/tractor/Powertrac",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
        {
            id: 1,
            name: translation.headerNavbar.farmtrac,
            image: "https://images.tractorgyan.com/uploads/109745/653b8e4b99291-FARMTRAC-01_small.webp",
            link: "/tractor/Farmtrac",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
    ];

    const tafeData = [
        {
            id: 2,
            name: translation.headerNavbar.masseyFerguson,
            image: "https://images.tractorgyan.com/uploads/109731/653b884aa08ce-MASSEY-09_small.webp",
            link: "/tractor/Massey-ferguson",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
        {
            id: 1,
            name: translation.headerNavbar.eicher,
            image: "https://images.tractorgyan.com/uploads/109747/653b8ebc24c67-eicher-12_small.webp",
            link: "/tractor/Eicher",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
    ];

    const itlData = [
        {
            id: 2,
            name: translation.headerNavbar.sonalika,
            image: "https://images.tractorgyan.com/uploads/115326/66ec21461e7cf-new-sonalika-logo_small.webp",
            link: "/tractor/Sonalika",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
        {
            id: 1,
            name: translation.footer.solis,
            image: "https://images.tractorgyan.com/uploads/109726/653b85deec369-SOLIS-05_small.webp",
            link: "/tractor/Solis",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
    ];

    const constructionData = [
        {
            id: 1,
            name: "Backhoe Loader",
            image: "https://images.tractorgyan.com/uploads/120641/68a3285ea1a50-file-(16).webp",
            link: "/construction-machinery/backhoe-loader",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
        {
            id: 2,
            name: "Front Loader",
            image: "https://images.tractorgyan.com/uploads/120642/68a328794fb15-file-(15).webp",
            link: "/construction-machinery/front-loader",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
    ];

    return (
        <section>
            <div className="container">
                {parentHeading ? (<MainHeadings
                    text={`${translation.headings.Popular} ${parentHeading} ${translation.headings.and} ${parentHeading} ${translation.headings.brands}`}
                />) : (<MainHeadings
                    text={"Construction Machinery By Type"}
                />)}

                <div className="flex flex-wrap justify-start sm:justify-center xl:justify-start items-center gap-3 md:gap-4 2xl:gap-6">
                    {!parentHeading && constructionData.map((item) => (
                        <ConstructionMachineryCard
                            key={item.id}
                            label={item.name}   // ✅ changed from item.label → item.name
                            text={translation?.tractorgyanOfferings?.[item.name] || item.name}
                            imgUrl={item.image} // ✅ changed from item.imgUrl → item.image
                            cardBg={item.cardBg} // ✅ changed from item.imgUrl → item.image
                            link={`${currentLang === "hi" ? "/hi" : ""}${item.link}`}
                        />
                    ))}

                    {parentHeading === "Mahindra" && mahindraData.map((item) => (
                        <ConstructionMachineryCard
                            key={item.id}
                            label={item.name}   // ✅ changed from item.label → item.name
                            text={translation?.tractorgyanOfferings?.[item.name] || item.name}
                            imgUrl={item.image} // ✅ changed from item.imgUrl → item.image
                            cardBg={item.cardBg} // ✅ changed from item.imgUrl → item.image
                            link={`${currentLang === "hi" ? "/hi" : ""}${item.link}`}
                        />
                    ))}

                    {parentHeading === "Escorts" && escortsData.map((item) => (
                        <ConstructionMachineryCard
                            key={item.id}
                            label={item.name}   // ✅ changed from item.label → item.name
                            text={translation?.tractorgyanOfferings?.[item.name] || item.name}
                            imgUrl={item.image} // ✅ changed from item.imgUrl → item.image
                            cardBg={item.cardBg} // ✅ changed from item.imgUrl → item.image
                            link={`${currentLang === "hi" ? "/hi" : ""}${item.link}`}
                        />
                    ))}

                    {parentHeading === "Tafe" && tafeData.map((item) => (
                        <ConstructionMachineryCard
                            key={item.id}
                            label={item.name}   // ✅ changed from item.label → item.name
                            text={translation?.tractorgyanOfferings?.[item.name] || item.name}
                            imgUrl={item.image} // ✅ changed from item.imgUrl → item.image
                            cardBg={item.cardBg} // ✅ changed from item.imgUrl → item.image
                            link={`${currentLang === "hi" ? "/hi" : ""}${item.link}`}
                        />
                    ))}

                    {parentHeading === "itl" && itlData.map((item) => (
                        <ConstructionMachineryCard
                            key={item.id}
                            label={item.name}   // ✅ changed from item.label → item.name
                            text={translation?.tractorgyanOfferings?.[item.name] || item.name}
                            imgUrl={item.image} // ✅ changed from item.imgUrl → item.image
                            cardBg={item.cardBg} // ✅ changed from item.imgUrl → item.image
                            link={`${currentLang === "hi" ? "/hi" : ""}${item.link}`}
                        />
                    ))}

                </div>
            </div>
        </section>
    );
};

export default ConstructionMachineryType;
