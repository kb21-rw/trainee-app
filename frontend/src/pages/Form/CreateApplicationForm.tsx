import React, { useState } from "react";
import { H1 } from "../../components/ui/Typography";
import SuccessCheckMarkIcon from "../../assets/SuccessCheckMarkIcon";
import CheckMarkIcon from "../../assets/CheckMarkIcon";
import AddIcon from "../../assets/AddIcon";
import DeleteIcon from "../../assets/DeleteIcon";
import { ApplicationFormType } from "../../utils/types";
import { useApplicationForm } from "../../utils/hooks/useApplicationForm";
import { FormInputsSection } from "../../components/ui/FormInputsSection";
import { StagesSection } from "../../components/ui/StagesSection";
import { useCreateFormMutation } from "../../features/user/apiSlice";
import FormDateInputs from "../../components/ui/FormDateInput";

import moment from "moment";

import { getJWT } from "../../utils/helper";
import Alert from "../../components/ui/Alert";

const CreateApplicationForm = () => {
  const [activeInput, setActiveInput] = useState("");
  const [createForm, { error, isSuccess }] = useCreateFormMutation();
  const {
    register,
    handleSubmit,
    control,
    errors,
    isDirty,
    currentStages,
    addStagesHandler,
    addNewStage,
    removeStage,
  } = useApplicationForm();


  const onSubmit = async (data: ApplicationFormType) => {
    const requestBody = {
      name: data.title,
      description: data.description,
      type: "Application",
      startDate: moment(data.startDate).format("YYYY-MM-DD"),
      endDate: moment(data.endDate).format("YYYY-MM-DD"),
      stages: data.stages,
    };
    await createForm({
      jwt: getJWT(),
      body: requestBody,
    });
  };

  const errorMessage: string =
    errors?.endDate?.message || error?.data?.errorMessage;

  return (
    <>
      {errorMessage && (
        <div className="flex items-center justify-center">
          <Alert type="error">{errorMessage}</Alert>
        </div>
      )}
      {isSuccess && (
        <div className="flex items-center justify-center">
          <Alert type="success">Form created successfully</Alert>
        </div>
      )}
      <H1>
        <div className="text-center py-3">
          <span>Application Form </span>
        </div>
      </H1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onFocus={() => setActiveInput("title")}
        className="w-full flex justify-center gap-5 mt-10"
      >
        <div className="w-4/5 px-4 space-y-5">
          <FormInputsSection
            register={register}
            control={control}
            errors={errors}
            activeInput={activeInput}
          />
          <div className="border p-8 px-4 space-y-6 rounded-xl">
            <div className="flex items-center gap-20">
              <FormDateInputs control={control} errors={errors} />
            </div>
            <StagesSection
              currentStages={currentStages}
              addStagesHandler={addStagesHandler}
              addNewStage={addNewStage}
              removeStage={removeStage}
              register={register}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4 custom-shadow rounded-xl h-1/2">
          {isDirty ? (
            <button type="submit">
              <SuccessCheckMarkIcon />
            </button>
          ) : (
            <CheckMarkIcon />
          )}
          <button type="button" onClick={addNewStage}>
            <AddIcon />
          </button>
          <button
            type="button"
            onClick={() => removeStage(currentStages.length - 1)}
          >
            <DeleteIcon />
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateApplicationForm;
