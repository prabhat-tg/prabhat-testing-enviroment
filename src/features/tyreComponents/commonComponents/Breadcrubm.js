import Link from "next/link";
import React from "react";

const Breadcrubm = () => {
  return (
    <>
      <div className="w-full text-xs text-gray-dark sm:w-auto sm:text-sm md:text-base">
        <ul
          className="no-scrollbar flex overflow-auto whitespace-nowrap"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li itemScope itemType="https://schema.org/ListItem">
            <Link href="/" title="Home" itemProp="item">
              <span itemProp="name"> Home</span>
            </Link>
            <meta itemProp="position" content="1" />
            <span className="mx-2">/</span>
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href={"/tractor-tyre-in-india"}
              title="Tyre Home"
              itemProp="item"
            >
              <span itemProp="name">Tractor Tyres</span>
            </Link>
            <meta itemProp="position" content="2" />
            <span className="mx-2">/</span>
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="font-semibold"
          >
            <span itemProp="name" title="MRF tyres">
              MRF Shakti Super 12.4x28 - Rear Tyre
            </span>
            <meta itemProp="position" content="3" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Breadcrubm;
