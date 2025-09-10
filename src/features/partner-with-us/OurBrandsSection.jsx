import Image from 'next/image';
import React from 'react';

const brandLogos = [
    { name: 'TVS', url: 'https://images.tractorgyan.com/uploads/120110/687f904fe435b-tvs.webp' },
    {
        name: 'Sonalika',
        url: 'https://images.tractorgyan.com/uploads/120111/687f90851d178-sonalika.webp',
    },
    {
        name: 'Sonalika Agro',
        url: 'https://images.tractorgyan.com/uploads/120112/687f90a6d5a5b-sonalika-agro.webp',
    },
    { name: 'Solis', url: 'https://images.tractorgyan.com/uploads/120113/687f90b568690-solis.webp' },
    {
        name: 'Shriram',
        url: 'https://images.tractorgyan.com/uploads/120114/687f90c489109-shriram.webp',
    },
    { name: 'RBL', url: 'https://images.tractorgyan.com/uploads/120115/687f90dd11661-rbl.webp' },
    { name: 'Punni', url: 'https://images.tractorgyan.com/uploads/120116/1753190652punni.webp' },
    {
        name: 'Powertrac',
        url: 'https://images.tractorgyan.com/uploads/120117/687f9111c6b0a-powertrac.webp',
    },
    {
        name: 'New Holland',
        url: 'https://images.tractorgyan.com/uploads/120118/687f9123f1fb6-new-holland.webp',
    },
    {
        name: 'Massey Ferguson',
        url: 'https://images.tractorgyan.com/uploads/120119/687f915750d74-mf.webp',
    },
    {
        name: 'Mahindra',
        url: 'https://images.tractorgyan.com/uploads/120120/687f916aec05f-mahindra-(1).webp',
    },
    {
        name: 'Kubota',
        url: 'https://images.tractorgyan.com/uploads/120121/687f9177578f4-kubota.webp',
    },
    {
        name: 'Finance',
        url: 'https://images.tractorgyan.com/uploads/120122/687f91885a2fb-finance.webp',
    },
    {
        name: 'Farmtrac',
        url: 'https://images.tractorgyan.com/uploads/120123/687f919b19d46-farmtrac.webp',
    },
    {
        name: 'Garuda',
        url: 'https://images.tractorgyan.com/uploads/120124/687f91b2efaa0-garuda.webp',
    },
    {
        name: 'Escorts Kubota',
        url: 'https://images.tractorgyan.com/uploads/120125/687f91c2e53b5-escorts-kubota.webp',
    },
    {
        name: 'Eicher',
        url: 'https://images.tractorgyan.com/uploads/120126/687f91d0d1ad4-eicher-(1).webp',
    },
    {
        name: 'Agrizone',
        url: 'https://images.tractorgyan.com/uploads/120127/687f91e1136e0-agrizone.webp',
    },
];

const OurBrandsSection = () => {
    return (
        <section className="bg-[#F1F3F7]">
            <div className="container">
                <h2 className="mb-8 font-bold text-black text-2xl md:text-3xl md:text-left text-center">
                    Brands We Have Worked With
                </h2>
                <div className="gap-4 grid grid-cols-3 lg:grid-cols-6">
                    {brandLogos.map((brand, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center bg-white shadow-sm px-4 rounded-lg"
                        >
                            <Image
                                src={brand.url}
                                alt={brand.name}
                                height={88}
                                width={88}
                                title={brand.name}
                                className="w-auto h-full max-h-[88px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurBrandsSection;
