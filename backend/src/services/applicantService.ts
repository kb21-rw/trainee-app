import { getApplicantsQuery } from "../queries/applicantQueries";

export const getApplicantsService = async (
  {
    searchString,
    sortBy,
    applicantsPerPage,
  }: {
    searchString: string;
    sortBy: string;
    applicantsPerPage: number;
  },
  cohortId?: string
) => {
  return await getApplicantsQuery(
    { searchStringRegex: `.*${searchString}.*`, sortBy, applicantsPerPage },
    cohortId ? { id: cohortId } : undefined
  );
};
