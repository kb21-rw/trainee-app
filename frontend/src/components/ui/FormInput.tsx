import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`text-3xl border-black hover:border-b outline-none py-1 px-0.5 ${props.className}`}
    />
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
