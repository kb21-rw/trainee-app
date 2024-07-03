import React, { ReactNode } from "react";
import { ButtonVariant, ButtonType} from "../../types";
const Button = ({
  children,
  variant,
  clickHandler,
  outlined,
  type,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  clickHandler?: () => void;
  outlined?: boolean;
  type?: ButtonType;
  disabled?: boolean;
  clicked?: boolean;
}) => {
  return (
    <button
      onClick={clickHandler}
      className={`${
        outlined
        ? "text-primary-dark bg-white border-primary-dark border rounded-lg px-6"
        : variant === ButtonVariant.Delete
        ? "bg-red-500 text-white rounded-lg px-6"
        : variant === ButtonVariant.Small
        ? "bg-primary-dark text-white rounded-lg pl-4 pr-6"
        : variant === ButtonVariant.Edit
        ? "bg-primary-dark text-white rounded-lg px-6 flex items-center justify-center"
        : "bg-primary-dark text-white rounded-lg w-full"
    } py-4 font-medium text-base flex items-center justify-center text-center cursor-pointer`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
