import Cohort from "../models/Cohort";

export const getApplicantsQuery = async (
  filters: {
    searchStringRegex: string;
    sortBy: string;
    applicantsPerPage: number;
  },
  cohort: { id: string } | { isActive: boolean } = { isActive: true }
) => {
  const applicants = await Cohort.aggregate([
    {
      $match: cohort,
    },
    {
      $unwind: {
        path: "$applicants",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "applicants",
        foreignField: "_id",
        as: "applicant",
      },
    },
    {
      $unwind: {
        path: "$applicant",
      },
    },
    {
      $sort: { [`applicant.${filters.sortBy}`]: 1 },
    },
    {
      $limit: filters.applicantsPerPage,
    },
    {
      $match: {
        "applicant.name": {
          $regex: filters.searchStringRegex,
          $options: "i",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        applicants: {
          $push: "$applicant",
        },
      },
    },
  ]);
  return applicants;
};
