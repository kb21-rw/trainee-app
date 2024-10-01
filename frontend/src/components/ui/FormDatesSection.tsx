import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import FormDateInput from "./FormDateInput";
import { ApplicationFormProps } from "../../utils/types";

interface Props {
  control: Control<ApplicationFormProps>;
  errors: FieldErrors<ApplicationFormProps>;
}

export const DateSection: React.FC<Props> = ({ control, errors }) => (
  <div className="flex items-center gap-x-56">
    <div>
      <FormDateInput
        name="startDate"
        label="Application open date"
        control={control}
      />
      {errors.startDate && (
        <p className="text-red-400">Start date should not be empty</p>
      )}
    </div>
    <div>
      <FormDateInput
        name="endDate"
        label="Application close date"
        control={control}
      />
      {errors.endDate && (
        <p className="text-red-400">End date should not be empty</p>
      )}
    </div>
  </div>
);
