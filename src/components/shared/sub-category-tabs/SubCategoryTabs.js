import React from 'react';
import Image from 'next/image';


const SubCategoryTabs = ({heading, subcategories}) => {
  return (
    <div className='px-3 py-4 mb-6 rounded-xl border-[1px] border-gray-light bg-white'>
        <h3 className="mb-4 text-lg font-semibold">{heading}</h3>
        <div className='grid grid-cols-3 gap-2'>
          {subcategories.map((item, idx) => (
            <div 
              key={idx} 
              className='col-span-1 mb-2 md:mb-4 px-2 py-3 flex flex-col items-center justify-center rounded-xl border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter'
            >
              <Image
                src={item.img}
                height={70}
                width={70}
                className='h-auto min-w-[40px] max-w-[72px] max-h-[72px] md:max-w-[80px]' 
              />
              <p className='text-center text-xs font-medium'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default SubCategoryTabs;
