"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/src/styles/blogs/blogsDetails.module.css";

export function TableOfContent({ data, translation }) {
  const [showTableContent, setShowTableContent] = useState(false);
  const [tocItems, setTocItems] = useState([]);

  const toggleTableContent = () => {
    setShowTableContent(!showTableContent);
  };

  // Recursive parser: builds nested list structure
  const parseList = (ol) => {
    const items = [];
    ol.querySelectorAll(":scope > li").forEach((li) => {
      const link = li.querySelector("a");
      const subOl = li.querySelector(":scope > ol");
      const item = {
        href: link ? link.getAttribute("href") : null,
        text: link ? link.textContent.trim() : "",
        children: subOl ? parseList(subOl) : [],
      };
      items.push(item);
    });
    return items;
  };

  useEffect(() => {
    if (!data) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;

    const ol = tempDiv.querySelector("ol");
    const items = ol ? parseList(ol) : [];

    setTocItems(items);
  }, [data]);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const yOffset = -120;
      const y =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const renderChildNumberedList = (items, prefix) => {
    return (
      <ul className="list-none">
        {items.map((item, index) => {
          const currentNumber = `${prefix}${index + 1}`;
          return (
            <li key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-inherit text-[15px] hover:underline"
                >
                  {currentNumber}. {item.text}
                </a>
              ) : (
                <span>
                  {currentNumber}. {item.text}
                </span>
              )}
              {item.children?.length > 0 &&
                renderChildNumberedList(item.children, `${currentNumber}.`)}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderNumberedList = (items) => {
    return (
      <ol className="mt-2 list-none space-y-2 pl-5 text-base font-medium text-[#00522E]">
        {items.map((item, index) => {
          const currentNumber = `${index + 1}`;
          return (
            <li key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-inherit hover:underline"
                >
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}

              {item.children?.length > 0 &&
                renderChildNumberedList(item.children, `${currentNumber}.`)}
            </li>
          );
        })}
      </ol>
    );
  };

  // const renderList = (items) => {
  //   return (
  //     <ol className="list-decimal pl-5 space-y-2 text-[#00522E] text-base font-medium mt-2">
  //       {items.map((item, index) => (
  //         <li key={index}>
  //           {item.href ? (
  //             <a
  //               href={item.href}
  //               onClick={(e) => handleSmoothScroll(e, item.href)}
  //               className="hover:underline text-inherit"
  //             >
  //               {item.text}
  //             </a>
  //           ) : (
  //             <span>{item.text}</span>
  //           )}
  //           {item.children &&
  //             item.children.length > 0 &&
  //             renderList(item.children)}
  //         </li>
  //       ))}
  //     </ol>
  //   );
  // };

  return (
    <div className={styles.tableOfContentContainer}>
      <div className={styles.tableHeader} onClick={toggleTableContent}>
        <p>{translation.blogs.tableOfContent}</p>
        <button
          className={styles.toggleButton}
          aria-label="Toggle table of contents"
        >
          <span className="text-sm">
            {!showTableContent
              ? translation.buttons.seeMore
              : translation.buttons.seeLess}
          </span>
          <Image
            src="https://images.tractorgyan.com/uploads/119519/6847e5d814a79-up_arrow_button.webp"
            width={20}
            height={20}
            alt="up_arrow_button"
            title="up_arrow_button"
            className={`${
              showTableContent ? "rotate-0" : "rotate-180"
            } h-4 w-4 transition-transform duration-300 md:h-6 md:w-6`}
          />
        </button>
      </div>

      {showTableContent && (
        <div className={styles.tableContent}>
          {renderNumberedList(tocItems)}
        </div>
      )}
    </div>
  );
}
