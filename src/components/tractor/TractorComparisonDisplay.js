'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TG_Button from '../ui/buttons/MainButtons';
import { getCompareTractorRecord } from '@/src/services/tractor/compare-tractor-brands';

const TractorComparisonDisplay = ({ compareUrl, translation }) => {
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (compareUrl) {
      loadComparisonData();
    }
  }, [compareUrl]);

  const loadComparisonData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCompareTractorRecord(compareUrl);
      setComparisonData(data);
    } catch (err) {
      console.error('Error loading comparison data:', err);
      setError('Failed to load comparison data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = priceRange => {
    if (!priceRange || priceRange === 'NA')
      return translation?.headerNavbar?.priceOnRequest || 'Price on request';
    return `₹${priceRange}`;
  };

  const renderTractorCard = (tractor, index) => {
    if (!tractor) return null;

    return (
      <div
        key={index}
        className="w-full max-w-md rounded-xl border border-gray-light bg-white p-4 shadow-main"
      >
        {/* Tractor Image */}
        <div className="mb-4 flex justify-center">
          <Image
            src={`https://images.tractorgyan.com/uploads${tractor.image}`}
            alt={`${tractor.brand} ${tractor.model}`}
            title={`${tractor.brand} ${tractor.model}`}
            height={200}
            width={300}
            className="h-auto max-h-[200px] w-auto max-w-full object-contain"
            onError={e => {
              e.target.src = 'https://images.tractorgyan.com/uploads/placeholder-tractor.jpg';
            }}
          />
        </div>

        {/* Tractor Info */}
        <div className="text-center">
          <h3 className="mb-2 text-lg font-bold text-black">
            {tractor.brand} {tractor.model}
          </h3>

          {/* Key Specs */}
          <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-600">HP</span>
              <span className="font-semibold">{tractor.hp}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Cylinder</span>
              <span className="font-semibold">{tractor.cylinder}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Lifting Capacity</span>
              <span className="font-semibold">{tractor.lifting_capacity}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Fuel Tank</span>
              <span className="font-semibold">{tractor.fuel_tank_capacity}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-green-50 mb-4 rounded-lg border border-primary p-3">
            <span className="text-gray-600 text-xs">Price Range</span>
            <div className="text-lg font-bold text-primary">{formatPrice(tractor.price_range)}</div>
          </div>

          {/* Action Button */}
          <TG_Button variant="outline" className="w-full">
            {translation?.headerNavbar?.viewDetails || 'View Details'}
          </TG_Button>
        </div>
      </div>
    );
  };

  const renderSpecificationTable = () => {
    if (!comparisonData) return null;

    const tractors = Object.values(comparisonData);
    const specs = [
      { key: 'hp', label: translation?.headerNavbar?.enginePower || 'Engine Power (HP)' },
      {
        key: 'cylinder',
        label: translation?.headerNavbar?.numberOfCylinders || 'No. of Cylinders',
      },
      {
        key: 'displacement_cc',
        label: translation?.headerNavbar?.engineDisplacement || 'Engine Displacement',
      },
      { key: 'engine_rated_rpm', label: translation?.headerNavbar?.ratedRPM || 'Rated RPM' },
      {
        key: 'cooling_system',
        label: translation?.headerNavbar?.coolingSystem || 'Cooling System',
      },
      {
        key: 'fuel_tank_capacity',
        label: translation?.headerNavbar?.fuelTankCapacity || 'Fuel Tank Capacity',
      },
      {
        key: 'lifting_capacity',
        label: translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity',
      },
      { key: 'pto_hp', label: translation?.headerNavbar?.ptoHP || 'PTO HP' },
      { key: 'pto_speed', label: translation?.headerNavbar?.ptoSpeed || 'PTO Speed' },
      {
        key: 'transmission_name',
        label: translation?.headerNavbar?.transmission || 'Transmission',
      },
      {
        key: 'number_of_gears',
        label: translation?.headerNavbar?.numberOfGears || 'Number of Gears',
      },
      { key: 'wheel_drive', label: translation?.headerNavbar?.driveType || 'Drive Type' },
      { key: 'steering', label: translation?.headerNavbar?.steering || 'Steering' },
      { key: 'brakes', label: translation?.headerNavbar?.brakes || 'Brakes' },
      { key: 'tyre_size', label: translation?.headerNavbar?.tyreSize || 'Tyre Size' },
      { key: 'tractor_weight', label: translation?.headerNavbar?.weight || 'Weight' },
      {
        key: 'turning_radius',
        label: translation?.headerNavbar?.turningRadius || 'Turning Radius',
      },
      {
        key: 'ground_clearance',
        label: translation?.headerNavbar?.groundClearance || 'Ground Clearance',
      },
      { key: 'warrenty', label: translation?.headerNavbar?.warranty || 'Warranty' },
    ];

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg border border-gray-light">
          <thead>
            <tr className="bg-section-gray">
              <th className="border border-gray-light p-3 text-left font-semibold">
                {translation?.headerNavbar?.specification || 'Specification'}
              </th>
              {tractors.map((tractor, index) => (
                <th key={index} className="border border-gray-light p-3 text-center font-semibold">
                  {tractor.brand} {tractor.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, index) => (
              <tr key={spec.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-light p-3 font-medium">{spec.label}</td>
                {tractors.map((tractor, tractorIndex) => (
                  <td key={tractorIndex} className="border border-gray-light p-3 text-center">
                    {tractor[spec.key] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-600 text-lg">Loading comparison data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  if (!comparisonData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-600 text-lg">No comparison data available</div>
      </div>
    );
  }

  const tractors = Object.values(comparisonData);

  return (
    <div className="space-y-8">
      {/* Tractor Cards Comparison */}
      <section>
        <div className="mb-6 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {tractors.map((tractor, index) => (
              <React.Fragment key={index}>
                {renderTractorCard(tractor, index)}
                {index < tractors.length - 1 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
                    VS
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold">
          {translation?.headerNavbar?.detailedSpecifications || 'Detailed Specifications'}
        </h2>
        {renderSpecificationTable()}
      </section>
    </div>
  );
};

export default TractorComparisonDisplay;
