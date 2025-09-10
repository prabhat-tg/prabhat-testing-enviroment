import { getAboutContent } from "@/src/services/about/about-service";
import AboutTractorGyanClient from "./AboutTractorGyanClient";

export default async function AboutTractorGyanSection({ slug, title }) {
  // This component serves as a server component wrapper
  const content = await getAboutContent(slug);
  return <AboutTractorGyanClient content={content} title={title} />;
}
