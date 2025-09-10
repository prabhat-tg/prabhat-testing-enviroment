import Image from 'next/image';
import Link from 'next/link';
const BrandCards = ({ imgUrl, name, url }) => {
  return (
    <Link href={url} title={name + ' image'} className="w-full">
      {/* <Link
      href={url}
      title={name + " image"}
      className="col-span-3 md:col-span-2 xl:col-span-1"
    > */}
      <div className="mb-2 flex h-[65px] items-center justify-center rounded-xl border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter md:mb-4 md:h-[60px]">
        <Image
          src={imgUrl || ''}
          height={300}
          width={300}
          alt={name}
          title={name}
          className="h-auto max-h-[60px] min-w-[40px] max-w-[70px] md:max-w-[80px]"
        />
      </div>
      <p className="mb-2 text-center text-xs font-semibold">{name}</p>
    </Link>
  );
};
export default BrandCards;
