import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-primary-dark py-[14px] rounded-xl text-white font-medium text-base w-full text-center cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
