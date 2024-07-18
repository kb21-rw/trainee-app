export interface User {
  _id?: string;
  name: string;
  coach?: Coach;
}

export interface Coach {
  _id?: string;
  name: string;
}

export interface CreateCoach {
  name: string;
  email: string;
  password: string;
}

export interface Response {
  _id?: string;
  text: string | null;
  user: User;
}

export interface Option {
  title: string;
}

export interface Question {
  _id?: string;
  title: string;
  responses: Response[];
  options: string[];
  type: "text" | "dropdown" | "multiple-choice";
}

export interface Form {
  _id?: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface ApplicationFormResponse {
  questionId: string;
  answer: string | string[];
}

/* eslint-disable no-unused-vars */
export enum ButtonVariant {
  Small = "small",
  Large = "large",
  Delete = "delete",
  Edit = "edit"
}

export type ButtonType = "button" | "submit" | "reset" | undefined;
