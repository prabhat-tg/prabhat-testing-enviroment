'use client';
import { useState, useEffect } from 'react';
import RangeSlider from './RangeSlider';
import EmiChart from './EmiChart';
import GoogleAdVerticalClientWrapper from '../../../features/social/GoogleAdVertical/GoogleAdVerticalClientWrapper';
import GoogleAdHorizontalClientWrapper from '../../../features/social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper';
export default function LoanCalculator({
  title,
  translation,
  currentLang,
  isMobile,
  placedAside = false,
  allSectionUse = false,
  bgColor = 'bg-white',
  loanAmount: propLoanAmount = 500000, // Default to 5 lakh
}) {
  const [loanAmount, setLoanAmount] = useState(propLoanAmount);
  const [loanTerm, setLoanTerm] = useState(5);
  const [loanTermType, setLoanTermType] = useState('year');
  const [interestRate, setInterestRate] = useState(10);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const principal = loanAmount;
    const annualRate = interestRate;
    const months = loanTermType === 'year' ? loanTerm * 12 : loanTerm;
    const monthlyRate = annualRate / 12 / 100;
    if (principal && annualRate && loanTerm) {
      const emiVal =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPay = emiVal * months;
      const interestPay = totalPay - principal;
      setEmi(Math.round(emiVal));
      setTotalAmount(Math.round(totalPay));
      setTotalInterest(Math.round(interestPay));
    }
  }, [loanAmount, loanTerm, interestRate, loanTermType]);

  return (
    <section className={`${bgColor} pt-0`}>
      <div
        className={`${allSectionUse ? 'container' : 'container flex flex-col justify-between md:flex-row'}`}
      >
        {/* <div className="container"> */}
        <div className={`${allSectionUse ? '' : 'w-full'}`}>
          {title && (
            <h2
              className="border-b-3 mt-10 inline-block border-secondary pb-2 font-semibold leading-6"
              style={{ fontSize: '24px' }}
            >
              {title}
            </h2>
          )}
          <div className={`${allSectionUse ? 'mt-10' : 'mt-4'} flex flex-col gap-8 md:flex-row`}>
            {/* Adjustments wrt Second Hand Tractor Details */}
            <div
              className={`${
                allSectionUse
                  ? placedAside
                    ? 'flex flex-col justify-between gap-6'
                    : 'flex flex-col justify-between gap-6 lg:flex-row'
                  : 'shadow-md rounded-xl bg-green-lighter p-6 pb-8'
              } flex-1 space-y-6`}
            >
              {/* <div
              className={`${allSectionUse ? 'flex flex-col justify-between gap-6 lg:flex-row' : 'shadow-md rounded-xl bg-green-lighter p-6 pb-8'} flex-1 space-y-6`}
            > */}
              {/* Adjustments wrt Second Hand Tractor Details */}
              <div
                className={`space-y-6 md:space-y-12 ${allSectionUse && !placedAside ? 'lg:w-[40%]' : ''}`}
              >
                {/* <div className={`space-y-6 md:space-y-12 ${allSectionUse ? 'lg:w-[40%]' : ''} `}> */}
                {/* Loan Amount */}
                <div>
                  <RangeSlider
                    label={translation.emiCalcytranslate.LoanAmount}
                    name={'loanAmount'}
                    value={loanAmount}
                    translation={translation}
                    currentLang={currentLang}
                    min={10000}
                    max={2000000}
                    step={10000}
                    onChange={setLoanAmount}
                    formatter={v => `₹ ${v.toLocaleString()}`}
                    labels={[
                      { pos: 0, label: '0' },
                      { pos: 500000, label: '5L' },
                      { pos: 1000000, label: '10L' },
                      { pos: 1500000, label: '15L' },
                      { pos: 2000000, label: '20L' },
                    ]}
                  />
                </div>
                <div>
                  <div className="mb-4 inline-flex overflow-hidden rounded-full border border-primary bg-white max-md:mt-10">
                    <button
                      onClick={() => setLoanTermType('year')}
                      className={`rounded-full px-4 py-1 text-[12px] font-medium ${
                        loanTermType === 'year' ? 'bg-primary text-white' : 'bg-white text-primary'
                      }`}
                    >
                      {translation.emiCalcytranslate.LoanAmountYears}
                    </button>
                    <button
                      onClick={() => setLoanTermType('month')}
                      className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                        loanTermType === 'month' ? 'bg-primary text-white' : 'bg-white text-primary'
                      }`}
                    >
                      {translation.emiCalcytranslate.LoanAmountMonth}
                    </button>
                  </div>
                  <RangeSlider
                    label={`${translation.emiCalcytranslate.LoanAmountTenure} (${
                      loanTermType === 'year'
                        ? translation.emiCalcytranslate.LoanAmountYears
                        : translation.emiCalcytranslate.LoanAmountMonth
                    })`}
                    name={'loanTenure'}
                    value={loanTerm}
                    translation={translation}
                    currentLang={currentLang}
                    min={1}
                    max={loanTermType === 'year' ? 30 : 360}
                    step={1}
                    onChange={setLoanTerm}
                    formatter={v => (loanTermType === 'year' ? `${v} Year` : `${v} Month`)}
                    loanTermType={loanTermType}
                    labels={
                      loanTermType === 'year'
                        ? ['0', '5', '10', '15', '20', '25', '30']
                        : ['0', '60', '120', '180', '240', '300', '360']
                    }
                  />
                </div>
                <div>
                  <RangeSlider
                    label={translation.emiCalcytranslate.RateofInterest}
                    name={'rateInterestRate'}
                    translation={translation}
                    currentLang={currentLang}
                    value={interestRate}
                    min={1}
                    max={30}
                    step={0.1}
                    onChange={setInterestRate}
                    // formatter={(v) => `${v.toFixed(1)}%`}
                    labels={['0%', '5%', '10%', '15%', '20%', '25%', '30%']}
                  />
                </div>
              </div>
              {/* Adjustments wrt Second Hand Tractor Details */}
              <div
                className={`${allSectionUse && !placedAside ? 'lg:w-[55%]' : ''} ${placedAside ? '' : 'md:grid-cols-2'} grid grid-cols-1 items-center gap-6`}
              >
                {/* <div
                className={`${allSectionUse ? 'lg:w-[55%]' : ''} grid grid-cols-1 items-center gap-6 md:grid-cols-2`}
              > */}
                <EmiChart
                  emi={emi}
                  principal={loanAmount}
                  interest={totalInterest}
                  translation={translation}
                />
                <div className="mx-auto w-fit space-y-2 text-center">
                  <InfoRow label={translation.emiCalcytranslate.MonthlyEMI} value={emi} />
                  <InfoRow label={translation.emiCalcytranslate.sixMonthlyEMI} value={emi * 6} />
                  <InfoRow
                    label={translation.emiCalcytranslate.TotalInterest}
                    value={totalInterest}
                  />
                  <InfoRow label={translation.emiCalcytranslate.TotalAmount} value={totalAmount} />
                  <div className="mt-6 w-fit rounded-lg bg-green-gradient p-4 text-white">
                    <div className="flex justify-between gap-2.5">
                      <Summary
                        label={translation.emiCalcytranslate.LoanAmount}
                        value={loanAmount.toLocaleString('en-IN')}
                        prefix="₹ "
                      />
                      <Summary
                        label={translation.emiCalcytranslate.LoanAmountTenure}
                        value={loanTerm}
                        suffix={loanTermType === 'year' ? ' Yr' : ' Mo'}
                      />
                      <Summary
                        label={translation.emiCalcytranslate.RateofInterest}
                        name="rateInterestRate"
                        value={interestRate}
                        suffix="%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-6 flex justify-center">
             <TG_Button onClick={() => {}}>{translation.emiCalcytranslate.calculateEMI}</TG_Button> 
          </div> */}
        </div>

        {!allSectionUse && (
          <div className="mt-6 w-full max-w-full flex-1 md:mt-0 md:max-w-[300px]">
            {/* <div className="w-full max-w-full md:max-w-[300px] mt-6 md:mt-0 flex-1 bg-error-main"> */}
            {isMobile ? <GoogleAdHorizontalClientWrapper /> : <GoogleAdVerticalClientWrapper />}
          </div>
        )}
      </div>
    </section>
  );
}
function InfoRow({ label, value }) {
  return (
    <div className="flex gap-2">
      <span className="w-1/2 text-left font-medium text-black">{label}</span>
      <span className="w-6 text-left text-lg text-black">:</span>
      <span className="flex-1 text-left text-base font-semibold text-black">
        ₹{value.toLocaleString()}
      </span>
    </div>
  );
}
function Summary({ name, label, value, prefix = '', suffix = '' }) {
  return (
    <div className="flex w-fit flex-col items-center justify-center">
      <span className="text-nowrap text-base font-medium md:text-lg">
        {prefix}
        {value}
        {suffix}
      </span>
      {name === 'rateInterestRate' ? (
        <span className="text-sm font-normal">{label}</span>
      ) : (
        <span className="whitespace-normal text-sm font-[300] lg:whitespace-nowrap">{label}</span>
      )}
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import RangeSlider from "./RangeSlider";
// import EmiChart from "./EmiChart";
// import GoogleAdVerticalClientWrapper from "../../social/GoogleAdVertical/GoogleAdVerticalClientWrapper";
// import GoogleAdHorizontalClientWrapper from "../../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper";

// export default function LoanCalculator({ translation, currentLang, isMobile }) {
//   const [loanAmount, setLoanAmount] = useState(1500000);
//   const [loanTerm, setLoanTerm] = useState(5);
//   const [loanTermType, setLoanTermType] = useState("year");
//   const [interestRate, setInterestRate] = useState(10);

//   const [emi, setEmi] = useState(0);
//   const [totalInterest, setTotalInterest] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     const principal = loanAmount;
//     const annualRate = interestRate;
//     const months = loanTermType === "year" ? loanTerm * 12 : loanTerm;
//     const monthlyRate = annualRate / 12 / 100;

//     if (principal && annualRate && loanTerm) {
//       const emiVal =
//         (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
//         (Math.pow(1 + monthlyRate, months) - 1);

//       const totalPay = emiVal * months;
//       const interestPay = totalPay - principal;

//       setEmi(Math.round(emiVal));
//       setTotalAmount(Math.round(totalPay));
//       setTotalInterest(Math.round(interestPay));
//     }
//   }, [loanAmount, loanTerm, interestRate, loanTermType]);

//   return (
//     <section>
//       <div className="container flex flex-col md:flex-row gap-8">
//         <div className="pb-8 p-6 flex-1 bg-green-lighter rounded-xl shadow-md space-y-6">
//           <div className="space-y-6 md:space-y-12">
//             {/* Loan Amount */}
//             <div>
//               <RangeSlider
//                 // label="Loan Amount"
//                 label={translation.emiCalcytranslate.LoanAmount}
//                 name={"loanAmount"}
//                 value={loanAmount}
//                 translation={translation}
//                 currentLang={currentLang}
//                 min={0}
//                 max={2000000}
//                 step={50000}
//                 onChange={setLoanAmount}
//                 formatter={(v) => `₹ ${v.toLocaleString()}`}
//                 labels={[
//                   { pos: 0, label: "0" },
//                   { pos: 500000, label: "5L" },
//                   { pos: 1000000, label: "10L" },
//                   { pos: 1500000, label: "15L" },
//                   { pos: 2000000, label: "20L" },
//                 ]}
//               />
//             </div>

//             <div>
//               <div className="inline-flex max-md:mt-10 mb-4 rounded-full bg-white border border-primary overflow-hidden">
//                 <button
//                   onClick={() => setLoanTermType("year")}
//                   className={`px-4 py-1 text-[12px] rounded-full font-medium ${
//                     loanTermType === "year"
//                       ? "bg-primary text-white"
//                       : "bg-white text-primary"
//                   }`}
//                 >
//                   {translation.emiCalcytranslate.LoanAmountYears}
//                 </button>
//                 <button
//                   onClick={() => setLoanTermType("month")}
//                   className={`px-3 py-1 text-[12px] font-medium rounded-full ${
//                     loanTermType === "month"
//                       ? "bg-primary text-white"
//                       : "bg-white text-primary"
//                   }`}
//                 >
//                   {translation.emiCalcytranslate.LoanAmountMonth}
//                 </button>
//               </div>

//               <RangeSlider
//                 label={`${translation.emiCalcytranslate.LoanAmountTenure} (${
//                   loanTermType === "year"
//                     ? translation.emiCalcytranslate.LoanAmountYears
//                     : translation.emiCalcytranslate.LoanAmountMonth
//                 })`}
//                 name={"loanTenure"}
//                 value={loanTerm}
//                 translation={translation}
//                 currentLang={currentLang}
//                 min={0}
//                 max={loanTermType === "year" ? 30 : 12}
//                 step={1}
//                 onChange={setLoanTerm}
//                 formatter={(v) =>
//                   loanTermType === "year" ? `${v} Year` : `${v} Month`
//                 }
//                 labels={
//                   loanTermType === "year"
//                     ? ["0", "5", "10", "15", "20", "25", "30"]
//                     : ["0", "3", "6", "9", "12"]
//                 }
//               />
//             </div>

//             <div>
//               <RangeSlider
//                 label={translation.emiCalcytranslate.RateofInterest}
//                 name={"rateInterestRate"}
//                 translation={translation}
//                 currentLang={currentLang}
//                 value={interestRate}
//                 min={0}
//                 max={30}
//                 step={0.1}
//                 onChange={setInterestRate}
//                 // formatter={(v) => `${v.toFixed(1)}%`}
//                 labels={["0%", "5%", "10%", "15%", "20%", "25%", "30%"]}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//             <EmiChart
//               emi={emi}
//               principal={loanAmount}
//               interest={totalInterest}
//               translation={translation}
//             />
//             <div className=" w-fit text-center mx-auto space-y-2">
//               <InfoRow
//                 label={translation.emiCalcytranslate.MonthlyEMI}
//                 value={emi}
//               />
//               <InfoRow
//                 label={translation.emiCalcytranslate.sixMonthlyEMI}
//                 value={emi * 6}
//               />
//               <InfoRow
//                 label={translation.emiCalcytranslate.TotalInterest}
//                 value={totalInterest}
//               />
//               <InfoRow
//                 label={translation.emiCalcytranslate.TotalAmount}
//                 value={totalAmount}
//               />

//               <div className="w-fit mt-6 p-4 text-white rounded-lg bg-green-gradient">
//                 <div className="flex gap-2.5 md:gap-8">
//                   <Summary
//                     label={translation.emiCalcytranslate.LoanAmount}
//                     value={loanAmount}
//                     prefix="₹ "
//                   />
//                   <Summary
//                     label={translation.emiCalcytranslate.LoanAmountTenure}
//                     value={loanTerm}
//                     suffix={loanTermType === "year" ? " Yr" : " Mo"}
//                   />
//                   <Summary
//                     label={translation.emiCalcytranslate.RateofInterest}
//                     name="rateInterestRate"
//                     value={interestRate}
//                     suffix="%"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 max-w-[300px] w-full">
//           {isMobile ? (
//             <GoogleAdHorizontalClientWrapper />
//           ) : (
//             <GoogleAdVerticalClientWrapper />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function InfoRow({ label, value }) {
//   return (
//     <div className="flex gap-2">
//       <span className="font-medium text-left text-black w-1/2">{label}</span>
//       <span className="w-6 text-lg text-left text-black">:</span>
//       <span className="font-semibold text-left text-black text-base flex-1">
//         ₹{value.toLocaleString()}
//       </span>
//     </div>
//   );
// }

// function Summary({ name, label, value, prefix = "", suffix = "" }) {
//   return (
//     <div className="flex flex-col justify-center items-center w-fit">
//       <span className="text-lg font-medium">
//         {prefix}
//         {value}
//         {suffix}
//       </span>
//       {/* <div className="flex flex-col justify-center items-center w-1/3">
//         <span className="text-lg font-bold">10.5% </span>
//         <span className="text-sm font-normal">
//           Rate of Interest
//         </span>
//       </div> */}
//       {name === "rateInterestRate" ? (
//         <span className="text-sm font-normal">{label}</span>
//       ) : (
//         <span className="text-sm font-[300] whitespace-normal lg:whitespace-nowrap">
//           {label}
//         </span>
//       )}
//     </div>
//   );
// }
