import Cohort from "../models/Cohort";

export const getApplicantsQuery = async (
  filters: {
    searchString: string;
    sortBy: string;
    applicantsPerPage: number;
  },
  cohort: { id: string } | { isActive: boolean } = { isActive: true }
) => {
  const applicants = await Cohort.aggregate([
    {
      $match: {
        cohort,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "applicant",
        as: "trainees",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        trainees: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
        },
      },
    },
    {
      $sort: { [filters.sortBy]: 1 },
    },
    {
      $limit: filters.applicantsPerPage,
    },
  ]);
  return applicants;
};
