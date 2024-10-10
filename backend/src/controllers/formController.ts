import { NextFunction, Request, Response } from "express";
import {
  createFormValidation,
  editFormValidation,
} from "../validations/formValidation";
import {
  getFormsService,
  createFormService,
  updateFormService,
  getSingleFormService,
  deleteFormService,
} from "../services/formService";
import { Types } from "mongoose";
import { mongodbIdValidation } from "../validations/generalValidation";

export const createFormController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createFormValidation.validateAsync(req.body);
    const createdForm = await createFormService(req.body);
    return res.status(201).json(createdForm);
  } catch (error) {
    next(error);
  }
};

export const getFormsController = async (
  req: Request<
    object,
    object,
    object,
    { searchString?: string; cohort?: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    req.query.cohort &&
      (await mongodbIdValidation.validateAsync(req.query.cohort));
    const searchString = req.query.searchString ?? "";
    const cohort: { _id: Types.ObjectId } | { isActive: true } = req.query
      .cohort
      ? { _id: new Types.ObjectId(req.query.cohort) }
      : { isActive: true };
    const forms = await getFormsService(searchString, cohort);
    return res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

export const updateFormController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { formId } = req.params;
    await editFormValidation.validateAsync(req.body);
    const updatedForm = await updateFormService(formId, req.body);
    return res.status(200).json(updatedForm);
  } catch (error) {
    return next(error);
  }
};

export const deleteFormController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { formId } = req.params;
    await mongodbIdValidation.validateAsync(formId);

    await deleteFormService(formId);
    return res.status(204).json({ message: "Form deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

export const getSingleFormController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { formId } = req.params;
    await mongodbIdValidation.validateAsync(formId);

    const form = await getSingleFormService(formId);
    return res.status(200).json(form);
  } catch (error) {
    return next(error);
  }
};
