const RangeSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  name,
  formatter = v => v,
  labels = [],
  loanTermType = 'year', // Add this prop for loan tenure suffix
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const MAX_LOAN_AMOUNT = 2000000;
  const unformatNumber = val => parseInt(val.toString().replace(/,/g, ''), 10) || 0;
  const isObjectLabels =
    Array.isArray(labels) && labels.length > 0 && typeof labels[0] === 'object';
  return (
    <div className="w-full">
      {name === 'rateInterestRate' ? (
        <label className="mb-2 block w-fit rounded-[10px] px-2 py-0 text-[15px] font-medium text-black">
          {label}
        </label>
      ) : (
        <label className="mb-2 block text-[15px] font-medium text-black">{label}</label>
      )}
      <div className="relative flex w-full flex-col items-start justify-start gap-5 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex-shrink-0">
          {name === 'loanAmount' && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 transform font-medium text-secondary">
                ₹
              </span>
              <input
                type="tel"
                value={(value > MAX_LOAN_AMOUNT ? MAX_LOAN_AMOUNT : value).toLocaleString('en-IN')}
                onChange={e => {
                  const rawValue = unformatNumber(e.target.value);
                  onChange(rawValue >= MAX_LOAN_AMOUNT ? MAX_LOAN_AMOUNT : rawValue);
                }}
                maxLength="10"
                className="w-32 rounded-lg border border-primary px-2 py-2 pl-8 text-center text-secondary md:w-28 md:px-4"
              />
            </div>
          )}
          {name === 'loanTenure' && (
            <div className="relative">
              <input
                type="tel"
                value={value > max ? max : value.toLocaleString('en-IN')}
                onChange={e => onChange(Math.min(unformatNumber(e.target.value), max))}
                maxLength={'3'}
                className="w-32 rounded-lg border border-primary px-2 py-2 pr-8 text-center text-secondary md:w-28 md:px-4"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform font-medium text-secondary">
                {loanTermType === 'year' ? 'Yr' : 'Mo'}
              </span>
            </div>
          )}
          {name === 'rateInterestRate' && (
            <div className="relative">
              <input
                type="tel"
                value={(value > 30 ? 30 : value).toLocaleString('en-IN')}
                onChange={e => onChange(Math.min(unformatNumber(e.target.value), 30))}
                maxLength={'2'}
                className="w-32 rounded-lg border border-primary px-2 py-2 pr-8 text-center text-secondary md:w-28 md:px-4"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform font-medium text-secondary">
                %
              </span>
            </div>
          )}
        </div>
        <div className="relative w-full min-w-0 flex-1 md:ml-4">
          {/* <div
         className="absolute top-[6px] z-10 w-4 h-4 rounded-full border-4 border-primary bg-white -translate-x-1/2"
         style={{
         left: `${name === "loanAmount" ? percentage : percentage - 0.6}%`,
         top: "2px",
         }}
         /> */}
          {/* <div
         className="absolute -top-7 -translate-x-1/2 text-xs font-semibold text-green-800"
         style={{ left: `${percentage}%` }}
         >
         {formatter(value)}
      </div>
      */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="h-2 w-full appearance-none rounded-full bg-transparent [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[10] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white"
            style={{
              background: `linear-gradient(to right, #008000 0%, #008000 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
          />
          {Array.isArray(labels) && labels.length > 0 && (
            <>
              {isObjectLabels ? (
                <div className="text-gray-600 relative me-1 ms-1 mt-[-6px] text-xs">
                  {labels.map(({ pos, label }, i) => {
                    const left = ((pos - min) / (max - min)) * 100;
                    return (
                      <span
                        key={i}
                        className="absolute grid -translate-x-1/2 place-items-center gap-0 text-gray-secondary"
                        style={{ left: `${left}%`, top: '2px' }}
                      >
                        <span className="font-bold">{`|`}</span>
                        <span>{label}</span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-600 mt-[-5px] flex justify-between text-xs">
                  {labels.map((label, i) => (
                    <span
                      key={i}
                      className="grid place-items-center gap-0 text-center text-gray-secondary"
                    >
                      <span className="font-bold">{`|`}</span>
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default RangeSlider;
