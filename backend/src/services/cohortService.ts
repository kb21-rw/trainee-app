import CustomError from "../middlewares/customError";
import Cohort from "../models/Cohort";
import Form from "../models/Form";
import {
  COHORT_NOT_FOUND,
  FORM_NOT_FOUND,
  NOT_ALLOWED,
} from "../utils/errorCodes";
import { CreateCohortDto } from "../utils/types";

export const createCohortService = async (cohortData: CreateCohortDto) => {
  await Cohort.updateOne({ isActive: true }, { isActive: false });
  const newCohort = await Cohort.create(cohortData);

  return newCohort;
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
    .select("title descriptions questionsIds")
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
