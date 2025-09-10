'use client';
import React, { useState, useEffect } from 'react';

const TractorBrandToggle = ({ translation, buttonText }) => {
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
            className="mx-auto mt-4 flex rounded-lg bg-primary px-4 py-2 text-lg text-white hover:bg-primary-dark transition-colors"
            type="button"
        >
            {showAll
                ? translation?.buttons?.showLess || 'Show Less'
                : buttonText || translation?.buttons?.viewAllBrands || 'View All Brands'}
        </button>
    );
};

export default TractorBrandToggle;