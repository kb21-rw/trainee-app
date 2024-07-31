import Cohort from "../models/Cohort";
import Form from "../models/Form";
import { GetCohortDto } from "../utils/types";

export const getFormsQuery = async (
  searchString: string,
  cohort: GetCohortDto
) => {
  const cohorts = await Cohort.aggregate([
    {
      $match: cohort ,
    },
    {
      $lookup: {
        from: "forms",
        localField: "forms",
        foreignField: "_id",
        as: "forms",
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        forms: {
          _id: 1,
          title: 1,
          description: 1,
          type: 1,
          questions: { $size: "$forms.questionIds" },
        },
      },
    },
  ]);

  return cohorts[0]
};

export const getFormQuery = async (formId: string) => {
  const forms: any = await Form.findById(formId).populate("questionIds").exec();
  return forms;
};
