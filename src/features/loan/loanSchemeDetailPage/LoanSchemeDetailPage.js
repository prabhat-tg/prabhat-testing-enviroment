import Image from "next/image";
import Link from "next/link";
import React from "react";
import TopBrands from "./TopBrands";
import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";

const LoanSchemeDetailPage = ({
  translation,
  langPrefix,
  allTractorBrands,
  isMobile,
  allTractorBrandsError,
}) => {
  const data = {
    bank: {
      name: "AXIS BANK",
      logo: "https://images.tractorgyan.com/uploads/bank_logo/axis_bank.jpg",
    },
    introduction: {
      title: "Introduction",
      content:
        "Axis Bank brings you the best deals in the market and a range of attractive features on loans for tractors. As part of its Agriculture Loans portfolio, Axis Bank offers Tractor Loans to both first-time and experienced applicants, with loan amounts and tenures that suit your requirements. For farmers who already own tractors and need to fulfill their farming needs with even more confidence, Axis Bank offers Loan Against Tractor. You need to fulfill the Tractor Loans eligibility criteria. One of the main criteria to avail the Tractor Loan is a minimum 3 years of land holding for farmers.",
    },
    banner: {
      imageDesktop:
        "https://images.tractorgyan.com/uploads/banner_images/finance_desktop.jpg",
      imageMobile:
        "https://images.tractorgyan.com/uploads/banner_images/finance_mobile.jpg",
      text: "ट्रैक्टर के लिए लोन चाहिए? या अपने पुराने ट्रैक्टर की जानकारी के लिए नीचे क्लिक करें।",
      button: "अभी आवेदन करें",
    },
    eligibility: [
      {
        title: "Eligibility for Tractor Finances",
        items: [
          "Minimum age of applicant should be 18 years",
          "Maximum age of applicant should be 75 years as on date of funding",
          "Minimum 3 years of land holding for farmers",
        ],
      },
      {
        title: "Eligibility for Tractor Finances",
        items: [
          "Minimum age of applicant should be 18 years",
          "Maximum age of applicant should be 75 years as on date of funding",
          "Minimum 3 years of land holding for farmers",
        ],
      },
      {
        title: "Features and Benefits of Tractor Finances",
        items: [
          "Customized Loans",
          "Flexible Repayment Options",
          "Monthly/Quarterly/ Half-yearly/Annual Repayment Options",
          "Loan for new as well as used tractors",
          "Loan Against Existing Loan (Refinancing)",
          "Hassle-free",
          "Easy and Quick Documentation",
        ],
      },
    ],
    interest_rates: {
      title: "Interest Rate and Charges for Tractor Finance",
      rates: Array(8).fill({
        label: "Interest Rate",
        value: "Effective Rate 17.50% - 20.00%",
      }),
    },
  };

  return (
    <section>
      <div className="container">
        <TittleAndCrumbs
          title={translation.loan.tractorLoan}
          breadcrumbs={[
            {
              label: translation?.breadcrubm.home,
              href: "/",
              title: "Home",
            },
            {
              label: translation.loan.tractorLoan,
              href: "/tractor-loan",
              title: translation.loan.tractorLoan,
            },
            {
              label: "AXIS Bank",
              title: "AXIS Bank",
              isCurrent: true,
            },
          ]}
        />

        <div className="flex h-full w-full flex-col gap-6 lg:flex-row">
          <div className="mx-auto rounded-2xl border-[1px] border-gray-light p-4 md:space-y-6 lg:max-w-[75%]">
            {/* Bank Header */}
            <div className="flex items-center space-x-4">
              <Image
                src={data.bank.logo}
                height={500}
                width={500}
                alt="Bank Logo"
                className="h-24 w-24"
              />
              <h1 className="text-2xl font-bold">{data.bank.name}</h1>
            </div>

            {/* Introduction */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">
                {data.introduction.title}
              </h2>
              <p className="mb-4 text-sm font-normal text-gray-dark md:mb-6">
                {data.introduction.content}
              </p>
            </div>

            {/* Banner */}
            <Link href="/tractor-loan">
              <div className="h-full max-h-[6.25rem] w-full overflow-hidden rounded-lg lg:max-h-[9.375rem]">
                <Image
                  src={data.banner.imageMobile}
                  height={210}
                  width={380}
                  alt="loan image"
                  title="loan image"
                  className="h-full w-full rounded-lg lg:hidden"
                />
                <Image
                  src={data.banner.imageDesktop}
                  height={200}
                  width={800}
                  alt="loan image"
                  title="loan image"
                  className="hidden h-full w-auto rounded-lg lg:block"
                />
              </div>
            </Link>

            {/* Eligibility Cards */}
            <div className="grid grid-cols-1 gap-4 max-md:mt-4 md:grid-cols-3">
              {data.eligibility.map((block, index) => (
                <div
                  key={index}
                  className="shadow-sm rounded-lg bg-white p-4 shadow-bottom"
                >
                  <h4 className="mb-6 text-lg font-semibold text-black">
                    {block.title}
                  </h4>
                  <ul className="list-disc space-y-1 pl-6">
                    {block.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm font-normal text-gray-dark"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Interest Rates */}
            <div className="rounded-2xl py-4 shadow-bottom">
              <h3 className="mb-2 text-center text-lg font-semibold">
                {data.interest_rates.title}
              </h3>
              <div className="grid grid-cols-2 px-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
                {data.interest_rates.rates.map((rate, index) => (
                  <div
                    key={index}
                    className="shadow-sm border-b-[1px] border-gray-light py-2 text-center md:border-none md:p-4"
                  >
                    <p className="text-sm font-semibold text-gray-dark lg:text-base">
                      {rate.label}
                    </p>
                    <p className="text-xs font-normal text-gray-dark lg:text-sm">
                      {rate.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error Handling for Tractor Brands */}
        {allTractorBrandsError ? (
          <div className="py-5 text-center">
            <p>
              {translation?.error_messages?.tractor_brands_unavailable ||
                "Tractor brands are currently unavailable."}
            </p>
          </div>
        ) : allTractorBrands && Array.isArray(allTractorBrands) ? (
          allTractorBrands.length > 0 ? (
            <TopBrands brands={allTractorBrands} translation={translation} />
          ) : (
            <div className="py-5 text-center">
              <p>
                {translation?.error_messages?.no_tractor_brands ||
                  "No tractor brands found."}
              </p>
            </div>
          )
        ) : null}
      </div>
    </section>
  );
};

export default LoanSchemeDetailPage;
