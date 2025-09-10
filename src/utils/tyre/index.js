export const getCurrentPageTyreBrand = (tyreBrands, url) => {
  let brand = null;
  tyreBrands.forEach(_brand => {
    if (_brand.url == url || _brand.page_url == url) {
      brand = _brand;
      console.log('found brand', brand);
    }
  });
  return brand;
};

export const getBrandFromSlug = (slug, tyreBrands) => {
  if (!slug) return null;
  const parts = slug.split('-');

  if (parts.length > 0) {
    const brand = tyreBrands.filter(brand => {
      return (
        brand.name.toLowerCase().includes(parts[0]) ||
        brand.name_hi.toLowerCase().includes(parts[0])
      );
    });
    return brand[0];
  }
  return '';
};
