import Image from 'next/image';
import React from 'react';

const StockCard = ({
    symbol = "M&M",
    companyName = "Mahindra & Mahindra Ltd",
    currentPrice = 24588.30,
    priceChange = 24.30,
    percentageChange = 3.5,
    isPositive = true,
    openPrice = 2763.00,
    highPrice = 2763.00,
    lowPrice = 2763.00,
    peRatio = 28.72,
    divYield = 0.74,
    marketCap = "3.39LCr",
    chartData = null
}) => {
    // Default chart data matching the pattern in screenshot
    const defaultChartData = [
        45, 42, 38, 35, 32, 28, 25, 30, 35, 32, 28, 25, 22, 18, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 88, 85, 82, 78, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 12, 8, 5, 8, 12, 18, 25, 32, 38, 45, 52, 58, 65, 70, 75, 78, 82, 85, 88, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 18, 22, 28, 35, 40, 45, 48, 52, 55, 58, 62, 65, 68, 70, 68, 65, 60, 55, 50, 45, 42
    ];

    const data = chartData || defaultChartData;

    // Create smooth path
    const pathData = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - value; // Invert Y for SVG coordinate system
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Create area path for gradient fill
    const areaPath = `${pathData} L 100 100 L 0 100 Z`;

    // Format currency
    const formatCurrency = (value) => {
        return `₹${new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value)}`;
    };

    // Format number with commas
    const formatNumber = (value) => {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="bg-white shadow-main mb-4 md:mb-6 p-3 md:p-4 rounded-lg">
            {/* Header */}
            <div className="">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                    <div className="bg-black px-3 py-1 rounded font-bold text-white text-xs md:text-base">
                        {symbol}
                    </div>
                    <span className="font-semibold text-black text-lg md:text-2xl">
                        {companyName}
                    </span>
                </div>
            </div>

            {/* Green section with price and stats */}
            <div className="bg-green-snowy-mint mb-2 p-2 md:p-4 rounded-lg">
                {/* Price and Change */}
                <div className="flex items-start gap-1 md:gap-3">
                    <div className={`md:mr-3 h-7 w-7 overflow-hidden rounded-full md:h-10 md:w-10`}>
                        <Image
                            src={
                                isPositive
                                    ? 'https://images.tractorgyan.com/uploads/120777/68ad8a1249d4f-green-arrow-button-icon.webp' : 'https://images.tractorgyan.com/uploads/120778/68ad8a1c48076-red-arrow-button-icon_small.webp'
                            }
                            height={50}
                            width={50}
                            alt="stock-icon"
                            title="stock-icon"
                            className="w-full h-full"
                        />
                    </div>

                    <div className='flex-1'>
                        <div className="mb-1.5 md:mb-3 font-bold text-black text-base md:text-2xl">
                            {formatCurrency(currentPrice)}

                            <span className={`text-xs md:text-lg font-medium ${isPositive ? 'text-primary' : 'text-red-main'} ml-2`}>
                                +{formatNumber(priceChange)} (+{percentageChange}%)
                            </span>
                        </div>
                        {/* Stats Grid */}
                        <div className="gap-1 md:gap-x-16 md:gap-y-3 grid grid-cols-3 text-[11px] md:text-sm">
                            <div className="flex gap-1 md:gap-2 text-gray-main">
                                <span className="font-medium">Open:</span>
                                <span className="font-normal">{formatNumber(openPrice)}</span>
                            </div>
                            <div className="flex gap-1 md:gap-2 text-gray-main">
                                <span className="font-medium">High:</span>
                                <span className="font-normal">{formatNumber(highPrice)}</span>
                            </div>
                            <div className="flex gap-1 md:gap-2 text-gray-main">
                                <span className="font-medium">Low:</span>
                                <span className="font-normal">{formatNumber(lowPrice)}</span>
                            </div>
                            <div className="flex gap-1 md:gap-2 text-gray-main">
                                <span className="font-medium">P/E Ratio:</span>
                                <span className="font-normal">{peRatio}</span>
                            </div>
                            <div className="flex gap-1 md:gap-2 text-gray-main">
                                <span className="font-medium">Div Yield:</span>
                                <span className="font-normal">{divYield}%</span>
                            </div>
                            <div className="flex gap-1 md:gap-2 text-gray-main">
                                <span className="font-medium">Mkt Cap:</span>
                                <span className="font-normal">{marketCap}</span>
                            </div>
                        </div>

                    </div>
                </div>


            </div>

            {/* Chart */}
            <div className="relative h-48">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0"
                >
                    <defs>
                        <linearGradient id={`chartGradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                            <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.4" />
                            <stop offset="70%" stopColor="#c4b5fd" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id={`bgGradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ddd6fe" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>

                    {/* Background */}
                    <rect width="100" height="100" fill={`url(#bgGradient-${symbol})`} />

                    {/* Area fill */}
                    <path
                        d={areaPath}
                        fill={`url(#chartGradient-${symbol})`}
                    />

                    {/* Main line */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="0.8"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>
        </div>
    );
};

export default StockCard;


// Example usage component
{/* Custom Stock Example */ }
// <StockCard
//     symbol="TCS"
//     companyName="Tata Consultancy Services"
//     currentPrice={3456.75}
//     priceChange={45.20}
//     percentageChange={1.29}
//     isPositive={false}
//     openPrice={3500.00}
//     highPrice={3520.50}
//     lowPrice={3445.25}
//     peRatio={32.15}
//     divYield={1.2}
//     marketCap="12.5LCr"
// />