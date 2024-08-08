import Form from "../models/Form";
import { FormType } from "../utils/types";

export const getFormsQuery = async (searchString: string) => {
  const forms: FormType[] = await Form.aggregate([
    {
      $match: { title: { $regex: new RegExp(searchString, "i") } },
    },
    {
      $lookup: {
        from: "questions",
        localField: "questionIds",
        foreignField: "_id",
        as: "questions",
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        type:1,
        questions: 1,
      },
    },
  ]);
  return forms;
};

export const getFormQuery = async (formId: string) => {
  const forms: any = await Form.findById(formId).populate("questionIds").exec();
  return forms;
};
