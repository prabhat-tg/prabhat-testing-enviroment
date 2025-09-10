import Image from "next/image";
import React from "react";

const linkVariants = {
  outline: "border border-gray-light hover:border-secondary hover:bg-green-lighter",
  primary: "bg-primary text-white hover:bg-green-main",
  ghost: "bg-transparent hover:underline",
};

const baseStyle =
  "w-fit whitespace-nowrap flex justify-center items-center gap-[9px] px-[15px] py-2 mt-4 rounded-[20px] transition-all duration-300";

const TG_LinkButton = ({
  href = "#",
  children,
  variant = "outline",
  className = "",
  iconSrc = "",
  iconAlt = "Arrow Icon",
  iconClass = "",
  title = "Read More",
  target,
  iconPosition, // Extract this to prevent it from going to DOM
  icon, // Extract this to prevent it from going to DOM
  ...props
}) => {
  const isValidVariant = typeof linkVariants[variant] !== "undefined";
  const variantStyle = isValidVariant
    ? linkVariants[variant]
    : linkVariants.outline;

  const isExternal = target === "_blank";

  // Filter out DOM-invalid props
  const { iconPosition: _, icon: __, ...domProps } = props;

  //noopener: Prevents the new page from accessing window.opener
  // noreferrer: Also removes the Referer header for additional privacy
  return (
    <a
      href={href}
      title={title}
      aria-label={title}
      target={target}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...domProps}
    >
      <span className="text-sm lg:text-base">{children}</span>
      {iconSrc && (
        <span className="h-auto max-h-4 w-full max-w-4 lg:max-h-5 lg:max-w-5">
          <Image
            src={
              iconSrc.length
                ? iconSrc
                : "https://images.tractorgyan.com/uploads/119912/68467f5fec55b-green-arrow.webp"
            }
            alt={iconAlt}
            title={iconAlt}
            width={20}
            height={20}
            loading="lazy"
            decoding="async"
            className={iconClass}
          />
        </span>
      )}
    </a>
  );
};

export default TG_LinkButton;

// Usage Example
// <TG_LinkButton
//   href="/tractor-news"
//   variant="primary"
//   iconSrc="https://images.tractorgyan.com/uploads/119912/68467f5fec55b-green-arrow.webp"
// >
//   Read More
// </TG_LinkButton>

// for external links
// <TG_LinkButton href="https://google.com" target="_blank" variant="ghost">
//   External Link
// </TG_LinkButton>

{
  /* <TG_LinkButton
    variant="primary"
    href="/tractor-industry-news-blogs/1879/retail-tractors-sales-in-june-2025"
    iconSrc
    iconClass="blogsListing_green_arrow_icon__HYj35"
>
    Read More
</TG_LinkButton> */
}
