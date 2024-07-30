import CustomError from "../../middlewares/customError";
import Cohort from "../../models/Cohort";
import { COHORT_NOT_FOUND } from "../errorCodes";

export const getCurrentCohort = async () => {
  const currentCohort = await Cohort.findOne({ isActive: true });

  if (!currentCohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Active cohort not found", 404);
  }

  return currentCohort;
};
