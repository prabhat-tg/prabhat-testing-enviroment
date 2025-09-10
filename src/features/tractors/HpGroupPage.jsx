import React from 'react';
import TractorByBrandPage from './byBrand/TractorByBrandPage';
import '../../../app/tyreGlobals.css';
const HpGroupPage = ({ hpRange, hpTitle, params, searchParams }) => {
  return <TractorByBrandPage hpRange={hpRange} hpTitle={hpTitle} params={params} searchParams={searchParams} />;
};

export default HpGroupPage;
