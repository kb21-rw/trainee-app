import { Except } from "type-fest";
import { IStage } from "../types";
import { Types } from "mongoose";

export const createStagesHandler = (stages: Except<IStage, "id">[]) => {
  const stageTitles = stages.map((stage) => stage.name);
  const uniqueStageTitles = [...new Set(stageTitles)];

  const uniqueStages = uniqueStageTitles.map((stageTitle) =>
    stages.find((stage) => stage.name === stageTitle)!
  );

  return uniqueStages.map((stage) => ({
    ...stage,
    id: new Types.ObjectId().toString(),
  }));
};
