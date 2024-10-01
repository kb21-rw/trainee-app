// useApplicationForm.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApplicationFormType, Stage } from "../../utils/types";
import { applicationFormSchema } from "../schema/applicationFormSchema";

export const useApplicationForm = () => {
  const [currentStages, setCurrentStages] = useState<Stage[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
  } = useForm<ApplicationFormType>({
    resolver: yupResolver(applicationFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      stages: [],
    },
  });

  const addStagesHandler = (
    value: string,
    index: number,
    field: "name" | "description",
  ) => {
    const updatedStages = [...currentStages];
    updatedStages[index] = {
      ...updatedStages[index],
      [field]: value,
    };
    setCurrentStages(updatedStages);
    setValue("stages", updatedStages, { shouldDirty: true });
  };

  const addNewStage = () => {
    const newStage = { name: "", description: "" };
    setCurrentStages([...currentStages, newStage]);
    setValue("stages", [...currentStages, newStage], { shouldDirty: true });
  };

  const removeStage = (index: number) => {
    const updatedStages = currentStages.filter((_, i) => i !== index);
    setCurrentStages(updatedStages);
    setValue("stages", updatedStages, { shouldDirty: true });
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isDirty,
    currentStages,
    addStagesHandler,
    addNewStage,
    removeStage,
  };
};
