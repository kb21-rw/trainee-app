import { NextFunction, Request, Response } from "express";
import { getApplicantsService } from "../services/applicantService";

export const getApplicants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchString = req.query.searchString ? String(req.query.searchString) : "";
    const applicantsPerPage = req.query.coachesPerPage
      ? Number(req.query.coachesPerPage)
      : 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : "userId";

    const applicants = await getApplicantsService({
      searchString,
      applicantsPerPage,
      sortBy,
    });

    return res.status(201).send(applicants);
  } catch (error: any) {
    next(error);
  }
};
