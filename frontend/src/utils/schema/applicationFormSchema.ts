import * as yup from "yup";

export const applicationFormSchema = yup.object().shape({
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
  stages: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
      }),
    )
    .required(),
});
