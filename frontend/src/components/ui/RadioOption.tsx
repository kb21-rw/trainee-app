/* eslint-disable no-unused-vars */
import React from "react";
interface RadioOptionProps {
  option: string;
  id: string;
  value: string;
  onRadioChange: (value: string) => void;
  checked: boolean;
  disabled?: boolean;
}

const RadioOption = ({ option, id, value, checked, disabled, onRadioChange }: RadioOptionProps) => {

  const handleClick = () => {
    onRadioChange(value);
  };

  return (
    <div key={option} className="flex items-center gap-3">
        <input
          type="radio"
          id={id}
          name="option"
          onChange={handleClick}
          checked={checked}
          value={value}
          disabled={disabled}
        />
        <label htmlFor={id}>{option}</label>
    </div>
  );
};

export default RadioOption;
