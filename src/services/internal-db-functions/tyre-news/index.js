import pool from "@/src/lib/db";

export async function getTyreBrandNewsGrouped(brands) {
  if (!brands || !brands?.length) {
    return {
      code: 404,
      success: false,
      message: "Brand is required",
      data: {},
    };
  }

  // Prepare brand mapping for category/tag
  const brandMap = {};
  const tagBrands = [];
  const categoryBrands = [];

  for (const brand of brands) {
    if (brand === "tyre-news") {
      categoryBrands.push(brand);
    } else {
      tagBrands.push(brand);
    }
  }

  // 1. Fetch category id for 'tyre-news' (if needed)
  let categoryId = null;
  if (categoryBrands?.length) {
    const [categoryRows] = await pool.query(
      "SELECT id FROM content_categories WHERE title = ?",
      ["tyre news"],
    );
    if (categoryRows?.length) {
      categoryId = categoryRows[0].id;
    }
  }

  // 2. Fetch tag ids for all tag brands (using LIKE for PHP parity)
  let tagIdMap = {};
  if (tagBrands?.length) {
    const likeClauses = tagBrands.map(() => "title LIKE ?").join(" OR ");
    const likeValues = tagBrands.map((b) => `%${b.replace(/-/g, " ")}%`);
    const [tagRows] = await pool.query(
      `SELECT id, title FROM content_tags WHERE ${likeClauses}`,
      likeValues,
    );
    // Map tag id to brand
    for (const brand of tagBrands) {
      const found = tagRows.find((row) =>
        row.title
          .toLowerCase()
          .includes(brand.replace(/-/g, " ").toLowerCase()),
      );
      if (found) tagIdMap[brand] = found.id;
    }
  }

  // 3. Fetch all content_page_ids for all brands
  let contentPageIdMap = {};
  // For 'tyre-news'
  if (categoryId) {
    const [catRows] = await pool.query(
      "SELECT content_category_content_page.content_page_id FROM content_category_content_page WHERE content_category_content_page.content_category_id = ?",
      [categoryId],
    );
    contentPageIdMap["tyre-news"] = catRows.map((row) => row.content_page_id);
  }
  // For tags
  for (const brand of tagBrands) {
    if (tagIdMap[brand]) {
      const [rows] = await pool.query(
        "SELECT content_page_content_tag.content_page_id FROM content_page_content_tag WHERE content_page_content_tag.content_tag_id = ?",
        [tagIdMap[brand]],
      );
      contentPageIdMap[brand] = rows.map((row) => row.content_page_id);
    } else {
      contentPageIdMap[brand] = [];
    }
  }

  // 4. Fetch all content pages in one query
  const allPageIds = Object.values(contentPageIdMap).flat().filter(Boolean);

  let contentPages = [];
  if (allPageIds?.length) {
    const [pages] = await pool.query(
      `SELECT id, title, page_text, url, featured_image, created_at, mobile_text FROM content_pages WHERE id IN (${allPageIds
        .map(() => "?")
        .join(",")}) AND show_blog = 1 AND deleted_at IS NULL`,
      allPageIds,
    );
    contentPages = pages;
  }

  // 5. Group content pages by brand with limits
  const result = {};
  for (const brand of brands) {
    const ids = contentPageIdMap[brand] || [];
    // Limit: 3 for 'tyre-news', 4 for others
    const limit = brand === "tyre-news" ? 3 : 4;
    const brandPages = ids
      .map((id) => contentPages.find((page) => page.id === id))
      .filter(Boolean)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);

    result[brand] = brandPages.map((record, key) => {
      const created_at = record.created_at
        ? new Date(record.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "";
      let page_url = record.url
        ? `/tractor-industry-news-blogs/${record.id}/${record.url
            .replace(/_/g, "-")
            .substring(0, 150)}`
        : `/tractor-industry-news-blogs/${record.id}/${record.title
            .replace(/_/g, "-")
            .substring(0, 150)}`;
      page_url = page_url.replace(/\/hi\/|\/hi\/hi\//g, "/");

      return {
        sno: key + 1,
        id: record.id || "",
        title: record.title || "",
        url: page_url || "",
        mobile_text: record.mobile_text || "",
        featured_image: record.featured_image || "",
        created_at: created_at || "",
        page_text: record.page_text ? record.page_text.substring(0, 500) : "",
      };
    });
  }

  return {
    code: 200,
    success: true,
    message: "Data found success",
    data: result,
  };
}
