import CustomError from "../middlewares/customError";
import Cohort from "../models/Cohort";
import Form from "../models/Form";
import {
  COHORT_NOT_FOUND,
  FORM_NOT_FOUND,
  NOT_ALLOWED
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

  if (!currentCohort.applicationForm.id) {
    throw new CustomError(NOT_ALLOWED, "Applications aren't open yet", 401);
  }

  const form = await Form.findById(currentCohort.applicationForm.id)
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
