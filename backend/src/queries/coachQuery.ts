import User from "../models/User";
import { Role } from "../utils/types";

export const getCoachesQuery = async (
  searchString: string,
  sortBy: string,
  coachesPerPage: number,
) => {
  const coaches = await User.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: new RegExp(searchString, "i") } },
          { email: { $regex: new RegExp(searchString, "i") } },
        ],
        role: { $in: [Role.Admin, Role.Coach] },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "coach",
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
      $sort: { [sortBy]: 1 },
    },
    {
      $limit: coachesPerPage,
    },
  ]);
  return coaches;
};
