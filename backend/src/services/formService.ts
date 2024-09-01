import dayjs from "dayjs";
import CustomError from "../middlewares/customError";
import Form, { IForm } from "../models/Form";
import Question from "../models/Question";
import Response from "../models/Response";
import { getFormQuery, getFormsQuery } from "../queries/formQueries";
import {
  APPLICATION_FORM_ERROR,
  DUPLICATE_DOCUMENT,
  FORM_NOT_FOUND,
  INVALID_MONGODB_ID,
  NOT_ALLOWED,
} from "../utils/errorCodes";
import { getCurrentCohort } from "../utils/helpers/cohort";
import {
  CreateFormDto,
  FormType,
  GetCohortDto,
  UpdateFormDto,
} from "../utils/types";
import mongoose from "mongoose";
import { createStagesHandler } from "../utils/helpers";
const { Types } = mongoose;
const { ObjectId } = Types;

export const getFormsService = async (
  searchString: string,
  cohort: GetCohortDto
) => {
  return await getFormsQuery(searchString, cohort);
};

export const updateFormService = async (
  formId: string,
  formData: UpdateFormDto
) => {
  const { name, description } = formData;
  if (!ObjectId.isValid(formId)) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalid Document ID", 400);
  }

  const form = await Form.findById(formId);
  if (!form) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  if (name) {
    form.name = name;
  }

  if (description) {
    form.description = description;
  }

  await form.save();
  return form;
};

export const createFormService = async (formData: CreateFormDto) => {
  const { name, description, type, startDate, endDate, stages } = formData;

  const currentCohort = await getCurrentCohort();

  const cohortWithPopulatedForms = await currentCohort.populate<{
    forms: IForm[];
  }>("forms");

  if (cohortWithPopulatedForms.forms.some((form) => form.name === name)) {
    throw new CustomError(
      DUPLICATE_DOCUMENT,
      "A form with the same name already exists",
      409
    );
  }

  if (type === FormType.Application && currentCohort.applicationForm?.id) {
    throw new CustomError(
      APPLICATION_FORM_ERROR,
      "An application form already exists for the current cohort. Please edit the existing form.",
      409
    );
  }

  const startDateJs = dayjs(startDate);
  const endDateJs = dayjs(endDate);
  const nowJs = dayjs();

  if (startDateJs.isBefore(nowJs) || startDateJs.isAfter(endDateJs)) {
    throw new CustomError(
      NOT_ALLOWED,
      "Start date should be sometime after now but before end date",
      403
    );
  }

  const createdForm = await Form.create({ name, description, type });

  if (type === FormType.Application) {
    currentCohort.applicationForm.id = createdForm.id;
    currentCohort.applicationForm.startDate = startDateJs.toDate();
    currentCohort.applicationForm.endDate = endDateJs.toDate();
    currentCohort.applicationForm.stages = createStagesHandler(stages ?? []);
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

export const deleteFormService = async (formId: string) => {
  const currentCohort = await getCurrentCohort();

  const form = await Form.findById(formId);

  if (!form) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  if (form.type === FormType.Application) {
    throw new CustomError(
      NOT_ALLOWED,
      "Application form can not be deleted",
      403
    );
  }

  if (!currentCohort.forms.includes(formId)) {
    throw new CustomError(
      FORM_NOT_FOUND,
      "Form was not found in the current cohort",
      404
    );
  }

  await Form.deleteOne({ _id: formId });

  currentCohort.forms = currentCohort.forms.filter(
    (formIds) => formIds.toString() !== formId
  );
  await currentCohort.save();

  // Remove questions in deleted form and their responses
  form.questionIds.forEach(async (questionId) => {
    const question = await Question.findByIdAndDelete(questionId);
    await Response.deleteMany({ _id: { $in: question?.responseIds } });
  });
  await Question.deleteMany({ _id: { $in: form.questionIds } });
};
