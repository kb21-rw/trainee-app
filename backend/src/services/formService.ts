import CustomError from "../middlewares/customError";
import Cohort from "../models/Cohort";
import Form from "../models/Form";
import Question from "../models/Question";
import Response from "../models/Response";
import {
  getApplicationFormQuery,
  getFormQuery,
  getFormsQuery,
} from "../queries/formQueries";
import {
  COHORT_NOT_FOUND,
  FORM_NOT_FOUND,
  INVALID_MONGODB_ID,
} from "../utils/errorCodes";
import { CreateFormDto, FormType, UpdateFormDto } from "../utils/types";
import mongoose from "mongoose";
const { Types } = mongoose;
const { ObjectId } = Types;

export const getFormsService = async (searchString: string) => {
  const forms = await getFormsQuery(searchString);
  return forms;
};

export const updateFormService = async (
  formId: string,
  formData: UpdateFormDto
) => {
  const { title, description } = formData;
  if (!ObjectId.isValid(formId)) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalid Document ID", 400);
  }

  const form = await Form.findById(formId);
  if (!form) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  if (title) {
    form.title = title;
  }

  if (description) {
    form.description = description;
  }

  await form.save();
  return form;
};

export const createFormService = async (formData: CreateFormDto) => {
  const { title, description, type } = formData;

  const createdForm = await Form.create({ title, description, type });
  const currentCohort = await Cohort.findOne({ isActive: true });
  if (!currentCohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Not active cohort found!", 404);
  }

  if (type === FormType.APPLICANT) {
    currentCohort.applicationFormId = createdForm.id;
  } else {
    currentCohort.forms.push(createdForm.id);
  }

  await currentCohort.save();

  return createdForm;
};

export const getSingleFormService = async (formId: string) => {
  if (!ObjectId.isValid(formId)) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  const form = await getFormQuery(formId);
  if (form === null) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  return form;
};

export const getApplicationFormService = async () => {
  const form = await getApplicationFormQuery();
  if (!form) {
    throw new CustomError(FORM_NOT_FOUND, "Applications are closed", 404);
  }

  return form;
};

export const deleteFormService = async (formId: string) => {
  if (!ObjectId.isValid(formId)) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalid Document ID", 400);
  }

  const form = await Form.findByIdAndDelete(formId);
  if (!form) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  form.questionIds.forEach(async (questionId) => {
    const question = await Question.findByIdAndDelete(questionId);
    await Response.deleteMany({ _id: { $in: question?.responseIds } });
  });
  await Question.deleteMany({ _id: { $in: form.questionIds } });
};
