import React, { useState } from "react";
import OpenEye from "../../assets/OpenEye";
import ClosedEye from "../../assets/ClosedEye";

const InputField = ({ label, type, placeholder, name, defaultValue, variant }:{ label:string, type:string, placeholder:string, name:string, defaultValue?:string, variant?:"block"|"inline" }) => {
  const [show, setShow] = useState<boolean>(false);
  const passwordIcon = () => {
    return show ? <OpenEye /> : <ClosedEye />;
  };
  return (
    <div className={`flex ${variant==="inline"?"justify-between":"flex-col gap-5 "} w-full`}>
      <label htmlFor={label} className={`text-lg font-medium ${variant==="inline"? "self-start flex-1":""}`}>
        {label}:
      </label>
      <div
        className={`w-full border border-gray-200 flex justify-between pr-3 rounded-xl h-14 ${variant === "inline"? "max-w-lg":""}`}
      >
        <input
          type={show ? "text" : type}
          name={name}
          className={`placeholder:text-lg outline-none border-none h-full pl-3 rounded-xl accent-white w-full`}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />

        {type === "password" &&
          <button type="button" onClick={() => setShow(!show)}>
            {passwordIcon()}
          </button>}
      </div>
    </div>
  );
};

export default InputField;
