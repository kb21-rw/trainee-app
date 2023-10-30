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

export type FormType = CreateFormType & MetaType;

export interface CreateQuestionType {
  title: string;
  type: "text" | "dropdown";
  options: string[];
}

export type QuestionType = CreateQuestionType & MetaType;

export interface Search {
  searchString?: string;
  typeQuery?: string;
}
