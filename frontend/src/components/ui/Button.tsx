import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonSize, ButtonVariant } from "../../types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  outlined?: boolean;
  size?: ButtonSize;
}

const Button = ({
  children,
  variant = ButtonVariant.Primary,
  outlined = false,
  size = ButtonSize.Medium,
  type = "button",
  onClick,
}: ButtonProps) => {
  const buttonSize =
    size === ButtonSize.Small
      ? "px-4 py-2"
      : size === ButtonSize.Large
      ? "px-7 py-4 text-xl"
      : "px-4 py-3";
  let classes = "";

  switch (variant) {
    case ButtonVariant.Danger:
      classes = outlined
        ? "text-red-500 bg-white border-red-500 border px-6"
        : "bg-red-500 text-white px-6";
      break;

    default:
      classes = outlined
        ? "text-primary-dark bg-white border-primary-dark border px-6"
        : "bg-primary-dark text-white";
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-lg ${classes} ${buttonSize}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
