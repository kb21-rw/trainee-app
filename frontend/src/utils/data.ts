import { MenuItemType } from "./types";

export const adminMenu = [
  { link: "/", title: "Overview" },
  { link: "/forms", title: "Forms" },
  { link: "/applicants", title: "Applicants" },
  { link: "/trainees", title: "Trainees" },
  { link: "/coaches", title: "Coaches" },
  { link: "/cohorts", title: "Cohorts" },
];
export const coachMenu = [
  { link: "/", title: "Overview" },
  { link: "/trainees-results", title: "Trainee Results" },
  { link: "/my-trainees", title: "My trainees" },
];

export const applicantMenu = [
  { link: "/home", title: "Home" },
  { link: "/apply", title: "Apply" },
  { link: "/saved-application", title: "Saved Application" },
];

export const menuItems: MenuItemType[] = [
  { label: "Create a new Trainee form", type: "Trainee" },
  { label: "Create a new Applicant form", type: "Applicant" },
  {
    label: "Create a new Application form",
    link: "/forms/create/application-form",
  },
];

export const usersPerPageValues = [10, 20, 30, 40, 50, 100];
export const cohortsPerPage = [10, 20, 30, 40, 50, 100];
export const applicantsPerPage = [3, 5, 10, 20, 30, 40, 50, 100];
export const coachTableSortingValues = [
  { title: "Entry", value: "entry" },
  { title: "Name", value: "name" },
  { title: "Role", value: "role" },
];
export const coachTableHeaders = ["No", "Name", "Email", "Role", "Action"];
export const coachTableDataItems = ["_id", "name", "email", "role"];
export const traineeTableSortingValues = [
  { title: "Entry", value: "entry" },
  { title: "Name", value: "name" },
];

export const cohortTableSortingValues = [
  { title: "Entry", value: "entry" },
  { title: "Name", value: "name" },
];

export const applicantTableSortingValues = [
  { title: "Entry", value: "entry" },
  { title: "Name", value: "name" },
  { title: "Email", value: "email" },
];

export const cohortTableHeaders = [
  "No",
  "Cohort Name",
  "Stages",
  "Applicants",
  "Trainees",
  "Dropped",
  "Action",
];
export const cohortTableDataItems = [
  "_id",
  "name",
  "stages",
  "applicants",
  "trainees",
  "rejected",
];
export const applicantTableHeaders = [
  "No",
  "Applicant Number",
  "Applicant Name",
  "Email",
  "Response",
  "Action",
];
export const applicantTableDataItems = ["_id", "userId", "name", "email"];
export const traineeTableHeaders = ["No", "Name", "Email", "Coach", "Action"];
export const editTraineeTableHeaders = ["No", "Name", "Email", ""];
export const editTraineeTableItems = ["_id", "name", "email"];
export const traineeTableDataItems = ["_id", "name", "email", "coach"];
