'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllImplementCategories } from '@/src/services/implement/all-implement-categories';
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';

const ImplementHomePageBannerSearchClient = ({ currentLang }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState({
    brand: false,
    category: false,
  });

  const [brands, setBrands] = useState([]);
  const [categoryOptions, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState({
    brands: false,
    category: false,
  });

  useEffect(() => {
    loadBrands();
    loadCategories();
  }, []);

  const loadBrands = async () => {
    setLoading(prev => ({ ...prev, brands: true }));
    try {
      const brandsData = await getAllImplementBrandsDetail();
      setBrands(brandsData || []);
    } catch (error) {
      console.error('Error loading brands:', error);
    } finally {
      setLoading(prev => ({ ...prev, brands: false }));
    }
  };

  const loadCategories = async () => {
    setLoading(prev => ({ ...prev, category: true }));
    try {
      const categoriesData = await getAllImplementCategories();
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading Categories:', error);
    } finally {
      setLoading(prev => ({ ...prev, category: false }));
    }
  };

  const handleBrandSelect = brand => {
    if (brand.isDefault) {
      // Reset brand selection
      setSelectedBrand(null);
    } else {
      setSelectedBrand(brand);
      setSelectedCategory(null);
    }
    setIsOpen(prev => ({ ...prev, brand: false }));
  };

  const handleCategorySelect = category => {
    if (category.isDefault) {
      // Reset Category selection
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedBrand(null);
    }
    setIsOpen(prev => ({ ...prev, category: false }));
  };

  const handleSearch = () => {
    if (selectedBrand?.page_url) {
      router.push(selectedBrand.page_url);
    } else if (selectedCategory?.url) {
      router.push(selectedCategory.url);
    } else {
      alert('Please select a brand or type to search');
    }
  };

  const toggleDropdown = type => {
    setIsOpen(prev => ({
      brand: type === 'brand' ? !prev.brand : false,
      category: type === 'category' ? !prev.category : false,
    }));
  };

  const DropdownButton = ({ type, placeholder, selectedValue, disabled = false }) => (
    <button
      type="button"
      className={`shadow-sm ring-gray-300 hover:bg-gray-50 inline-flex w-full items-center justify-between gap-x-1.5 rounded-md bg-white px-2 py-1.5 text-xs font-normal ring-1 ring-inset ${disabled ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-[#AFAFAF]'
        }`}
      onClick={() => !disabled && toggleDropdown(type)}
      disabled={disabled}
    >
      {selectedValue || placeholder}
      <svg
        className="-mr-1 h-5 w-5 text-[#AFAFAF]"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );

  const Dropdown = ({ type, items, onSelect, isLoading }) => {
    // Create default option based on type
    const defaultOption = {
      isDefault: true,
      name: type === 'brand' ? 'Select Brand' : undefined,
      title: type === 'category' ? 'Select Type' : undefined,
    };

    // Combine default option with items
    const allItems = [defaultOption, ...items];

    return (
      <div
        className={`${isOpen[type] ? 'block' : 'hidden'
          } shadow-lg absolute right-0 z-10 mt-2 max-h-48 w-full origin-top-right overflow-y-auto rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
      >
        <div className="py-1" role="none">
          {isLoading ? (
            <div className="text-gray-500 px-4 py-2 text-xs">Loading...</div>
          ) : allItems.length > 1 ? (
            allItems.map((item, index) => (
              <button
                key={index}
                className={`${item.isDefault
                  ? 'text-gray-500 border-gray-200 border-b font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
                  } block w-full px-4 py-1 text-left text-xs`}
                onClick={() => onSelect(item)}
              >
                {item.name}
              </button>
            ))
          ) : (
            <div className="text-gray-500 px-4 py-2 text-xs">No options available</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ms-auto mt-7 hidden h-[251px] w-full max-w-[302px] rounded-xl bg-white p-[18px] shadow-[0px_2.89px_12.28px_0px_#50635054] md:block">
      <h5 className="mb-4 text-lg font-semibold leading-5">Search Implements</h5>
      <p className="mb-1.5 text-xs font-medium text-[#595959]">Search by Brands</p>
      <div className="mb-2.5 flex gap-2.5">
        <div className="relative inline-block w-full text-left">
          <DropdownButton
            type="brand"
            placeholder="Select brand"
            selectedValue={selectedBrand?.name}
            disabled={selectedCategory}
          />
          <Dropdown
            type="brand"
            items={brands}
            onSelect={handleBrandSelect}
            isLoading={loading.brands}
          />
        </div>
      </div>
      <p className="mb-2.5 text-center text-xs font-bold text-[#595959]">OR</p>

      <p className="mb-1.5 text-xs font-medium text-[#595959]">Search by Type</p>
      <div className="mb-2.5 flex gap-2.5">
        <div className="relative inline-block w-full text-left">
          <DropdownButton
            type="category"
            placeholder="Select Type"
            selectedValue={selectedCategory?.name}
            disabled={selectedBrand}
          />
          <Dropdown type="category" items={categoryOptions} onSelect={handleCategorySelect} isLoading={loading.category} />
        </div>
      </div>
      <button
        className="hover:bg-green-600 mx-auto flex rounded-md bg-[#46AA48] px-4 py-1.5 text-xs text-white transition-colors"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default ImplementHomePageBannerSearchClient;
