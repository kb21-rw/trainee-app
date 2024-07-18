import React, { useState } from "react";
import OpenEye from "../../assets/OpenEyeIcon";
import ClosedEye from "../../assets/ClosedEyeIcon";
import { FieldErrors } from "react-hook-form";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  styles,
  defaultValue,
  register,
  options,
  errorMessage,
  errors,
}: {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  styles?: string;
  defaultValue?: string;
  register?: any;
  options?: any;
  errorMessage?: any;
  errors?: FieldErrors;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const passwordIcon = () => {
    return show ? <OpenEye /> : <ClosedEye />;
  };

  errorMessage = name && errors && errors[name]?.message;

  return (
    <div className={`${styles ? styles : "flex flex-col gap-5"} w-full`}>
      <label htmlFor={label} className="text-lg font-medium">
        {label} {!styles && ":"}
      </label>
      <div
        className={`${
          styles && "!w-2/3"
        } w-full border border-gray-200 flex justify-between rounded-xl px-3 h-[58px]`}
      >
        <input
          type={show ? "text" : type}
          name={name}
          className="placeholder:text-lg outline-none border-none h-full flex-1"
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...(register && { ...register(name, options) })}
        />
        {errorMessage && (
          <div className="absolute text-red-500">{errorMessage.toString()}</div>
        )}

        {type === "password" && (
          <button type="button" onClick={() => setShow(!show)}>
            {passwordIcon()}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
