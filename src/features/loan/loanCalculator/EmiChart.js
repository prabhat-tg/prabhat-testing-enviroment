import React, { useState } from "react";

const EmiChart = ({ emi, principal, interest, translation }) => {
  const [hoverZone, setHoverZone] = useState(null);

  const totalAmount = principal + interest;
  const principalPercent = (principal / totalAmount) * 100;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const principalLength = (principalPercent / 100) * circumference;

  return (
    <div>
      <div className="relative mx-auto flex h-[250px] w-[250px] items-center justify-center">
        {/* Circular Progress SVG */}
        <svg
          width="450"
          height="450"
          viewBox="0 0 200 200"
          className="rotate-[-90deg] drop-shadow-lg"
        >
          {/* Full Circle Background (interest part) */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#FFFFFF"
            strokeWidth="18"
            fill="transparent"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoverZone("interest")}
            onMouseLeave={() => setHoverZone(null)}
          />

          {/* Green Arc (principal part) */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#008000"
            strokeWidth="18"
            fill="transparent"
            strokeDasharray={`${principalLength} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoverZone("principal")}
            onMouseLeave={() => setHoverZone(null)}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute z-10 text-center">
          <p className="text-sm text-[#616161]">
            {translation.emiCalcytranslate.TotalEMI}
          </p>
          <p className="text-xl font-bold text-black">
            ₹{emi.toLocaleString("en-IN")}/-
            <br />
            {translation.emiCalcytranslate.LoanAmountMonth}
          </p>
        </div>

        {/* Hover Tooltips */}
        {hoverZone === "principal" && (
          <div className="shadow-sm absolute -top-4 right-0 rounded-full bg-green-mid px-3 py-1 text-sm font-semibold text-black transition-opacity duration-200">
            {translation.emiCalcytranslate.principal} – ₹
            {principal.toLocaleString("en-IN")}/-
          </div>
        )}
        {hoverZone === "interest" && (
          <div className="shadow-sm absolute -bottom-4 left-0 rounded-full bg-green-mid px-3 py-1 text-sm font-semibold text-black transition-opacity duration-200">
            {translation.emiCalcytranslate.Interest} – ₹
            {interest.toLocaleString("en-IN")}/-
          </div>
        )}
      </div>
      <div className="mx-auto mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 min-w-5 border-[1px] bg-primary"></div>
          <span>
            {translation.emiCalcytranslate.principal} – ₹
            {principal.toLocaleString("en-IN")}/-
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 min-w-5 border-[1px] bg-white"></div>
          <span>
            {" "}
            {translation.emiCalcytranslate.Interest} – ₹
            {interest.toLocaleString("en-IN")}/-
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmiChart;
