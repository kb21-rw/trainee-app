import { Response } from "express";
import { createFormValidation } from "../validations/formValidation";
import Form from "../models/Form";

export const createForm = async (req: any, res: Response) => {
  try {
    const validationResult = await createFormValidation.validateAsync(req.body);
    const { title, description } = validationResult;
    const createdForm = await Form.create({ title, description });
    return res.status(201).json(createdForm);
  } catch (error: any) {
    return res.status(400).json({ error });
  }
};

export const getForms = async (req: any, res: Response) => {
  try {
    const searchString = req.query.searchString || "";
    const forms = await Form.aggregate([
      {
        $match: { title: { $regex: new RegExp(searchString, "i") } },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questionsId",
          foreignField: "_id",
          as: "questions",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          questions: 1,
        },
      },
    ]);
    return res.status(200).json(forms);
  } catch (error) {
    res.status(400).send(error);
  }
};
