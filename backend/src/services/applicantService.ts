import { getApplicantsQuery } from "../queries/applicantQueries";

export const getApplicantsService = async (
  {
    nameSearch,
    sortBy,
    applicantsPerPage,
  }: {
    nameSearch: string;
    sortBy: string;
    applicantsPerPage: number;
  },
  cohortId?: string
) => {
  return await getApplicantsQuery(
    { nameSearchRegex: `.*${nameSearch}.*`, sortBy, applicantsPerPage },
    cohortId ? { id: cohortId } : undefined
  );
};
