import Form from "../models/Form";
import { QuestionBuilder } from "../builders/questionBuilder";
import {
  createQuestionService,
  getAllQuestionsService,
  updateQuestionService,
} from "./questionService";
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

  test("Should return form after creating a question", async () => {
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

describe("getAllQuestionsService", () => {
  test("Should return list of questions", async () => {
    const question = new QuestionBuilder().build();
    (Question.find as jest.Mock).mockReturnValue([question]);

    await expect(getAllQuestionsService("", "")).resolves.toEqual([question]);
    expect(Question.find).toHaveBeenCalled();
  });
});

describe("updateQuestionService", () => {
  test("Should throw if the question is not found", async () => {
    (Question.findById as jest.Mock).mockReturnValue(null);

    await expect(updateQuestionService("", {})).rejects.toThrow(
      "Question not found"
    );
  });

  test("Should return updated question", async () => {
    const question = new QuestionBuilder().build();
    const updatedQuestion = new QuestionBuilder()
      .withTitle("Updated Question")
      .withOptions(["true", "false"])
      .build();

    Object.setPrototypeOf(question, {
      save: function () {
        return this;
      },
    });

    (Question.findById as jest.Mock).mockReturnValue(question);

    await expect(
      updateQuestionService(question._id, {
        title: "Updated Question",
        options: ["true", "false"],
      })
    ).resolves.toEqual(updatedQuestion);
  });
});
