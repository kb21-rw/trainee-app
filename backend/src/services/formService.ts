/* eslint-disable no-useless-catch */
import CustomError from "../middlewares/customError";
import Form from "../models/Form";
import Question from "../models/Question";
import { INVALID_MONGODB_ID } from "../utils/errorCodes";
import { CreateFormType, FormType } from "../utils/types";
import mongoose from "mongoose";
const { Types } = mongoose;
const { ObjectId } = Types;

export const getFormsService = async (searchString: string) => {
  try {
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
    return forms;
  } catch (error) {
    throw error;
  }
};

export const updateFormService = async (
  formId: string,
  formData: CreateFormType,
) => {
  try {
    const { title, description } = formData;
    if (!ObjectId.isValid(formId)) {
      throw new CustomError(INVALID_MONGODB_ID, "Invalide Document ID", 400);
    }

    const form = await Form.findById(formId);

    if (!form) {
      return null;
    }

    if (title) {
      form.title = title;
    }

    if (description) {
      form.description = description;
    }

    await form.save();
    return form;
  } catch (error) {
    throw error;
  }
};

export const createFormService = async (formData: CreateFormType) => {
  try {
    const { title, description } = formData;
    const createdForm = await Form.create({ title, description });
    return createdForm;
  } catch (error) {
    throw error;
  }
};

export const getSingleFormService = async (formId: string) => {
  try {
    if (!ObjectId.isValid(formId)) {
      throw new CustomError(INVALID_MONGODB_ID, "Invalide Document ID", 400);
    }

    const form = await Form.findById(formId);

    if (!form) {
      return null;
    }

    return form;
  } catch (error) {
    throw error;
  }
};

export const deleteFormService = async (formId: string) => {
  try {
    if (!ObjectId.isValid(formId)) {
      throw new CustomError(INVALID_MONGODB_ID, "Invalide Document ID", 400);
    }

    const form = await Form.findByIdAndDelete(formId);

    if (!form) {
      return false;
    }

    await Question.deleteMany({ _id: { $in: form.questionsId } });
    return true;
  } catch (error) {
    throw error;
  }
};
