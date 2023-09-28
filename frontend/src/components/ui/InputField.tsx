import React, { useState } from "react";
import OpenEye from "../../../public/OpenEye";
import ClosedEye from "../../../public/ClosedEye";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  styles
}: {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  styles: any;
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
          "!w-2/3"} w-full border border-gray-200 flex justify-between rounded-xl p-3`}
      >
        <input
          type={show ? "text" : type}
          name={name}
          className="placeholder:text-lg outline-none border-none h-full flex-1"
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
