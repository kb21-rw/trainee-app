import { Date } from "mongoose";

interface MetaType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface CreateFormType {
  title: string;
  description: string;
}

export interface CreateQuestionType {
  title: string;
  type: "text" | "dropdown";
  options: string[];
}

export interface CreateResponseType {
  text: string;
}

export type FormType = CreateFormType & MetaType;
export type QuestionType = CreateQuestionType & MetaType;
export type ResponseType = CreateResponseType & MetaType;

export interface Search {
  searchString?: string;
  typeQuery?: string;
}

export enum Role {
  "ADMIN" = "ADMIN",
  "COACH" = "COACH",
  "TRAINEE" = "TRAINEE",
  "APPLICANT" = "APPLICANT",
}
