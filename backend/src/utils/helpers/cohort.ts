import { Types } from "mongoose";
import CustomError from "../../middlewares/customError";
import Cohort, { ICohort } from "../../models/Cohort";
import {
  COHORT_NOT_FOUND,
  DUPLICATE_DOCUMENT,
  FORM_NOT_FOUND,
  NOT_ALLOWED,
} from "../errorCodes";
import { IStage } from "../types";
import { SetOptional } from "type-fest";
import Form, { IForm } from "../../models/Form";

export const getCurrentCohort = async () => {
  const currentCohort = await Cohort.findOne({ isActive: true });

  if (!currentCohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Active cohort not found", 404);
  }

  return currentCohort;
};

export const getApplicationForm = async (currentCohort: ICohort) => {
  if (!currentCohort.applicationForm.id) {
    throw new CustomError(NOT_ALLOWED, "Applications aren't open yet", 401);
  }

  const applicationForm = await Form.findById<IForm>(
    currentCohort.applicationForm.id
  );

  if (!applicationForm) {
    throw new CustomError(
      FORM_NOT_FOUND,
      "Something wrong, our team is trying to fix it",
      500
    );
  }

  return applicationForm;
};

export const updateStagesHandler = (
  cohortStages: IStage[],
  receivedStages: SetOptional<IStage, "id">[]
) => {
  // check for duplicates
  const cohortStageTitles = cohortStages.map((stage) => stage.name);
  receivedStages
    .map((stage) => stage.name)
    .forEach((addedStageTitle) => {
      if (cohortStageTitles.includes(addedStageTitle)) {
        throw new CustomError(
          DUPLICATE_DOCUMENT,
          `'${addedStageTitle}' already exists in the stages`,
          409
        );
      }
    });

  const updatedStages = receivedStages.filter((stage) => stage.id);
  const addedStages = receivedStages.filter((stage) => !stage.id);

  // update existing stages
  const updatedCohortStages = cohortStages.map((stage) => {
    const updatedStage = updatedStages.find(
      (updatedStage) => updatedStage.id === stage.id.toString()
    );
    return updatedStage ? { ...updatedStage, id: stage.id } : stage;
  });

  // add id property to every stage
  updatedCohortStages.push(
    ...addedStages.map((stage) => ({
      ...stage,
      id: new Types.ObjectId().toString(),
    }))
  );

  return updatedCohortStages;
};
