import Image from 'next/image';
import React from 'react';

const timelineData = [
    {
        year: '2016',
        desc: (
            <>
                🌱 <strong>TractorGyan was founded</strong> with a vision to simplify agricultural knowledge
                for farmers.
            </>
        ),
    },
    {
        year: '2018',
        desc: (
            <>
                🎥 <strong>First video published on YouTube</strong>, marking our digital entry into farmer
                education.
            </>
        ),
    },
    {
        year: '2019',
        desc: (
            <>
                📑 Became a <strong>Private Limited Company</strong>, strengthening our foundation for
                growth.
            </>
        ),
    },
    {
        year: '2020',
        desc: (
            <>
                {' '}
                <ul>
                    <li>
                        {' '}
                        🔥 Launched our <strong>new logo</strong>, representing innovation and trust.
                    </li>
                    <li>
                        {' '}
                        📺 <strong>YouTube family crossed 1 Lakh subscribers</strong>.{' '}
                    </li>
                    <li>
                        🌍 Achieved <strong>1 Lakh impressions per day on Google</strong>.
                    </li>
                </ul>
            </>
        ),
    },
    {
        year: '2021',
        desc: (
            <>
                <ul>
                    <li>
                        🏆 Honored with the <strong>Brand Impact Award</strong>.
                    </li>
                    <li>
                        {' '}
                        🎬 Our <strong>first video reached 30 Lac views</strong>.
                    </li>
                    <li>
                        {' '}
                        💖 Achieved <strong>50,000 likes on a single reel</strong>.
                    </li>
                </ul>
            </>
        ),
    },
    {
        year: '2022',
        desc: (
            <>
                🚀 Our <strong>Paytm video went viral</strong>, connecting us with millions.
            </>
        ),
    },
    {
        year: '2023',
        desc: (
            <>
                🇮🇳 A proud moment—<strong>PM Narendra Modi mentioned TractorGyan in his speech</strong>.
            </>
        ),
    },
    {
        year: '2024',
        desc: (
            <>
                <ul>
                    <li>
                        📰 Featured in <strong>TOI, Nai Duniya, Dainik Bhaskar, People's Samachar</strong>, and
                        more.
                    </li>
                    <li>
                        🎤 <strong>Navya Nanda spoke about us on CNBC</strong>.
                    </li>
                    <li>
                        🔄 Our <strong>first video crossed 1 Lakh shares</strong>.
                    </li>
                    <li>
                        🏡 Announced <strong>House Gyan</strong>, expanding our vision.
                    </li>
                    <li>
                        {' '}
                        <strong>👥 Ankur Gupta joined as Co-founder & CMO.</strong>
                    </li>
                </ul>
            </>
        ),
    },
    {
        year: '2025',
        desc: (
            <>
                <ul>
                    <li>
                        🌾 Built a <strong>10 Lakh+ farmer community</strong> across social media.
                    </li>
                    <li>
                        {' '}
                        📸 Crossed <strong>100K+ followers on Instagram</strong>.
                    </li>
                </ul>
            </>
        ),
    },
];

