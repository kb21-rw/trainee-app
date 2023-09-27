import React, { useState } from "react";
import OpenEye from "../../../public/OpenEye";
import ClosedEye from "../../../public/ClosedEye";

const InputField = ({ label, type, placeholder, name }:{ label:string, type:string, placeholder:string, name:string }) => {
  const [show, setShow] = useState<boolean>(false);
  const passwordIcon = () => {
    return show ? <OpenEye /> : <ClosedEye />;
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      <label htmlFor={label} className="text-lg font-medium">
        {label}:
      </label>
      <div
        className={`w-full border border-gray-200 flex justify-between  rounded-xl px-3 h-14`}
      >
        <input
          type={show ? "text" : type}
          name={name}
          className="placeholder:text-lg outline-none border-none h-full flex-1 accent-white"
          placeholder={placeholder}
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
