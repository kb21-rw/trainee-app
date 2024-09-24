/* eslint-disable no-unused-vars */
export interface IFormType {
  _id: string;
  name: string;
  description: string;
  type: string;
  questions: number;
}

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
export interface CreateCohort {
  name: string;
  description: string;
  stages: Stage[];
}

export interface Stage {
  title: string;
  description: string;
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
  type: QuestionType
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

export enum ButtonVariant {
  Primary = "Primary",
  Danger = "Danger",
}

export enum ButtonSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export enum QuestionType {
  Text = "Text",
  SingleSelect = "SingleSelect",
  MultiSelect = "MultiSelect",
}

export enum UserRole {
  Admin = "Admin",
  Trainee = "Trainee",
  Coach = "Coach",
  Applicant = "Applicant",
  Prospect = "Prospect",
}


export type ApplicantDetails = {
  applied: boolean;
  createdAt: string;
  email: string;
  googleId: string | null;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  userId: string;
  verified: boolean;
  __v: number;
  _id: string;
};

export enum ApplicantDecision {
  Accepted = "Accepted",
  Rejected = "Rejected",
}export interface Cohort {
  name: string;
  description: string;
  isActive: boolean;
  stages: number;
  applicants: number;
  trainees: number;
  coaches: number;
  forms: number;
}

