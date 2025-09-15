'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllStateCityList } from '@/src/services/tyre/state-city-list';

export default function DealerFilterClient({
  page,
  urlSlug,
  translation,
  isMobile,
  tyreBrands,
  states,
  selectedBrand,
  selectedState,
  selectedCity,
  currentLang,
  dealerType = 'tyre', // Add dealerType prop
}) {
  console.log('inside selectedBrand', selectedBrand);

  const [brand, setBrand] = useState(selectedBrand || '');
  const [state, setState] = useState(selectedState || '');
  const [city, setCity] = useState(selectedCity || '');
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch cities when state changes (implement your own API call)

  useEffect(() => {
    const fetchCities = async () => {
      if (!state) {
        setCities([]);
        setCity('');
        return;
      }

      const payloadState = { state };
      try {
        const result = await getAllStateCityList(payloadState);
        setCities(result.data || []);
        // Reset city if not in new list
        if (!result.data?.some(c => c.city === city)) {
          setCity('');
        }
      } catch (error) {
        setCities([]);
        setCity('');
        console.error('Error fetching city:', error);
      }
    };
    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // On filter/search submit, update query params (triggers server re-render)
  const handleDealerSubmit = e => {
    e.preventDefault();
    let routeParts = [];
    if (brand) routeParts.push(brand.toLowerCase().replace(/\s+/g, '-'));
    if (city) routeParts.push(city.toLowerCase().replace(/\s+/g, '-'));
    if (state) routeParts.push(state.toLowerCase().replace(/\s+/g, '-'));

    // Determine base route based on dealer type and page
    let baseRoute = 'tyre-dealers';
    let fallbackRoute = 'tractor-tyre-dealers-in-india';

    if (page === 'implement') {
      baseRoute = 'implement-dealers';
      fallbackRoute = 'implement-dealers-in-india';
    } else if (dealerType === 'tractor') {
      baseRoute = 'tractor-dealers';
      fallbackRoute = 'tractor-dealers-in-india';
    }

    let route = routeParts.length
      ? `${currentLang === 'hi' ? 'hi/' : ''}${baseRoute}/${routeParts.join('/')}`
      : `${currentLang === 'hi' ? 'hi/' : ''}${fallbackRoute}`;

    const params = new URLSearchParams();
    if (searchParams.get('search')) params.set('search', searchParams.get('search'));
    // params.set("page", "1");

    const queryString = params.toString() ? `?${params.toString()}` : '';
    console.log('queryString', queryString);

    router.push(`/${route}${queryString}`);
  };

  return (
    <div className={isMobile ? 'm-auto mb-4' : 'mx-auto mb-4 md:max-w-[600px] 2xl:max-w-[680px]'}>
      <h6 className="mb-2 hidden text-center text-2xl font-bold md:block lg:mb-6 lg:text-3xl">
        {page === 'implement'
          ? translation?.headings?.findImplementDealerNearYou || 'Find Implement Dealer Near You'
          : dealerType === 'tractor'
            ? translation?.headings?.findTractorDealerNearYou || 'Find Tractor Dealer near you'
            : translation?.headings?.findTyreDealerNearYou || 'Find Tyre Dealer Near You'}
      </h6>
      <form
        className="md:shadow-navv mb-4 grid grid-cols-8 gap-x-0 gap-y-4 bg-white md:mb-0 md:h-[60px] md:grid-cols-7 md:overflow-hidden md:rounded-2xl lg:h-[65px] 2xl:h-[80px]"
        onSubmit={handleDealerSubmit}
      >
        {/* Brand Select */}
        <div className="col-span-8 md:col-span-2 md:pe-2">
          <label htmlFor="brand" className="mb-0 block text-sm font-bold text-black md:hidden">
            {page === 'implement'
              ? translation?.dealerFilter?.implementBrand || 'Implement Brand'
              : dealerType === 'tractor'
                ? translation?.dealerFilter?.tractorBrand || 'Tractor Brand'
                : translation?.dealerFilter?.tyreBrand || 'Tyre Brand'}
          </label>
          <div className="mt-2 h-full md:mt-0">
            <select
              id="brand"
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none md:h-full md:border-none md:text-lg md:font-medium"
            >
              <option value="">{translation?.dealerFilter?.selectBrand || 'Select Brand'}</option>
              {tyreBrands?.length > 0 ? (
                tyreBrands.map((b, idx) => (
                  <option key={idx} value={page === 'implement' ? b.brand_name : b.name}>
                    {page === 'implement' ? b.brand_name : b.name}
                  </option>
                ))
              ) : (
                <option>{translation?.dealerFilter?.loading || 'Loading...'}</option>
              )}
            </select>
          </div>
        </div>
        {/* State Select */}
        <div className="col-span-8 md:col-span-2 md:border-x md:border-gray-light md:pe-2">
          <label htmlFor="state" className="mb-0 block text-sm font-bold text-black md:hidden">
            {translation?.dealerFilter?.selectState || 'Select State'}
          </label>
          <div className="mt-2 h-full md:mt-0">
            <select
              id="state"
              value={state}
              onChange={e => setState(e.target.value)}
              className="w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none md:h-full md:border-none md:text-lg md:font-medium"
            >
              <option value="">{translation?.dealerFilter?.selectState || 'Select State'}</option>
              {states?.length > 0 ? (
                states.map((s, idx) => (
                  <option key={idx} value={s.state}>
                    {s.state}
                  </option>
                ))
              ) : (
                <option>{translation?.dealerFilter?.loading || 'Loading...'}</option>
              )}
            </select>
          </div>
        </div>
        {/* City Select */}
        <div className="col-span-8 md:col-span-2 md:pe-2">
          <label htmlFor="city" className="mb-0 block text-sm font-bold text-black md:hidden">
            {translation?.dealerFilter?.selectCity || 'Select City'}
          </label>
          <div className="mt-2 h-full md:mt-0">
            <select
              id="city"
              value={city}
              onChange={e => setCity(e.target.value)}
              disabled={!state}
              className="w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none md:h-full md:border-none md:text-lg md:font-medium"
            >
              <option value="">{translation?.dealerFilter?.selectCity || 'Select City'}</option>
              {cities?.length > 0 ? (
                cities.map((c, idx) => (
                  <option key={idx} value={c.city}>
                    {c.city}
                  </option>
                ))
              ) : (
                <option>{translation?.dealerFilter?.loading || 'Loading...'}</option>
              )}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-8 md:col-span-1">
          <button
            type="submit"
            className="mx-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-lg text-white md:h-full md:rounded-none md:px-8"
          >
            <span>{translation?.dealerFilter?.submit || 'Submit'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
