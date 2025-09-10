import Image from "next/image";
import React from "react";
import Link from "next/link";

const domainCards = [
    {
        href: "https://tractorgyan.com/",
        img: "https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp",
        alt: "Tractor Gyan",
        label: "Tractor Gyan",
        description: "Helping India Mechanise"
    },
    {
        href: "https://www.housegyan.com/",
        img: "https://images.tractorgyan.com/uploads/117176/676d470b03e48-Housegyan.webp",
        alt: "House Gyan",
        label: "House Gyan",
        description: "Building for Bharat"
    },
    {
        href: "https://tractorgyan.com/",
        img: "https://images.tractorgyan.com/uploads/120132/687f93f6f0856-other-domain.webp",
        alt: "OtherDomain",
        label: "Other Domain",
    },

];

const RapsaGroupMembersSection = ({ isMobile }) => {
    return (
        <>
            {
                isMobile ? (<>
                    <section className="w-full bg-white py-2 px-2">
                        <div className="flex flex-col lg:flex-row items-start gap-4 container">
                            {/* Left Content */}
                            <div className="w-full lg:w-1/2">
                                <h2 className="text-xl font-bold text-black mb-4">
                                    Tractor Gyan is proud member of <br />
                                    <span className="text-xl text-black">RapsaGroup</span>
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
                                            className="w-full h-auto object-cover rounded-xl"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-dark font-normal mb-4 mt-2 text-base text-justify">
                                    At Rapsa Group, we are committed to Building for Bharat by offering a diverse
                                    range of solutions tailored to empower rural India. From bridging the gap between
                                    technology and rural India to simplifying house planning decisions, our mission is
                                    to address Bharat’s unique needs. By integrating technology, convenience, and
                                    expertise, we aim to create opportunities and drive growth in every corner of India.
                                </p>
                                <h3 className="text-xl font-semibold text-black mt-6 mb-4">
                                    We serve in a multitude of domains
                                </h3>

                                {/* Domain Cards */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {domainCards.map((item, index) => (
                                        <Link
                                            href={item.href || "#"}
                                            target={item.href ? "_blank" : "_self"}
                                            key={index}
                                            className="block"
                                        >
                                            <div className="bg-blue-lighter p-4 rounded-xl shadow-sm h-full min-h-20 flex flex-col justify-between text-start">
                                                <div className="bg-green-lighter px-4 py-2 rounded-lg flex justify-center">
                                                    <Image
                                                        src={item.img}
                                                        alt={item.alt}
                                                        width={160}
                                                        height={40}
                                                        title="Domain Icon"
                                                        className="object-contain h-10"
                                                    />
                                                </div>
                                                <span className="font-bold text-black text-xl mt-2">{item.label}</span>
                                                <p className="text-xs font-medium text-black mt-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {/* CTA Button */}
                                <button className="bg-primary hover:bg-primary text-white font-semibold text-lg px-6 py-3 rounded-full transition duration-300">
                                    Visit Rapsa Group Website
                                </button>
                            </div>


                        </div>
                    </section>
                </>) : (
                    <>
                        <section className="w-full bg-white py-12 px-4 sm:px-8 md:px-12 lg:px-20">
                            <div className="flex flex-col lg:flex-row items-start gap-10 container">
                                {/* Left Content */}
                                <div className="w-full lg:w-1/2">
                                    <h2 className="text-3xl font-bold text-black mb-4">
                                        Tractor Gyan is proud member of <br />
                                        <span className="text-black">RapsaGroup</span>
                                    </h2>
                                    <p className="text-gray-dark font-normal mb-4 text-base text-justify">
                                        At Rapsa Group, we are committed to Building for Bharat by offering a diverse
                                        range of solutions tailored to empower rural India. From bridging the gap between
                                        technology and rural India to simplifying house planning decisions, our mission is
                                        to address Bharat’s unique needs. By integrating technology, convenience, and
                                        expertise, we aim to create opportunities and drive growth in every corner of India.
                                    </p>
                                    <h3 className="text-xl font-semibold text-black mt-6 mb-4">
                                        We serve in a multitude of domains
                                    </h3>

                                    {/* Domain Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                        {domainCards.slice(0, 3).map((item, idx) => (
                                            <Link
                                                href={item.href || "#"}
                                                target={item.href ? "_blank" : "_self"}
                                                className="block w-full"
                                                key={idx}
                                            >
                                                <div className="bg-blue-lighter p-4 rounded-xl text-start shadow-sm h-full min-h-20 flex flex-col justify-between">
                                                    <div className="bg-green-lighter px-4 py-2 rounded-lg flex justify-center">
                                                        <Image
                                                            src={item.img}
                                                            alt={item.alt}
                                                            width={160}
                                                            height={40}
                                                            title={item.title}
                                                            className="object-contain h-10"
                                                        />
                                                    </div>
                                                    <span className="font-bold text-black text-xl mt-4">{item.label}</span>
                                                    <p className="text-xs font-medium text-black mt-1">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>


                                    {/* CTA Button */}

                                    <button className="bg-primary hover:bg-primary text-white font-medium text-lg px-6 py-3 rounded-full transition duration-300">
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
                                            className="w-full h-auto object-cover rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>

    );
};

export default RapsaGroupMembersSection;
