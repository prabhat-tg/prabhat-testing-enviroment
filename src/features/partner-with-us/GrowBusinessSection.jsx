'use client';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import Image from 'next/image';
import React from 'react';

const GrowBusinessSection = () => {
    const handleScrollToForm = () => {
        const form = document.getElementById('business-contact-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="max-md:pt-3">
            <div className="container">
                <TittleAndCrumbs
                    title={'Partner With Us'}
                    breadcrumbs={[
                        {
                            label: 'Home',
                            href: '/',
                            title: 'Home',
                        },
                        { label: 'Partner With Us', title: 'Partner With Us', isCurrent: true },
                    ]}
                />
                <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-16">
                    {/* Left Column */}
                    <div className="flex-1 md:text-left">
                        <h2 className="mb-2 md:mb-4 font-bold text-black text-2xl md:text-4xl">
                            Grow your business with us
                        </h2>
                        <p className="mx-auto md:mx-0 mb-4 max-w-xl text-gray-700 text-sm md:text-base leading-relaxed">
                            TractorGyan is the leading online information platform in India, we host
                            <strong> 32 Million+ </strong>
                            in-market audiences on yearly basis. Having market leads in your cabin over a cup of
                            coffee is like some business is seriously brewing here. Yes, TractorGyan proudly
                            covers up the esteemed tractor brands like Massey Ferguson, Sonalika, New Holland,
                            Eicher, Farmtrac, Solis, Powertrac, and many more.
                        </p>
                        <TG_Button onClick={handleScrollToForm} className="!rounded-full">
                            Let's Talk Business
                        </TG_Button>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-1 justify-center">
                        <Image
                            src="https://images.tractorgyan.com/uploads/120042/687de980c201c-partner-illustration.webp" // Replace with your actual SVG path
                            height={400}
                            width={400}
                            alt="Business Partnership Illustration"
                            title="Business Partnership Illustration"
                            className="w-full max-w-md h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowBusinessSection;
