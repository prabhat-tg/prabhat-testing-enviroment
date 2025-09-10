"use client";
import { postData } from "@/src/services/apiMethods";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AboutTractorGyanClient({
  content,
  title: defaultTitle = "",
}) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [showMore, setShowMore] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [truncatedContent, setTruncatedContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Process all content in useEffect to avoid hydration issues
  useEffect(() => {
    if (content) {
      let htmlContent = "";

      // Extract the HTML content based on content format
      if (content.data && content.data.footer) {
        htmlContent = content.data.footer;
      } else if (typeof content === "string") {
        htmlContent = content;
      }

      if (htmlContent) {
        // Process the content
        processContent(htmlContent);
      }

      setIsLoaded(true);
    }
  }, [content, currentLang]);

  const processContent = (htmlContent) => {
    if (!htmlContent || typeof window === "undefined") return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Extract title from h2/h3
    const firstH2 = tempDiv.querySelector(
      `${currentLang === "hi" ? "h3" : "h2"}`,
    );

    if (firstH2) {
      setTitle(firstH2.innerHTML);

      // Remove the h2/h3 from content to avoid duplication
      firstH2.remove();
    }

    // Get all paragraphs for truncation
    const paragraphs = Array.from(tempDiv.querySelectorAll("p"));

    // Create truncated content - only first 5 paragraphs
    const shownParagraphs = paragraphs.slice(0, 5);
    const truncated = shownParagraphs.map((p) => p.outerHTML).join("");

    // Store both versions
    setTruncatedContent(truncated);
    setFullContent(tempDiv.innerHTML);
  };

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  // Show loading state
  if (!isLoaded) {
    return (
      <section className="bg-section-gray">
        <div className="container">
          <div className="animate-pulse">
            <div className="bg-gray-200 mb-4 h-6 w-1/3 rounded"></div>
            <div className="bg-gray-200 mb-2 h-4 rounded"></div>
            <div className="bg-gray-200 mb-2 h-4 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-section-gray">
      <div className="container">
        {/* Render title separately */}
        {title && (
          <h2 className="text-xl" dangerouslySetInnerHTML={{ __html: title }} />
        )}

        <div className="dd">
          {/* Render content conditionally based on showMore */}
          <div
            dangerouslySetInnerHTML={{
              __html: showMore ? fullContent : truncatedContent,
            }}
            className="flex flex-col gap-4 py-4 pt-0 text-base text-gray-main"
          />

          {/* Only show button if full content is longer than truncated */}
          {truncatedContent &&
            fullContent &&
            fullContent.length > truncatedContent.length && (
              <button
                onClick={handleToggle}
                aria-label={showMore ? "Read Less" : "Read More"}
                className="text-base font-medium"
              >
                {showMore ? (
                  <span className="flex items-center gap-2 text-red-main">
                    {t("buttons.readLess")}
                    <Image
                      src="https://images.tractorgyan.com/uploads/117537/678f49b7be407-arrow-red-icon.webp"
                      height={20}
                      width={20}
                      alt="collapse content"
                      title="collapse content"
                      className="h-2 w-3 rotate-180 transition-transform"
                    />
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-primary">
                    {t("buttons.readMore")}
                    <Image
                      src="https://images.tractorgyan.com/uploads/117210/67723751b63af-green-down-arrow-icon_small.webp"
                      height={20}
                      width={20}
                      alt="expand content"
                      title="expand content"
                      className="h-2 w-3"
                    />
                  </span>
                )}
              </button>
            )}
        </div>
      </div>
    </section>
  );
}
