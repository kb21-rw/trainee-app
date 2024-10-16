import React from "react";
import ModalLayout from "./ModalLayout";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCoachMutation } from "../../features/user/apiSlice";
import Loader from "../ui/Loader";
import Alert from "../ui/Alert";
import { CreateCoach, UserRole } from "../../utils/types";
import useAutoCloseModal from "../../utils/hooks/useAutoCloseModal";
const AddingCoachModal = ({
  closePopup,
  jwt,
}: {
  closePopup: () => void;
  jwt: string;
}) => {
  const [createCoach, { isLoading, error, isSuccess }] =
    useCreateCoachMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCoach>();

  const onSubmit: SubmitHandler<CreateCoach> = async (data) => {
    try {
      await createCoach({ jwt, body: { ...data, role: UserRole.Coach } }).unwrap();
    } catch (error) {
      return "false";
    }
  };

  useAutoCloseModal(isSuccess, closePopup);
  const errorMessage: any =
    errors.name?.message || errors.email?.message || error?.data?.errorMessage;
  return (
    <ModalLayout closePopup={closePopup} title="Add coach">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      {isSuccess && <Alert type="success">Coach was added succesfully</Alert>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full"
      >
        <InputField
          type="text"
          label="Name"
          placeholder="Coach name"
          name="name"
          register={register}
          options={{
            required: { value: true, message: "name is required field" },
            maxLength: {
              value: 30,
              message: "Name must not exceed 30 characters",
            },
          }}
        />
        <InputField
          type="email"
          label="Email address"
          placeholder="example@mail.com"
          name="email"
          register={register}
          options={{
            required: { value: true, message: "email is required field" },
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

export default AddingCoachModal;
