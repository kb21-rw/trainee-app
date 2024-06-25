import { Date, ObjectId } from "mongoose";

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
  questionId: ObjectId;
  answer: string | string[];
}

export type IForm = CreateFormDto & MetaType;
export type IQuestion = CreateQuestionDto & MetaType;
export type IResponse = CreateResponseDto & MetaType;

export interface Search {
  searchString?: string;
  typeQuery?: string;
}

export enum FormType {
  "APPLICANT" = "APPLICANT",
  "TRAINEE" = "TRAINEE",
}
export enum Role {
  "ADMIN" = "ADMIN",
  "COACH" = "COACH",
  "TRAINEE" = "TRAINEE",
  "APPLICANT" = "APPLICANT",
}
