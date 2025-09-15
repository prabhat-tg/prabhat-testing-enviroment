import React from 'react';
import Image from 'next/image';
import TG_Heading from '@/src/components/ui/headings/Heading';
import TG_LinkButton from '@/src/components/ui/buttons/TgLinkButton';

const NewsFeed = () => {
    const newsItems = [
        {
            id: 1,
            title:
                'Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News',
            description:
                'Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News. Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News. Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News',
            timestamp: '22 Oct, 2:38 pm',
            image: 'https://images.tractorgyan.com/uploads/120784/68ada753799d1-stock-dummy-image.webp',
        },
        {
            id: 2,
            title:
                'Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News',
            description:
                'Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News. Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News. Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News',
            timestamp: '22 Oct, 2:38 pm',
            image: 'https://images.tractorgyan.com/uploads/120784/68ada753799d1-stock-dummy-image.webp',
        },
        {
            id: 3,
            title:
                'Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News',
            description:
                'Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News. Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News. Mahindra & Mahindra Financial Q2 Results Live: Profit Rises by 38.54% YoY | Company Business News',
            timestamp: '22 Oct, 2:38 pm',
            image: 'https://images.tractorgyan.com/uploads/120784/68ada753799d1-stock-dummy-image.webp',
        },
    ];

    return (
        <div>
            <TG_Heading level={2} className="!mb-4">
                Tractor Industry News
            </TG_Heading>
            {/* News  list */}
            <div className="space-y-4 lg:space-y-6">
                {newsItems.map(item => (
                    <article
                        key={item.id}
                        className="bg-white shadow-card hover:shadow-main p-4 border border-gray-light rounded-lg overflow-hidden transition-shadow duration-200 cursor-pointer"
                    >
                        <div className="flex sm:flex-row flex-col gap-2 md:gap-4">
                            {/* Image Section */}
                            <div className="w-full sm:w-48 lg:w-1/5 lg:min-w-[350px] h-48 md:h-full md:min-h-40">
                                <Image
                                    src={item.image}
                                    height={400}
                                    width={400}
                                    alt="news-image"
                                    title="news-image"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex-1">
                                <div className="flex flex-col h-full">
                                    {/* Title */}
                                    <h6 className="mb-2 md:mb-3 font-semibold text-black text-base lg:text-lg line-clamp-2 leading-tight">
                                        {item.title}
                                    </h6>

                                    {/* Description */}
                                    <p className="flex-grow mb-2 md:mb-3 text-gray-dark text-sm lg:text-base line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center gap-2">
                                        <button className="self-start font-medium text-primary hover:text-secondary text-sm md:text-base transition-colors">
                                            Read More
                                        </button>
                                        <span className="font-normal text-gray-description text-xs lg:text-sm">
                                            {item.timestamp}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            <TG_LinkButton
                className="mx-auto rounded-lg"
                title={'Read more about stocks'}
                href="/tractor-news"
                variant="primary"
            >
                View All News
            </TG_LinkButton>
        </div>
    );
};

export default NewsFeed;
