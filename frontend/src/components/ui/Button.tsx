import React, { ReactNode } from "react";

const Button = ({ children, variant, clickHandler }: {children:ReactNode, variant?: "small"|"large", clickHandler?: ()=>void}) => {
  return (
    <button onClick={clickHandler} className={`bg-primary-dark py-3.5  text-white font-medium text-base flex items-center justify-center ${variant ==="small"?"rounded-lg pl-4 pr-6":"rounded-xl w-full"} text-center cursor-pointer`}>
      {children}
    </button>
  );
};

export default Button;
