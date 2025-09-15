// ============ Used At ============
// 1. /compare-tractors/mahindra-585-di-powerplus-bhoomiputra-vs-mahindra-575-di-xp-plus
// 2. /compare/massey-ferguson-241-r-vs-farmtrac-45-powermaxx-vs-farmtrac-45-smart
// =================================
"use client";
import React, { useState } from "react";
import Image from "next/image";
import TG_ToggleSwitch from "../ui/inputs/TG_ToggleSwitch";

const CompareFeaturesRow = ({ feature, isLast = false, columns = 2 }) => {
  return (
    <li className={`${isLast ? 'pt-3 pb-1' : 'border-b py-3'} flex justify-between gap-2 md:gap-10 border-gray-light px-2`}>
      <div className={`${columns > 2 ? 'w-1/4' : 'w-1/3'} flex items-center`}>
        <span className="text-gray-dark">
          {typeof feature === 'object' ? feature.name : 'Feature'}
        </span>
      </div>
      <div className={`${columns > 2 ? 'w-1/4' : 'w-1/3'} font-medium text-black md:text-center`}>
        {typeof feature === 'object' ? feature.tractor1Value : 'Value'}
      </div>
      <div className={`${columns > 2 ? 'w-1/4' : 'w-1/3'} font-medium text-black md:text-center`}>
        {typeof feature === 'object' ? feature.tractor2Value : 'Value'}
      </div>
      {columns > 2 ? (
        <div className={`${columns > 2 ? 'w-1/4' : 'w-1/3'} font-medium text-black md:text-center`}>
          {typeof feature === 'object' ? feature.tractor3Value : 'Value'}
        </div>
      ) : null}
    </li>
  );
};

const CompareTractorsFeaturesSection = ({
  comparisionData = [],
  translation = {}
}) => {
  if (!comparisionData || comparisionData.length === 0) {
    return null;
  }
  const [hidden, setHidden] = useState(false);

  return (
    <section>
      <div className="container">
        <div className="flex justify-end pb-4">
          {/* <p>{hidden ? "Hidden" : "Visible"}</p> */}
          <TG_ToggleSwitch label={translation?.headerNavbar?.hideCommonFeatures || "Hide Common Features"} variant="OVERFLOW" onToggle={(val) => setHidden(val)} />
        </div>
        {comparisionData.map((group, index) => (
          <div key={index} className={`${index < comparisionData.length - 1 ? 'mb-10' : ''}`}>
            <div
              className="flex items-center justify-between gap-3 rounded-t-lg bg-primary p-4 text-base font-semibold leading-[18px] text-white shadow-main"
            >
              <h3>{group.title}</h3>
              <button>
                <Image
                  src="https://images.tractorgyan.com/uploads/114119/66a8b1e63149d-upArrowFeature.png"
                  height={20}
                  width={20}
                  alt="toggle-button-image"
                  title="toggle-button-image"
                  className="h-5 w-full min-w-5 max-w-5"
                />
              </button>
            </div>
            <ul className="rounded-b-lg bg-white p-2 shadow-main text-xs md:text-sm">
              <li className="flex justify-between gap-2 md:gap-10 border-b-[1px] border-gray-light px-2 py-[13px]">
                {group.headers && group.headers.map((header, headerIndex) => (
                  <div
                    key={headerIndex}
                    className={`${headerIndex ? 'text-black justify-center' : 'text-gray-dark'} ${group.headers.length > 3 ? 'w-1/4' : 'w-1/3'} flex items-center`}
                  >
                    <span className={headerIndex > 0 ? 'font-semibold' : ''}>{header.replace(/\*\*/g, '')}</span>
                  </div>
                ))}
              </li>
              {group.features && group.features.map((feature, featureIndex) => {
                const shouldHide =
                  group.headers.length > 3
                    ? (hidden && feature.tractor1Value === feature.tractor2Value && feature.tractor2Value === feature.tractor3Value)
                    : (hidden && feature.tractor1Value === feature.tractor2Value);

                return shouldHide ? null : (
                  <CompareFeaturesRow
                    key={featureIndex}
                    feature={feature}
                    isLast={featureIndex === group.features.length - 1}
                    columns={group.headers.length - 1}
                  />
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompareTractorsFeaturesSection;
