import CustomError from "../middlewares/customError";
import Cohort from "../models/Cohort";
import { COHORT_NOT_FOUND, NOT_ALLOWED } from "../utils/errorCodes";
<<<<<<< HEAD
import { AcceptedBody, ApplicantDecision, RejectedBody } from "../utils/types";
import { acceptUser, rejectUser } from "../utils/helpers/applicants";

const isAcceptedBody = (
  body: AcceptedBody | RejectedBody
): body is AcceptedBody => {
  return body.decision === ApplicantDecision.ACCEPTED;
};

const isRejectedBody = (
  body: AcceptedBody | RejectedBody
): body is RejectedBody => {
  return body.decision === ApplicantDecision.REJECTED;
=======
import { ApplicantDecision } from "../utils/types";
import { IQuestion } from "../models/Question";
import Response from "../models/Response";
import { getApplicantsQuery } from "../queries/applicantQueries";

export const getApplicantsService = async (
  {
    nameSearch,
    sortBy,
    applicantsPerPage,
  }: {
    nameSearch: string;
    sortBy: string;
    applicantsPerPage: number;
  },
  cohortId?: string
) => {
  return await getApplicantsQuery(
    { nameSearchRegex: `.*${nameSearch}.*`, sortBy, applicantsPerPage },
    cohortId ? { id: cohortId } : undefined
  );
>>>>>>> dev-mvp
};

export const applicantDecisionService = async (
  body: AcceptedBody | RejectedBody
) => {
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
    return await acceptUser(currentCohort, userId);
  }

  if (isRejectedBody(body)) {
    return await rejectUser(currentCohort, body);
  }
};
