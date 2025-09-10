'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTractorHPs } from '../../services/tractor/get-tractor-hps';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorModelsByBrand } from '@/src/services/tractor/get-model-by-brand-v2';

const HomePageBannerSearchClient = ({ currentLang }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState({
    brand: false,
    model: false,
    hp: false,
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [hpOptions, setHpOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedHP, setSelectedHP] = useState(null);
  const [loading, setLoading] = useState({
    brands: false,
    models: false,
    hp: false,
  });

  useEffect(() => {
    loadBrands();
    loadHPOptions();
  }, []);

  const loadBrands = async () => {
    console.log('Load brands');

    setLoading(prev => ({ ...prev, brands: true }));
    try {
      const brandsData = await getTractorBrands(currentLang);
      setBrands(brandsData || []);
    } catch (error) {
      console.error('Error loading brands:', error);
    } finally {
      setLoading(prev => ({ ...prev, brands: false }));
    }
  };

  const loadHPOptions = async () => {
    setLoading(prev => ({ ...prev, hp: true }));
    try {
      const hpData = await getTractorHPs();
      setHpOptions(hpData || []);
    } catch (error) {
      console.error('Error loading HP options:', error);
    } finally {
      setLoading(prev => ({ ...prev, hp: false }));
    }
  };

  const loadModels = async brandName => {
    setLoading(prev => ({ ...prev, models: true }));
    try {
      const modelsData = await getTractorModelsByBrand(brandName, currentLang);
      setModels(modelsData || []);
    } catch (error) {
      console.error('Error loading models:', error);
    } finally {
      setLoading(prev => ({ ...prev, models: false }));
    }
  };

  const handleBrandSelect = brand => {
    if (brand.isDefault) {
      // Reset brand selection
      setSelectedBrand(null);
      setSelectedModel(null);
      setModels([]);
    } else {
      setSelectedBrand(brand);
      setSelectedModel(null);
      setSelectedHP(null);
      setModels([]);
      loadModels(brand.name);
    }
    setIsOpen(prev => ({ ...prev, brand: false }));
  };

  const handleModelSelect = model => {
    if (model.isDefault) {
      // Reset model selection
      setSelectedModel(null);
    } else {
      setSelectedModel(model);
      setSelectedHP(null);
    }
    setIsOpen(prev => ({ ...prev, model: false }));
  };

  const handleHPSelect = hp => {
    if (hp.isDefault) {
      // Reset HP selection
      setSelectedHP(null);
    } else {
      setSelectedHP(hp);
      setSelectedBrand(null);
      setSelectedModel(null);
      setModels([]);
    }
    setIsOpen(prev => ({ ...prev, hp: false }));
  };

  const handleSearch = () => {
    if (selectedModel?.page_url) {
      router.push(selectedModel.page_url);
    } else if (selectedHP?.page_url) {
      router.push(selectedHP.page_url);
    } else {
      alert('Please select a model or HP range to search');
    }
  };

  const toggleDropdown = type => {
    setIsOpen(prev => ({
      brand: type === 'brand' ? !prev.brand : false,
      model: type === 'model' ? !prev.model : false,
      hp: type === 'hp' ? !prev.hp : false,
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
      model: type === 'model' ? 'Select Model' : undefined,
      title: type === 'hp' ? 'Select HP' : undefined,
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
                {type === 'brand' ? item.name : type === 'model' ? item.model : item.title}
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
      <h5 className="mb-4 text-lg font-semibold leading-5">Search Tractors</h5>
      <p className="mb-1.5 text-xs font-medium text-[#595959]">Search by Brands</p>
      <div className="mb-2.5 flex gap-2.5">
        <div className="relative inline-block w-1/2 text-left">
          <DropdownButton
            type="brand"
            placeholder="Select brand"
            selectedValue={selectedBrand?.name}
            disabled={selectedHP}
          />
          <Dropdown
            type="brand"
            items={brands}
            onSelect={handleBrandSelect}
            isLoading={loading.brands}
          />
        </div>
        <div className="relative inline-block w-1/2 text-left">
          <DropdownButton
            type="model"
            placeholder="Select model"
            selectedValue={selectedModel?.model}
            disabled={!selectedBrand || selectedHP}
          />
          {selectedBrand && (
            <Dropdown
              type="model"
              items={models}
              onSelect={handleModelSelect}
              isLoading={loading.models}
            />
          )}
        </div>
      </div>
      <p className="mb-2.5 text-center text-xs font-bold text-[#595959]">OR</p>

      <p className="mb-1.5 text-xs font-medium text-[#595959]">Search by HP</p>
      <div className="mb-2.5 flex gap-2.5">
        <div className="relative inline-block w-full text-left">
          <DropdownButton
            type="hp"
            placeholder="Select HP"
            selectedValue={selectedHP?.title}
            disabled={selectedBrand || selectedModel}
          />
          <Dropdown type="hp" items={hpOptions} onSelect={handleHPSelect} isLoading={loading.hp} />
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

export default HomePageBannerSearchClient;
