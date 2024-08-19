import Cohort, { ICohort } from "../models/Cohort";

export const getCohortsQuery = async (searchString: string) => {
  const cohorts: ICohort[] = await Cohort.aggregate([
    {
      $match: { name: { $regex: new RegExp(searchString, "i") } },
    },
    {
      $project: {
        name: 1,
        description: 1,
        stages: { $size: "$stages" },
        applicants: { $size: "$applicants" },
        trainees: { $size: "$trainees" },
        coaches: { $size: "$coaches" },
        forms: { $size: "$forms" },
        rejected: { $size: "$rejected"}
      },
    },
  ]);
  return cohorts;
};
