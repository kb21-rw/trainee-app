import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonSize, ButtonVariant } from "../../utils/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  outlined?: boolean;
  size?: ButtonSize;
}

const getVariantOutlinedStyles = (
  variant: ButtonVariant,
  outlined: boolean
) => {
  switch (variant) {
    case ButtonVariant.Danger:
      return outlined
        ? "text-red-500 bg-white border-red-500 border px-6"
        : "bg-red-500 text-white px-6";

    default:
      return outlined
        ? "text-primary-dark bg-white border-primary-dark border px-6"
        : "bg-primary-dark text-white";
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case ButtonSize.Small:
      return "px-4 py-2";
    case ButtonSize.Large:
      return "px-7 py-4 text-xl";

    default:
      return "px-4 py-3";
  }
};

const Button = ({
  children,
  variant = ButtonVariant.Primary,
  outlined = false,
  size = ButtonSize.Medium,
  type = "button",
  onClick,
}: ButtonProps) => {
  const sizeStyles = getSizeStyles(size);
  const valiantOutlinedStyles = getVariantOutlinedStyles(variant, outlined);

  return (
    <button
      onClick={onClick}
      className={`rounded-lg ${valiantOutlinedStyles} ${sizeStyles}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
