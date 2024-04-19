import Form from "../models/Form";
import { QuestionBuilder } from "../builders/questionBuilder";
import { createQuestionService } from "./questionService";

jest.mock("../models/Form");

describe("createQuestionService", () => {
  test("Should throw if related form is not found", async () => {
    (Form.findById as jest.Mock).mockReturnValue(null);
    const question = new QuestionBuilder().build();

    await expect(
      createQuestionService("66203fa2a3465a4a588d126e", question)
    ).rejects.toThrow("Invalid Document ID");
  });
  
});
