import { Date, Types } from "mongoose";
import { Except, SetOptional } from "type-fest";

interface MetaType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IStage {
  id: string;
  name: string;
  description: string;
}
export interface CreateApplicantTraineeFormDto {
  type: FormType.Applicant | FormType.Trainee;
  name: string;
  description: string;
}

export interface CreateApplicationFormDto {
  type: FormType.Application;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  stages: Except<IStage, "id">[];
}

export type CreateFormDto =
  | CreateApplicationFormDto
  | CreateApplicantTraineeFormDto;

export interface CreateCohortDto {
  name: string;
  description?: string;
  stages: Except<IStage, "id">[];
}
export interface UpdateFormDto {
  name: string;
  description: string;
}

export interface UpdateCohortDto {
  name?: string;
  description?: string;
  stages?: SetOptional<IStage, "id">[];
}

export interface CreateQuestionDto {
  prompt: string;
  type: QuestionType;
  required: boolean;
  options: string[];
}

export interface UpdateQuestionDto {
  prompt?: string;
  type?: QuestionType;
  isRequired?: boolean;
  options?: string[];
}

export interface CreateResponseDto {
  text: string;
}

export interface CreateApplicationResponseDto {
  questionId: string;
  answer: string | string[];
}

export type IForm = CreateFormDto & MetaType;
export type IQuestion = CreateQuestionDto & MetaType;
export type IResponse = CreateResponseDto & MetaType;

export interface Search {
  searchString?: string;
  typeQuery?: string;
}

export type GetCohortDto = { _id: Types.ObjectId } | { isActive: true };

export enum FormType {
  Application = "Application",
  Applicant = "Applicant",
  Trainee = "Trainee",
}
export enum Role {
  Admin = "Admin",
  Coach = "Coach",
  Trainee = "Trainee",
  Applicant = "Applicant",
  Prospect = "Prospect",
}

export enum Decision {
  Accepted = "Accepted",
  Rejected = "Rejected",
}
export enum QuestionType {
  Text = "Text",
  SingleSelect = "SingleSelect",
  MultiSelect = "MultiSelect",
}

export interface DecisionDto {
  userId: string;
  decision: Decision;
  feedback: string;
}