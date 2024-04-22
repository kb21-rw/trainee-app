import Form from "../models/Form";
import { QuestionBuilder } from "../builders/questionBuilder";
import { createQuestionService } from "./questionService";
import { FormBuilder } from "../builders/formBuilder";
import Question from "../models/Question";
import User from "../models/User";
import { UserBuilder } from "../builders/userBuilder";
import Response from "../models/Response";

jest.mock("../models/Form");
jest.mock("../models/Question");
jest.mock("../models/User");
jest.mock("../models/Response");

describe("createQuestionService", () => {
  test("Should throw if related form is not found", async () => {
    (Form.findById as jest.Mock).mockReturnValue(null);
    const question = new QuestionBuilder().build();

    await expect(
      createQuestionService("66203fa2a3465a4a588d126e", question)
    ).rejects.toThrow("Invalid Document ID");
  });

  test("Should return form", async () => {
    const question = new QuestionBuilder().build();
    const form = new FormBuilder().build();
    const trainee = new UserBuilder();

    Object.setPrototypeOf(form, {
      save: jest.fn(),
    });

    (Form.findById as jest.Mock).mockReturnValue(form);
    (Question.create as jest.Mock).mockReturnValue({
      ...question,
      save: jest.fn(),
    });
    (User.find as jest.Mock).mockReturnValue([trainee]);
    (Response.prototype.save as jest.Mock).mockReturnValue(null);
    (Question.prototype.save as jest.Mock).mockReturnValue(null);
    (Form.prototype.save as jest.Mock).mockReturnValue(null);

    await expect(
      createQuestionService("66203fa2a3465a4a588d126e", question)
    ).resolves.toEqual({
      _id: "66203fa2a3465a4a588d12f1",
      description: "form description",
      questionsId: ["66203fa2a3465a4a588d12q1"],
      title: "Test form",
    });
  });
});
