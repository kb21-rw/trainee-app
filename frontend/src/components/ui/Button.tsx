import React, { ReactNode } from "react";

const Button = ({
  children,
  variant,
  clickHandler,
  outlined,
  type,
}: {
  children: ReactNode;
  variant?: "small" | "large" | "delete";
  clickHandler?: () => void;
  outlined?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={clickHandler}
      className={`${
        outlined
          ? "text-primary-dark bg-white border-primary-dark border rounded-lg px-6"
          : variant === 'delete'
          ? "bg-red-500 text-white rounded-lg px-6"
          : variant === "small"
          ? "bg-primary-dark text-white rounded-lg pl-4 pr-6"
          : "bg-primary-dark text-white rounded-lg w-full"
      } py-4 font-medium text-base flex items-center justify-center text-center cursor-pointer`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

