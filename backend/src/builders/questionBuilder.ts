import { Builder } from ".";
import { QuestionProperties } from "../models/Question";

export class Question {
  public readonly id: string;
  public readonly title: string;
  public readonly type: "text" | "dropdown";
  public readonly options: string[];
  public readonly responseIds: string[];

  public constructor(data: QuestionProperties) {
    this.id = data.id;
    this.title = data.title;
    this.type = data.type;
    this.options = data.options;
    this.responseIds = data.responseIds;
  }
}

export class QuestionBuilder extends Builder<
  typeof Question,
  QuestionProperties
> {
  protected readonly properties: QuestionProperties = {
    id: "66203fa2a3465a4a588d12q1",
    title: "Test question",
    type: "text",
    options: [],
    responseIds: [],
  };

  constructor() {
    super(Question);
  }

  public static from(properties: Partial<QuestionProperties>): QuestionBuilder {
    return new QuestionBuilder().with(properties);
  }

  public withTitle(id: string): this {
    this.properties.title = id;
    return this;
  }

  public withType(type: "text" | "dropdown"): this {
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

  public build(): QuestionProperties {
    return new Question({
      ...this.properties,
    });
  }
}
