import Cohort from "../models/Cohort";
import { CreateCohortDto } from "../utils/types";

export const createCohortService = async (cohortData: CreateCohortDto) => {
  const newCohort = await Cohort.create(cohortData);
  await Cohort.updateOne({ isActive: true }, { isActive: false });

  return newCohort;
};
