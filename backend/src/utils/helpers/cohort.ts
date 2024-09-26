import { Types } from "mongoose";
import CustomError from "../../middlewares/customError";
import Cohort, { ICohort } from "../../models/Cohort";
import {
  COHORT_NOT_FOUND,
  DUPLICATE_DOCUMENT,
  FORM_NOT_FOUND,
  NOT_ALLOWED,
  USER_NOT_FOUND,
} from "../errorCodes";
import { IStage, Role } from "../types";
import { SetOptional } from "type-fest";
import Form, { IForm } from "../../models/Form";
import { IUser } from "../../models/User";

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
  const updatedStages = receivedStages.filter((stage) => stage.id);
  const addedStages = receivedStages.filter((stage) => !stage.id);

  // check for duplicates in new stages and throw if any
  const cohortStageTitles = cohortStages.map((stage) => stage.name);
  addedStages
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

export const acceptUserHandler = async (
  cohort: ICohort,
  user: IUser,
  feedback: string
) => {
  if (user.role === Role.Applicant) {
    const applicantIndex = cohort.applicants.findIndex(
      (applicant) => applicant.id === user.id
    );

    if (applicantIndex === -1) {
      throw new CustomError(
        USER_NOT_FOUND,
        `Can't find that applicant in the '${cohort.name}' cohort`,
        404
      );
    }

    const applicant = cohort.applicants[applicantIndex];

    const numberOfStages = cohort.applicationForm.stages.length;

    // If applicant is on the last stage
    if (
      cohort.applicationForm.stages[numberOfStages - 1].id ===
      applicant.droppedStage.id
    ) {
      cohort.trainees.push({
        id: applicant.id,
        passedStages: [],
        droppedStage: { id: cohort.stages[0].id, isConfirmed: false },
        feedbacks: [{ stageId: applicant.droppedStage.id, text: feedback }],
      });
    } else {
      const currentStageIndex = cohort.applicationForm.stages.findIndex(
        (stage) => stage.id === applicant.droppedStage.id
      );
      applicant.droppedStage.id =
        cohort.applicationForm.stages[currentStageIndex + 1].id;
    }

    applicant.passedStages.push(applicant.droppedStage.id);

    cohort.applicants[applicantIndex] = applicant;

    await cohort.save();
  }

  if (user.role === Role.Trainee) {
    const traineeIndex = cohort.trainees.findIndex(
      (trainee) => trainee.id === user.id
    );

    if (traineeIndex === -1) {
      throw new CustomError(
        USER_NOT_FOUND,
        `Can't find that trainee in the '${cohort.name}' cohort`,
        404
      );
    }

    const trainee = cohort.trainees[traineeIndex];

    const numberOfStages = cohort.applicationForm.stages.length;

    // If trainee is on the last stage
    if (
      cohort.applicationForm.stages[numberOfStages - 1].id ===
      trainee.droppedStage.id
    ) {
      throw new CustomError(
        NOT_ALLOWED,
        `Trainee is on the last stage of '${cohort.name}' cohort`,
        403
      );
    } else {
      const currentStageIndex = cohort.stages.findIndex(
        (stage) => stage.id === trainee.droppedStage.id
      );

      trainee.droppedStage.id = cohort.stages[currentStageIndex + 1].id;
    }

    trainee.passedStages.push(trainee.droppedStage.id);

    cohort.trainees[traineeIndex] = trainee;

    await cohort.save();
  }

  return { user: user.id, message: "The applicant was accepted successfully!" };
};

export const rejectUserHandler = async (
  _cohort: ICohort,
  _user: IUser,
  _feedback: string
) => {
  throw new Error("This feature is not implemented yet!");
};
