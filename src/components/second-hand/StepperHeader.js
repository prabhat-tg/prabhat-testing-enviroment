'use client';
import { tgi_personal_details_rounded, tgi_personal_details_rounded_active, tgi_tractor_details_rounded, tgi_tractor_details_rounded_active, tgi_tractor_images_rounded, tgi_tractor_images_rounded_active } from '@/src/utils/assets/icons';
import Image from 'next/image';
import React from 'react'

const StepperHeader = ({ currentStep, totalSteps, heading, description }) => {
  const stepperBlockClasses = 'w-10 h-10 md:w-11 md:h-11 rounded-full bg-black border-2 border-primary';
  const StepperIcon = ({icon, title = 'Icon', additionalClasses}) => {
    return (
      <>
      <Image width={40} height={40} src={ icon } alt={title}
        className={`w-full h-full bg-white border-[3px] border-black rounded-full ${additionalClasses}`}
      />
      </>
    );
  }
    return (
      <div className='bg-black text-white rounded-t-xl p-4 md:p-8'>
        <div className='flex justify-between mb-4 overflow-hidden'>
          <div className={`${stepperBlockClasses} z-[3]`}>
            <StepperIcon
              icon={currentStep === 1 ? tgi_tractor_details_rounded_active : tgi_tractor_details_rounded }
              title='Tractor Details Icon'
            />
          </div>
          <div className = 
            {`
              ${stepperBlockClasses} relative
              before:absolute before:z-[0] before:-left-[50vw] before:top-4 md:before:top-5 before:h-[3px] md:before:h-1 before:w-[50vw]
              after:absolute after:z-[0] after:top-4 md:after:top-5 after:h-[3px] md:after:h-1 after:w-[50vw] after:bg-primary
              ${currentStep > 1 ? 'before:bg-primary' : 'before:bg-white'}
              ${currentStep > 2 ? 'after:bg-primary' : 'after:bg-white'}
            `}
          >
            <StepperIcon
              icon={currentStep === 2 ? tgi_personal_details_rounded_active : tgi_personal_details_rounded }
              title='Personal Details Icon'
              additionalClasses='relative z-[3]'
            />
          </div>
          <div className={`${stepperBlockClasses} z-[3]`}>
            <StepperIcon
              icon={currentStep === 3 ? tgi_tractor_images_rounded_active : tgi_tractor_images_rounded }
              title='Tractor Images Icon'
            />
          </div>
        </div>
        <p className="text-gray-light text-xs mb-2">Step {currentStep} of {totalSteps}</p>
        <h2 className="text-2xl font-medium">{heading}</h2>
        <p className="text-xs md:text-sm mt-2 pb-2 md:pb-0">
          {description}
        </p>
      </div>
    );
}

export default StepperHeader
