const { postData } = require("../apiMethods");

export async function getAboutContent(slug) {
  try {
    console.log("Fetching about content for slug:", slug);

    const result = await postData("api/footer_content", { slug: slug });

    return result.data ? result.data.footer : {};
  } catch (e) {
    console.error("Error fetching about content:", e);
    return null;
  }
}
