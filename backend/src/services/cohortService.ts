import { isValidObjectId, Types } from "mongoose";
import CustomError from "../middlewares/customError";
import Cohort from "../models/Cohort";
import Form from "../models/Form";
import { getCohortsQuery } from "../queries/cohortQueries";
import {
  COHORT_NOT_FOUND,
  DUPLICATE_DOCUMENT,
  FORM_NOT_FOUND,
  INVALID_MONGODB_ID,
  NOT_ALLOWED,
} from "../utils/errorCodes";
import {
  acceptUserHandler,
  rejectUserHandler,
} from "../utils/helpers/applicants";
import {
  AcceptedBody,
  ApplicantDecision,
  CreateCohortDto,
  RejectedBody,
  UpdateCohortDto,
} from "../utils/types";

const isAcceptedBody = (
  body: AcceptedBody | RejectedBody
): body is AcceptedBody => {
  return body.decision === ApplicantDecision.Accepted;
};

const isRejectedBody = (
  body: AcceptedBody | RejectedBody
): body is RejectedBody => {
  return body.decision === ApplicantDecision.Rejected;
};

export const getCohortsService = async (searchString: string) => {
  return await getCohortsQuery(searchString);
};

export const createCohortService = async (cohortData: CreateCohortDto) => {
  await Cohort.updateOne({ isActive: true }, { isActive: false });
  const newCohort = await Cohort.create(cohortData);

  return newCohort;
};

export const updateCohortService = async (
  cohortId: string,
  formData: UpdateCohortDto
) => {
  const { name, description, stages } = formData;
  if (!isValidObjectId(cohortId)) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalid cohort Id", 400);
  }

  const cohort = await Cohort.findById(cohortId);
  if (!cohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Cohort not found", 404);
  }

  if (name) {
    cohort.name = name;
  }

  if (description) {
    cohort.description = description;
  }

  if (stages) {
    const updatedStages = stages.filter((stage) => stage.id);
    const addedStages = stages.filter((stage) => !stage.id);

    // update existing stages
    cohort.stages = cohort.stages.map((stage) => {
      const updatedStage = updatedStages.find(
        (updatedStage) => updatedStage.id === stage.id.toString()
      );
      return updatedStage ? { ...updatedStage, id: stage.id } : stage;
    });

    const cohortStageTitles = cohort.stages.map((stage) => stage.title);
    // check for duplicates
    addedStages
      .map((stage) => stage.title)
      .forEach((addedStageTitle) => {
        if (cohortStageTitles.includes(addedStageTitle)) {
          throw new CustomError(
            DUPLICATE_DOCUMENT,
            `'${addedStageTitle}' already exists in the stages`,
            409
          );
        }
      });
    // add id property to every stage
    cohort.stages.push(
      ...addedStages.map((stage) => ({
        ...stage,
        id: new Types.ObjectId().toString(),
      }))
    );
  }

  return await cohort.save();
};

export const getApplicationFormService = async () => {
  const currentCohort = await Cohort.findOne({ isActive: true });

  if (!currentCohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Cohort not found!", 404);
  }

  if (!currentCohort.applicationFormId) {
    throw new CustomError(NOT_ALLOWED, "Applications aren't open yet", 401);
  }

  const form = await Form.findById(currentCohort.applicationFormId)
    .select("title descriptions questionIds")
    .populate({
      path: "questionIds",
      select: "title type options",
    })
    .lean()
    .exec();

  if (!form) {
    console.log("Form is referencing to a document that doesn't exist");
    throw new CustomError(
      FORM_NOT_FOUND,
      "Something wrong, our team is trying to fix it",
      500
    );
  }

  const { questionIds, ...rest } = form;

  return { ...rest, questions: questionIds };
};

export const decisionService = async (body: AcceptedBody | RejectedBody) => {
  const { userId } = body;
  const currentCohort = await Cohort.findOne({ isActive: true });

  if (!currentCohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Cohort not found", 404);
  }

  const cohortApplicants = currentCohort.applicants.map((id) => id.toString());

  if (!cohortApplicants.includes(userId)) {
    throw new CustomError(
      NOT_ALLOWED,
      "Applicant is not in the current cohort!",
      401
    );
  }

  currentCohort.applicants = currentCohort.applicants.filter(
    (id) => id.toString() !== userId
  );

  if (isAcceptedBody(body)) {
    return await acceptUserHandler(currentCohort, userId);
  }

  if (isRejectedBody(body)) {
    return await rejectUserHandler(currentCohort, body);
  }
};
