

'use client';
import React, { useState, useEffect } from 'react';

const AgricultureFarmTractorBrandToggleSection = ({ translation, buttonText }) => {
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const list = document.querySelector('#tractor-brands-grid .tractor-brands-grid');
        if (list) {
            if (showAll) {
                list.classList.add('show-all');
            } else {
                list.classList.remove('show-all');
            }
        }
    }, [showAll]);

    return (
        <button
            onClick={() => setShowAll(v => !v)}
            className="flex bg-primary hover:bg-primary-dark mx-auto mt-4 px-4 py-2 rounded-lg text-white text-lg transition-colors"
            type="button"
        >
            {showAll
                ? translation?.blogs?.showLess || 'Show Less'
                : buttonText || translation?.buttons?.viewAllBrands || 'View All Brands'}
        </button>
    );
};

export default AgricultureFarmTractorBrandToggleSection;