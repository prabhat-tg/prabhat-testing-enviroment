import React from "react";
import LoanFinanceSchemesCard from "./LoanFinanceSchemesCard";
import bankLists from "@/src/data/bankSchemes.json";
const LoanFinanceSchemes = ({ title }) => {
  return (
    <section>
      <div className="container">
        <h4 className="border-b-3 mb-8 inline-block border-secondary pb-2 text-xl font-bold leading-7 md:text-2xl">
          {title}
        </h4>
        <div className="flex flex-wrap items-center justify-around gap-2 sm:justify-center md:gap-4 xl:justify-around 2xl:justify-center 2xl:gap-6">
          {bankLists?.map((item, index) => (
            <LoanFinanceSchemesCard
              key={index}
              text={item.bank}
              imgUrl={item.image}
              link={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanFinanceSchemes;
