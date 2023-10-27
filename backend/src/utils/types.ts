import { Date } from "mongoose";

export interface CreateFormType {
  title: string;
  description: string;
}

export interface Search {
  searchString?: string;
}

export interface FormType {
  _id: string;
  title: string;
  description: string;
  questionsId: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface QuestionType {
  _id: string;
  title: string;
  type: "text" | "dropdown";
  options: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
