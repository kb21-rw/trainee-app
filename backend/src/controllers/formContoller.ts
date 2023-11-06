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

export const createFormController = async (req: Request, res: Response) => {
  try {
    const validationResult: Joi.ValidationResult<CreateFormType> =
      createFormValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const createdForm = await createForm(req.body);
    return res.status(201).json(createdForm);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getFormsController = async (
  req: Request<object, object, object, Search>,
  res: Response,
) => {
  try {
    const searchString = req.query.searchString || "";
    const forms = await getForms(searchString);
    return res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateFormController = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const validationResult: Joi.ValidationResult<CreateFormType> =
      editFormValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const updatedForm = await updateForm(formId, req.body);

    if (updatedForm === null) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(updatedForm);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteFormController = async (req: Request, res: Response) => {
  try {
    const formId = req.params.formId;
    const isDeleted = await deleteForm(formId);

    if (!isDeleted) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(204).json({ message: "Form deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getSingleFormController = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const form = await getSingleForm(formId);

    if (form === null) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(form);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
