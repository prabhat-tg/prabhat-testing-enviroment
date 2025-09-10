// ============ Used At ============
// 1. /second-hand-tractor
// 2. 
// =================================
// PriceListSection.js
"use client";
import React, { useState } from "react";
import PriceListToggle from "@/src/features/tyre/tyre-price/PriceListToggle";

const PriceListSection = ({
  langPrefix,
  brandName,
  currentYear,
  translation,
  priceList,
  currentDate,
  isMobile,
}) => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  // if (isMobile) {
  //   return (
  //     <div className="w-full rounded-lg shadow-main bg-green-mint">
        
  //       <div
  //         className="flex items-center justify-between px-4 py-2 cursor-pointer"
  //         onClick={toggleTable}
  //       >
  //         <p className="text-base font-semibold text-black">
  //           Old Tractor Price List {currentYear}
  //         </p>
  //         <Image
  //           src="https://images.tractorgyan.com/uploads/119519/6847e5d814a79-up_arrow_button.webp"
  //           width={20}
  //           height={20}
  //           alt="toggle_arrow"
  //           className={`transition-transform duration-300 h-4 w-4 ${
  //             showTable ? "rotate-0" : "rotate-180"
  //           }`}
  //         />
  //       </div>

  //       {showTable && (
  //         <div className="bg-white rounded-b-xl p-4">
  //           <table className="w-full">
  //             <thead>
  //               <tr className="flex gap-2 border-b border-gray-light py-2">
  //                 <td className="w-[45%] text-center font-bold text-sm text-black">
  //                   Old Tractor Model
  //                 </td>
  //                 <td className="w-[20%] text-center font-bold text-sm text-black">
  //                   Tractor HP
  //                 </td>
  //                 <td className="w-[35%] text-center font-bold text-sm text-black">
  //                   Tractor Price
  //                 </td>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {priceList?.map((item, index) => (
  //                 <tr
  //                   key={index}
  //                   className="flex gap-2 border-b border-gray-light py-2"
  //                 >
  //                   <td className="w-[45%] text-center text-xs text-gray-dark">
  //                     {item.manufacture + " " + item.model}
  //                   </td>
  //                   <td className="w-[20%] text-center text-sm text-black">
  //                     {item.tractor_hp}
  //                   </td>
  //                   <td className="w-[35%] text-center text-sm text-black">
  //                     Rs. {item.price}*
  //                   </td>
  //                 </tr>
  //               ))}
  //               <tr className="flex flex-col items-center gap-1 py-2 text-center text-xs text-gray-dark">
  //                 <td>
  //                   {translation.headings.dataLastUpdatedOn}: {currentDate}
  //                 </td>
  //                 <td>{translation.headings.priceMayVaryFromStateToState}</td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // --- Desktop View (Unchanged)
  return (
    <div className="lg:max-w-[Calc(100%_-_700px)] xl:max-w-[Calc(100%_-_778px)] w-full h-auto shadow-main rounded-lg">
      <div className="h-full rounded-b-lg overflow-hidden">
        {/* <div className="w-full flex items-center gap-2 justify-center bg-green-mid text-secondary font-semibold text-base md:text-lg p-2 rounded-t-lg shadow-main md:cursor-auto">
          <h3>Old Tractor Price List {currentYear}</h3>
        </div> */}
        {/* TODO:: Make it generic and pass the heading as prop */}
        <PriceListToggle
          isMobile={isMobile}
          brandName={brandName}
          langPrefix={langPrefix}
        />

        {/* Price List Content - Always rendered for SEO, hidden on mobile by CSS */}
        <div
          className={`custom-scroller overflow-hidden rounded-b-lg transition-all duration-300 ease-in-out lg:min-h-0 lg:flex-1 lg:overflow-y-auto ${
            isMobile
              ? 'max-h-0 md:max-h-[150px] md:overflow-y-scroll'
              : 'max-h-[320px] overflow-y-scroll'
          }`}
          id="price-list-content"
        >
          <table className="p-2 bg-white shadow-main w-full">
            <thead>
              <tr className="py-2.5 px-2 flex gap-2 md:gap-4 border-b-[1px] border-gray-light">
                <td className="w-[45%] text-center font-bold text-sm text-black">
                  Old Tractor Model
                </td>
                <td className="w-[20%] text-center font-bold text-sm text-black">
                  Tractor HP
                </td>
                <td className="w-[35%] text-center font-bold text-sm text-black">
                  Tractor Price
                </td>
              </tr>
            </thead>
            <tbody>
              {priceList?.map((item, index) => (
                <tr
                  key={index}
                  className="py-2.5 px-2 flex gap-2 md:gap-4 border-b-[1px] border-gray-light"
                >
                  <td className="w-[45%] text-center text-xs text-gray-dark">
                    {item.manufacture + " " + item.model}
                  </td>
                  <td className="w-[20%] text-center text-sm text-black">
                    {item.tractor_hp}
                  </td>
                  <td className="w-[35%] text-center text-sm text-black">
                    Rs. {item.price}*
                  </td>
                </tr>
              ))}
              <tr className="py-2.5 px-2 flex justify-center gap-4 border-b-[1px] border-gray-light">
                <td colSpan={3}>
                  <span className="font-medium text-xs text-gray-dark mx-auto">
                    <span>
                      {translation.headings.dataLastUpdatedOn}: {currentDate}
                    </span>
                    <br />
                    <span>
                      {translation.headings.priceMayVaryFromStateToState}
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceListSection;
