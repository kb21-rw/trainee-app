import React from 'react'
import { useEditTraineeMutation, useGetAllUsersQuery } from '../../features/user/apiSlice';
import { useForm } from 'react-hook-form';
import ModalLayout from './ModalLayout';
import Alert from '../ui/Alert';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

const EditTrainee = ({
  closePopup,
  jwt,
  trainee,
  id,
}: {
  closePopup: () => void;
  jwt: string;
  id: any;
  trainee: any
}) => {
  const [editTrainee, { isError, isLoading, error, isSuccess : isEditTraineeSuccess }] = useEditTraineeMutation();
  const coacheesData = useGetAllUsersQuery(jwt) 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const result = editTrainee({ jwt, id: id, body: { ...data } })
  };
  let errorMessage: any = errors.name?.message;

  
  return (
    <ModalLayout closePopup={closePopup} title="Add trainee">
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      {isLoading && <div className='w-full flex justify-center items-center'><Loader/></div> }
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 w-full"
      >
        <InputField
          type="text"
          label="Name"
          placeholder=""
          name="name"
          defaultValue={trainee?.name}
          register={register}
          options={{
            required: { value: true, message: "name is required field" },
          }}
        />
        <div className="flex flex-col gap-5">
          <label htmlFor="role" className="text-lg font-medium">
            Assign coach
          </label>

          <select
            className="form-select rounded-xl h-[58px] border-gray-200"
            {...register("coach")}
          >
            <option key={1} value=""> {trainee.coach?.name || "No assigned coach"} </option>
            {coacheesData.data?.map((coach: any, index: number) => coach.name !== trainee.coach?.name &&  (
              <option key={index} value={coach._id}>
                {coach.name}
              </option>
            ))}
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
}

export default EditTrainee