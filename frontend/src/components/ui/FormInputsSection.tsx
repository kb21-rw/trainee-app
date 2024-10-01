import React from "react";
import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { ApplicationFormProps } from "../../utils/types";

interface Props {
  register: UseFormRegister<ApplicationFormProps>;
  errors: FieldErrors<ApplicationFormProps>;
  control:  Control<ApplicationFormProps>;
  activeInput: string;
}

export const FormInputsSection: React.FC<Props> = ({
  register,
  errors,
  activeInput,
}) => {
  return (
    <div
      className={`p-8 custom-shadow border-t-[#673AB7] border-t-8 rounded-xl ${
        activeInput === "title" && "border-l-8 border-l-[#4285F4]"
      } flex flex-col gap-5 flex-1`}
    >
      <input
        placeholder="Enter title"
        className="outline-none text-[42px] font-bold border-b border-black"
        {...register("title")}
      />
      {errors.title && (
        <p className="text-red-400">Title should not be empty</p>
      )}
      <input
        placeholder="Enter description"
        className="outline-none border-b border-black"
        {...register("description")}
      />
      {errors.description && (
        <p className="text-red-400">Description should not be empty</p>
      )}
      
    </div>
  );
}