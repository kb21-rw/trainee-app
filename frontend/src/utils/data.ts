export const adminMenu = [
  { link: "/", title: "Overview" },
  { link: "/forms", title: "Forms" },
  { link: "/trainees", title: "Trainees" },
  { link: "/administer-coach", title: "Administer coach" },
];
export const coachMenu = [
  { link: "/", title: "Overview" },
  { link: "/trainees-results", title: "Trainee Results"},
  { link: "/my-trainees", title: "My trainees" },
];

export const usersPerPageValues = [10, 20, 30, 40, 50, 100];
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
export const traineeTableHeaders = ["No", "Name", "Email", "Coach", "Action"];
export const traineeTableDataItems = ["_id", "name", "email", "coach"];
