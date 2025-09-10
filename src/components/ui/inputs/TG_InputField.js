"use client";

const TG_InputField = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  label,
  rows = 4,
  required = false,
  prefix = "",
  maxLength = 10,
}) => {
  const isTextarea = type === "textarea";
  const isPhone = type === "tel";

  const handlePhoneInput = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.slice(0, maxLength);
    onChange({
      target: {
        name: id,
        value: inputValue,
      },
    });
  };

  const baseInputClass =
    "w-full text-sm rounded-lg bg-transparent placeholder:text-gray-description py-2 border focus:outline-none focus:border-green-main";

  const errorClass = error
    ? "border-error-main focus:ring-error-main"
    : "border-gray-light focus:ring-green-main";
  const labelClass = "block mb-1 text-[14px] font-semibold text-black";
  const errorTextClass = "text-error-main text-xs mt-1 font-medium";

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`${baseInputClass} ${errorClass} min-h-[100px] resize-y px-2 py-2`}
        />
      ) : (
        <div className="relative">
          {prefix && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-semibold text-black">
              {prefix}
            </span>
          )}
          <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={isPhone ? handlePhoneInput : onChange}
            placeholder={placeholder}
            required={required}
            {...(isPhone ? { maxLength } : {})}
            className={`${baseInputClass} ${errorClass} ${
              prefix ? "pl-10" : "px-2"
            }`}
          />
        </div>
      )}

      {error && <p className={errorTextClass}>{error}</p>}
    </div>
  );
};

export default TG_InputField;
