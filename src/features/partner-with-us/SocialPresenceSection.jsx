'use client';

import { getV2SocialMediaCount } from '@/src/services/social/V2SocialMediaCount';
import { modifiedSubsCount } from '@/src/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SocialPresenceSection = () => {
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchSocialMediaCount = async () => {
            try {
                const response = await getV2SocialMediaCount();
                setData(response);
                setIsError(false);
            } catch (error) {
                console.error('Error fetching social media count:', error);
                setIsError(true);
            }
        };

        fetchSocialMediaCount();
    }, []);

    const socialStats = [
        {
            id: 1,
            platform: 'Youtube',
            description: 'Subscribers on Youtube',
            icon: 'https://images.tractorgyan.com/uploads/120046/687e159e07188-youtube-green.webp',
            url: "https://www.youtube.com/@TractorGyan"
        },
        {
            id: 2,
            platform: 'Instagram',
            description: 'Followers on Instagram',
            icon: 'https://images.tractorgyan.com/uploads/120053/687e1f0eb427d-instagram-green.webp',
            url: "https://www.instagram.com/tractorgyan"
        },
        {
            id: 3,
            platform: 'Facebook',
            description: 'Followers on Facebook',
            icon: 'https://images.tractorgyan.com/uploads/120052/687e1e9baf366-facebook-green.webp',
            url: "https://www.facebook.com/TractorsGyan"
        },
        {
            id: 4,
            platform: 'LinkedIn',
            description: 'Followers on LinkedIn',
            icon: 'https://images.tractorgyan.com/uploads/120051/687e1e3013bbd-linkedin-green.webp',
            url: "https://www.linkedin.com/company/tractorgyan"
        },
        {
            id: 5,
            platform: 'WhatsApp',
            description: 'Followers on WhatsApp',
            icon: 'https://images.tractorgyan.com/uploads/120150/6880858cb1e75-whatsapp-green.webp',
            url: "https://whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
        },
        {
            id: 6,
            platform: 'Twitter',
            description: 'Followers on Twitter',
            icon: 'https://images.tractorgyan.com/uploads/120151/688085d85363a-twitterx-green.webp',
            url: "https://twitter.com/TractorGyan"
        },
    ];

    return (
        <section className="bg-secondary">
            <div className="mx-auto md:max-w-7xl container">
                {/* Header */}
                <div className="mb-4 md:mb-8 text-center">
                    <h2 className="mb-2 font-bold text-white md:text-[32px] text-2xl">Our Social Presence</h2>
                    <p className="font-medium text-white text-sm md:text-base">
                        TractorGyan is leading the industry with some great numbers
                    </p>
                </div>

                {/* Social Stats Grid */}
                <div className="flex flex-wrap justify-between sm:justify-center gap-2 md:gap-3 w-full">
                    {socialStats.map(stat => {
                        const matched = data.find(
                            item => item.name?.toLowerCase() === stat.platform.toLowerCase()
                        );

                        const rawCount = matched?.count || '0';
                        const formatted = modifiedSubsCount(rawCount);
                        const numericPart = formatted.replace(/[^\d.]/g, '');
                        const suffix = formatted.replace(/[\d.]/g, '');

                        return (
                            <div
                                key={stat.id}
                                className="flex justify-center items-center space-x-3 md:space-x-4 bg-white shadow-lg hover:shadow-xl p-1 md:p-2 rounded-lg w-[48.5%] md:w-full md:min-w-[180px] lg:min-w-[280px] md:max-w-[280px] lg:max-w-[300px]"
                            >
                                {/* Icon */}
                                <Link href={stat.url} target='_blank'>
                                    <div className="flex-shrink-0">
                                        <Image
                                            src={stat.icon}
                                            alt={`${stat.platform} icon`}
                                            title={`${stat.platform} icon`}
                                            width={32}
                                            height={32}
                                            className="w-auto max-w-8 h-full max-h-8 md:max-h-10"
                                        />
                                    </div>
                                </Link>

                                <Link href={stat.url} target='_blank'>
                                    <div className="flex-grow">
                                        <div className="font-bold text-black text-base md:text-xl">
                                            {numericPart}
                                            <span className="text-primary"> {suffix}+</span>
                                        </div>
                                        <div className="font-medium text-black text-xs md:text-sm">
                                            {stat.description}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Optional error display */}
                {isError && (
                    <p className="mt-6 text-red-500 text-center">
                        Error loading social data. Please try again later.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SocialPresenceSection;
