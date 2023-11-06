import Form from "../models/Form";
import { CreateFormType, FormType } from "../utils/types";

export const getForms = async (searchString: string): Promise<FormType[]> => {
  try {
    const forms: FormType[] = await Form.aggregate([
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
    return forms;
  } catch (error) {
    throw console.error(error);
  }
};

export const updateForm = async (formId: string, formData: CreateFormType) => {
  try {
    const { title, description } = formData;
    const form = await Form.findById(formId);

    if (!form) {
      return null; // Handle the case when the form is not found
    }

    if (title) {
      form.title = title;
    }

    if (description) {
      form.description = description;
    }

    await form.save();
  } catch (error) {
    console.error(error);
  }
};
