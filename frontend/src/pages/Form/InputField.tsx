import React, { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface validateProps {
  htmlfor: string;
  label: string;
  name?: string;
  type: string;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: React.ComponentProps<"input">["onChange"];
  errorMessage?: string;
  icon?: ReactNode;
  showPassword?: () => void;
  register?: UseFormRegisterReturn;
}

function InputField(prop: validateProps) {
  return (
    <div className="grid relative">
      <label htmlFor={prop.htmlfor} className="font-semibold">
        {prop.label}
      </label>
      <input
        type={prop.type}
        id={prop.id}
        placeholder={prop.placeholder}
        value={prop.value}
        {...prop.register}
        onChange={prop.onChange}
        className="bg-gray-50 border border-gray-300 w-72 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
      />
      <div
        onClick={prop.showPassword}
        className="absolute cursor-pointer top-10 right-2"
      >
        {prop.icon}
      </div>
    </div>
  );
}

export default InputField;
