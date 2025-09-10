import { JSDOM } from "jsdom";

export function processContent(htmlContent) {
  if (!htmlContent) {
    return { title: "", strippedContent: "", truncatedContent: "" };
  }

  // Parse with jsdom on server
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  // Extract first <h2> or <h3> as title
  const heading = doc.querySelector("h2") || doc.querySelector("h3");
  const title = heading ? heading.innerHTML : "";

  if (heading) heading.remove();

  // Extract all <p> tags
  const paragraphs = Array.from(doc.querySelectorAll("p"));

  // Create truncatedContent with the first 5 <p> tags
  const truncatedContent = paragraphs
    .slice(0, 5)
    .map((p) => p.outerHTML)
    .join("");

  // Remainder is your strippedContent
  const strippedContent = doc.body.innerHTML;

  return { title, strippedContent, truncatedContent };
}
