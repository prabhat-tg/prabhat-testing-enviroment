import { tgi_arrow_right } from "@/src/utils/assets/icons";
import Image from "next/image";
import React from "react";

const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white",
  danger: "bg-red-danger text-white hover:bg-red-700",
};

const baseStyle =
  "text-sm lg:text-base px-2 md:px-4 py-2 flex items-center gap-2 font-medium rounded-md transition duration-200 disabled:opacity-50 justify-center";

const TG_Button = ({
  type = "button",
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
  icon = "", // icon image URL
  iconAlt = "Button Icon", // fallback alt text
  iconPosition = "right", // "left" or "right"
  iconClass = "",
}) => {
  const variantStyle = buttonVariants[variant] || buttonVariants.primary;

  const iconMarkup = (
    <Image
      src={icon.length ? icon : tgi_arrow_right}
      alt={iconAlt}
      title={iconAlt}
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      className={`h-3 w-3 ${iconClass}`}
    />
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${className} ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      {icon && iconPosition === "left" && iconMarkup}
      {/* when any user want to rotate images iconClass="rotate-180" */}
      <span>{children}</span>
      {icon && iconPosition === "right" && iconMarkup}
    </button>
  );
};

export default TG_Button;

// example of uses
{
  /* <TG_Button>Next</TG_Button>

<TG_Button
  icon="https://images.tractorgyan.com/uploads/119912/68467f5fec55b-green-arrow.webp"
  iconPosition="left"
>
  Submit
</TG_Button>

<TG_Button
  variant="outline"
  icon="https://images.tractorgyan.com/uploads/119912/68467f5fec55b-green-arrow.webp"
>
  Learn More
</TG_Button> */
}
