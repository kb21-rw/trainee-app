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
  { link: "/apply", title: "Application" },
]

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
]

export const cohortTableHeaders = ["No", "Cohort Name", "Trainees", "Action"]
export const cohortTableDataItems = ["_id", "name", "trainees", "action"];
export const applicantTableHeaders = ["No", "Participant Number", "Applicant Name", "Email", "Response", "Action"];
export const applicantTableDataItems = ["_id","userId", "name", "email"];
export const traineeTableHeaders = ["No", "Name", "Email", "Coach", "Action"];
export const editTraineeTableHeaders = ["No", "Name", "Email", ""];
export const editTraineeTableItems = ["_id", "name", "email"];
export const traineeTableDataItems = ["_id", "name", "email", "coach"];
