import React from "react";

const Button = ({ title, onFocused }) => {
  const handleClick = () => {
    onFocused(title);
  };
  return (
    <button
      className={`px-8 py-3 text-xl text-md rounded-full border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-800 hover:border-transparent `}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
