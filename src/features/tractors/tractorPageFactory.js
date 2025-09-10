// Factory function to create tractor pages
import TractorPageLayout from './TractorPageLayout';
import { getTractorPageConfig } from './tractorPageConfigs';

/**
 * Factory function to create a tractor page component
 * @param {string} pageType - The type of tractor page (e.g., 'tractors', 'latestTractors', etc.)
 * @returns {Function} React component for the tractor page
 */
export const createTractorPage = pageType => {
  const TractorPage = async ({ params, searchParams }) => {
    const config = getTractorPageConfig(pageType);
    return TractorPageLayout(config, { params, searchParams });
  };

  // Set display name for better debugging
  TractorPage.displayName = `TractorPage_${pageType}`;

  return TractorPage;
};

// Pre-configured page components
export const TractorsPageComponent = createTractorPage('tractors');
export const LatestTractorsPageComponent = createTractorPage('latestTractors');
export const MiniTractorPageComponent = createTractorPage('miniTractor');
export const ACTractorsPageComponent = createTractorPage('acTractors');
export const CNGTractorsPageComponent = createTractorPage('cngTractors');
export const FourWDTractorsPageComponent = createTractorPage('fourWDTractors');
export const TwoWDTractorsPageComponent = createTractorPage('twoWDTractors');
export const ElectricTractorsPageComponent = createTractorPage('electricTractors');
export const TremIVTractorsPageComponent = createTractorPage('tremIVTractors');
