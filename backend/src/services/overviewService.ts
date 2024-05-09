import { getOverviewQuery } from "../queries/overviewQuery";

export const getAllTraineesOverviewService = async (searchString: string) => {
  const overview = await getOverviewQuery(searchString);

  return overview;
};

export const getMyTraineesOverviewService = async (
  searchString: string,
  coachId: string
) => {
  const overview = await getOverviewQuery(searchString, coachId);

  return overview;
};
