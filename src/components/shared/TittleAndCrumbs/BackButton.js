'use client';
import { tgi_arrow_right_green } from '@/src/utils/assets/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className="mb-2 md:mb-0 flex items-center justify-center gap-2">
      <Image
        src={tgi_arrow_right_green}
        height={16}
        width={16}
        alt="back-arrow"
        title="back-arrow"
        className="h-4 w-4"
      />
      <span className="text-base text-green-main">Back</span>
    </button>
  );
}
