import { Types } from "mongoose";
import CustomError from "../../middlewares/customError";
import Cohort, { ICohort, IParticipant } from "../../models/Cohort";
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
  feedback: string,
  cohortProperty: "trainees" | "applicants"
) => {
  const participantIndex = indexOfParticipant(user.id, cohort[cohortProperty]);
  const participant = cohort[cohortProperty][participantIndex];
  const droppedStageId = participant.droppedStage.id;
  const stages =
    cohortProperty === "applicants"
      ? cohort.applicationForm.stages
      : cohort.stages;
  const numberOfStages = stages.length;

  if (participant.droppedStage.isConfirmed) {
    throw new CustomError(
      NOT_ALLOWED,
      `The ${user.name} was rejected already`,
      403
    );
  }

  // If user is on the last stage
  if (stages[numberOfStages - 1].id === droppedStageId) {
    if (user.role === Role.Applicant) {
      cohort.trainees.push({
        id: user.id,
        passedStages: [],
        droppedStage: { id: cohort.stages[0].id, isConfirmed: false },
        feedbacks: [],
      });
      user.role = Role.Trainee;
      await user.save();
    } else {
      // if participant is a trainee
      if (participant.passedStages.includes(droppedStageId)) {
        throw new CustomError(
          NOT_ALLOWED,
          `${user.name} had already passed the last stage of '${cohort.name}' cohort`,
          403
        );
      }
    }
  } else {
    const currentStageIndex = stages.findIndex(
      (stage) => stage.id === droppedStageId
    );
    participant.droppedStage.id = stages[currentStageIndex + 1].id;
  }

  participant.passedStages.push(droppedStageId);
  participant.feedbacks.push({ stageId: droppedStageId, text: feedback });

  cohort[cohortProperty][participantIndex] = participant;

  await cohort.save();

  return {
    user: user.id,
    message: `${user.name} was accepted successfully!`,
  };
};

export const rejectUserHandler = async (
  cohort: ICohort,
  user: IUser,
  feedback: string,
  cohortProperty: "trainees" | "applicants"
) => {
  const participantIndex = indexOfParticipant(user.id, cohort[cohortProperty]);
  const participant = cohort[cohortProperty][participantIndex];
  const droppedStageId = participant.droppedStage.id;

  if (participant.droppedStage.isConfirmed) {
    throw new CustomError(
      NOT_ALLOWED,
      `The ${user.name} was rejected already`,
      403
    );
  }

  if (participant.passedStages.includes(droppedStageId)) {
    throw new CustomError(
      NOT_ALLOWED,
      `${user.name} had already passed the last stage of '${cohort.name}' cohort`,
      403
    );
  }

  participant.droppedStage.isConfirmed = true;
  participant.feedbacks.push({ stageId: droppedStageId, text: feedback });

  cohort[cohortProperty][participantIndex] = participant;

  await cohort.save();

  return {
    user: user.id,
    message: `${user.name} was rejected successfully!`,
  };
};

export const indexOfParticipant = (userId: string, users: IParticipant[]) => {
  const userIndex = users.findIndex((user) => user.id.toString() === userId);

  if (userIndex === -1) {
    throw new CustomError(
      USER_NOT_FOUND,
      `Can't find that applicant/trainee in the current cohort`,
      404
    );
  }

  return userIndex;
};