const JourneySection = ({ isMobile }) => {
    return (
        <>
            {isMobile ? (
                <>
                    <section className="relative bg-white pb-20">
                        <div className="container max-w-full">
                            {/* Heading */}
                            <h2 className="mb-2 text-left text-xl font-bold text-black">Our Journey 🚜</h2>
                            <h1 className="mb-4 text-left text-base font-medium text-black">
                                From a simple idea in 2016 to becoming one of India’s leading agri-knowledge
                                platforms, TractorGyan has grown with the love and trust of farmers,
                                agri-enthusiasts, and industry leaders. Here’s how our journey unfolded:
                            </h1>

                            <div className="relative">
                                {/* Center vertical line */}
                                <div className="absolute bottom-[80px] left-0 top-[50px] z-0 ml-[20px] w-[6px] rounded-[80px] bg-green-mid" />

                                {/* Timeline content */}
                                <div className="relative z-10 flex flex-col gap-5">
                                    {timelineData.map((item, index) => (
                                        <div key={index} className="relative flex items-center">
                                            {/* Left spacing with icon */}
                                            <div className="relative z-10 flex w-[60px] justify-center">
                                                <div className="shadow-md flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                                                    <Image
                                                        src="https://images.tractorgyan.com/uploads/120078/687f60d703f7c-milestone-icon.webp"
                                                        alt="milestone"
                                                        width={40}
                                                        height={40}
                                                        title="Milestone Icon"
                                                        className="h-10 w-10"
                                                    />
                                                </div>
                                            </div>

                                            {/* Right side content */}
                                            <div className="ml-4 w-full">
                                                <div className="group w-full max-w-none rounded-xl border border-r-4 border-green-lightest bg-white p-2 text-left shadow-card transition-all duration-300 hover:shadow-main">
                                                    <span className="mt-2 text-2xl font-bold text-black">{item.year}</span>
                                                    <p className="mt-1 text-sm font-normal text-black">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Bottom-left tractor image */}
                        <div className="absolute -bottom-1 z-0 block md:hidden">
                            <Image
                                src="https://images.tractorgyan.com/uploads/120170/6880c29077a5c-tractor-gyan-monogram.webp"
                                alt="Tractor"
                                width={110}
                                height={85}
                                title="Tractor Gyan Monogram"
                                className="h-20 w-28"
                            />
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section className="relative pb-40">
                        <div className="container max-w-full">
                            {/* Heading */}
                            <h2 className="mb-2 text-left text-3xl font-bold text-black">Our Journey 🚜</h2>
                            <h1 className="mb-12 text-left text-base font-medium text-black">
                                From a simple idea in 2016 to becoming one of India’s leading agri-knowledge
                                platforms, TractorGyan has grown with the love and trust of farmers,
                                agri-enthusiasts, and industry leaders. Here’s how our journey unfolded:
                            </h1>

                            <div className="relative">
                                {/* Center vertical line */}
                                <div className="absolute bottom-[75px] left-1/2 top-[50px] z-0 w-[6px] -translate-x-1/2 rounded-[80px] bg-green-mid" />

                                {/* Timeline content */}
                                <div className="relative z-10 flex flex-col">
                                    {timelineData.map((item, index) => {
                                        const isLeft = index % 2 === 0;

                                        return (
                                            <div
                                                key={index}
                                                className="relative flex flex-col items-center md:flex-row md:justify-between"
                                            >
                                                {/* Left Side */}
                                                {isLeft ? (
                                                    <>
                                                        <div className="flex justify-end md:w-[45%]">
                                                            <div className="group w-full max-w-none rounded-xl border border-l-4 border-green-lightest bg-white p-3 text-right shadow-card transition-all duration-300 hover:shadow-main">
                                                                <span className="mt-2 text-3xl font-bold text-black">
                                                                    {item.year}
                                                                </span>
                                                                <p className="mt-1 text-base font-normal text-black">{item.desc}</p>
                                                            </div>
                                                        </div>

                                                        {/* Center icon */}
                                                        <div className="absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 transform items-center justify-center rounded-2xl bg-white">
                                                            <Image
                                                                src="https://images.tractorgyan.com/uploads/120574/689c68ca342d8-687f60d703f7c-milestone-icon5.webp"
                                                                alt="milestone"
                                                                width={40}
                                                                height={40}
                                                                title="Milestone Icon"
                                                                className="h-10 w-10"
                                                            />
                                                        </div>

                                                        <div className="md:w-[45%]" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="md:w-[45%]" />

                                                        {/* Center icon */}
                                                        <div className="absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 transform items-center justify-center rounded-2xl bg-white">
                                                            <Image
                                                                src="https://images.tractorgyan.com/uploads/120078/687f60d703f7c-milestone-icon.webp"
                                                                alt="milestone"
                                                                width={40}
                                                                height={40}
                                                                title="Milestone Icon"
                                                                className="h-10 w-10"
                                                            />
                                                        </div>

                                                        {/* Right Side */}
                                                        <div className="flex justify-start md:w-[46%]">
                                                            <div className="group w-full max-w-none rounded-xl border border-r-4 border-green-lightest bg-white p-3 text-left shadow-card transition-all duration-300 hover:shadow-main">
                                                                <span className="mt-2 text-3xl font-bold text-black">
                                                                    {item.year}
                                                                </span>
                                                                <p className="mt-1 text-base font-normal text-black">{item.desc}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* Bottom-left tractor image */}
                        <div className="pointer-events-none absolute -bottom-1 left-0 z-10 hidden md:block">
                            <Image
                                src="https://images.tractorgyan.com/uploads/120170/6880c29077a5c-tractor-gyan-monogram.webp"
                                alt="Tractor"
                                width={280}
                                height={280}
                                title="Tractor Gyan Monogram"
                                className="object-contain"
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default JourneySection;

// import React from 'react';

// const TimelineEvent = ({ year, events, isLeft = false, isLast = false }) => {
//     return (
//         <div className="relative flex items-start">
//             {/* Timeline Road */}
//             {!isLast && (
//                 <div className="absolute left-1/2 transform -translate-x-0.5 top-16 w-1 h-24 bg-green-gradient"></div>
//             )}

//             {/* Content Layout */}
//             <div className={`flex w-full items-center ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
//                 {/* Content Card */}
//                 <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
//                     <div className="bg-white rounded-xl shadow-card border-l-4 border-primary p-4 hover:shadow-main transition-all duration-300 group">
//                         {/* Year Badge */}
//                         <div className="flex items-center mb-3">
//                             <div className="bg-green-gradient text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
//                                 {year}
//                             </div>
//                             <div className="text-lg">🚜</div>
//                         </div>

//                         {/* Events */}
//                         <div className="space-y-2">
//                             {events.map((event, index) => (
//                                 <div key={index} className="flex items-start space-x-2">
//                                     <span className="text-sm mt-0.5 flex-shrink-0">{event.emoji}</span>
//                                     <p
//                                         className="text-gray-main text-sm leading-snug font-sans group-hover:text-black transition-colors"
//                                         dangerouslySetInnerHTML={{ __html: event.text }}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Center Tractor Icon */}
//                 <div className="w-2/12 flex justify-center relative z-10">
//                     <div className="w-12 h-12 bg-white rounded-full border-4 border-primary shadow-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                         <span className="text-lg">🚜</span>
//                     </div>
//                 </div>

//                 {/* Empty Space */}
//                 <div className="w-5/12"></div>
//             </div>
//         </div>
//     );
// };

// const CompactStatsCard = ({ icon, value, label }) => (
//     <div className="bg-white rounded-lg shadow-card p-3 text-center border border-green-mint hover:shadow-main transition-all group">
//         <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{icon}</div>
//         <div className="text-lg font-bold text-primary mb-1">{value}</div>
//         <div className="text-xs text-gray-main">{label}</div>
//     </div>
// );

// const TractorGyanTimeline = () => {
//     const timelineData = [
//         {
//             year: '2016',
//             events: [
//                 {
//                     emoji: '🌱',
//                     text: '<strong class="text-primary">TractorGyan founded</strong> - Vision to simplify agricultural knowledge for farmers'
//                 }
//             ]
//         },
//         {
//             year: '2018',
//             events: [
//                 {
//                     emoji: '🎥',
//                     text: '<strong class="text-primary">First YouTube video</strong> - Digital entry into farmer education'
//                 }
//             ]
//         },
//         {
//             year: '2019',
//             events: [
//                 {
//                     emoji: '📑',
//                     text: '<strong class="text-primary">Private Limited Company</strong> - Foundation strengthened'
//                 }
//             ]
//         },
//         {
//             year: '2020',
//             events: [
//                 {
//                     emoji: '🔥',
//                     text: '<strong class="text-primary">New logo launched</strong> - Innovation & trust'
//                 },
//                 {
//                     emoji: '📺',
//                     text: '<strong class="text-primary">1 Lakh YouTube subscribers</strong>'
//                 },
//                 {
//                     emoji: '🌍',
//                     text: '<strong class="text-primary">1 Lakh daily Google impressions</strong>'
//                 }
//             ]
//         },
//         {
//             year: '2021',
//             events: [
//                 {
//                     emoji: '🏆',
//                     text: '<strong class="text-primary">Brand Impact Award</strong> received'
//                 },
//                 {
//                     emoji: '🎬',
//                     text: '<strong class="text-primary">30 Lac views</strong> on first viral video'
//                 },
//                 {
//                     emoji: '💖',
//                     text: '<strong class="text-primary">50K likes</strong> on single reel'
//                 }
//             ]
//         },
//         {
//             year: '2022',
//             events: [
//                 {
//                     emoji: '🚀',
//                     text: '<strong class="text-primary">Paytm video viral</strong> - Millions connected'
//                 }
//             ]
//         },
//         {
//             year: '2023',
//             events: [
//                 {
//                     emoji: '🇮🇳',
//                     text: '<strong class="text-primary">PM Modi mentioned TractorGyan</strong> in speech'
//                 }
//             ]
//         },
//         {
//             year: '2024',
//             events: [
//                 {
//                     emoji: '📰',
//                     text: '<strong class="text-primary">Featured in major media</strong> - TOI, Nai Duniya, Dainik Bhaskar'
//                 },
//                 {
//                     emoji: '🎤',
//                     text: '<strong class="text-primary">Navya Nanda spoke</strong> about us on CNBC'
//                 },
//                 {
//                     emoji: '🔄',
//                     text: '<strong class="text-primary">1 Lakh shares</strong> milestone'
//                 },
//                 {
//                     emoji: '🏡',
//                     text: '<strong class="text-primary">House Gyan announced</strong> - Vision expanded'
//                 },
//                 {
//                     emoji: '👥',
//                     text: '<strong class="text-primary">Ankur Gupta joins</strong> as Co-founder & CMO'
//                 }
//             ]
//         },
//         {
//             year: '2025',
//             events: [
//                 {
//                     emoji: '🌾',
//                     text: '<strong class="text-primary">10 Lakh+ farmer community</strong> built'
//                 },
//                 {
//                     emoji: '📸',
//                     text: '<strong class="text-primary">100K+ Instagram followers</strong>'
//                 }
//             ]
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-section-gray font-sans">
//             {/* Compact Header */}
//             <div className="bg-green-dark-gradient py-12 px-4 relative">
//                 <div className="max-w-5xl mx-auto">
//                     <div className="flex items-center justify-center mb-6">
//                         <div className="bg-white bg-opacity-20 rounded-full p-2 mr-4">
//                             <span className="text-4xl">🚜</span>
//                         </div>
//                         <h1 className="text-4xl md:text-5xl font-bold text-white">Our Journey</h1>
//                     </div>
//                     <p className="text-green-mint text-center text-lg mb-8 max-w-3xl mx-auto">
//                         From 2016 startup to India's leading agri-knowledge platform
//                     </p>

//                     {/* Compact Stats */}
//                     <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
//                         <CompactStatsCard icon="🌾" value="10L+" label="Farmers" />
//                         <CompactStatsCard icon="📺" value="1L+" label="YouTube" />
//                         <CompactStatsCard icon="📸" value="100K+" label="Instagram" />
//                         <CompactStatsCard icon="🏆" value="9+" label="Years" />
//                     </div>
//                 </div>
//             </div>

//             {/* Compact Timeline */}
//             <div className="max-w-5xl mx-auto px-4 py-12">
//                 <div className="space-y-6">
//                     {timelineData.map((item, index) => (
//                         <TimelineEvent
//                             key={item.year}
//                             year={item.year}
//                             events={item.events}
//                             isLeft={index % 2 === 0}
//                             isLast={index === timelineData.length - 1}
//                         />
//                     ))}
//                 </div>

//                 {/* Compact Footer */}
//                 <div className="text-center mt-12 bg-white rounded-xl shadow-card p-6 border border-green-mint">
//                     <div className="flex items-center justify-center mb-3">
//                         <span className="text-2xl mr-2">🌾</span>
//                         <h3 className="text-xl font-bold text-header">Growing with India's Farmers</h3>
//                         <span className="text-2xl ml-2">🌾</span>
//                     </div>
//                     <p className="text-gray-main text-sm">Empowering agriculture through knowledge and technology</p>
//                 </div>
//             </div>

//             {/* Subtle Background Elements */}
//             <div className="fixed top-20 right-5 text-2xl opacity-5 animate-spin" style={{ animationDuration: '15s' }}>⚙️</div>
//             <div className="fixed bottom-20 left-5 text-xl opacity-5 animate-bounce delay-1000">🌱</div>
//         </div>
//     );
// };

// export default TractorGyanTimeline;
