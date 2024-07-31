import { Types } from "mongoose";
import { ICohort } from "../../models/Cohort";
import Response from "../../models/Response";
import { RejectedBody } from "../types";
import CustomError from "../../middlewares/customError";
import { STAGE_NOT_FOUND } from "../errorCodes";
import { IQuestion } from "../../models/Question";
import { IForm } from "../../models/Form";

export const acceptUserHandler = async (
  currentCohort: ICohort,
  userId: string
) => {
  currentCohort.trainees.push(new Types.ObjectId(userId));
  await currentCohort.save();

  type PopulatedForm = Omit<IForm, "questionIds"> & {
    questionIds: IQuestion[];
  };

  const populatedCohort = await currentCohort.populate<{
    forms: PopulatedForm[];
  }>({
    path: "forms",
    populate: { path: "questionIds" },
  });

  // Go through questions of all forms creating responses for them
  populatedCohort.forms.forEach((form) => {
    form.questionIds.forEach(async (question: IQuestion) => {
      const createdResponse = await Response.create({ userId });
      question.responseIds.push(createdResponse.id);
      await question.save();
    });
  });

  return { user: userId, message: "The applicant was accepted successfully!" };
};

export const rejectUserHandler = async (
  currentCohort: ICohort,
  { userId, stageId, feedback }: RejectedBody
) => {
  if (!currentCohort.stages.map((stage) => stage.id).includes(stageId)) {
    throw new CustomError(
      STAGE_NOT_FOUND,
      "The stage specified does not exist, create one first",
      404
    );
  }

  currentCohort.rejected.push({ userId, stageId, feedback });
  await currentCohort.save();

  return { user: userId, message: "The user was rejected successfully!" };
};
