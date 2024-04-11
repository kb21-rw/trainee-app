import { getOverviewQuery } from "../queries/overviewQuery";

export const getOverviewService = async (searchString: string) => {
  const overview = await getOverviewQuery(searchString);

  return overview;
};
