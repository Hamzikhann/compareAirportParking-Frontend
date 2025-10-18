import React from 'react'

function Input({
  icon: Icon,
  bg = "bg-white",
  borderColor = "border-gray-300",
  placeholder,
  padding = "py-[8px] px-4",
  rounded = "rounded-none", 
  extraClasses = "",
  width = "w-auto",
  type = "text",
  value,
  onChange,
}) {
  return (
    <>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}  className={`flex ${width} items-center justify-center text-black gap-1 border ${borderColor} ${bg} ${padding} ${rounded} ${extraClasses}`}/>
    </>
  )
}

export default Input
