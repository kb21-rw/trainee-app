export const getCoaches = (data: any, dataItems: string[]) => {
  const coachesData = data?.map(
    (coachData: any) =>
      dataItems?.map((dataItem: string) => coachData[dataItem]),
  );
  return coachesData;
};

export const getTraineesForCoach = (data: any, dataItems: string[]) => {
  const traineesData = data?.map(
    (traineeData: any) =>
      dataItems?.map((dataItem: string) =>
        dataItem === "coach"
          ? traineeData?.coach?.name
          : dataItem === "coachId"
          ? traineeData?.coach?._id
          : traineeData[dataItem],
      ),
  );
  return traineesData;
};

export const getTrainees = (data: any, dataItems: string[]) => {
  const traineesData = data?.map(
    (traineeData: any) =>
      dataItems?.map((dataItem: string) =>
        dataItem === "coach"
          ? traineeData?.coach?.name || "No coach assigned"
          : dataItem === "coachId"
          ? traineeData?.coach?._id || ""
          : traineeData[dataItem],
      ),
  );
  console.log({ traineesData });
  return traineesData;
};
