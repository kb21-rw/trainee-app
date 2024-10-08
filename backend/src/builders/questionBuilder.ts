import { Builder } from ".";
import { IQuestion } from "../models/Question";
import { QuestionType } from "../utils/types";

type PartialIQuestionWithRequiredId = { id: IQuestion["id"] } & Partial<
  Omit<IQuestion, "id">
>;
export class Question {
  public readonly id: string;
  public readonly prompt?: string;
  public readonly type?: QuestionType;
  public readonly options?: string[];
  public readonly responseIds?: string[];

  public constructor(data: PartialIQuestionWithRequiredId) {
    this.id = data.id;
    this.prompt = data.prompt;
    this.type = data.type;
    this.options = data.options;
    this.responseIds = data.responseIds;
  }
}

export class QuestionBuilder extends Builder<
  typeof Question,
  PartialIQuestionWithRequiredId
> {
  protected readonly properties: PartialIQuestionWithRequiredId = {
    id: "66203fa2a3465a4a588d12q1",
    prompt: "Test question",
    type: QuestionType.Text,
    options: [],
    responseIds: [],
  };

  constructor() {
    super(Question);
  }

  public static from(
    properties: PartialIQuestionWithRequiredId
  ): QuestionBuilder {
    return new QuestionBuilder().with(properties);
  }

  public withPrompt(prompt: string): this {
    this.properties.prompt = prompt;
    return this;
  }

  public withType(type: QuestionType): this {
    this.properties.type = type;
    return this;
  }

  public withOptions(options: string[]): this {
    this.properties.options = options;
    return this;
  }

  public withResponseIds(responseIds: string[]): this {
    this.properties.responseIds = responseIds;
    return this;
  }

  public build(): PartialIQuestionWithRequiredId {
    return new Question({
      ...this.properties,
    });
  }
}
