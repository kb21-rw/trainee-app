import { Request, Response } from "express";
import {
  createFormValidation,
  editFormValidation,
} from "../validations/formValidation";
import Joi from "joi";
import { CreateFormType, Search } from "../utils/types";
import {
  getForms,
  createForm,
  updateForm,
  getSingleForm,
  deleteForm,
} from "../services/formService";
import CustomError from "../middlewares/customError";

import { DUPLICATE_DOCUMENT, FORM_NOT_FOUND } from "../utils/errorCodes";

export const createFormController = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    const validationResult: Joi.ValidationResult<CreateFormType> =
      createFormValidation.validate(req.body);
    if (validationResult.error) {
      throw validationResult.error;
    }

    const createdForm = await createForm(req.body);
    return res.status(201).json(createdForm);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error.code === 11000) {
      const err = new CustomError(
        DUPLICATE_DOCUMENT,
        "Please that form already exist",
        400,
      );
      next(err);
    }

    next(error);
  }
};

export const getFormsController = async (
  req: Request<object, object, object, Search>,
  res: Response,
  next: any,
) => {
  try {
    const searchString = req.query.searchString || "";
    const forms = await getForms(searchString);
    return res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

export const updateFormController = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    const { formId } = req.params;
    const validationResult: Joi.ValidationResult<CreateFormType> =
      editFormValidation.validate(req.body);
    if (validationResult.error) {
      throw validationResult.error;
    }

    const updatedForm = await updateForm(formId, req.body);

    if (updatedForm === null) {
      throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
    }

    return res.status(200).json(updatedForm);
  } catch (error) {
    return next(error);
  }
};

export const deleteFormController = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    const formId = req.params.formId;
    const isDeleted = await deleteForm(formId);

    if (!isDeleted) {
      throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
    }

    return res.status(204).json({ message: "Form deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

export const getSingleFormController = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    const { formId } = req.params;
    const form = await getSingleForm(formId);

    if (form === null) {
      throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
    }

    return res.status(200).json(form);
  } catch (error) {
    return next(error);
  }
};
