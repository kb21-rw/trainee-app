import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormDateInput from "../../components/ui/FormDateInput";
import { H1 } from "../../components/ui/Typography";
import SuccessCheckMarkIcon from "../../assets/SuccessCheckMarkIcon";
import CheckMarkIcon from "../../assets/CheckMarkIcon";
import AddIcon from "../../assets/AddIcon";
import DeleteIcon from "../../assets/DeleteIcon";
import Alert from "../../components/ui/Alert";

const schema = yup.object().shape({
  title: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  startDate: yup
    .date()
    .required("Start Date is required")
    .nullable()
    .typeError("Start Date must be a valid date"),
  endDate: yup
    .date()
    .required("End Date is required")
    .nullable()
    .typeError("End Date must be a valid date")
    .min(yup.ref("startDate"), "End Date cannot be before Start Date"),
});

interface FormDateInputValues {
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}

const MyForm = () => {
  const [activeQuestion, setActiveQuestion] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormDateInputValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormDateInputValues) => {
    console.log("Form data:", data);
  };

  return (
    <>
      <H1>
        <div className="text-center">
          <span>Application Form</span>
        </div>
      </H1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onFocus={() => setActiveQuestion("title")}
        className="w-full flex gap-5 mt-10"
      >
        <div
          className={`p-8 custom-shadow border-t-[#673AB7] border-t-8  rounded-xl ${
            activeQuestion === "title" && "border-l-8 border-l-[#4285F4]"
          }  flex flex-col gap-5 flex-1`}
        >
          <input
            placeholder="Enter title"
            className="outline-none text-[42px] font-bold border-b border-black"
            {...register("title")}
          />
          <input
            placeholder="Enter description"
            className="outline-none border-b border-black"
            {...register("description")}
          />
          <div className="flex items-center gap-x-56">
            <div className="space-y-3">
              <p>Start Date</p>
              <FormDateInput
                name="startDate"
                control={control}
              />
            </div>
            <div className="space-y-3">
              <p>End Date</p>
              <FormDateInput
                name="endDate"
                control={control}
              />
            </div>
          </div>
          {errors.description && (
            <Alert type="error">Description shouldn&#39;t be empty</Alert>
          )}
          {errors.title && (
            <Alert type="error">Title shouldn&#39;t be empty</Alert>
          )}
          {errors.startDate && (
            <Alert type="error">Start date shouldn&#39;t be empty</Alert>
          )}
          {errors.endDate && (
            <Alert type="error">End date shouldn&#39;t be empty</Alert>
          )}
        </div>
        <div className="flex flex-col gap-6  p-4 custom-shadow rounded-xl h-1/2">
          {isDirty ? (
            <button type="submit" onClick={handleSubmit(onSubmit)}>
              <SuccessCheckMarkIcon />
            </button>
          ) : (
            <CheckMarkIcon />
          )}
          <button type="button">
            <AddIcon />
          </button>
          <button type="button">
            <DeleteIcon />
          </button>
        </div>
      </form>
    </>
  );
};

export default MyForm;
