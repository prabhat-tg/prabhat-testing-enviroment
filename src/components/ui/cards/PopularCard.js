import React from "react";
import Link from "next/link";
import Image from "next/image";
import { tgi_arrow_right } from "@/src/utils/assets/icons";

const TG_PopularCard = ({
  title,
  imageSrc,
  imageAlt,
  detailUrl,
  type = "tractor", // "tractor", "tyre", or "implement"
  specs = {}, // { label: value }
  translation
}) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-light bg-white p-5 transition-all duration-300 hover:border-secondary hover:bg-green-lighter">
      <div>
        <h5 className={`${type === "implement" ? "mb-0 min-h-[46px]" : "mb-2.5 min-h-[56px]"} line-clamp-2 text-lg font-semibold leading-6 text-black md:min-h-[45px] py-1`}>
          <Link
            href={detailUrl}
            title={title}
            aria-label={`Read more about ${title}`}
          >
            {title}
          </Link>
        </h5>

        <Link
          href={detailUrl}
          title={title}
          aria-label={`View details about ${title}`}
          className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm text-white"
        >
          {translation.buttons.viewDetails}
          <Image
            src={tgi_arrow_right}
            alt="view details"
            width={10}
            height={10}
            className="h-2.5 w-2.5"
          />
        </Link>
      </div>

      <Link
        href={detailUrl}
        className={type === "implement" ? "mb-0" : "mb-4"}
        title={title}
        aria-label={`Image of ${title}`}
      >
        <Image
          src={
            `https://images.tractorgyan.com/uploads/${imageSrc}`
          }
          alt={imageAlt || title}
          width={500}
          height={500}
          className="m-auto object-contain"
          loading="lazy"
        />
      </Link>

      {Object.keys(specs).length > 0 && (
        <div className=" flex h-full max-h-12 justify-between rounded-lg bg-green-mint px-2 py-1.5 text-center text-sm">
          {Object.entries(specs).map(([label, value], index, arr) => (
            <div
              key={label}
              className={`${index !== 0 && index !== arr.length - 1
                ? "mx-1 border-x border-primary px-2"
                : ""
                } flex flex-1 flex-col items-center max-w-[90px]`}
            >
              <span className="w-full text-xs font-normal text-gray-dark text-nowrap truncate">{label}</span>
              <p className="w-full font-bold text-nowrap truncate">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TG_PopularCard;

// example of uses

// for tyre ui
// <TG_PopularCard
//   title="Apollo Farmking 12.4x28 - Rear Tyre"
//   detailUrl="/en/tyre/apollo-farmking-12-4-x-28/27"
//   imageSrc="https://images.tractorgyan.com/uploads/112155/65e9b10cbaf85-Apollo-Farmking-12-4-28.webp"
//   type="tyre"
//   specs={{ Type: "Rear", Size: "12.4x28", Brand: "Apollo" }}
// />

// for tractor
// <TG_PopularCard
//   title="Mahindra 575 Di Xp Plus"
//   detailUrl="/tractor/mahindra-575-di-xp-plus/440"
//   imageSrc="https://images.tractorgyan.com/uploads/2835/6136239820b0a_mahindra-575-DI-XP-Plus-tractorgyan.jpg"
//   type="tractor"
//   specs={{ HP: "46.9", Cylinder: "4", "Lifting Capacity": "1500 Kg" }}
// />
