import { Response } from "express";
import { createQuestionValidation } from "../validations/questionValidation";
import Form from "../models/Form";
import Question from "../models/Question";


export const createQuestion = async (req:any, res: Response) => {
  try {
    const { formId }  = req.params;
    const validationResult = await createQuestionValidation.validateAsync(req.body);
    const { title, type, options } = validationResult;

    const relatedForm = await Form.findById(formId);
    if(!relatedForm) return res.status(404).json({error: "That form is not found"});

    const createQuestion = await Question.create({ title, type, options});
    if(createQuestion) relatedForm.questionsId.push(createQuestion._id);
    await relatedForm.save();

    return res.status(201).json(createQuestion)
  } catch (error: any) {
    return res.status(400).json({ error });
  }
};
