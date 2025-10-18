import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function Dropdown({
  options = [],
  defaultValue = "",
  placeholder="",
  bg = "bg-white",
  borderColor = "border-gray-300",
  padding = "py-[8px] px-4",
  rounded = "rounded-md",
  extraClasses = "",
  width = "w-[200px]",
  onChange,
}) {
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;

  return (
    <div className={`relative ${width} ${extraClasses}`}>
      {/* Dropdown Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between ${bg} border ${borderColor} ${padding} ${rounded} cursor-pointer`}
      >
        <span className="text-gray-700">{selectedLabel}</span>
        <IoIosArrowDown
          className={`text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 mt-2 w-full ${bg} border ${borderColor} rounded-md shadow-md z-20`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option.value)}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option.icon && (
                <span className="text-[#17465c]">{option.icon}</span>
              )}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
