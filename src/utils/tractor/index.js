export const getBrandFromSlug = (slug, brands) => {
  console.log('Slug:', slug);

  if (!slug || !brands || brands.length === 0) return null;

  const slugLower = slug.toLowerCase();
  const slugParts = slugLower.split('-');

  console.log('Parts:', slugParts);

  // Score each brand based on how well it matches
  const brandScores = brands.map(brand => {
    let score = 0;
    const brandNameLower = brand.name.toLowerCase();
    const brandUrlLower = brand.url.toLowerCase();

    // Exact URL match - highest priority
    if (brandUrlLower === slugLower) {
      score += 1000;
    }

    // Exact name match
    if (brandNameLower === slugLower) {
      score += 500;
    }

    // Check how many slug parts match the brand name
    const brandNameParts = brandNameLower.split(/[\s-]+/);
    let matchingParts = 0;

    slugParts.forEach(slugPart => {
      brandNameParts.forEach(brandPart => {
        if (brandPart === slugPart) {
          matchingParts++;
          score += 100; // High score for exact part matches
        } else if (brandPart.includes(slugPart)) {
          score += 50; // Medium score for partial matches
        } else if (slugPart.includes(brandPart)) {
          score += 30; // Lower score for reverse partial matches
        }
      });
    });

    // Bonus for matching more parts (helps with "vst-shakti" vs "vst-zetor")
    if (matchingParts > 1) {
      score += matchingParts * 50;
    }

    // Check URL contains slug parts
    slugParts.forEach(slugPart => {
      if (brandUrlLower.includes(slugPart)) {
        score += 25;
      }
    });

    // Penalty for longer brand names that might be false matches
    // This helps prefer "VST Shakti" over "VST Zetor" when slug is "vst-shakti"
    const lengthDifference = Math.abs(brandNameLower.length - slugLower.length);
    score -= lengthDifference * 2;

    return {
      brand,
      score,
      matchingParts
    };
  });

  // Sort by score (descending) and return the best match
  const sortedBrands = brandScores
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  console.log('Brand scores:', sortedBrands.map(item => ({
    name: item.brand.name,
    url: item.brand.url,
    score: item.score,
    matchingParts: item.matchingParts
  })));

  return sortedBrands.length > 0 ? sortedBrands[0].brand : null;
};