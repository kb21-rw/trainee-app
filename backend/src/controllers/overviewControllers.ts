import { NextFunction, Request, Response } from "express";
import { Search } from "../utils/types";
import { getAllTraineesOverviewService, getMyTraineesOverviewService } from "../services/overviewService";

export const getOverview = async (
  req: Request<object, object, object, Search>,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchString = req.query.searchString || "";
    const overview = await getAllTraineesOverviewService(searchString);
    return res.status(200).json(overview);
  } catch (error) {
    next(error);
  }
};

export const getMyTraineeOverview = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = req.user;

  try {
    const searchString = req.query.searchString || "";
    const myTraineesOverview = await getMyTraineesOverviewService(
      searchString,
      loggedInUser.id
    );

    return res.status(200).json(myTraineesOverview);
  } catch (error) {
    next(error);
  }
};
