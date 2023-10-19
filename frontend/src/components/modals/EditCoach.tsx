import React from "react";
import { useEditCoachMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import ModalLayout from "./ModalLayout";
import Alert from "../ui/Alert";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const EditCoach = ({
  closePopup,
  jwt,
  coach,
}: {
  closePopup: () => void;
  jwt: string;
  coach: any;
}) => {
  const roles = ["ADMIN", "COACH"];
  const [edit, { isError, isLoading, error, isSuccess }] =
    useEditCoachMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    await edit({ jwt, id: coach[0], body: { ...data } });
  };
  let errorMessage: any = errors.name?.message;
  return (
    <ModalLayout closePopup={closePopup} title="Add trainee">
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      {isSuccess && <Alert type="success">Coach was added succesfully</Alert>}
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 w-full"
      >
        <InputField
          type="text"
          label="Name"
          placeholder=""
          name="name"
          defaultValue={coach[1]}
          register={register}
          options={{
            required: { value: true, message: "name is required field" },
          }}
        />
        <InputField
          type="text"
          label="Email adress"
          placeholder=""
          name="email"
          defaultValue={coach[2]}
          register={register}
          options={{
            required: { value: true, message: "email is required field" },
            maxLength: {
              value: 30,
              message: "Name must not exceed 30 characters",
            },
          }}
        />
        <div className="flex flex-col gap-5">
          <label htmlFor="role" className="text-lg font-medium">
            Role :
          </label>

          <select
            className="form-select rounded-xl h-[58px] border-gray-200"
            {...register("role")}
          >
            <option key={1} value="">
              {coach[3]}
            </option>
            {roles.map(
              (role: any, index: number) =>
                role !== coach[3] && (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ),
            )}
          </select>
        </div>
        <div className="flex gap-2">
          <Button outlined clickHandler={closePopup}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditCoach;
