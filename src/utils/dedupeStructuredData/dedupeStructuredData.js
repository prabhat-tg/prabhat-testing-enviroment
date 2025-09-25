// simple dedupe by type + name/url
export function dedupeStructuredData(structuredData = []) {
  if (!Array.isArray(structuredData)) return structuredData;
  const map = new Map();

  for (const item of structuredData) {
    if (!item || typeof item !== 'object') continue;
    const type = (item['@type'] || item.type || '').toString();
    const name = (item.name || item.title || item.url || JSON.stringify(item)).toString().trim();
    const key = `${type}::${name}`;

    if (!map.has(key)) {
      map.set(key, item);
    } else {
      // merge missing fields if needed
      const existing = map.get(key);
      map.set(key, { ...existing, ...item });
    }
  }
  return Array.from(map.values());
}
