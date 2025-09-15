import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const domainCards = [
    {
        href: 'https://tractorgyan.com/',
        img: 'https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp',
        alt: 'Tractor Gyan',
        label: 'Tractor Gyan',
        description: 'जानकारी सही, मिलेगी यहीं!',
    },
    {
        href: 'https://www.housegyan.com/',
        img: 'https://images.tractorgyan.com/uploads/117176/676d470b03e48-Housegyan.webp',
        alt: 'House Gyan',
        label: 'House Gyan',
        description: 'चलो, आपका घर बनाते हैं!',
    },
];

const RapsaGroupMembersSection = ({ isMobile }) => {
    return (
        <>
            {isMobile ? (
                <>
                    <section className="w-full bg-white px-2 py-2">
                        <div className="container flex flex-col items-start gap-4 lg:flex-row">
                            {/* Left Content */}
                            <div className="w-full lg:w-1/2">
                                <h2 className="mb-4 text-xl font-bold text-black">
                                    Tractor Gyan is proud member of <br />
                                    <span className="text-xl text-black">Rapsa Group</span>
                                </h2>
                                {/* Right Image */}
                                <div className="w-full lg:w-1/2">
                                    <div className="w-full overflow-hidden rounded-2xl">
                                        <Image
                                            src="https://images.tractorgyan.com/uploads/120162/68809290d23d0-raspa-group-banner.webp"
                                            alt="Rapsa Group Banner"
                                            width={800}
                                            height={600}
                                            title="Rapsa Group Banner"
                                            className="h-auto w-full rounded-xl object-cover"
                                        />
                                    </div>
                                </div>
                                <p className="mb-4 mt-2 text-justify text-base font-normal text-gray-dark">
                                    At Rapsa Group, we are committed to <strong>Building for Bharat</strong> by
                                    offering a diverse range of solutions tailored to empower rural India in Tear 3
                                    and Tear 4. From bridging the gap between technology and agriculture in India to
                                    simplifying house planning decisions, our mission is to address Bharat’s unique
                                    needs. By integrating technology, convenience, and expertise, we aim to create
                                    opportunities and drive growth in every corner of India.
                                </p>
                                <h3 className="mb-4 mt-6 text-xl font-semibold text-black">
                                    We serve in a multitude of domains
                                </h3>

                                {/* Domain Cards */}
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    {domainCards.map((item, index) => (
                                        <Link
                                            href={item.href || '#'}
                                            target={item.href ? '_blank' : '_self'}
                                            key={index}
                                            className="block"
                                        >
                                            <div className="shadow-sm flex h-full min-h-20 flex-col justify-between rounded-xl bg-blue-lighter p-4 text-start">
                                                <div className="flex justify-center rounded-lg bg-green-lighter px-4 py-2">
                                                    <Image
                                                        src={item.img}
                                                        alt={item.alt}
                                                        width={160}
                                                        height={40}
                                                        title="Domain Icon"
                                                        className="h-10 object-contain"
                                                    />
                                                </div>
                                                <span className="mt-2 text-xl font-bold text-black">{item.label}</span>
                                                <p className="mt-1 text-xs font-medium text-black">{item.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {/* CTA Button */}
                                <button className="rounded-full bg-primary px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-primary">
                                    Visit Rapsa Group Website
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section className="w-full bg-white px-4 py-12 sm:px-8 md:px-12 lg:px-20">
                        <div className="container flex flex-col items-start gap-10 lg:flex-row">
                            {/* Left Content */}
                            <div className="w-full lg:w-1/2">
                                <h2 className="mb-4 text-3xl font-bold text-black">
                                    Tractor Gyan is proud member of <br />
                                    <span className="text-black">Rapsa Group</span>
                                </h2>
                                <p className="mb-4 text-justify text-base font-normal text-gray-dark">
                                    At Rapsa Group, we are committed to <strong>Building for Bharat</strong> by
                                    offering a diverse range of solutions tailored to empower rural India in Tear 3
                                    and Tear 4. From bridging the gap between technology and agriculture in India to
                                    simplifying house planning decisions, our mission is to address Bharat’s unique
                                    needs. By integrating technology, convenience, and expertise, we aim to create
                                    opportunities and drive growth in every corner of India.
                                </p>
                                <h3 className="mb-4 mt-6 text-xl font-semibold text-black">
                                    We serve in a multitude of domains
                                </h3>

                                {/* Domain Cards */}
                                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {domainCards.slice(0, 3).map((item, idx) => (
                                        <Link
                                            href={item.href || '#'}
                                            target={item.href ? '_blank' : '_self'}
                                            className="block w-full"
                                            key={idx}
                                        >
                                            <div className="shadow-sm flex h-full min-h-20 flex-col justify-between rounded-xl bg-blue-lighter p-4 text-start">
                                                <div className="flex justify-center rounded-lg bg-green-lighter px-4 py-2">
                                                    <Image
                                                        src={item.img}
                                                        alt={item.alt}
                                                        width={160}
                                                        height={40}
                                                        title={item.title}
                                                        className="h-10 object-contain"
                                                    />
                                                </div>
                                                <span className="mt-4 text-xl font-bold text-black">{item.label}</span>
                                                <p className="mt-1 text-xs font-medium text-black">{item.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* CTA Button */}

                                <button className="rounded-full bg-primary px-6 py-3 text-lg font-medium text-white transition duration-300 hover:bg-primary">
                                    Visit Rapsa Group Website
                                </button>
                            </div>

                            {/* Right Image */}
                            <div className="w-full lg:w-1/2">
                                <div className="w-full overflow-hidden rounded-2xl">
                                    <Image
                                        src="https://images.tractorgyan.com/uploads/120162/68809290d23d0-raspa-group-banner.webp"
                                        alt="Rapsa Group Banner"
                                        width={800}
                                        height={600}
                                        title="Rapsa Group Banner"
                                        className="h-auto w-full rounded-xl object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default RapsaGroupMembersSection;
