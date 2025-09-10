import React from 'react'
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import { getBrandFromSlug } from '@/src/utils/tyre';
import LoanCalculator from '../../loan/loanCalculator/LoanCalculator';
import SecondHandForm from './SecondHandForm';
import MainHeadings from '../../tyreComponents/commonComponents/MainHeadings';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import GoogleAdHorizontalClientWrapper from '../../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper';

export default async function SecondHandInquiryFormAndEmi  ({
   isMobile,
  translation,
  currentLang,
  searchParams
}) {

  const tyreBrands = await getTyreBrands();
  const params = await searchParams;
  const param = await params;
  const brand = getBrandFromSlug(param.brandSlug, tyreBrands);

  return (
    <section id="emi-calculator-section">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full lg:w-[70%]">
          {/* <div className="w-full "> */}
            {/* <InquireForm
              tyreBrands={tyreBrands}
              heading={"headings.inquireforTyrePrice"}
              translation={translation}
              currentLang={currentLang}
              brandName={currentLang == "en" ? brand?.name : brand?.name_hi}
            /> */}
            <SecondHandForm 
              tyreBrands={tyreBrands}
              heading={"headings.inquireforTyrePrice"}
              translation={translation}
              currentLang={currentLang}
              brandName={currentLang == "en" ? brand?.name : brand?.name_hi}
            />
            
            {/* TODO:: Added BG COlor For UI Purpose Only */}
            {!isMobile && (
              <div className='mt-10 bg-section-gray'>
                <GoogleAdHorizontalClientWrapper />
              </div>
            )}
          </div>

          <div className="w-full lg:w-[30%]">
            <div className="my-3">
              <MainHeadings text={"Calculate EMI"} />
              {/* For aside UI, send placedAside={true} */}
              <LoanCalculator
                translation={translation}
                currentLang={currentLang}
                placedAside={true}
                allSectionUse={true}
                bgColor='bg-transparent'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

