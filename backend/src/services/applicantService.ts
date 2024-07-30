import { Types } from "mongoose";
import CustomError from "../middlewares/customError";
import Cohort from "../models/Cohort";
import { COHORT_NOT_FOUND, NOT_ALLOWED } from "../utils/errorCodes";
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
};

export const applicantDecisionService = async (
  user: any,
  body: { applicantId: string; decision: ApplicantDecision }
) => {
  const { applicantId, decision } = body;
  const currentCohort = await Cohort.findOne({ isActive: true });

  if (!currentCohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Cohort not found", 404);
  }

  const cohortApplicants = currentCohort.applicants.map((id) => id.toString());

  if (!cohortApplicants.includes(applicantId)) {
    throw new CustomError(
      NOT_ALLOWED,
      "Applicant is not in the current cohort!",
      401
    );
  }

  if (decision === ApplicantDecision.ACCEPTED) {
    currentCohort.applicants = currentCohort.applicants.filter(
      (id) => id.toString() !== applicantId
    );
    currentCohort.trainees.push(new Types.ObjectId(applicantId));
    await currentCohort.save();

    // I used any on forms because I couldn't tell typescript that the nested properties populated would actually be the documents will all methods that I'll need to use on them.
    const populatedCohort = await currentCohort.populate<{ forms: any[] }>({
      path: "forms",
      populate: { path: "questionIds" },
    });

    // Go through questions of all forms creating responses for them
    populatedCohort.forms.forEach((form) => {
      form.questionIds.forEach(async (question: IQuestion) => {
        const createdResponse = await Response.create({ userId: applicantId });
        question.responseIds.push(createdResponse.id);
        await question.save();
      });
    });

    return { user: applicantId, accepted: true };
  }

  return { user, body };
};
