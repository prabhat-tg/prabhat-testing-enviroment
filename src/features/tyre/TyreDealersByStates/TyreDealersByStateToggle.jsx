'use client';
import React, { useState, useEffect } from 'react';

const TyreDealersByStateToggle = ({ translation, buttonText }) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const list = document.querySelector('#tyre-states-grid .tyre-states-grid');
    if (list) {
      if (showAll) {
        list.classList.add('expanded');
        list.classList.remove('collapsed');
      } else {
        list.classList.add('collapsed');
        list.classList.remove('expanded');
      }
    }
  }, [showAll]);

  return (
    <button
      onClick={() => setShowAll(v => !v)}
      className="mx-auto mt-4 flex rounded-lg bg-primary px-4 py-2 text-lg text-white"
      type="button"
    >
      {showAll
        ? translation?.buttons?.viewLess || 'View Less'
        : buttonText || translation?.buttons?.viewAllStates || 'View All'}
    </button>
  );
};

export default TyreDealersByStateToggle;
