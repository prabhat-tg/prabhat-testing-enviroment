'use client';
import TG_SearchInput from '@/src/components/ui/inputs/SearchInput';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
const StocksList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const stockData = [
        {
            symbol: 'M&M',
            name: 'Mahindra & Mahindra Group',
            price: '₹2,965.50',
            change: '-92.70 (3.09%)',
            isNegative: true,
        },
        {
            symbol: 'TATA',
            name: 'Tata Steel',
            price: '₹150.50',
            change: '+12.05 (2.60%)',
            isNegative: false,
        },
        {
            symbol: 'TATA',
            name: 'Tata Steel',
            price: '₹150.50',
            change: '+12.05 (2.60%)',
            isNegative: false,
        },
        {
            symbol: 'M&M',
            name: 'Mahindra & Mahindra Group',
            price: '₹2,965.50',
            change: '-92.70 (3.09%)',
            isNegative: true,
        },
        {
            symbol: 'M&M',
            name: 'Mahindra & Mahindra Group',
            price: '₹2,965.50',
            change: '-92.70 (3.09%)',
            isNegative: true,
        },
        {
            symbol: 'M&M',
            name: 'Mahindra & Mahindra Group',
            price: '₹2,965.50',
            change: '-92.70 (3.09%)',
            isNegative: true,
        },
    ];
    const NiftyCard = ({ name, value, percent, change, trend = 'down' }) => {
        const isDown = trend === 'down';
        return (
            <Link
                href={'/stocks/detail'}
                title={`know more about stocks`}
                aria-label={`know more about stocks`}
                className={`flex items-center rounded-lg p-2 md:p-4 ${isDown ? 'bg-red-subBg' : 'bg-green-lighter'
                    }`}
            >
                {/* Icon */}
                <div className={`mr-3 h-7 w-7 overflow-hidden rounded-full md:h-10 md:w-10`}>
                    <Image
                        src={
                            isDown
                                ? 'https://images.tractorgyan.com/uploads/120778/68ad8a1c48076-red-arrow-button-icon_small.webp'
                                : 'https://images.tractorgyan.com/uploads/120777/68ad8a1249d4f-green-arrow-button-icon.webp'
                        }
                        height={50}
                        width={50}
                        alt="stock-icon"
                        title="stock-icon"
                        className="w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-1 justify-between">
                    <div>
                        <div className="font-normal text-gray-main text-xs md:text-base">{name}</div>
                        <div className="font-semibold text-black text-sm md:text-lg">{value}</div>
                    </div>
                    <div className="text-right">
                        <div
                            className={`${isDown ? 'text-red-main' : 'text-green-main'} text-[11px] font-normal md:text-base`}
                        >
                            {percent}
                        </div>
                        <div
                            className={`${isDown ? 'text-red-main' : 'text-green-main'} text-[11px] font-medium md:text-base`}
                        >
                            {change}
                        </div>
                    </div>
                </div>
            </Link>
        );
    };
    return (
        <div>
            <div className="gap-2 md:gap-4 grid grid-cols-2 bg-white shadow-main mb-4 md:mb-6 p-3 md:p-4 rounded-lg">
                <NiftyCard name="NIFTY 50" value="24,588.30" percent="-4.5%" change="-24.30" trend="up" />
                <NiftyCard name="NIFTY 50" value="24,588.30" percent="-4.5%" change="-24.30" trend="down" />
            </div>
            <div className="bg-white shadow-main p-3 md:p-4 rounded-lg">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <label className="block mb-2 text-black text-sm">Search for stocks</label>
                    <div className="relative">
                        <TG_SearchInput
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Enter stock name or symbol"
                            value={searchTerm}
                        />
                    </div>
                </div>

                {/* Trending Stocks Header */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-medium text-black text-xs md:text-sm">Trending stocks in News</h2>
                    <div className="font-normal text-[10px] text-black md:text-xs">
                        Last updated at 20 Dec, 2:59 pm IST
                    </div>
                </div>
                {/* Stock List */}
                <div className="space-y-3">
                    {stockData.map((stock, index) => (
                        <div
                            key={index}
                            className="bg-white hover:shadow-card py-3 border-b-[1px] border-b-gray-light last:border-none cursor-pointer"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex-col flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-black px-1 py-1 rounded font-medium text-white text-xs">
                                            {stock.symbol}
                                        </div>
                                        <div className="">
                                            <div className="font-semibold text-black text-sm">{stock.name}</div>
                                        </div>
                                    </div>
                                    <div className="text-black text-sm">
                                        Price: <span className="font-semibold">{stock.price}</span>{' '}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end space-y-2">
                                    <button className="flex items-center gap-1 font-medium text-gray-description hover:text-gray-main transition-colors">
                                        <span className="text-sm">View</span>
                                        <Image
                                            src="https://images.tractorgyan.com/uploads/117142/676901b0c9bf7-gray-arrow.webp"
                                            height={50}
                                            width={50}
                                            alt="open-button-img"
                                            title="open-button-img"
                                            className="w-3 h-2 -rotate-90"
                                        />
                                    </button>

                                    <div className="flex items-center space-x-3">
                                        <div className={`text-sm font-medium text-black`}>{stock.change}</div>

                                        <div
                                            className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${stock.isNegative ? 'bg-red-main' : 'bg-primary'
                                                }`}
                                        >
                                            <Image
                                                src={
                                                    stock.isNegative
                                                        ? 'https://images.tractorgyan.com/uploads/120778/68ad8a1c48076-red-arrow-button-icon_small.webp'
                                                        : 'https://images.tractorgyan.com/uploads/120777/68ad8a1249d4f-green-arrow-button-icon.webp'
                                                }
                                                height={50}
                                                width={50}
                                                alt={`stock-icon`}
                                                title={`stock-icon`}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StocksList;
