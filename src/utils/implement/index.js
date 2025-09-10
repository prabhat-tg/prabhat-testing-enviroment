// TODO:: WIP
export const getBrandFromSlug = (slug, brands) => {
  console.log('Slug:', slug);

  if (!slug) return null;
  const parts = slug.split('-');

  console.log('Parts:', parts);
  console.log('brands:', brands);

  if (parts.length > 0) {
    const brand = brands.filter(brand => {
      console.log(brand.brand_name);
      console.log('::',parts[0]);
      console.log('==>',brand.brand_name.toLowerCase().includes(parts[0].toLowerCase()));
      return (
        brand.brand_name.includes(parts[0]) ||
        brand.brand_name.toLowerCase().includes(parts[0].toLowerCase())
        // brand?.url.toLowerCase().includes(parts[0].toLowerCase()) ||
        // brand.url == slug
        // brand.name_hi.toLowerCase().includes(parts[0])
      );
    });
    return brand[0];
  }
  return '';
};
