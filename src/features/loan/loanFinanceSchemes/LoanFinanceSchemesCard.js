import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LoanFinanceSchemesCard = ({ imgUrl, text, link }) => {
  if (!text) return null;

  return (
    <Link
      href={link || '/'}
      title={text}
      aria-label={`Learn more about ${text} in India`}
      className={`${
        text === 'Agriculture News' ? 'hidden md:flex' : 'flex'
      } h-[120px] w-full max-w-[103px] flex-col items-center justify-center rounded-xl border-2 border-transparent bg-white p-2 shadow-card transition-colors hover:border-secondary hover:bg-green-lighter sm:max-w-[116px] md:h-[160px] md:max-w-[136px] md:p-4 lg:max-w-[170px] xl:max-w-[190px]`}
    >
      <div className="mx-auto flex max-h-[68px] max-w-[110px] items-center justify-center md:mb-2 md:max-h-[100px]">
        <Image
          src={imgUrl}
          height={100}
          width={100}
          alt={`${text} image`}
          title={`${text} image`}
          className="h-auto max-h-[68px] w-auto lg:max-h-[100px]"
          loading="lazy"
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
        />
      </div>

      <span className="text-center text-xs font-semibold leading-[16px] text-black md:text-sm">
        {text}
      </span>
    </Link>
  );
};

export default LoanFinanceSchemesCard;
