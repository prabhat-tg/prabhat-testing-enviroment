import Image from 'next/image';
import Link from 'next/link';

const MiniTractorCard = ({
  title,
  imgSrc,
  specs, // { label: value }
  className,
  pageUrl,
}) => {
  const CardContent = () => (
    <div
      className={`${className} relative flex flex-col items-center justify-center rounded-lg border border-gray-light p-3 pb-10 shadow-bottom`}
    >
      <Image
        src={imgSrc}
        height={184}
        width={123}
        alt={title}
        title={title}
        className="h-auto max-h-[200px] w-full max-w-[200px] px-2"
      />
      <h2 className="text-md text-center font-semibold">{title}</h2>
      {Object.keys(specs).length > 0 && (
        <div className="absolute -bottom-5 flex h-full max-h-12 w-9/10 justify-between rounded-lg bg-green-mint px-2 py-1.5 text-center text-sm md:w-4/5 md:px-4">
          {Object.entries(specs).map(([label, value], index, arr) => (
            <div
              key={label}
              className={`${
                index !== 0 && index !== arr.length - 1 ? 'mx-1 border-x border-primary px-2' : ''
              } px-1`}
            >
              <h6 className="text-xs font-normal text-gray-dark">{label}</h6>
              <p className="text-xs font-bold md:text-sm">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (pageUrl) {
    return (
      <Link href={pageUrl}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default MiniTractorCard;

// Usage Example
{
  /* <MiniTractorCard title={title} imgSrc={imgSrc} specs={specs} pageUrl={pageUrl} /> */
}
