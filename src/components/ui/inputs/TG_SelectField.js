'use client';
import React from 'react';

const TG_SelectField = React.forwardRef(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      options = [],
      optionLabelKey = 'label',
      optionValueKey = 'value',
      placeholder = 'Select an option',
      fallback = 'Loading...',
      required = false,
      disabled = false,
      additionalClasses,
      error = '',
    },
    ref
  ) => {
    const baseInputClass =
      'w-full text-sm rounded-lg bg-transparent placeholder:text-gray-description py-2 border focus:outline-none focus:border-green-main';
    const errorClass = error
      ? 'border-error-main focus:ring-error-main'
      : 'border-gray-light focus:ring-green-main';
    const labelClass = 'block mb-1 text-[14px] font-semibold text-black';
    const errorTextClass = 'text-error-main text-xs mt-1 font-medium';

    return (
      <div>
        {label && (
          <label htmlFor={id} className={labelClass}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          name={name || id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${baseInputClass} ${errorClass} ${additionalClasses} h-[38px] px-2`}
        >
          <option value="">{placeholder}</option>
          {options.length > 0 ? (
            options.map((item, index) => (
              <option key={index} value={item[optionValueKey]}>
                {item[optionLabelKey]}
              </option>
            ))
          ) : (
            <option disabled>{fallback}</option>
          )}
        </select>

        {error && <p className={errorTextClass}>{error}</p>}
      </div>
    );
  }
);

TG_SelectField.displayName = 'TG_SelectField';

export default TG_SelectField;
