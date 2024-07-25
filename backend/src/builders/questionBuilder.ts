import { Builder } from ".";
import { IQuestion } from "../models/Question";
import { QuestionType } from "../utils/types";

type PartialIQuestionWithRequiredId = { id: IQuestion["id"] } & Partial<
  Omit<IQuestion, "id">
>;
export class Question {
  public readonly id: string;
  public readonly title?: string;
  public readonly type?: QuestionType;
  public readonly options?: string[];
  public readonly responseIds?: string[];

  public constructor(data: PartialIQuestionWithRequiredId) {
    this.id = data.id;
    this.title = data.title;
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
    title: "Test question",
    type: QuestionType.TEXT,
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

  public withTitle(id: string): this {
    this.properties.title = id;
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
