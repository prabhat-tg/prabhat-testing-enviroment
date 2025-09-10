import Image from 'next/image';

const DigitalPresenceSection = () => {
    const services = [
        { id: 1, title: 'Brand Promotions' },
        { id: 2, title: 'Increase Sales' },
        { id: 3, title: 'Brand Awareness' },
        { id: 4, title: 'Promotional Videos' },
        { id: 5, title: 'Promotional Content' },
        { id: 6, title: 'Lead Generation' },
    ];

    return (
        <>
            <section className="max-md:pb-0">
                <div className="container">
                    <div className="items-center md:gap-6 grid lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="font-bold text-black lg:text-[32px] text-2xl leading-tight">
                                    Digital Presence and Market Outreach
                                </h2>

                                <div className="space-y-2 font-medium text-black text-sm">
                                    <p>
                                        We have worked with the elite and top players of the travel industry and help
                                        them promote themselves and inch out to their target audience through our
                                        one-click solution platform.
                                    </p>
                                    <p>
                                        Apart from our website, we work through social platforms widely to create
                                        extensive brand awareness campaigns, creating digital launches, promoting
                                        through Google search, promoting videos and so on. We also list our dealers
                                        specific to help their target audience get better reach and easy solutions of
                                        purchasing tractors.
                                    </p>
                                </div>
                            </div>

                            {/* Services Grid */}
                            <div className="gap-2 md:gap-4 grid grid-cols-2">
                                {services.map(service => (
                                    <div
                                        key={service.id}
                                        className="flex items-center space-x-2 md:space-x-3 bg-green-lighter hover:shadow-sm p-2 rounded-lg transition-shadow"
                                    >
                                        <div className="flex justify-center items-center w-8 h-8">
                                            <Image
                                                src="https://images.tractorgyan.com/uploads/120061/687e2e6a28e26-sheild-green-icon.webp"
                                                alt="service icon"
                                                title="service icon"
                                                width={40}
                                                height={40}
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <span className="font-medium text-xs md:text-sm">{service.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="w-auto md:h-[400px]">
                                <Image
                                    src="https://images.tractorgyan.com/uploads/120218/68820707d26a2-digital_marketing_image.webp"
                                    alt="Digital Presence Illustration"
                                    title="Digital Presence Illustration"
                                    height={525}
                                    width={500}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DigitalPresenceSection;
