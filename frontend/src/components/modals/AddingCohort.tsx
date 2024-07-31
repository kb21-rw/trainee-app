import React from "react";
import ModalLayout from "./ModalLayout";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    useCreateCohortMutation,
} from "../../features/user/apiSlice";
import Loader from "../ui/Loader";
import Alert from "../ui/Alert";
import useAutoCloseModal from "../../utils/hooks/useAutoCloseModal";
import TextArea from "../ui/TextArea";
import { CreateCohort } from "../../utils/types";

const AddingCohortModal = ({
  closePopup,
  jwt,
}: {
  closePopup: () => void;
  jwt: string;
}) => {
  const [createCohort, { isLoading, error, isSuccess }] =
    useCreateCohortMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCohort>();

  const onSubmit: SubmitHandler<CreateCohort> = async (data) => {
    await createCohort({
      jwt,
      body: data,
    });
  };

  useAutoCloseModal(isSuccess, closePopup);

  const errorMessage: any =
    errors?.name?.message ||
    errors?.description?.message ||
    error?.data?.errorMessage;

  return (
    <ModalLayout closePopup={closePopup} title="Add Cohort">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      {isSuccess && (
        <Alert type="success">Cohort was created successfully</Alert>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <InputField
          type="text"
          label="Cohort Name"
          placeholder="Cohort name"
          name="name"
          register={register}
          options={{
            required: { value: true, message: "Cohort name is required field" },
            maxLength: {
              value: 30,
              message: "Name must not exceed 30 characters",
            },
          }}
        />
        <TextArea
          name="description"
          label="Cohort Description"
          placeholder="Cohort description"
          register={register}
          options={{
            required: { value: true, message: "Cohort description is a required field" },
          }}
        />
        <div className="flex gap-2">
          <Button outlined onClick={closePopup}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddingCohortModal;
