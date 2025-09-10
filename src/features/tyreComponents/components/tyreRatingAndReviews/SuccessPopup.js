import React from 'react';
import Image from 'next/image';
import { WhatsappChannel } from '@/src/components/shared/otpVerificationAndThankYouPopup/SubmitOtpForm';

const PopupWrapper = ({ children }) => (
  <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
    <div className="container">{children}</div>
  </div>
);

const SuccessPopup = ({ message, onClose, translation }) => {
  return (
    <PopupWrapper>
      <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[600px] md:px-4">
        <div className="flex flex-col items-center justify-center gap-2 overflow-auto">
          <Image
            src="https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp"
            height={100}
            width={100}
            title="success icon"
            alt="success icon"
            className="mx-auto my-2 flex max-w-[60px] md:my-4 md:max-w-[80px]"
          />
          <button
            className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
            onClick={onClose}
          >
            <Image
              src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
              height={50}
              width={50}
              alt="close icon"
              title="close icon"
            />
          </button>
          <div className="mb-4 text-center">
            <span className="text-sm text-gray-main md:text-2xl">{message}</span>
          </div>
          <WhatsappChannel translation={translation} />
        </div>
      </div>
    </PopupWrapper>
  );
};

export default SuccessPopup;
