import Cohort from "../models/Cohort";
import { CreateCohortDto } from "../utils/types";

export const createCohortService = async (cohortData: CreateCohortDto) => {
  await Cohort.updateOne({ isActive: true }, { isActive: false });
  const newCohort = await Cohort.create(cohortData);

  return newCohort;
};
