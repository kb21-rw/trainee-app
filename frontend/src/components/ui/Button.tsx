import React, { ReactNode } from "react";

const Button = ({ children }:{children: ReactNode}) => {
  return (
    <button className="bg-primary-dark py-[14px] rounded-xl text-white font-medium text-base w-full text-center cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
