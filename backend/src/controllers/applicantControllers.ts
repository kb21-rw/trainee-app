import { NextFunction,Response } from "express";
import { applicationDecisionSchema } from "../validations/applicantValidation";
import {
  applicantDecisionService,
  getApplicantsService,
} from "../services/applicantService";

export const decision = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const body = req.body;
    await applicationDecisionSchema.validateAsync(body);
    const decision = await applicantDecisionService(user, body);
    return res.status(201).send(decision);
  } catch (error: any) {
    next(error);
  }
};

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
