import React from "react";

const TextArea = ({
 label,
 placeholder,
 name,
 styles,
 defaultValue,
 register,
 options,
 autoFocus,
}: {
 label: string;
 placeholder: string;
 name: string;
 styles?: string;
 defaultValue?: string;
 register?: any;
 options?: any;
 autoFocus?: any;
}) => {
 return (
    <div className={`${styles ? styles : "flex flex-col gap-5"} w-full`}>
      <label htmlFor={label} className="text-lg font-medium px-3">
        {label} {!styles && ":"}
      </label>
      <div
        className={`${
          styles && "!w-2/3"
        } w-full border border-gray-200 rounded-md flex justify-between py-2 px-3 h-32`}
      >
        <textarea
          name={name}
          autoFocus={autoFocus}
          className="placeholder:text-lg outline-none border-none h-full flex-1 resize-none"
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...(register && { ...register(name, options) })}
        />
      </div>
    </div>
 );
};

export default TextArea;
