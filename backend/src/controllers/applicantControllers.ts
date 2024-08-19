import { NextFunction,Response } from "express";
import {
  getApplicantsService,
} from "../services/applicantService";


export const getApplicants = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const nameSearch = req.query.nameSearch ? String(req.query.nameSearch) : "";
    const applicantsPerPage = req.query.applicantsPerPage
      ? Number(req.query.applicantsPerPage)
      : 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : "userId";

    const applicants = await getApplicantsService({
      nameSearch,
      applicantsPerPage,
      sortBy,
    });
    return res.status(201).send(applicants);
  } catch (error: any) {
    next(error);
  }
};