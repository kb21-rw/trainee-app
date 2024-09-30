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

const CreateApplicationForm = () => {
  const [activeInput, setActiveInput] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormDateInputValues>({
    defaultValues: {title: "", description: "", startDate: null, endDate: null},
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
        onFocus={() => setActiveInput("title")}
        className="w-full flex gap-5 mt-10"
      >
        <div
          className={`p-8 custom-shadow border-t-[#673AB7] border-t-8  rounded-xl ${
            activeInput === "title" && "border-l-8 border-l-[#4285F4]"
          }  flex flex-col gap-5 flex-1`}
        >
          <input
            placeholder="Enter title"
            className="outline-none text-[42px] font-bold border-b border-black"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-400">Title shouldn&#39;t be empty</p>
          )}
          <input
            placeholder="Enter description"
            className="outline-none border-b border-black"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-400">Description shouldn&#39;t be empty</p>
          )}
          <div className="flex items-center gap-x-56">
            <div>
              <FormDateInput
                name="startDate"
                label="Application open date"
                control={control}
              />
              {errors.startDate && (
                <p className="text-red-400">
                  Start date shouldn&#39;t be empty
                </p>
              )}
            </div>
            <div>
              <FormDateInput
                name="endDate"
                label="Application close date"
                control={control}
              />
              {errors.endDate && (
                <p className="text-red-400">End date shouldn&#39;t be empty</p>
              )}
            </div>
          </div>
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

export default CreateApplicationForm ;
