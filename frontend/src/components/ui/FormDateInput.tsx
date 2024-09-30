import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, Controller } from "react-hook-form";

export interface FormInputProps {
  name: string;
  control: Control<any>;
}

const FormDateInput = ({ name, control }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          value={value || null}
          onChange={(newValue) => onChange(newValue)}
        />
      )}
    />
    </LocalizationProvider>
  );
};

export default FormDateInput;