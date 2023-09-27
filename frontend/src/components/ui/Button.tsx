import React from "react";

const Button = ({ children }) => {
  return (
    <div className="bg-primary py-[14px] rounded-xl text-white font-medium text-base w-full text-center">
      {children}
    </div>
  );
};

export default Button;
