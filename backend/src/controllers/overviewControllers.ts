import { NextFunction, Request, Response } from "express";
import { Search } from "../utils/types";
import { getOverviewService } from "../services/overviewService";

export const getOverview = async (
  req: Request<object, object, object, Search>,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchString = req.query.searchString || "";
    const overview = await getOverviewService(searchString);
    return res.status(200).json(overview);
  } catch (error) {
    next(error);
  }
};
