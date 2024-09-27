import CustomError from "../middlewares/customError";
import Cohort from "../models/Cohort";
import Form, { IForm } from "../models/Form";
import { getCohortQuery, getCohortsQuery } from "../queries/cohortQueries";
import {
  COHORT_NOT_FOUND,
  FORM_NOT_FOUND,
  NOT_ALLOWED,
} from "../utils/errorCodes";
import {
  CreateCohortDto,
  Decision,
  DecisionDto,
  Role,
  UpdateCohortDto,
} from "../utils/types";
import {
  acceptUserHandler,
  getApplicationForm,
  getCurrentCohort,
  rejectUserHandler,
  updateStagesHandler,
} from "../utils/helpers/cohort";
import { createStagesHandler } from "../utils/helpers";
import { getCompleteForm } from "../utils/helpers/forms";
import { getUserFormResponses } from "../utils/helpers/response";
import { getUserService } from "./userService";

export const getCohortService = async (cohortId: string) => {
  const cohort = await getCohortQuery(cohortId);
  if (!cohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Cohort not found", 404);
  }

  return cohort;
};

export const getCohortsService = async (searchString: string) => {
  return await getCohortsQuery(searchString);
};

export const createCohortService = async (cohortData: CreateCohortDto) => {
  await Cohort.updateOne({ isActive: true }, { isActive: false });

  const newCohort = await Cohort.create({
    ...cohortData,
    stages: createStagesHandler(cohortData.stages),
  });

  return newCohort;
};

export const updateCohortService = async (
  cohortId: string,
  formData: UpdateCohortDto
) => {
  const { name, description, stages } = formData;

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
    cohort.stages = updateStagesHandler(cohort.stages, stages);
  }

  return await cohort.save();
};

export const getApplicationFormService = async () => {
  const currentCohort = await getCurrentCohort();

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

  const { startDate, endDate, stages } = currentCohort.applicationForm;

  const completeApplicationFrom = await getCompleteForm(applicationForm);

  return { ...completeApplicationFrom, startDate, endDate, stages };
};

export const getMyApplicationService = async (loggedInUserId: string) => {
  const currentCohort = await getCurrentCohort();

  const applicationForm = await getApplicationForm(currentCohort);

  return await getUserFormResponses(applicationForm, loggedInUserId);
};

export const decisionService = async (body: DecisionDto) => {
  const { userId, decision, feedback } = body;
  const currentCohort = await getCurrentCohort();
  const user = await getUserService(userId);

  if (decision === Decision.Accepted) {
    if (user.role === Role.Applicant) {
      return await acceptUserHandler(
        currentCohort,
        user,
        feedback,
        "applicants"
      );
    }

    return await acceptUserHandler(currentCohort, user, feedback, "trainees");
  } else {
    if (user.role === Role.Applicant) {
      return await rejectUserHandler(
        currentCohort,
        user,
        feedback,
        "applicants"
      );
    }

    return await rejectUserHandler(currentCohort, user, feedback, "trainees");
  }
};
