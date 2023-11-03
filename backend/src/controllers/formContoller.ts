import { Request, Response } from "express";
import {
  createFormValidation,
  editFormValidation,
} from "../validations/formValidation";
import Form from "../models/Form";
import Joi from "joi";
import { CreateFormType, Search, FormType } from "../utils/types";
import Question from "../models/Question";

export const createForm = async (req: Request, res: Response) => {
  try {
    const validationResult: Joi.ValidationResult<CreateFormType> =
      createFormValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const { title, description }: CreateFormType = req.body;
    const createdForm = await Form.create({ title, description });
    return res.status(201).json(createdForm);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getForms = async (
  req: Request<object, object, object, Search>,
  res: Response,
) => {
  try {
    const searchString = req.query.searchString || "";
    const forms: FormType[] = await Form.aggregate([
      {
        $match: { title: { $regex: new RegExp(searchString, "i") } },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questionsId",
          foreignField: "_id",
          as: "questions",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          questions: 1,
        },
      },
    ]);
    return res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateForm = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const validationResult: Joi.ValidationResult<CreateFormType> =
      editFormValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const { title, description }: CreateFormType = req.body;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "form not found" });
    }

    if (title) {
      form.title = title;
    }

    if (description) {
      form.description = description;
    }

    await form.save();

    return res.status(200).json(form);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteForm = async (req: Request, res: Response) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findByIdAndDelete(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    await Question.deleteMany({ _id: { $in: form.questionsId } });
    return res.status(204).json({ message: "Form deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getSingleForm = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(form);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
