import React from "react";
import { Link } from "react-router-dom";
function Button({
  text,
  icon: Icon,
  icon2: Icon2,
  bg = "bg-white",
  textColor = "text-gray-900",
  borderColor = "border-gray-900",
  onClick,
  padding = "py-[7px] px-4",
  textSize = "text-base",
  fontWeight = "font-normal",
  rounded = "rounded-md",
  extraClasses = "",
  width = "w-auto",
  link = "#",
}) {
  return (
    <Link to={link}>
      <button
        onClick={onClick}
        className={`flex ${width} items-center justify-center gap-2 border-2 ${borderColor} ${bg} ${textColor} ${fontWeight} ${textSize} ${padding} ${rounded} ${extraClasses}`}
      >
        {Icon && <Icon size={20} />}
        <p>{text}</p>
        {Icon2 && <Icon2 size={20} />}
      </button>
    </Link>
  );
}

export default Button;
