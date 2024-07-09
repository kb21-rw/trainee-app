import Cohort from "../models/Cohort";
import { CreateCohortDto } from "../utils/types";

export const createCohortService = async (cohortData: CreateCohortDto) => {
  await Cohort.updateOne({ isActive: true }, { isActive: false });

  return await Cohort.create(cohortData);
};
