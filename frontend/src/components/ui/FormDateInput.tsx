import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Controller } from "react-hook-form";
import moment from "moment";
import { ApplicationFormProps } from "../../utils/types";

interface DateSectionProps {
  control: Control<ApplicationFormProps>;
  errors: FieldErrors<ApplicationFormProps>;
}

const FormDateInputs: React.FC<DateSectionProps> = ({ control, errors }) => {

  const renderDatePicker = (name: "startDate" | "endDate", label: string) => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, ...props }) => (
          <DatePicker
            value={field.value ? moment(field.value) : null}
            onChange={(date) => {
              console.log({ date });
              field.onChange(date);
            }}
            label={label}
            {...props}
          />
        )}
      />
    </LocalizationProvider>
  );


  return (
    <div className="flex items-center gap-20">
      <div>
        {renderDatePicker("startDate", "Application open date")}
        {errors.startDate && (
          <p className="text-red-400">{errors.startDate.message}</p>
        )}
      </div>
      <div>
        {renderDatePicker("endDate", "Application close date")}
        {errors.endDate && (
          <p className="text-red-400">{errors.endDate.message}</p>
        )}
      </div>
    </div>
  );
};

export default FormDateInputs;