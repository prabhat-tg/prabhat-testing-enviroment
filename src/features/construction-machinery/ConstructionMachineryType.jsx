import { getSelectedLanguage } from '@/src/services/locale';
import React from 'react';
import ConstructionMachineryCard from './ConstructionMachineryCard';
import MainHeadings from '../tyreComponents/commonComponents/MainHeadings';

const ConstructionMachineryType = async ({ translation }) => {
    const currentLang = await getSelectedLanguage();

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
                <MainHeadings
                    text={"Construction Machinery By Type"}
                />


                <div className="flex flex-wrap justify-start sm:justify-center xl:justify-start items-center gap-3 md:gap-4 2xl:gap-6">
                    {constructionData.map((item) => (
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
