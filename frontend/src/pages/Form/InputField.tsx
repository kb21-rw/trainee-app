import React, { ReactNode } from "react";
// import { useForm } from "react-hook-form";

interface validateProps {
  htmlfor: string;
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: () => void;
  errorMessage?: string;
  icon?: ReactNode;
  showPassword?: () => void;
}

function InputField(prop: validateProps) {
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm();

  return (
    <div className="grid relative">
      <label htmlFor={prop.htmlfor} className="font-semibold">
        {prop.label}
      </label>
      <input
        type={prop.type}
        id={prop.id}
        // {...register("email", {
        //   required: true,
        //   pattern:
        //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        // })}
        placeholder={prop.placeholder}
        value={prop.value}
        onChange={prop.onChange}
        className="bg-gray-50 border border-gray-300 w-72 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-blue-500 focus:border-2"
      />
      <div
        onClick={prop.showPassword}
        className="absolute cursor-pointer top-10 right-2"
      >
        {prop.icon}
      </div>

      {/* {errors.email && (
        <span className="error text-red-500">{prop.errorMessage}</span>
      )} */}
    </div>
  );
}

export default InputField;
