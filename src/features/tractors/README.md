# Tractor Pages Refactoring

This refactoring consolidates all tractor pages into a reusable structure to reduce code duplication and improve maintainability.

## Structure

### Core Components

1. **`TractorPageLayout.jsx`** - The main reusable layout component that handles all the common functionality
2. **`tractorPageConfigs.js`** - Configuration definitions for different tractor page types
3. **`tractorPageFactory.js`** - Factory functions to create tractor page components

### Configuration-Based Approach

Each tractor page is now configured using a simple configuration object that specifies:

- `sectionName` - Section name for API calls (e.g., 'latest_tractor', 'ac', 'mini_tractor')
- `basePath` - Base path for the page (e.g., '/tractors', '/mini-tractor')
- `headingTitleKey` - Translation key for heading title
- `faqTag` - FAQ tag for fetching relevant FAQs
- `seoPageKey` - SEO page key for fetching SEO data

## Usage

### Option 1: Using the Layout Directly

```jsx
import TractorPageLayout from './TractorPageLayout';

export default async function CustomTractorPage({ params, searchParams }) {
  const config = {
    sectionName: 'custom_section',
    basePath: '/custom-tractors',
    headingTitleKey: 'headerNavbar.customTractors',
    faqTag: 'custom-tractors',
    seoPageKey: 'custom-tractors',
  };

  return TractorPageLayout(config, { params, searchParams });
}
```

### Option 2: Using Pre-configured Settings

```jsx
import TractorPageLayout from './TractorPageLayout';
import { getTractorPageConfig } from './tractorPageConfigs';

export default async function LatestTractorsPage({ params, searchParams }) {
  const config = getTractorPageConfig('latestTractors');
  return TractorPageLayout(config, { params, searchParams });
}
```

### Option 3: Using Factory Functions

```jsx
import { createTractorPage } from './tractorPageFactory';

export default createTractorPage('latestTractors');
```

## Updated Pages

The following pages have been updated to use the new structure:

- **TractorsPage.jsx** - All tractors (no section_name)
- **LatestTractorsPage.jsx** - section_name: 'latest_tractor'
- **MiniTractorPage.jsx** - section_name: 'mini_tractor'
- **ACTractorsPage.jsx** - section_name: 'ac'
- **CNGTractorsPage.jsx** - section_name: 'cng'
- **FourWDTractorsPage.jsx** - section_name: '4wd'
- **TwoWDTractorsPage.jsx** - section_name: '2wd'
- **ElectricTractorsPage.jsx** - section_name: 'electric'
- **TremIVTractorsPage.jsx** - section_name: 'trem_4'

## Benefits

1. **Reduced Code Duplication** - All common functionality is centralized
2. **Consistent Behavior** - All pages behave consistently
3. **Easier Maintenance** - Changes need to be made in only one place
4. **Type Safety** - Configuration objects provide clear contracts
5. **Scalability** - Easy to add new tractor page types

## Translation Keys

You may need to add the following translation keys to your translation files:

```json
{
  "headerNavbar": {
    "latestTractors": "Latest Tractors",
    "miniTractors": "Mini Tractors",
    "acTractors": "AC Tractors",
    "cngTractors": "CNG Tractors",
    "fourWDTractors": "4WD Tractors",
    "twoWDTractors": "2WD Tractors",
    "electricTractors": "Electric Tractors",
    "tremIVTractors": "TREM IV Tractors"
  }
}
```

## Future Enhancements

- Add TypeScript definitions for better type safety
- Create unit tests for the configuration system
- Add validation for configuration objects
- Consider creating a CLI tool to generate new tractor pages
