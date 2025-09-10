

import Image from 'next/image';
import React from 'react';

const brandLogos = [
    {
        name: 'Massey Ferguson',
        url: 'https://images.tractorgyan.com/uploads/120585/689d8b5921b13-mf.webp',
    },
    {
        name: 'Sonalika',
        url: 'https://images.tractorgyan.com/uploads/120592/689d8bdc5fbd1-sonalika.webp',
    },
    {
        name: 'Powertrac',
        url: 'https://images.tractorgyan.com/uploads/120587/689d8b7d21ff3-powertrac.webp',
    },
    {
        name: 'New Holland',
        url: 'https://images.tractorgyan.com/uploads/120586/689d8b7007d04-new-holland-tractor-logo.webp',
    },

    {
        name: 'Mahindra',
        url: 'https://images.tractorgyan.com/uploads/120584/689d8b4999ee3-mahindra-tractor-logo.webp',
    },
    {
        name: 'Kubota',
        url: 'https://images.tractorgyan.com/uploads/120121/687f9177578f4-kubota.webp',
    },
    {
        name: 'Farmtrac',
        url: 'https://images.tractorgyan.com/uploads/120581/689d8aff52f81-farmtrac.webp',
    },
    {
        name: 'Eicher',
        url: 'https://images.tractorgyan.com/uploads/120579/689d8adcbecdc-eicher-(1).webp',
    },
    {
        name: 'Escorts Kubota',
        url: 'https://images.tractorgyan.com/uploads/120580/689d8aecc6437-escorts-kubota.webp',
    },
    { name: 'Punni', url: 'https://images.tractorgyan.com/uploads/120588/689d8b8d0e455-punni.webp' },

    { name: 'Solis', url: 'https://images.tractorgyan.com/uploads/120591/689d8bbec1445-solis.webp' },
    {
        name: 'Agrizone',
        url: 'https://images.tractorgyan.com/uploads/120578/689d8ac28447c-agrizone.webp',
    },
    { name: 'TVS', url: 'https://images.tractorgyan.com/uploads/120594/689d8c008500a-tvs.webp' },

    {
        name: 'Sonalika Agro',
        url: 'https://images.tractorgyan.com/uploads/120593/689d8bee31583-sonalika-agro.webp',
    }, {
        name: 'Shriram',
        url: 'https://images.tractorgyan.com/uploads/120590/689d8baae9aee-shriram.webp',
    },
    { name: 'RBL', url: 'https://images.tractorgyan.com/uploads/120589/689d8b9e569e4-rbl.webp' },

    {
        name: 'Finance',
        url: 'https://images.tractorgyan.com/uploads/120583/689d8b284d6a6-iti.webp',
    },

    {
        name: 'Garuda',
        url: 'https://images.tractorgyan.com/uploads/120582/689d8b10a79c9-garuda.webp',
    },



];

const BrandsSection = ({ isMobile }) => {
    return (
        <section className="bg-blue-lighter">
            <div className="mx-auto md:max-w-7xl container">
                <h2 className="mb-8 font-bold text-black text-2xl md:text-3xl md:text-left text-start">
                    Brands Who Trust Us
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

export default BrandsSection;
