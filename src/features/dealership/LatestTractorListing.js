

"use client";

import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";
import TG_Button from "@/src/components/ui/buttons/MainButtons";
import Image from "next/image";

 const tractors = [
    {
      id: 1,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "47",
      cylinders: "3",
      weight: "2000kg",
      price: "Contact for Price",
    },
    {
      id: 2,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "52",
      cylinders: "3",
      weight: "2100kg",
      price: "₹6.5 - ₹7.5 Lakh*",
    },
    {
      id: 3,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "48",
      cylinders: "3",
      weight: "2050kg",
      price: "₹6.9 - ₹7.4 Lakh*",
    },
    {
      id: 4,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "50",
      cylinders: "3",
      weight: "2200kg",
      price: "₹7.2 - ₹7.9 Lakh*",
    },
    {
      id: 5,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "55",
      cylinders: "4",
      weight: "2300kg",
      price: "₹7.8 - ₹8.5 Lakh*",
    },
    {
      id: 6,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "60",
      cylinders: "4",
      weight: "2400kg",
      price: "₹8.5 - ₹9.2 Lakh*",
    },
    {
      id: 7,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "65",
      cylinders: "4",
      weight: "2500kg",
      price: "₹9.0 - ₹9.8 Lakh*",
    },
    {
      id: 8,
      name: "Massey Ferguson 6028 Mahindra Wide Track Series",
      image: "https://images.tractorgyan.com/uploads/120247/6884a78e3a3cc-latest-tractor.webp",
      hp: "70",
      cylinders: "4",
      weight: "2600kg",
      price: "₹9.5 - ₹10.2 Lakh*",
    },
  ];
const LatestTractorListing = () => {
  
 

  return (
     <section >
      <div className="container">
       

         <TittleAndCrumbs
                   title={"Latest Tractors"}
                 />


        {/* ✅ Desktop Grid View */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {tractors.map((tractor) => (
            <div
              key={tractor.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-lightest flex flex-col h-full"
            >
              <div className="p-4 flex flex-col justify-between h-full">
                <h3 className="mb-3 line-clamp-2 text-black text-lg  font-roboto font-semibold px-2 py-1 rounded min-h-[50px]">
                  {tractor.name}
                </h3>

                <div className="flex gap-2 mb-4">
                  
         <TG_Button
          icon="https://images.tractorgyan.com/uploads/120253/6884aa5bd06c9-right-arrow-icon.webp"
          iconPosition="right"
          className="w-full !p-1 !rounded-full"
          variant="outline"
        >
          View Details
        </TG_Button>
                     <TG_Button
         
          className="w-full !rounded-full"
        >
         Book Now
        </TG_Button>
                 
                </div>

        <div className="relative min-w-48 max-w-60 min-h-36 max-h-44 mx-auto">
  <Image
    src={tractor.image}
    alt={tractor.name}
    fill
    className="object-cover rounded-md"
  />
</div>



           <div className="py-2 px-1 mt-3 bg-green-mint rounded-md grid grid-cols-3 text-center text-black  overflow-hidden ">
  <div className="border-r border-green-lightest flex flex-col justify-center items-center gap-1">
    <div className="font-roboto font-normal text-xs text-gray-dark">HP</div>
    <div className="font-roboto font-semibold text-lg">{tractor.hp}</div>
  </div>
  <div className="border-r border-green-lightest flex flex-col justify-center items-center gap-1">
    <div className="font-roboto font-normal text-xs text-gray-dark">Cylinder</div>
    <div className="font-roboto font-semibold text-lg">{tractor.cylinders}</div>
  </div>
  <div className="flex flex-col justify-center items-center gap-1">
    <div className="font-roboto font-normal text-xs text-gray-dark">Weight</div>
    <div className="font-roboto font-semibold text-lg">{tractor.weight}</div>
  </div>
</div>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTractorListing;
