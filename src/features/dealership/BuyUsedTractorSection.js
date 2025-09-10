import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs'
import React from 'react'
import Image from 'next/image';
import TG_Button from '@/src/components/ui/buttons/MainButtons';


const tractors = [
    {
        id: 1,
        name: "Massey Ferguson 6026 MaxPro Wide Track tractor",
        image: "https://images.tractorgyan.com/uploads/120269/68876242d4937-buy-used-tractor.webp",
        hp: "47",
        year: "2020",
        cylinders: "3",
        weight: "2000kg",
        price: "₹ 2.5 Lacs",
    },
    {
        id: 2,
        name: "Massey Ferguson 6026 MaxPro Wide Track tractor",
        image: "https://images.tractorgyan.com/uploads/120269/68876242d4937-buy-used-tractor.webp",
        hp: "52",
        year: "2021",
        cylinders: "3",
        weight: "2100kg",
        price: "₹ 3.5 Lacs",
    },
    {
        id: 3,
        name: "Massey Ferguson 6026 MaxPro Wide Track tractor",
        image: "https://images.tractorgyan.com/uploads/120269/68876242d4937-buy-used-tractor.webp",
        hp: "48",
        year: "2022",
        cylinders: "3",
        weight: "2050kg",
        price: "₹ 6.9 Lacs",
    },
    {
        id: 4,
        name: "Massey Ferguson 6026 MaxPro Wide Track tractor",
        image: "https://images.tractorgyan.com/uploads/120269/68876242d4937-buy-used-tractor.webp",
        hp: "50",
        cylinders: "3",
        year: "2023",
        weight: "2200kg",
        price: "₹ 7.9 Lacs",
    },
];

const TractorCard = (tractor) => (
    <div className="bg-white rounded-2xl boxShadow-main shadow-buyUsedCard overflow-hidden hover:shadow-xl transition-shadow  flex flex-col h-full relative">
        <div className="absolute top-5 left-0 w-[200px]">
            <div className="absolute -top-1 -left-12 w-44 h-11 rotate-[-45deg] bg-green-dark-gradient text-white text-center text-sm font-bold py-3 shadow-forSell z-10">
                For Sell
            </div>
        </div>

        <div className="flex flex-col justify-between h-full mb-4">
            <div className="relative w-full h-52">
                <Image
                    src={tractor.image}
                    alt={tractor.name}
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="mb-3 line-clamp-2 text-secondary text-lg font-roboto font-bold px-3 pt-2 ">
                {tractor.name}
            </h3>
            <div className="px-3 ">
                {/* Location */}
                <div className="flex items-center gap-1">
                    <Image
                        src="https://images.tractorgyan.com/uploads/120270/688762588d9aa-blue-location-icon.webp"
                        height={16}
                        width={16}
                        alt="location-icon"
                        title="location-icon"
                        className="w-4"
                    />
                    <span className="text-black text-base font-medium">Faridabad, Haryana</span>
                </div>
            </div>


            <div className="w-full py-2 flex justify-between text-center text-[#182C3D] mx-auto">
                <div className="w-[30%] flex flex-col items-center gap-[2px] px-4">
                    <div className="text-sm text-gray-grayMuted font-normal">HP</div>
                    <div className="text-lg font-semibold text-black">{tractor.hp}</div>
                </div>
                <div className="w-[30%] flex flex-col items-center gap-[2px] px-4 border-x border-[#46AA48]">
                    <div className="text-sm text-gray-grayMuted font-normal">Year</div>
                    <div className="text-lg font-semibold text-black">{tractor.year}</div>
                </div>
                <div className="w-[40%] flex flex-col items-center gap-[2px]">
                    <div className="text-sm text-gray-grayMuted font-normal">Price</div>
                    <div className="text-lg font-semibold text-black">{tractor.price}</div>
                </div>
            </div>
            <div className="flex justify-end ">

                <button className="flex items-center font-medium gap-2 py-1 px-3 rounded-full border border-gray-light text-black text-sm  transition mr-4">
                    View Details
                    <Image
                        src="https://images.tractorgyan.com/uploads/120271/6887626a2b4cf-blue-right-arrow-icon.webp"
                        alt="View Details Icon"
                        width={12}
                        height={12}
                        className="w-3 h-3"
                    />
                </button>
            </div>


        </div>

       
    </div>
);
const BuyUsedTractorSection = ({
    isMobile,
    translation,
    currentLang,
    buttonText
}) => {
    return (
        <>
            <section className='bg-section-gray'>
                <div className="container">
                    <TittleAndCrumbs
                        title={"Buy Used Tractor"}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tractors.map((tractor) => (
                            <div key={tractor.id}>{TractorCard(tractor)}</div>
                        ))}
                    </div>
                    <div className="flex justify-center my-8">
  <TG_Button>
    View All Second Hand Tractors
  </TG_Button>
</div>


                </div>
            </section>

        </>
    )
}

export default BuyUsedTractorSection
