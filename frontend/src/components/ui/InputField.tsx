import React, { useState } from "react";
import OpenEye from "../../assets/OpenEye";
import ClosedEye from "../../assets/ClosedEye";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  styles,
  defaultValue
}: {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  styles?: string;
  defaultValue?: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const passwordIcon = () => {
    return show ? <OpenEye /> : <ClosedEye />;
  };
  return (
    <div className={`${styles ? styles : "flex flex-col gap-5"} w-full`}>
      <label htmlFor={label} className="text-lg font-medium">
        {label} {!styles && ":"}
      </label>
      <div
        className={`${styles &&
          "!w-2/3"} w-full border border-gray-200 flex justify-between rounded-xl px-3 h-[58px]`}
      >
        <input
          type={show ? "text" : type}
          name={name}
          className="placeholder:text-lg outline-none border-none h-full flex-1"
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
