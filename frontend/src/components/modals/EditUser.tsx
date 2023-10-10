import React from "react";
import { useEditUserMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import ModalLayout from "./ModalLayout";
import Alert from "../ui/Alert";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

const EditUser = ({
  closePopup,
  jwt,
  user,
  id,
}: {
  closePopup: () => void;
  jwt: string;
  id: any;
  user: any;
}) => {
  const roles = ["ADMIN", "COACH"];
  const [editUser, { isError, isLoading, error }] = useEditUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const result = editUser({ jwt, id: id, body: { ...data } });
  };
  let errorMessage: any = errors.name?.message;
  return (
    <ModalLayout closePopup={closePopup} title="Add trainee">
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 w-full"
      >
        <InputField
          type="text"
          label="Name"
          placeholder=""
          name="name"
          defaultValue={user?.name}
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
          defaultValue={user?.email}
          register={register}
          options={{
            required: { value: true, message: "email is required field" },
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
              {user.role}
            </option>
            {roles.map(
              (role: any, index: number) =>
                role !== user.role && (
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

export default EditUser;
