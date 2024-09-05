import { NextFunction, Request, Response } from "express";
import {
  applicationDecisionSchema,
  createCohortValidation,
  updateCohortValidation,
} from "../validations/cohortValidation";
import {
  createCohortService,
  decisionService,
  getApplicationFormService,
  getCohortService,
  getCohortsService,
  getMyApplicationService,
  updateCohortService,
} from "../services/cohortService";

export const createCohortController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createCohortValidation.validateAsync(req.body);
    const createdCohort = await createCohortService(req.body);
    return res.status(201).json(createdCohort);
  } catch (error) {
    next(error);
  }
};

export const getCohortController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cohortId } = req.params;
    const cohort = await getCohortService(cohortId);
    return res.status(200).json(cohort);
  } catch (error) {
    return next(error);
  }
};

export const getCohortsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cohorts = await getCohortsService(
      String(req.query.searchString ?? "")
    );
    return res.status(200).json(cohorts);
  } catch (error) {
    return next(error);
  }
};

export const updateCohortController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cohortId } = req.params;
    await updateCohortValidation.validateAsync(req.body);
    const updatedCohort = await updateCohortService(cohortId, req.body);
    return res.status(200).json(updatedCohort);
  } catch (error) {
    return next(error);
  }
};

export const getApplicationFormController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const form = await getApplicationFormService();
    return res.status(200).json(form);
  } catch (error) {
    return next(error);
  }
};

export const getMyApplicationController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    const application = await getMyApplicationService(user.id);
    return res.status(200).json(application);
  } catch (error) {
    return next(error);
  }
};

export const decision = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    await applicationDecisionSchema.validateAsync(body);
    const decision = await decisionService(body);
    return res.status(201).send(decision);
  } catch (error: any) {
    next(error);
  }
};
