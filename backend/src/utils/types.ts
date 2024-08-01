import { Date, Types } from "mongoose";

interface MetaType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface CreateFormDto {
  title: string;
  description: string;
  type: FormType;
}
export interface CreateCohortDto {
  name: string;
  description?: string;
  stages: { tile: string; description: string }[];
}
export interface UpdateFormDto {
  title: string;
  description: string;
}

export interface CreateQuestionDto {
  title: string;
  type: "text" | "dropdown";
  options: string[];
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

export enum ApplicantDecision {
  Accepted = "Accepted",
  Rejected = "Rejected",
}
export enum QuestionType {
  Text = "Text",
  SingleSelect = "SingleSelect",
  MultiSelect = "MultiSelect",
}

export interface AcceptedBody {
  userId: string;
  decision: ApplicantDecision;
}

export interface RejectedBody {
  userId: string;
  decision: ApplicantDecision;
  stageId: string;
  feedback: string;
}
