import React from "react";
import ModalLayout from "./ModalLayout";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCohortMutation } from "../../features/user/apiSlice";
import Loader from "../ui/Loader";
import Alert from "../ui/Alert";
import useAutoCloseModal from "../../utils/hooks/useAutoCloseModal";
import TextArea from "../ui/TextArea";
import { CreateCohort } from "../../utils/types";
import { H6 } from "../ui/Typography";
import AddIcon from "../../assets/AddIcon";
import RemoveIcon from "../../assets/RemoveIcon";

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
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCohort>();

  const { stages: currentStages = [] } = watch();

  const addStagesHandler = (
    value: string,
    index: number,
    field: "title" | "description",
  ) => {
    const updatedStages = [...(currentStages || [])];
    updatedStages[index] = {
      ...updatedStages[index],
      [field]: value,
    };
    setValue("stages", updatedStages, { shouldDirty: true });
  };

  const addNewStage = () => {
    const newStage = { title: "", description: "" };
    setValue("stages", [...currentStages || [], newStage], { shouldDirty: true });
  };

  const removeStage = () => {
    currentStages.pop();
    setValue("stages", currentStages, { shouldDirty: true });
  }

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
        <div>
          <H6><span className="text-lg">Add Stage:</span></H6>
          <div className="p-4 bg-gray-50 rounded-lg shadow space-y-2 my-3">
            <ol className="w-full space-y-4">
              {currentStages?.map((stage, index: number) => (
                <li key={index} className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
                <div className="flex gap-3 items-center">
                  <span className="text-lg font-medium">{index + 1}.</span>
                  <input
                    placeholder="Stage Title"
                    defaultValue={stage.title}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => addStagesHandler(e.target.value, index, "title")}
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <textarea
                    placeholder="Stage Description"
                    defaultValue={stage.description}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => addStagesHandler(e.target.value, index, "description")}
                  />
                </div>
              </li>
              ))}
            </ol>
            <button type="button" onClick={addNewStage}>
              <AddIcon />
            </button>
            {currentStages.length > 0 && (
                <button
                type="button"
                  onClick={removeStage}
                >
                  <RemoveIcon />
                </button>
              )}
          </div>
        </div>
        <TextArea
          name="description"
          label="Cohort Description"
          placeholder="Cohort description"
          register={register}
          options={{
            required: {
              value: true,
              message: "Cohort description is a required field",
            },
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
